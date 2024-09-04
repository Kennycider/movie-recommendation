import fetchPopularMovies from "@/actions/movies/fetchPopularMovies";
import MovieItem from "../MovieItem";
import Movie from "@/lib/types/Movie";
import { Suspense } from "react";

async function fetchMoviesData() {
  try {
    const data = await fetchPopularMovies();

    return data?.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function PopularMoviesContainer() {
  const popularMoviesData = await fetchMoviesData();

  return (
    <section className="flex flex-col items-center mt-14 min-h-fit w-full" data-aos="fade-up" data-aos-once="true">
      <h1 className="text-white text-center text-4xl font-extrabold lg:text-6xl mb-10">
        Popular Movies
      </h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5">
          {popularMoviesData?.map((movie: Movie) => (
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
      </Suspense>
    </section>
  )
}