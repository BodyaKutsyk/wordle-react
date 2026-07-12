import keyboardStyles from './Keyboard.module.scss';
import React from 'react';
import '../Tile/Tile.module.scss';
import { keyboardKeysEng, keyboardKeysUa } from '../../constants/keyboards';
import { useWord } from '../../providers/word-provider';
import getCharStatus from '../../utils/get-char-status';
import { useLanguage } from '../../providers/language-provider';


interface KeyboardProps {
  guess: string;
  setGuess: (word: string) => void;
  attemptedWords: string[];
}

export const Keyboard = React.memo(({ guess, setGuess, attemptedWords }: KeyboardProps) => {
  const { language } = useLanguage();
  const keyboard = language === 'EN' ? keyboardKeysEng : keyboardKeysUa;
  const { word } = useWord();

  const handleClick = (key: string) => {
    if (key === 'backspace') {
      setGuess(guess.slice(0, -1));

      return;
    }

    if (key === 'Enter') {
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
      });

      document.dispatchEvent(event);

      return;
    }

    if (guess.length >= 5) {
      return;
    }

    setGuess(guess + key);
  };

  return (
    <div className={keyboardStyles.keyboard}>
      {keyboard.map((line, i) => (
        <div key={i + 'key'} className={keyboardStyles.keyboardLine}>
          {line.map((key, i) => {
            let status = ""


            if (attemptedWords.some(word => word.includes(key))) {
              status = getCharStatus(key, i, word)
            }

            return (
              <div
                id={key}
                onClick={() => handleClick(key)}
                key={`${key}-${i}`}
                className={[keyboardStyles.key, keyboardStyles[status]].join(' ')}
              >
                {key === 'backspace' ? (
                  <img src="icons/backspace.svg" alt="backspace" />
                ) : (
                  <>
                    {key === 'Enter' ? (
                      <img src="icons/enter.svg" alt="enter" />
                    ) : (
                      key
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
