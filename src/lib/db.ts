import path from 'path';
import fs from 'fs';

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
  const fullPath = path.join(process.cwd(), 'db', 'data.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents) as IMovie[];
}

export function getMovieById(id: string): IMovie {
  const movies = getAllMovies();
  return movies.find((m) => m.id === id);
}
