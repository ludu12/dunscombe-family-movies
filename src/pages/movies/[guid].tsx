import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Layout from '../../components/Layout';
import { Movie } from '../../lib/graphql.generated';
import {
  allMoviesStaticPaths,
  findMovieByGuidStaticProps,
} from '../../lib/static-props';
import { useMovieSources } from '../../components/movie/use-movie-sources';
import MomentManagement from '../../components/movie/MomentMangament';
import TagManagement from '../../components/movie/TagManagement';
import { useMovieByGuid } from '../../components/movie/use-movie-by-guid';
import { Spin } from '../../components/common/Animation';

const MoviePage: React.FC<{ movie: Movie }> = (props) => {
  const {
    isMutating,
    movie,
    handleChange,
    handleTagMutation,
    triggerMutation,
  } = useMovieByGuid(props.movie.guid, props.movie);
  const [player, setPlayer] = React.useState(null);
  const sources = useMovieSources(movie);

  React.useEffect(() => {
    if (player !== null) {
      player.src(sources);
    }
  }, [player, sources]);

  return (
    <Layout title={movie.name} redirect>
      <main className="m-auto lg:mx-16">
        <div className="flex my-4 justify-between align-top shadow-md rounded px-2 py-1 border">
          <div className="mr-4 overflow-auto">
            <h2 className="text-2xl">{movie.name}</h2>
            <input
              className="p-1 w-80"
              maxLength={50}
              placeholder={'Type a short description...'}
              value={movie.shortDescription || ''}
              onBlur={triggerMutation}
              onChange={handleChange('shortDescription')}
            />
          </div>
          {isMutating && (
            <div className={'flex items-center'}>
              <Spin isSpinning={isMutating} />
              <div>Saving...</div>
            </div>
          )}
        </div>
        <VideoPlayer setPlayer={setPlayer} />
        <div className="my-4 flex flex-col shadow-md rounded px-2 border">
          <TagManagement
            tags={movie.tags.data}
            updateTags={handleTagMutation}
          />
          <div>
            <div>Description:</div>
            <textarea
              className="p-2 w-full border rounded min-h-96"
              maxLength={300}
              placeholder={'Any other details?...'}
              value={movie.description || ''}
              onChange={handleChange('description')}
              onBlur={triggerMutation}
            />
          </div>
          <div className="pb-8">
            <MomentManagement movie={movie} player={player} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths = allMoviesStaticPaths;
export const getStaticProps = findMovieByGuidStaticProps;
export default MoviePage;
