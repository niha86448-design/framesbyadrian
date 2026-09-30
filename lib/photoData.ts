export type Photo = {
  id: string;
  src: string;
  title: string;
  mainCategory: 'Fitness' | 'Food' | 'Model' | 'Music' | 'Sports' | 'Wedding';
  subCategory: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
};

export const mainCategories: ('Fitness' | 'Food' | 'Model' | 'Music' | 'Sports' | 'Wedding')[] = [
  'Fitness',
  'Food',
  'Model',
  'Music',
  'Sports',
  'Wedding',
];

export const subCategories: Record<string, string[]> = {
  Fitness: [],
  Food: [],
  Model: [],
  Music: [],
  Sports: [],
  Wedding: [],
};

export const photos: Photo[] = [];
