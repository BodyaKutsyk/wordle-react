const WORDLE_API_ENG =
  'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';
const WORDLE_API_UA = 'api/output.json';

export const fetchEngWords = async () => {
  const response = await fetch(WORDLE_API_ENG);

  return (await response.text()).split('\n');
};

export const fetchUaWords = async (): Promise<string[]> => {
  const response = await fetch(WORDLE_API_UA);

  return (await response.json()).words;
};
