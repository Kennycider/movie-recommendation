"use client"

import { useEffect } from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import WordFadeIn from "@/components/magicui/word-fade-in";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"
import fetchGenre from "@/actions/movies/fetchGenre";
import useGenreStore from "@/stores/genreStore";

const Hero = () => {
  const { genres, setGenres } = useGenreStore.getState()

  useEffect(() => {
    const handleFetchGenre = async () => {
      try {
        const data = await fetchGenre()

        setGenres(data?.genres)
      } catch (err) {
        console.error(err)
      }
    }

    if (genres.length === 0) {
      handleFetchGenre()
    }
  }, [])

  return (
    <div className="relative w-full h-[36.25vw] max-h-[80vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/HeroBanner.jpg"
          alt="Hero Banner"
          fill={true}
          className="object-center object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#0000006a] flex flex-col justify-center items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-4xl font-extrabold tracking-tight lg:text-6xl mb-5">
            Movie recommendations based on your search
          </h1>
          
          <WordFadeIn 
            className="text-white text-2xl mt-5" 
            words="Search something to get started.." 
          />
          
          <div className="mt-8">
            <SearchInput />
          </div>

          <VelocityScroll
            text="Find, Stream, and Fall in Love with Cinema"
            default_velocity={5}
            className="mt-16 lg:mt-24 font-display text-center text-4xl font-bold tracking-[-0.02em] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            dark:text-white md:text-5xl md:leading-[5rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero;
