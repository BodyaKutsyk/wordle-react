import { forwardRef, useMemo } from 'react';
import { CharStatus } from '../../types/CharStatus';
import { Tile } from '../Tile';
import lineStyles from './Line.module.scss';
import React from 'react';
import getCharStatus from '../../utils/get-char-status';
import { useWord } from '../../providers/word-provider';

type Props = {
  line: string[];
  correctWord: string;
  attempt: number;
  index: number;
  isGameOver: boolean;
};

const charPriority: Record<CharStatus, number> = {
  'correct': 3,
  "wrong": 2,
  "missed": 1,
  'not-used': 0,
} as const;

export const Line = React.memo(
  forwardRef<HTMLDivElement, Props>(
    ({ line, correctWord, attempt, index, isGameOver }, ref) => {
      const { setUsedChars, usedChars } = useWord();
      const isPassed = !!attempt && attempt > index;

      const validRef = attempt === index ? ref : null;


      // TODO: simplify and test this shit
      const lineHighlights = useMemo(() => {
        const lineStatus: CharStatus[] = new Array(5).fill('not-used');
        const chars: Record<string, number> = {};
        const correctChars: Record<string, number> = {};

        for (const char of correctWord) {
          if (correctChars[char]) {
            correctChars[char]++;
          } else {
            correctChars[char] = 1;
          }
        }

        for (let i = 0; i < line?.length; i++) {
          let status: CharStatus = "not-used";
          let tile = line?.[i];

          if (!chars[tile]) {
            chars[tile] = 1;
          } else {
            chars[tile]++;
          }

          if (isPassed && !isGameOver) {
            status = getCharStatus(tile, i, correctWord);

            if (chars[tile] >= correctChars[tile]) {
              const prevSiblingIndex = line.indexOf(tile);

              if (status === 'correct') {
                lineStatus[prevSiblingIndex] = 'wrong';
              } else if (
                (status === 'missed' && lineStatus[prevSiblingIndex] === 'missed') || (status === 'missed' && lineStatus[prevSiblingIndex] === 'correct')
              ) {
                status = 'wrong';
              }
            }

            lineStatus[i] = status;
          }
        }
        return lineStatus;
      }, [correctWord, line, isPassed, isGameOver])

      return (
        <div ref={validRef} className={lineStyles.line}>
          {line?.map((tile, i) => {
            const status = lineHighlights[i];

            if (charPriority[status] > charPriority[usedChars.get(tile) || 'not-used'] || !usedChars.has(tile)) {
              setUsedChars(prev => {
                prev.set(tile, status);
                return prev;
              });
            }

            return <Tile tile={tile} key={i} status={status} />;
          })}
        </div>
      );
    },
  ),
);
