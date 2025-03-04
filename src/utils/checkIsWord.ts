import { fetchEngWords, fetchUaWords } from "./fetchWords";

export const checkIsWord = async (word: string, isEng: boolean) => {
  const data = isEng ? await fetchEngWords() : await fetchUaWords();

  const isRealWord = data.includes(word);

  return isRealWord;
};