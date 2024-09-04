"use server"
import baseFetch from "@/constants/api"

interface Prop {
  id: number | string
}

export default async function fetchRelatedMovies(prop: Prop) {
  try {
    const data = await baseFetch({url: `/3/movie/${prop.id}/recommendations`})

    return data?.results
  } catch(err) {
    console.error(err)

    return []
  }
}