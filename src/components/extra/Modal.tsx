import { ThemeProvider } from '@emotion/react';
import {
  Backdrop,
  Typography,
  Button,
  Modal as ModalWrapepr,
  Box,
} from '@mui/material';
import { boxStyle, theme } from './styles';
import boardStyles from '../../Board.module.scss';
import React from 'react';

type Props = {
  open: boolean;
  setOpen: (el: boolean) => void;
  board: string[][];
  correctWord: string;
  handleReset: () => void;
  isEng: boolean;
};

const texts = {
  en: {
    winHead: 'Well done!',
    winBody: 'Want to try again?',
    loseHead: 'You just lost the game',
    loseBody: 'Please, try again!',
    restart: 'Restart',
    correctWord: 'The correct word is',
  },
  ua: {
    winHead: 'Чудово!',
    winBody: 'Хочете спробувати ще?',
    loseHead: 'Ви щойно програли',
    loseBody: 'Будь ласка, спробуйте ще раз',
    restart: 'Спробувати ще',
    correctWord: 'Правильне слово це',
  },
};

// eslint-disable-next-line react/display-name
export const Modal: React.FC<Props> = React.memo(
  ({ open, setOpen, board, correctWord, handleReset, isEng }) => {
    const handleClose = () => setOpen(false);
    const lang = isEng ? 'en' : 'ua';

    return (
      <ModalWrapepr
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={boxStyle}>
          <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {board.some(chars => chars.join('') === correctWord)
                ? texts[lang].winHead
                : texts[lang].loseHead}
            </Typography>
            <Typography id="modal-modal-description">
              {texts[lang].correctWord}{' '}
              <span className={boardStyles.bold}>{correctWord}. </span>
              {board.some(chars => chars.join('') === correctWord)
                ? texts[lang].winBody
                : texts[lang].loseBody}
            </Typography>
            <Button onClick={handleReset} color="dark" variant="contained">
              {texts[lang].restart}
            </Button>
          </ThemeProvider>
        </Box>
      </ModalWrapepr>
    );
  },
);
