export interface WordPair {
  korean: string;
  english: string;
}

export interface WordDataType {
  id: string;
  word: WordPair;
  type: string;
  commonUsages: WordPair[];
  examples: WordPair[];
  notes: string;
}

export interface WordData {
  english: WordDataType[];
  korean: WordDataType[];
}

export interface SearchData {
  word: string;
  id: string;
}