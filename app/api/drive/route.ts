import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folderIdParam = searchParams.get('folderId');
  const type = searchParams.get('type') || 'image';

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!folderIdParam || !apiKey) {
    console.warn('Drive API called without valid API key or folderIdParam');
    return NextResponse.json({
      success: false,
      files: [],
      error: 'Missing Google Drive API key or Folder ID',
    });
  }

  const folderIds = folderIdParam
    .split(',')
    .filter((id) => id && !id.startsWith('PLACEHOLDER') && !id.startsWith('PHOTO_') && !id.startsWith('VIDEO_'));

  if (folderIds.length === 0) {
    return NextResponse.json({
      success: true,
      files: [],
    });
  }

  try {
    const parentQuery = folderIds.map((id) => `'${id}' in parents`).join(' or ');
    const qParam = encodeURIComponent(`(${parentQuery}) and trashed = false`);
    const fieldsParam = encodeURIComponent('files(id,name,mimeType,thumbnailLink,webContentLink,createdTime)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${qParam}&key=${apiKey}&fields=${fieldsParam}&pageSize=100`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      console.error('Google Drive API Error Response:', errorJson);
      return NextResponse.json({
        success: false,
        files: [],
        error: errorJson?.error?.message || 'Google Drive API request failed',
      });
    }

    const data = await res.json();
    const rawFiles: any[] = data.files || [];

    const filteredFiles = rawFiles
      .filter((file) => {
        if (!file || !file.name) return false;
        // Filter out macOS hidden dot-underscore shadow metadata files (e.g. ._filename.mp4)
        if (file.name.startsWith('._') || file.name.startsWith('.')) {
          return false;
        }
        if (type === 'image') {
          return file.mimeType && file.mimeType.startsWith('image/');
        } else if (type === 'video') {
          return file.mimeType && file.mimeType.startsWith('video/');
        }
        return true;
      })
      .map((file) => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        thumbnailLink: file.thumbnailLink
          ? file.thumbnailLink.replace(/=s\d+$/, '=s1200')
          : '',
        embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      }));

    return NextResponse.json({
      success: true,
      files: filteredFiles,
    });
  } catch (error: any) {
    console.error('Server error fetching Google Drive files:', error);
    return NextResponse.json({
      success: false,
      files: [],
      error: 'Internal server error while communicating with Google Drive',
    });
  }
}
