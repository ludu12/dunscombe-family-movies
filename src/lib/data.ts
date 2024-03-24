import {Movie} from "@/types";
import recordsJson from './records.json';
const records = recordsJson as Movie[];

// invariant(process.env.FAUNA_SERVER_KEY, 'FAUNA_SERVER_KEY is not set');
// const FaunaClient = new Client({secret: process.env.FAUNA_SERVER_KEY});

export async function fetchMovies() {
  try {
    // const q = query;
    // const Collection = await FaunaClient.query<{ data: { data: Movie }[] }>(
    //     q.Map(
    //         q.Paginate(q.Documents(q.Collection('Movie'))),
    //         q.Lambda(x => q.Get(x))
    //     )
    // );
    //
    // return Collection.data.map(d => d.data);
    return records as Movie[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}

export async function fetchMovie(guid: string) {
  const movie = records.find(m => m.guid === guid);

  if(!movie){
    throw new Error(`Failed to find movie: ${guid}`);
  }

  return movie;
}
