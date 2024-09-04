"use server"
import baseFetch from "@/constants/api"

interface Prop {
  id: number | string
}

export default async function fetchMovieCredits(prop: Prop) {
  try {
    const data = await baseFetch({url: `/3/movie/${prop.id}/credits`})

    return data?.cast
  } catch(err) {
    console.error(err)

    return []
  }
}