import keyboardStyles from './Keyboard.module.scss';
import React from 'react';
import '../Tile/Tile.module.scss';

const keyboardKeysEng = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
];

const keyboardKeysUa = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ґ', 'ш', 'щ', 'з', 'х'],
  ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'ї'],
  ['backspace', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Enter'],
];

type Props = {
  isEng: boolean;
  guess: string;
  setGuess: (word: string) => void;
};

// eslint-disable-next-line react/display-name
export const Keyboard: React.FC<Props> = React.memo(
  ({ guess, setGuess, isEng }) => {
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

    const keyboard = isEng ? keyboardKeysEng : keyboardKeysUa;

    return (
      <div className={keyboardStyles.keyboard}>
        {keyboard.map((line, i) => (
          <div key={i + 'key'} className={keyboardStyles.keyboardLine}>
            {line.map(key => {
              return (
                <div
                  id={key}
                  onClick={() => handleClick(key)}
                  key={key + 'key'}
                  className={keyboardStyles.key}
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
  },
);
