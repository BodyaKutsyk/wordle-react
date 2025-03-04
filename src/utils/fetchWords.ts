const WORDLE_API_ENG =
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';
const WORDLE_API_UA = 'api/output.json';

export const fetchEngWords = async () => {
  const response = await fetch(WORDLE_API_ENG);
  const data = (await response.text()).split('\n');

  return data;
};

export const fetchUaWords = async () => {
  const response = await fetch(WORDLE_API_UA);
  const data = (await response.json()).words;

  return data;
};
