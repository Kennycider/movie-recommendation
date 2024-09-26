"use client"

import MovieItem from "../home/MovieItem";
import Movie from "@/lib/types/Movie";
import WordFadeIn from "@/components/magicui/word-fade-in";

const RecommendationList = ({
  results
} : {
  results: Movie[]
}) => {
  return (
    <section className={`flex flex-col items-center mt-8 min-h-fit w-full`} data-aos="fade-up" data-aos-once="true">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5">
        {results && results?.map((movie: Movie) => (
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
    </section>
  )
}

const RecommendationContainer = ({
  data,
} : {
  data: Movie[],
}) => {

  return (
    <>
      <WordFadeIn 
        className="text-white text-5xl font-extrabold tracking-normal lg:text-6xl mb-5" 
        words="Recommendations for you" 
      />
      <RecommendationList 
        results={data}
      />
    </>
  )
}

export default RecommendationContainer