import { forwardRef, useEffect } from 'react';
import { CharStatus } from '../../types/CharStatus';
import { Tile } from '../Tile';
import lineStyles from './Line.module.scss';
import tileStyles from '../Tile/Tile.module.scss';
import React from 'react';
import getCharStatus from '../../utils/get-char-status';
import { useWord } from '../../providers/word-provider';

type Props = {
  line: null | string[];
  correctWord: string;
  attempt: number;
  index: number;
  isGameOver: boolean;
  isReseted: boolean;
};

const charPriority: Record<CharStatus, number> = {
  'correct': 3,
  "wrong": 2,
  "missed": 1,
  'not-used': 0,
} as const;

export const Line = React.memo(
  forwardRef<HTMLDivElement, Props>(
    ({ line, correctWord, attempt, index, isGameOver, isReseted }, ref) => {
      const { setUsedChars, usedChars } = useWord();
      const isPassed = !!attempt && attempt > index;

      const validRef = attempt === index ? ref : null;
      let notRepeated = '';

      useEffect(() => {
        line?.forEach(tile => {
          document
            .getElementById(tile)
            ?.classList.remove(
              tileStyles.correct,
              tileStyles.missed,
              tileStyles.wrong,
            );
        });
      }, [isReseted, line]);

      return (
        <div ref={validRef} className={lineStyles.line}>
          {line?.map((tile, i) => {
            let status: CharStatus = 'not-used';

            if (isPassed && !notRepeated.includes(tile) && !isGameOver) {
              status = getCharStatus(tile, i ,correctWord);

              notRepeated += tile;
            }

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
