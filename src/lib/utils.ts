import { Movie } from './graphql.generated';

export const sortByDiscNumber = (movieA: Movie, movieB: Movie): number => {
  const regex = /[Dd]isc(\d+)_/;
  const a = Number(movieA.name.match(regex)[1]);
  const b = Number(movieB.name.match(regex)[1]);
  return a - b;
};
