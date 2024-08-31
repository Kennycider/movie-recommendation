"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Movie from "@/lib/types/Movie"
import { tmdbPaths } from "@/constants/tmdbPaths"
import useGenreStore from "@/stores/genreStore"

type types = Pick <Movie, "id" | "adult" | "genre_ids" | "original_title" | "poster_path" | "overview" | "vote_average">

const PopularMoviesItem = (movie: types) => {
  const { genres } = useGenreStore.getState()
  const [textGenres, setTextGenres] = useState<string[] | null>([])

  useEffect(() => {
    const matchedGenresId: string[] = genres
    .filter(genre => movie.genre_ids.includes(genre.id))
    .map(genre => genre.name)

    setTextGenres(matchedGenresId)
  }, [])

  return (
    <div className="relative w-full min-h-56 lg:h-96 mb-10 lg:mb-0 group">
    {/* Poster */}
    <Image
      src={`${tmdbPaths.images.secure_base_url}/w500/${movie.poster_path}`}
      alt="Hero Banner"
      fill={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-center object-cover rounded-xl group-hover:opacity-0 transition-opacity duration-300"
      priority
    />
  
    {/* Paragraph that shows on hover */}
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
      <div className="p-3">
        <p className="text-white text-sm line-clamp-6 lg:line-clamp-[14]">
          {movie.overview}
        </p>
      </div>
    </div>
  
    <div className="absolute bottom-0 h-20 bg-lightBlack w-full">
      <div className="flex flex-col mt-2">
        
        {/* Original title and vote average display */}
        <div className="flex justify-between gap-x-2">
          <p className="text-white text-sm">
            {movie.original_title}
          </p>
          <p className="text-white font-bold text-sm text-end">
            {(movie.vote_average.toFixed(1)).toString()} / 10
          </p>
        </div>
  
        {/* Genre Display */}
        <div className="flex w-[80%]">
          <p className="text-textMuted text-sm line-clamp-2">
            {textGenres?.join(", ")}
          </p>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default PopularMoviesItem