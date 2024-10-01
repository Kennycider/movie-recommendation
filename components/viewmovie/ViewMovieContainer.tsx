import Image from "next/image"
import fetchSelectedMovie from "@/actions/movies/fetchSelectedMovie"
import fetchMovieCredits from "@/actions/movies/fetchMovieCredits"
import { tmdbPaths } from "@/constants/tmdbPaths"
import getBlurredImageData from "@/lib/blurImage"
import { Separator } from "@/components/ui/separator"
import WordFadeIn from "../magicui/word-fade-in"
import TypingAnimation from "@/components/magicui/typing-animation";
import ViewMovie from "@/lib/types/ViewMovie"
import MovieCredits from "@/lib/types/MovieCredits"
import { MovieItemBlurDataUrl } from "@/lib/utils"
import storeUserMovieSearch from "@/actions/user/storeUserMovieSearch"
import { headers } from "next/headers"

const ViewMovieContainer = async ({id}: {id: number | string}) => {
  const [data, credits]: [ViewMovie, MovieCredits[]] = await Promise.all([
    fetchSelectedMovie({id: id}),
    fetchMovieCredits({id: id})
  ])

  const imageUrl = data?.backdrop_path 
    ? `${tmdbPaths.images.secure_base_url}/original/${data.backdrop_path}`
    : '/images/blur.avif'

  const blurData = data?.backdrop_path 
  ? await getBlurredImageData(`${tmdbPaths.images.secure_base_url}/w300/${data.backdrop_path}`)
  : '/images/blur.avif'

  const getReleasedYear = (): string => {
    const year = (data?.release_date).split("-")[0]
    return year
  }

  const getMovieRuntime = (): string => {
    let total = data?.runtime
    let hrs = 0
    let mins = 0

    hrs = Math.floor(total / 60)
    mins = total % 60

    return `${hrs}h ${mins}m`
  }

  const getGenres = (): string => {
    const genres = data?.genres.map(genre => genre.name)
    return genres.join(", ")
  }

  const base_url = process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://movie-recommendation-aizen.vercel.app";
    

  const storeMovieGenre = async () => {
    if (data?.genres?.length > 0) {
      const getGenreIds = data.genres.map(genre => genre.id.toString())
      Promise.all(getGenreIds.map(id => 
        fetch(`${base_url}/api/storegenre`, {
          method: "POST",
          headers: headers(),
          body: JSON.stringify({
            searchType: 'movie-click',
            searchQuery: id
          })
        })
        // storeUserMovieSearch({
        //   searchType: 'movie-click',
        //   searchQuery: id
        // })
      )).catch(error => console.error('Error storing movie genres:', error))
    }
  }

  // Call storeMovieGenre without awaiting it
  storeMovieGenre()

  const getProductionCompanies = (): string => {
    const companies = data?.production_companies
      .map(val => val.name)
      .join(", ")

    return companies
  }

  const getMovieCredits = (): string[] => {
    const getCredits = credits?.map(val => val.original_name)
      .slice(0, 10)

    return getCredits
  }

  return (
    <section className="relative">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] bg-none">
        <Image 
          src={imageUrl}
          alt="Movie backdrop"
          fill={true}
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurData || MovieItemBlurDataUrl}
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full
          bg-gradient-to-t lg:bg-gradient-to-r from-[#000000c1] from-5% lg:from-black lg:via-[#11101084] to-[#ffffff16]"
        >
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-32 lg:w-[60%] xl:w-[50%] h-full">
            <WordFadeIn
              className="text-lightWhite text-5xl font-extrabold text-start mb-2"
              words={data?.original_title || "N/A"}
            />
            <div className="flex items-center gap-x-3 mb-2">
              <p className="text-textMuted text-base">
                {getReleasedYear() || "N/A"}
              </p>
              <Separator className="bg-textMuted h-5" orientation="vertical" />
              <p className="text-textMuted text-base">
                {getMovieRuntime() || "N/A"}
              </p>
              <Separator className="bg-textMuted h-5" orientation="vertical" />
              <p className="text-textMuted text-base">
                {getGenres() || "N/A"}
              </p>
            </div>
            <div className="min-h-40">
              <TypingAnimation
                className="text-lightWhite font-light text-base text-left leading-7"
                text={data?.overview || "N/A"}
                duration={10}
              />         
            </div>
          </div>
        </div>
      </div>
    
      {/* Mobile and tablet details section */}
      <div className="lg:hidden px-4 py-6 bg-black">
        <WordFadeIn
          className="text-lightWhite text-2xl sm:text-3xl md:text-4xl font-extrabold text-start mb-2"
          words={data?.original_title}
        />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <p className="text-textMuted text-sm sm:text-base">
            {getReleasedYear() || "N/A"}
          </p>
          <Separator className="bg-textMuted h-4 sm:h-5" orientation="vertical" />
          <p className="text-textMuted text-sm sm:text-base">
            {getMovieRuntime() || "N/A"}
          </p>
          <Separator className="bg-textMuted h-4 sm:h-5" orientation="vertical" />
          <p className="text-textMuted text-sm sm:text-base">
            {getGenres() || "N/A"}
          </p>
        </div>
        <div className="mt-4">
          <TypingAnimation
            className="text-textMuted font-light text-sm sm:text-base text-left"
            text={data?.overview || "N/A"}
            duration={10}
          />         
        </div>
      </div>

      <MoreDetailsSection 
        data={data}
        ProductionCompanies={getProductionCompanies}
        MovieCredits={getMovieCredits}
      />
    </section>
  )
}

const MoreDetailsSection = ({
  data, 
  ProductionCompanies,
  MovieCredits,
}: {
  data: ViewMovie, 
  ProductionCompanies: () => string,
  MovieCredits: () => string[]
}) => {
  return (
    <section className="container flex flex-col w-full px-4 lg:px-20 py-6 lg:py-10">
      <label className="text-xl text-lightWhite">
        More Details
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5 mt-5" data-aos="fade-up" data-aos-once="true">
        <DetailItem 
          title="Tagline"
          value={data?.tagline || "N/A"}
        />
        <DetailItem 
          title="Origin Country"
          value={data?.origin_country.join(", ") || "N/A"}
        />
        <DetailItem 
          title="Ratings"
          value={`${data?.vote_average.toFixed(1).toString()} / 10` || "N/A"}
        />
        <DetailItem 
          title="Production Companies"
          value={ProductionCompanies() || "N/A"}
        />
      </div>
      <div className="w-full mt-5" data-aos="fade-up" data-aos-once="true">
        <label className="text-md text-textMuted">
          Credits
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-1 mt-1">
          {MovieCredits().map((val, index) => (
            <p key={index} className="text-md text-lightWhite lg:line-clamp-2">
              {val}
            </p>
          ))}
          {MovieCredits().length === 0 &&
            <p className="text-md text-lightWhite lg:line-clamp-2">
              N/A
            </p>
          }
        </div>
      </div>
    </section>
  )
}

const DetailItem = ({
  value,
  title,
}
: {
  value: string | number,
  title: string | number
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-md text-textMuted">
        {title}
      </label>
      <p className="text-md text-lightWhite lg:line-clamp-2">
        {value ? value : 'N/A'}
      </p>
    </div>
  )
}

export default ViewMovieContainer