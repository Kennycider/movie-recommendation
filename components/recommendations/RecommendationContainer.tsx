"use client"

import { useEffect, useState } from "react";
import useResultStore from "@/stores/resultStore";
import { Skeleton } from "@/components/ui/skeleton"
import MovieItem from "../home/MovieItem";
import Movie from "@/lib/types/Movie";
import WordFadeIn from "@/components/magicui/word-fade-in";

const RecommendationList = ({
  isFetching,
  results
} : {
  isFetching: boolean,
  results: Movie[]
}) => {
  return (
    <section className={`flex flex-col items-center mt-8 min-h-fit w-full`} >
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5">
        {!isFetching && results && results?.map((movie: Movie) => (
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
        {isFetching && (
          <>
            {Array.from({length: 10}).map((_, index) => (
              <Skeleton key={index} className="w-full lg:w-[240px] h-40 lg:h-72 rounded-lg bg-gray-400" />
            ))}
          </>
        )}
      </div>
      {!isFetching && results?.length === 0 && (
        <h1 className="text-white text-lg">
          No results found
        </h1>
      )}
    </section>
  )
}

const RecommendationContainer = () => {
  const results = useResultStore(state => state.results)
  const [toSearch, setToSearch] = useState(5)
  const [haveData, setHaveData] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    console.log(results)
  }, [])

  return (
    <div className={`flex flex-col justify-center  min-h-[calc(100vh-10rem)] py-10 ${haveData ? '' : 'items-center'}`}>
      {haveData ? (
        <>
          <WordFadeIn 
            className="text-white text-5xl font-extrabold tracking-normal lg:text-6xl mb-5" 
            words="Recommendations for you" 
          />
          <RecommendationList 
            isFetching={isFetching}
            results={results}
          />
        </>
      ) : (
        <WordFadeIn 
          className="text-white text-3xl font-extrabold tracking-normal lg:text-4xl mb-5" 
          words={`Search ${toSearch} more to get recommendations..`}
        />
      )}
    </div>
  )
}

export default RecommendationContainer