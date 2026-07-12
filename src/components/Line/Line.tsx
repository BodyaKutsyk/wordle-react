import { forwardRef, useEffect } from 'react';
import { CharStatus } from '../../types/CharStatus';
import { Tile } from '../Tile';
import lineStyles from './Line.module.scss';
import tileStyles from '../Tile/Tile.module.scss';
import React from 'react';
import getCharStatus from '../../utils/get-char-status';

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
            let status: CharStatus = '';

            if (isPassed && !notRepeated.includes(tile) && !isGameOver) {
              status = getCharStatus(tile, i ,correctWord);

              notRepeated += tile;
            }

            return <Tile tile={tile} key={i} status={status} />;
          })}
        </div>
      );
    },
  ),
);
