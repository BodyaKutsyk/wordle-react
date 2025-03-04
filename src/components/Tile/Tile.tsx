import { CharStatus } from '../../types/CharStatus';
import cn from 'classnames';
import tileStyles from './Tile.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type Props = {
  tile: null | string;
  status: CharStatus;
};

// eslint-disable-next-line react/display-name
export const Tile: React.FC<Props> = React.memo(({ tile, status }) => {
  return (
    <motion.div
      className={cn(tileStyles.tile, tileStyles[status])}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="sync">
        {tile && (
          <motion.div
            key={tile}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tile}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
