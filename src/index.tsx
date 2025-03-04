import ReactDOM from 'react-dom/client';
import { Board } from './Board';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Board />);
