import { useEffect, useState } from 'react';
import { fetchEngWords, fetchUaWords } from '../utils/fetchWords';

type Language = "UA" | "EN";

interface UseGetWordProps {
  language: Language;
  refetch?: boolean;
}

export const useGetWord = ({ language, refetch }: UseGetWordProps) => {
  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);

  const getLanguageData = async (language: Language) => {
    switch (language) {
      case 'UA':
        return await fetchUaWords();
      case 'EN':
      default:
        return await fetchEngWords();
    }
  };
  
  useEffect(() => {
    (async () => {
      const data = await getLanguageData(language);
      const randomWord = data[Math.floor(Math.random() * data.length)];

      setWord(randomWord);
      setWords(data);
    })()
  }, [language, refetch]);

  return { randomWord: word, words };
}