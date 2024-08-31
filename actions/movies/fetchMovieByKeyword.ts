"use server"

import baseFetch from "@/constants/api" 

interface Params {
  query: string[]
}

export default async function fetchMovieByKeyword(params: Params) {
  const keywordIds: number[] = []

  try {
    // e.g ["superhero", "action", "adventure"]
    const { query } = params

    for (const q of query) {
      const data = await baseFetch({url: `/3/search/keyword?query=${q}`})
      const results = await data?.results

      // Get the id, if results exist
      if (results?.length > 0) {
        keywordIds.push(results[0]?.id) // Get the closest result [0]
      }
    }

    if (keywordIds.length === 0) {
      return []
    }

    // Find movies by joined string ids e.g ["567", "234", "123"]
    const joinedKeywordIds = keywordIds.join(",").toString()
    const findKeywordData = await baseFetch({url: `/3/discover/movie?with_keywords=${joinedKeywordIds}`})

    return findKeywordData?.results || []
  } catch (err) {
    console.error(err)
  }
}