import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLanguage } from './language-provider';
import { useGetWord } from '../hooks/use-get-word';

interface WordContextType {
  word: string,
  checkWord: (word: string) => boolean,
  reset: () => void,
}

const value: WordContextType = {
  word: "",
  checkWord: () => false,
  reset: () => {},
};

const WordContext = createContext<WordContextType>(value);

export const WordProvider = ({ children }: PropsWithChildren) => {
  const { language } = useLanguage();
  const [word, setWord] = useState('');
  const { randomWord, words } = useGetWord({ language });

  const reset = useCallback(() => {
    setWord('');
  }, [])

  const checkWord = useCallback((word: string) => {
    return !!words?.length && words.includes(word);
  }, [words]);

  useEffect(() => {
    setWord(randomWord);
  }, [randomWord, language]);

  return (
    <WordContext.Provider value={{ word, reset, checkWord }}>
      {children}
    </WordContext.Provider>
  );
}

export const useWord = () => useContext(WordContext);

