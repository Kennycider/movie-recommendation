"use server"
import baseFetch from "@/constants/api"

export default async function fetchGenre() {
  try {
    const data = await baseFetch({url: "/3/genre/movie/list"})

    return data
  } catch (err) {
    console.error(err)

    return []
  }
}