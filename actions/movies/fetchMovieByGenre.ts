"use server"

import baseFetch from "@/constants/api" 

interface Params {
  genreId: string
}

export default async function fetchMovieByGenre(params: Params) {
  try {
    const data = await baseFetch({url: `/3/discover/movie?with_genres=${params.genreId}`})

    return data
  } catch (err) {
    console.error(err)

    return []
  }
}