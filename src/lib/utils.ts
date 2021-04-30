import { Movie } from './graphql.generated';

export const sortByDiscNumber = (movieA: Movie, movieB: Movie): number => {
  const regex = /[Dd]isc(\d+)_/;
  const a = Number(movieA.name.match(regex)[1]);
  const b = Number(movieB.name.match(regex)[1]);
  return a - b;
};

export function formatSeconds(duration: number): string {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor((duration / (60 * 60)) % 24);

  const secondsString = seconds < 10 ? '0' + seconds : seconds;
  const hoursString = hours < 10 ? '0' + hours : hours;
  const minutesString = minutes < 10 ? '0' + minutes : minutes;

  return hoursString + ':' + minutesString + ':' + secondsString;
}
