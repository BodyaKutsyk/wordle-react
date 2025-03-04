import { useCallback, useEffect, useRef, useState } from 'react';
import boardStyles from './Board.module.scss';
import { Line } from './components/Line';
import lineStyle from './components/Line/Line.module.scss';
import { Stack } from '@mui/material';
import Confetti from 'react-confetti';
import { MaterialUISwitch } from './components/extra/UISwitch';
import { Keyboard } from './components/Keyboard';
import { fetchEngWords, fetchUaWords } from './utils/fetchWords';
import { checkIsWord } from './utils/checkIsWord';
import { Modal } from './components/extra/Modal';

const LINES = 6;
const TILES = 5;
const tilesArray = Array(TILES).fill('');
const linesArray = Array(LINES).fill(tilesArray);

export const Board = () => {
  const [board, setBoard] = useState(linesArray);
  const [guess, setGuess] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [correctWord, setCorrectWord] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [isReseted, setIsReseted] = useState(true);
  const [isEng, setIsEng] = useState(false);

  const lineRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    async (e: KeyboardEvent) => {
      const key = e.key.toLocaleLowerCase();
      const regex = isEng ? /^[A-Za-z]$/ : /^[а-яієїґ]$/;

      if (isGameOver) {
        if (key === 'enter' || key === ' ') {
          setOpen(prev => !prev);
        }

        return;
      }

      if (key === 'backspace') {
        const newBoard = [...board];

        newBoard[attempt] = guess.slice(0, -1).padEnd(5, ' ').split('');
        setBoard(newBoard);
        setGuess(prev => prev.slice(0, -1));

        return;
      }

      if (key === 'enter' && attempt <= 5) {
        if (guess.length === 5) {
          const isWordExists = await checkIsWord(guess, isEng);

          if (!isWordExists) {
            const div = lineRef.current;

            div?.classList.add(lineStyle.shake);
            setTimeout(() => {
              div?.classList.remove(lineStyle.shake);
            }, 300);

            return;
          }

          if (guess === correctWord) {
            setOpen(true);
            setIsGameOver(true);
          }

          setAttempt(prev => prev + 1);
          setGuess('');
        }

        if (attempt === 5 && correctWord !== guess) {
          setIsGameOver(true);
          setOpen(true);
        }

        return;
      }

      if (guess.length >= 5 || attempt > 5) {
        return;
      }

      if (regex.test(key)) {
        setGuess(prev => prev + key);
      }
    },
    [isGameOver, board, attempt, guess, isEng, correctWord],
  );
  const handleReset = () => {
    setBoard(linesArray);
    setIsGameOver(false);
    setOpen(false);
    setAttempt(0);
    setGuess('');
    setCorrectWord('');
    setIsReseted(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = isEng ? await fetchEngWords() : await fetchUaWords();
      const randomWord = data[Math.floor(Math.random() * data.length)];

      setCorrectWord(randomWord);
      setIsReseted(false);
      // eslint-disable-next-line no-console
      console.log(randomWord);
    };

    if (isReseted) {
      fetchData();
    }
  }, [isReseted, isEng]);

  useEffect(() => {
    document.addEventListener('keydown', handleClick);

    return () => document.removeEventListener('keydown', handleClick);
  }, [handleClick]);

  useEffect(() => {
    if (!isGameOver) {
      const newBoard = [...board];

      newBoard[attempt] = guess.padEnd(5, ' ').split('');
      setBoard(newBoard);
    }
  }, [guess, attempt, board, isGameOver]);

  useEffect(handleReset, [isEng]);

  return (
    <>
      {correctWord === guess && isGameOver && attempt < 5 && (
        <Confetti
          height={window.innerHeight}
          width={window.innerWidth}
          recycle={false}
        />
      )}

      <Modal
        open={open}
        board={board}
        setOpen={setOpen}
        correctWord={correctWord}
        handleReset={handleReset}
        isEng={isEng}
      />

      <div className={boardStyles.board}>
        <div className={boardStyles.head}>
          <h1 className={boardStyles.title}>{isEng ? 'Wordle' : 'Вордл'}</h1>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <MaterialUISwitch
              value={isEng}
              onChange={() => setIsEng(prev => !prev)}
              inputProps={{ 'aria-label': 'ant design' }}
            />
          </Stack>
        </div>
        <div className={boardStyles.wrapper}>
          {board.map((line, i) => (
            <Line
              isReseted={isReseted}
              isGameOver={isGameOver}
              ref={lineRef}
              index={i}
              correctWord={correctWord}
              attempt={attempt}
              line={line}
              key={i}
            />
          ))}
        </div>
        <Keyboard isEng={isEng} guess={guess} setGuess={setGuess} />
      </div>
    </>
  );
};
