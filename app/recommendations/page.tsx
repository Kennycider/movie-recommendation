"use client"

import RecommendationContainer from "@/components/recommendations/RecommendationContainer"
import fetchUserMovieRecommendation from "@/actions/user/fetchUserMovieRecommendation"
import fetchMovieByTitle from "@/actions/movies/fetchMovieByTitle"
import fetchMovieByKeyword from "@/actions/movies/fetchMovieByKeyword"
import fetchMovieByGenre from "@/actions/movies/fetchMovieByGenre"
import fetchMovieByRatings from "@/actions/movies/fetchMovieByRatings"
import Movie from "@/lib/types/Movie";
import WordFadeIn from "@/components/magicui/word-fade-in";
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

const Page = () => {
  const [recommendationsData, setRecommendationsData] = useState<Movie[]>([]);
  const SearchTargetValue = 5
  const offset = 2
  const [userTotalSearches, setUserTotalSearches] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const handleGetRecommendations = async () => {
      try {
        // Fetch top user search/interact
        const data: any = await fetchUserMovieRecommendation();

        if (data.length >= SearchTargetValue) {
          setUserTotalSearches(data.length)

          // Fetch each user's top ranked based on searchType
          const results = await Promise.all(
            data.map(async (result: any) => {
              let response;

              if (result.searchType === 'title') {
                response = await fetchMovieByTitle({
                  query: result.searchQuery,
                });
              } else if (result.searchType === 'keyword') {
                const splitKeywords = result?.searchQuery
                  .split(',')
                  .map((keyword: any) => keyword.trim());
                response = await fetchMovieByKeyword({
                  query: splitKeywords,
                });
              } else if (result.searchType === 'genre') {
                response = await fetchMovieByGenre({
                  genreId: result.searchQuery,
                });
              } else if (result.searchType === 'ratings') {
                response = await fetchMovieByRatings({
                  rating: result.searchQuery,
                });
              } else if (result.searchType === 'movie-click') {
                response = await fetchMovieByGenre({
                  genreId: result.searchQuery,
                })
              }

              if (response) {
                return response?.results?.slice(offset, offset + (15 / SearchTargetValue));
              }

              return null; // Return null if no valid searchType matched
            })
          );

          // Filter out any null responses and flatten the results into a single array
          const validResults = results.filter(Boolean).flat();
          setRecommendationsData(validResults);
        }
        else {
          setUserTotalSearches(data.length)
        }

      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setUserTotalSearches(0)
      } finally {
        setIsFetching(false)
      }
    };

    handleGetRecommendations();
  }, []); 

  return (
    <div className={`container flex flex-col justify-center min-h-[calc(100vh-10rem)] py-10 ${userTotalSearches >= SearchTargetValue  ? '' : 'items-center'}`}>
      {isFetching &&
        <WordFadeIn 
          className="text-white text-3xl font-extrabold tracking-normal lg:text-4xl mb-5" 
          words={`Loading..`}
        />
      }
      {isFetching && userTotalSearches >= SearchTargetValue && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-5">
          {Array.from({length: 15}).map((_, index) => (
            <Skeleton key={index} className="w-full lg:w-[240px] h-40 lg:h-72 rounded-lg bg-gray-400" />
          ))}
        </div>
      )}
      {!isFetching && userTotalSearches >= SearchTargetValue &&
        <RecommendationContainer 
          data={recommendationsData}
        />
      } 
      {!isFetching && userTotalSearches < SearchTargetValue &&
        <WordFadeIn 
          className="max-w-[50%] text-center text-white text-3xl font-extrabold tracking-normal lg:text-4xl mb-5" 
          words={`Search ${SearchTargetValue - userTotalSearches} more movie to get recommendations..`}
        />
      }
    </div>
  )
}

export default Page