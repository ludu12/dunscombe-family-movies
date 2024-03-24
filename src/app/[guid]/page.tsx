import React from "react";
import {fetchMovie} from "@/lib/data";
import {MoviePlayer} from "@/ui/components/MoviePlayer";

export default async function Page({params}: { params: { guid: string } }) {
  const movie = await fetchMovie(params.guid);

  return (
      <div className="border border-grey-light bg-white rounded p-4 flex justify-between flex-1">
        <div className={'w-full'}>
          <h2 className="text-sm overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">{movie.name}</h2>
          <h3 className="text-2xl mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">{movie.shortDescription}</h3>
          <div className={'mx-32'}>
            <MoviePlayer movie={movie}/>
          </div>
          <h3 className="mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden min-w-0">{movie.description}</h3>
        </div>
      </div>
  )
}
