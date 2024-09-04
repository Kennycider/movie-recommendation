import { Suspense } from 'react';
import Movie from "@/lib/types/Movie";
import MovieItem from "../home/MovieItem";
import fetchRelatedMovies from "@/actions/movies/fetchRelatedMovies";
import { Skeleton } from "@/components/ui/skeleton"

interface Prop {
  id: number | string
}

const MovieList = async ({ id }: Prop) => {
  const movies: Movie[] = await fetchRelatedMovies({id});

  return (
    <>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5"
        data-aos="fade-up" data-aos-once="true">
        {movies.map((movie: Movie) => (
          <MovieItem 
            key={movie.id} 
            id={movie.id}
            adult={movie.adult}
            genre_ids={movie.genre_ids}
            original_title={movie.original_title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
      {!movies.length &&
        <div className="flex justify-center items-center w-full">
          <h1 className="text-white text-center text-4xl font-extrabold">
            No results found.
          </h1>    
        </div>
      }
    </>
  );
};

const RelatedMoviesContainer = ({ id }: Prop) => {
  return (
    <section className="flex flex-col mt-3">
      <h1 className="text-white text-center text-4xl font-extrabold lg:text-6xl mb-10">
        Related Movies
      </h1>
      <Suspense fallback={<SkeletonGrid />}>
        <MovieList id={id} />
      </Suspense>
    </section>
  )
}

const SkeletonGrid = () => (
  <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5">
    {[...Array(10)].map((_, i) => (
      <Skeleton key={i} className="w-full lg:w-[240px] h-40 lg:h-72 rounded-lg bg-gray-400" />
    ))}
  </div>
);

export default RelatedMoviesContainer;