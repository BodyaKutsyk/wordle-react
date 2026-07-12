import ReactDOM from 'react-dom/client';
import { Board } from './Board';
import './index.scss';
import { WordProvider } from './providers/word-provider';
import { LanguageProvider } from './providers/language-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <LanguageProvider>
    <WordProvider>
      <Board />
    </WordProvider>
  </LanguageProvider>,
);
