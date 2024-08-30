"use server"

import baseFetch from "@/constants/api"

export default async function fetchPopularMovies() {
  try {
    const data = await baseFetch({url: "/3/movie/popular"})
  
    return data
  } catch (err) {
    console.error(err)

    return []
  }
}