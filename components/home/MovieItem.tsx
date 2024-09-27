"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Movie from "@/lib/types/Movie"
import { tmdbPaths } from "@/constants/tmdbPaths"
import useGenreStore from "@/stores/genreStore"
import { useRouter } from "next/navigation"

type types = Pick <Movie, "id" | "adult" | "genre_ids" | "original_title" | "poster_path" | "overview" | "vote_average">

const MovieItem = (movie: types) => {
  const router = useRouter()
  const { genres } = useGenreStore.getState()
  const [textGenres, setTextGenres] = useState<string[] | null>([])

  useEffect(() => {
    const matchedGenresId: string[] = genres
    .filter(genre => movie?.genre_ids?.includes(genre.id))
    .map(genre => genre.name)

    setTextGenres(matchedGenresId)
  }, [])

  const handleMovieItemClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  return (
    <div onClick={handleMovieItemClick} className="relative w-full min-h-56 lg:h-96 mb-10 lg:mb-0 group hover:cursor-pointer">
    {/* Poster */}
    <Image
      src={`${movie.poster_path ? `${tmdbPaths.images.secure_base_url}/w500/${movie.poster_path}`: `/images/question.avif`}`}
      alt="Poster"
      fill={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-center object-cover rounded-xl group-hover:opacity-0 transition-opacity duration-300"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAwQCAQAGBf/EABoQAQEBAQEBAQAAAAAAAAAAAAACAQMREjH/xAAXAQEBAQEAAAAAAAAAAAAAAAABAAID/8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhEDEQA/APs3nnknnnnN/Eh2HS3oa1lpxuR+tzqR5bwc6TFBXXnnmg8OyDtJP0TWo6JrQDTjtMkP3nnng085X46xepCvQ1rd6GtZad9bnQ+tzqSmNLOp4006gR5zNdaDmivSVob0IPTU16fpqa9IFWuevVrPqD6F555NPC6aSt8xP00GCvQVTfSk9UC39NzSf6bmklcUadSxRppBTmu+izWvSna0N61WivUBdNTXpumpr1Adaz65WueoPpnnnN0tMXqbpRr1L0oEPSgVTfSk9UC19NzSf6bmklkUeaSRR4opTlNehmmvUGq0N61uivUBdNTXpumpr1BitZ9ZrWfQH1vrFa9ujrS2x0pL0o3TUvTQQdKT1ROmp71F36JFJ/SRqSuKURqSNPGkKZ1r0U616g1WhvWq0V6gLpqbppumpemgMVTPrNUz9APr90da7ujrS6D6al6afpqXpqSfpqa9N01PWovekjQ5pI1JVz1RGpeeqI0g8616Oda9QerRXrdaG9QD01N003TUvTQB1TP0zWs/QZfY7o613dYrS6ivU3TT3qbpqSfpqej9E9AuYSB4SEVEHgEHgslxr1nHSHK0N6Sg3qAOmpOmqempOuhmgvWfpy9Y9DL7XdHWtaxRdhWm6KLTdEk/QFHsNAs4WB4SEjweQQeSCY65jpDFBs1AtBN0R9dV9UfVM1Neseu3o/Qw+51im9HSdw2n6KLT9Ak9h01h0FzCwLCwiaDyCDy0yTHnseIYoNmoNoJOqPqs6o+qZqToMnQac6//2Q=="
    />
  
    {/* Paragraph that shows on hover */}
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
      <div className="p-3">
        <p className="text-white text-sm line-clamp-6 lg:line-clamp-[14]">
          {movie.overview ? movie.overview : 'No information available'}
        </p>
      </div>
    </div>
  
    <div className="absolute bottom-0 h-20 bg-lightBlack w-full">
      <div className="flex flex-col mt-2">
        
        {/* Original title and vote average display */}
        <div className="flex justify-between gap-x-2">
          <div className="h-fit max-w-[75%]">
            <p className="text-white text-sm line-clamp-2">
              {movie.original_title}
            </p>
          </div>
          <p className="text-white font-bold text-sm text-end">
            {movie?.vote_average ? (movie.vote_average.toFixed(1)).toString() : 'N/A'} / 10
          </p>
        </div>
  
        {/* Genre Display */}
        <div className="flex w-[80%]">
          <p className="text-textMuted text-sm line-clamp-2">
            {textGenres?.join(", ") ? textGenres?.join(", ") : 'No genre available'}
          </p>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default MovieItem