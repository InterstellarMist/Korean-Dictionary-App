import { create } from "zustand";
// import { fetchWords } from "../api/wordFetch";
import { searchWordFunc } from "../utils/search";
import { WordData, WordDataType, SearchData } from "../types/wordTypes";
import { testData } from '../data/data.ts'

export interface StoreType {
  data: WordData;
  currentWord: WordDataType | null;
  results: SearchData[];
  clearResults: () => void;
  search: string;
  setSearch: (word: string) => void;
  init: () => void;
  getWord: (id: string) => void;
  searchWord: (word: string) => void;
}

export const useWordStore = create<StoreType>((set) => ({
  data: { english: [], korean: [] },
  currentWord: null,
  results: [],
  clearResults: () => set({ results: [] }),
  search: '',
  setSearch: (word: string) => set({ search: word }),
  init: async () => {
    set({ data: { english: testData, korean: testData } });
  },
  getWord: (id: string) =>
    set((state) => ({
      currentWord: state.data.korean.find((wordObject: WordDataType) => {
        return wordObject.id === id;
      }) || null,
    })),
  searchWord: (word: string) => {
    set((state) => ({
      results: searchWordFunc(state.data, word)
    }));
  },
}));

// export const useWordStore = create<StoreType>((set) => ({
//   data: { english: [], korean: [] },
//   result: null as WordDataType | null,
//   searchResult: [],
//   search: '',
//   init: async () => {
//     const english = await fetchWords('getEnglish');
//     const korean = await fetchWords('getKorean');
//     set({ data: { english, korean } });
//   },
//   getWord: (id: string) =>
//     set((state) => ({
//       result: state.data.korean.filter((wordObject: WordDataType) => wordObject.id === id)
//     })),
//   searchWord: (word: string) => {
//     set((state) => ({
//       searchResult: searchWordFunc(state.data, word)
//     }));
//   },
// }));