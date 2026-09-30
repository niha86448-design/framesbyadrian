export interface SubCategoryFolders {
  [subCat: string]: string;
}

export interface CategoryFolder {
  folderId: string;
  subCategories?: SubCategoryFolders;
}

export interface DriveFoldersConfig {
  folders: {
    [category: string]: CategoryFolder;
  };
}

// ==========================================
// 1. PHOTOS CONFIGURATION
// Matches: Photo > Fitness, Food, Model, Music, Sports, Wedding
// ==========================================
export const driveConfig: DriveFoldersConfig = {
  folders: {
    Fitness: { folderId: "1J-AEe6fhIlEDKxaBRefSMIom6LnkhKWh" },
    Food: { folderId: "1TmMoW6VXxeptlLaFzsYuf2yLIPnrvrOH" },
    Model: { folderId: "1PekSX0hfZVYhKlMSG3sMCTF4D3SebwJg" },
    Music: { folderId: "1xwHGGMxqlbtSziUTgaKY-V6_6stj10AT" },
    Sports: { folderId: "11Kzo1LmUnxQIJidqnuAFxhXgWsh5hETw" },
    Wedding: { folderId: "1WbY7CQOX06i2_TVKonwMk_UdtaSpTW_D" },
  },
};

// ==========================================
// 2. VIDEOS CONFIGURATION
// Matches: Video > Events, Fitness, Music, Sports, Wedding
// ==========================================
export const videoDriveConfig: DriveFoldersConfig = {
  folders: {
    Events: { folderId: "1vw74O0eWjPLKkz09i8k3d0yertyVgB0U" },
    Fitness: { folderId: "1DM68DauGnGhUSlqW_XH8ntuqgOAqnR_X" },
    Music: { folderId: "1uzM2l4AfD8CUqctXyTLDEbzhUqvD0HqH" },
    Wedding: { folderId: "1ZHRFaZChxcVlbuik7Cj9fiy31j74C1uB" },
    Sports: {
      folderId: "1-sOdxF8jFrwueBzavK9dCnmiVv5V1LgO",
      subCategories: {
        "CPL 2024": "1-_2U5sVFFq7k8yuG-h8JsZQtzEYdpC-1",
        "IPL": "1aCozrsPsKYo3B9dubzeuSQ11NtjtqS4d",
        "Motorsports": "1tdA4-aotwo1dzhI_pLzZk78EKP2ZPDZr",
        "SA 20": "1NzqWPLQuUMlwhnFsfXHRUHCs5LnggvLm",
      },
    },
  },
};

// ==========================================
// 3. HELPER FUNCTION
// ==========================================
export function getFolderId(
  mainCategory: string,
  subCategory?: string,
  type: 'photo' | 'video' = 'photo'
): string | null {
  const config = type === 'video' ? videoDriveConfig : driveConfig;

  if (mainCategory === 'ALL') {
    const allIds = Object.values(config.folders)
      .map((f) => f.folderId)
      .filter((id) => id && !id.startsWith('PLACEHOLDER') && !id.startsWith('PHOTO_') && !id.startsWith('VIDEO_'));
    return allIds.length > 0 ? allIds.join(',') : null;
  }

  const catObj = config.folders[mainCategory];
  if (!catObj) return null;

  if (subCategory && subCategory !== 'ALL' && catObj.subCategories && catObj.subCategories[subCategory]) {
    return catObj.subCategories[subCategory];
  }

  return catObj.folderId;
}