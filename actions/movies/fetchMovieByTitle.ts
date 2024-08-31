"use server"

import baseFetch from "@/constants/api" 

interface Params {
  query: string
}

export default async function fetchMovieByTitle(params: Params) {
  try {
    const data = await baseFetch({url: `/3/search/movie?query=${params.query}&include_adult=true`})

    return data
  } catch (err) {
    console.error(err)
  }
}