"use server"

import baseFetch from "@/constants/api";

interface Params {
  rating: string;
}

export default async function fetchMovieByRatings(params: Params) {
  try {
    const voteCountThresholds = [10000, 1000, 100];

    let data = [];

    // Iterate through the vote count thresholds
    for (const voteCount of voteCountThresholds) {
      data = await baseFetch({
        url: `/3/discover/movie?vote_average.lte=${params.rating}&vote_count.gte=${voteCount}&sort_by=vote_average.desc`
      });

      if (data?.results?.length > 0) {
        break;
      }
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
