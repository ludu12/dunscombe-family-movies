import React from "react";
import {fetchMovie} from "@/lib/data";
import {MoviePlayer} from "@/ui/components/MoviePlayer";

export default async function Page({params}: { params: { guid: string } }) {
  const movie = await fetchMovie(params.guid);

  return (
      <div className={'prose'}>
        <h2 className="text-sm overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">{movie.name}</h2>
        <h3 className="text-2xl mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">{movie.shortDescription}</h3>
        <div className={'py-4'}>
          <MoviePlayer movie={movie}/>
        </div>
        <p className="prose mb-2">{movie.description}</p>
      </div>
  )
}
