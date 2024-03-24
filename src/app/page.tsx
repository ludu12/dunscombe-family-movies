import {fetchMovies} from "@/lib/data";
import {Card} from "@/ui/components/Card";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Dunscombe Family Movies',
}

export default async function Page() {
  const movies = await fetchMovies();
  return (
      <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12">
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
          {
            movies.map(m => {
              return (
                  <Link key={m.guid}
                        href={`/${m.guid}`}>
                    <Card {...m}/>
                  </Link>
              );
            })
          }
        </div>
      </main>
  );
}
