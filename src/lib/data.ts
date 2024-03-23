import {Client, query} from "faunadb";
import invariant from "tiny-invariant";

// invariant(process.env.FAUNA_SERVER_KEY, 'FAUNA_SERVER_KEY is not set');
// const FaunaClient = new Client({ secret: process.env.FAUNA_SERVER_KEY });

export async function fetchMovies() {
  try {
    // const q = query;
    // const Collection = await FaunaClient.query(
    //     q.Map(
    //         q.Paginate(q.Documents(q.Collection('Movie'))),
    //         q.Lambda(x => q.Get(x))
    //     )
    // );
    //
    // console.log(Collection);

    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies.');
  }
}

