import { WordData, WordDataType } from "../types/wordTypes";

export const searchWordFunc = (data: WordData, word: string) => {
  // non alphanumeric
  if (/[^\x20-\x7E]/gi.test(word)) {
    return data.korean
      .filter((wordObject: WordDataType) =>
        RegExp(`${word}`, 'g').test(wordObject.word.korean)
      )
      .map((wordObject: WordDataType) => {
        return { word: wordObject.word.korean, id: wordObject.id };
      })
      .slice(0, 5);
  }
  // alphanumeric
  return data.english
    .filter((wordObject: WordDataType) =>
      RegExp(`${word}`, 'ig').test(wordObject.word.english)
    )
    .map((wordObject: WordDataType) => {
      return { word: wordObject.word.english, id: wordObject.id };
    })
    .slice(0, 5);
};