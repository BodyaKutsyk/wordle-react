import { forwardRef, useEffect } from 'react';
import { CharStatus } from '../../types/CharStatus';
import { Tile } from '../Tile';
import lineStyles from './Line.module.scss';
import tileStyles from '../Tile/Tile.module.scss';
import React from 'react';

type Props = {
  line: null | string[];
  correctWord: string;
  attempt: number;
  index: number;
  isGameOver: boolean;
  isReseted: boolean;
};

export const Line = React.memo(
  forwardRef<HTMLDivElement, Props>(
    ({ line, correctWord, attempt, index, isGameOver, isReseted }, ref) => {
      const isPassed = attempt > index && attempt;
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
            let status: CharStatus = isPassed ? 'wrong' : '';

            if (isPassed && !notRepeated.includes(tile) && !isGameOver) {
              if (correctWord.includes(tile)) {
                status = 'missed';
              }

              if (tile === correctWord[i]) {
                status = 'correct';
              }

              notRepeated += tile;
              document.getElementById(tile)?.classList.add(tileStyles[status]);
            }

            return <Tile tile={tile} key={i} status={status} />;
          })}
        </div>
      );
    },
  ),
);
