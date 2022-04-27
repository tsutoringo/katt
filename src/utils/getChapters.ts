export const resourceTypes = {
  MOVIE: 'movie',
  EVALUATION_TEST: 'evaluation_test',
  ESSAY_TEST: 'essay_test',
  EVALUATION_REPORT: 'evaluation_report',
  ESSAY_REPORT: 'essay_report'
} as const;

export const materialTypes = {
  MAIN: 'main',
  SUPPLEMENT: 'supplement'
} as const;

export const vrRanks = {
  RICH: 'rich'
} as const;

export type VrRanks = typeof vrRanks[keyof typeof vrRanks];

export interface Chapters {
  chapter: Chapter1;
  canVerticalWriting: boolean;
  nextChapterUrl: string;
  nextChapterPermissions: NextChapterPermissions;
  prevChapterUrl?: null;
  prevChapterPermissions?: null;
}
export interface Chapter1 {
  course_type: string;
  chapter: Chapter2;
}
export interface Chapter2 {
  id: number;
  title: string;
  outline: string;
  thumbnail_url?: null;
  open_section_index: number;
  progress: Progress;
  sections: (SectionsEntity)[];
}
export interface Progress {
  total_count: number;
  passed_count: number;
}

export interface SectionBase {
  id: number;
  title: string;
  passed: boolean;
  content_url: string;
  material_type: MaterialTypes;
  thumbnail_url: string;
  permissions: Permissions;
}

export interface MovieSectionBase extends SectionBase {
  resource_type: 'movie';
  textbook_info: string;
  length: number;
  playback_position: number;
}

export interface SupplementMovieSection extends MovieSectionBase {
  material_type: 'supplement';
  vr_rank: VrRanks;
  vr_length: number;
}

export interface MovieSection extends MovieSectionBase {
  material_type: 'main';
}

export interface EvaluationSection extends SectionBase {
  resource_type: 'evaluation_test' | 'evaluation_report';
  material_type: 'main';
  passed: boolean;
  total_question: number;
  done: boolean;
}

export interface EssaySection extends SectionBase {
  resource_type: 'essay_test' | 'essay_report';
  material_type: 'main';
  passed: boolean;
  total_question: number;
  done: boolean;
}

export type SectionsEntity = MovieSection | SupplementMovieSection | EvaluationSection | EssaySection;
export type ResourceTypes = SectionsEntity['resource_type'];
export type MaterialTypes = SectionsEntity['material_type'];

export interface Permissions {
  vr_use?: VrUse | null;
}
export interface VrUse {
  active: boolean;
}
export interface NextChapterPermissions {
  active: boolean;
  reason: string;
  meta: PermissionsOrMeta;
}
export interface PermissionsOrMeta {
}

export const getChapters = (): Chapters | null => JSON.parse(
  document
    .querySelector<HTMLDivElement>('div[data-react-class="App.Chapter"][data-react-props]')
    ?.dataset.reactProps || 'null'
);
