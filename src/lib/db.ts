import data from './data.json';

export interface IMovie {
  id: string;
  name: string;
  HSL_URL: string;
  DASH_URL: string;
  MP4_URL: string;
  tags: string[];
  description: string;
}

export function getAllMovies(): IMovie[] {
  return data as IMovie[];
}

export function getMovieById(id: string): IMovie {
  const movies = getAllMovies();
  return movies.find((m) => m.id === id);
}
