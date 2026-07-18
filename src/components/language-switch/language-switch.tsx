import boardStyles from '../../Board.module.scss';
import { MaterialUISwitch } from '../extra/UISwitch';
import { Stack } from '@mui/material';
import { useLanguage } from '../../providers/language-provider';
import { ChangeEvent } from 'react';

export default function LanguageSwitch() {
  const { language, changeLanguage } = useLanguage();
  const isEng = language === 'EN';

    const handleChangeLanguage = (event: ChangeEvent<HTMLInputElement>) => {
      changeLanguage(event.target.checked ? 'EN' : 'UA');
    }

   return (
     <div className={boardStyles.head}>
       <h1 className={boardStyles.title}>{isEng ? 'Wordle' : 'Вордл'}</h1>
       <Stack direction="row" sx={{ alignItems: 'center' }}>
         <MaterialUISwitch
           value={isEng}
           onChange={handleChangeLanguage}
           inputProps={{ 'aria-label': 'ant design' }}
         />
       </Stack>
     </div>
   );
};