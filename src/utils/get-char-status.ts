import { CharStatus } from '../types/CharStatus';


export default function getCharStatus(char: string, i: number, correctWord: string): CharStatus {
  let status: CharStatus =  'wrong';

  if (correctWord.includes(char)) {
    status = 'missed';
  }

  if (char === correctWord[i]) {
    status = 'correct';
  }

  return status;
}