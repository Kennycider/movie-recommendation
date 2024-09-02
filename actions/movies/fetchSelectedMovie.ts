"use server"

import baseFetch from "@/constants/api"

interface ParamsProp {
  id: string | number
}

export default async function fetchSelectedMovie(params: ParamsProp) {
  try {
    const data = await baseFetch({url: `/3/movie/${params.id}`})

    return data
  } catch(err) {
    console.error(err)

    return {}
  }
}