"use client"

import MovieItem from "../MovieItem";
import Movie from "@/lib/types/Movie";
import { Suspense, useEffect, useState } from "react";
import useResultStore from "@/stores/resultStore";

export default function SearchResultContainer() {
  const results = useResultStore(state => state.results)
  const searchQueryValue = useResultStore(state => state.searchQuery)

  return (
    <section id="results-container" className="flex flex-col items-center mt-14 min-h-fit w-full" data-aos="fade-up" data-aos-once="true">
      <h1 className="text-white text-center text-4xl font-extrabold lg:text-6xl mb-10">
        Results
      </h1>
      <div className="flex justify-start items-start w-full mb-2">
        <p className="text-textMuted text-sm">
          {searchQueryValue ? `Search by: ${searchQueryValue}` : ''}
        </p>
      </div>
      <Suspense fallback={<h1 className="text-white text-2xl">Loading...</h1>}>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-5">
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
        {results?.length === 0 && (
          <h1 className="text-white text-lg">
            No results found
          </h1>
        )}
      </Suspense>
    </section>
  )
}