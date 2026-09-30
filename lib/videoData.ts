export type Video = {
  id: string;
  title: string;
  driveFileId: string;
  thumbnail: string;
  duration: string;
  mainCategory: 'Events' | 'Fitness' | 'Music' | 'Sports' | 'Wedding';
  subCategory: string;
  isVertical?: boolean;
};

export const mainCategories: ('Events' | 'Fitness' | 'Music' | 'Sports' | 'Wedding')[] = [
  'Events',
  'Fitness',
  'Music',
  'Sports',
  'Wedding',
];

export const subCategories: Record<string, string[]> = {
  Events: [],
  Fitness: [],
  Music: [],
  Wedding: [],
  Sports: ['CPL 2024', 'IPL', 'Motorsports', 'SA 20'],
};

export const videos: Video[] = [];
