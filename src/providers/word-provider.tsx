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
import { CharStatus } from '../types/CharStatus';

type UsedChars = Map<string, CharStatus>;

interface WordContextType {
  word: string,
  usedChars: UsedChars,
  checkWord: (word: string) => boolean,
  reset: () => void,
  setUsedChars: (chars: UsedChars | ((chars: UsedChars) => UsedChars)) => void,
}

const defaultUsedChars = new Map<string, CharStatus>();

const value: WordContextType = {
  word: '',
  usedChars: defaultUsedChars,
  checkWord: () => false,
  reset: () => {},
  setUsedChars: () => {},
};

const WordContext = createContext<WordContextType>(value);

export const WordProvider = ({ children }: PropsWithChildren) => {
  const { language } = useLanguage();
  const [word, setWord] = useState('');
  const [usedChars, setUsedChars] = useState(defaultUsedChars);
  const { randomWord, words } = useGetWord({ language, refetch: !!word.length });

  console.log(randomWord);

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
    <WordContext.Provider value={{ word, reset, checkWord, usedChars, setUsedChars }}>
      {children}
    </WordContext.Provider>
  );
}

export const useWord = () => useContext(WordContext);

