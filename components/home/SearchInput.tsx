"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useGenreStore from "@/stores/genreStore"
import fetchMovieByTitle from "@/actions/movies/fetchMovieByTitle"
import fetchMovieByKeyword from "@/actions/movies/fetchMovieByKeyword"
import fetchMovieByGenre from "@/actions/movies/fetchMovieByGenre"
import fetchMovieByRatings from "@/actions/movies/fetchMovieByRatings"
import storeUserMovieSearch from "@/actions/user/storeUserMovieSearch"
import useResultStore from "@/stores/resultStore"
import useSearchMovieStore from "@/stores/searchMovieStore"
 
const formSchema = z.object({
  title: z.string().optional(),
  keyword: z.string().optional(),
})

const SEARCH_BY = [
  {
    text: "Title",
    value: "title"
  },
  {
    text: "Keyword",
    value: "keyword"
  },
  {
    text: "Genre",
    value: "genre"
  },
  {
    text: "Ratings",
    value: "ratings"
  }
]

const SELECT_RATINGS = [5, 6, 7, 8, 9, 10]

const SearchInput = () => {
  const searchByStore = useSearchMovieStore(state => state.searchBy)
  const setSearchByStore = useSearchMovieStore(state => state.setSearchBy)

  const [genreValue, setGenreValue] = useState<string>("")
  const [ratingsValue, setRatingsValue] = useState<string>("")

  const { genres } = useGenreStore.getState()
  const { setSearchQuery, setResults, setIsFetching, setHasSearched } = useResultStore.getState()

  // Title and keyword handler
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      keyword: "",
    },
  })

  // Store to zustand
  const handleSetResultStore = async (searchByStore: string, query: string, data: any) => {
    setHasSearched(true)
    setSearchQuery(`${searchByStore} -> ${query}`)
    setIsFetching(false)
    setResults(data)
  }
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (searchByStore === SEARCH_BY[0].value) { // title
      const query = form.getValues().title

      if (query) {
        handleScrollToResults()

        setIsFetching(true)
        const data = await fetchMovieByTitle({query: query})

        // Store to zustand
        handleSetResultStore(
          `${searchByStore}`, 
          query,
          data.results
        )

        // Check if result is good before saving to database
        if (data.results.length > 0) {
          // Call server action, store data
          storeUserMovieSearch({
            searchType: searchByStore,
            searchQuery: query
          })
        }
      }
    }

    if (searchByStore === SEARCH_BY[1].value) { // keyword
      const query = form.getValues().keyword

      if (query) {
        handleScrollToResults()

        setIsFetching(true)
        // make array of keywords from e.g "superhero, action, adventure"
        const keywords = query.split(",").map(keyword => keyword.trim())
        const data = await fetchMovieByKeyword({query: keywords})

        // Store to zustand
        handleSetResultStore(
          `${searchByStore}`, 
          query,
          data.results
        )

        // Check if result is good before saving to database
        if (data.results.length > 0) {
          // Call server action, store data
          storeUserMovieSearch({
            searchType: searchByStore,
            searchQuery: query
          })
        }
      }
    }
  }

  // Clear form input when switched
  useEffect(() => {
    form.reset()
    setGenreValue("")
    setRatingsValue("")
  }, [searchByStore, form])

  // Input handlers
  const handleSearchByValue = (value: string) => {
    setSearchByStore(value)
  }
  
  const handleGenreValue = (value: string) => {
    setGenreValue(value)
  }

  const handleRatingsValue = (value: string) => {
    setRatingsValue(value)
  }

  const onInputHanldersSubmit = async () => {
    if (searchByStore === SEARCH_BY[2].value) { // genre
      if (genreValue) {
        handleScrollToResults()

        setIsFetching(true)
        const data = await fetchMovieByGenre({genreId: genreValue})

        // Store to zustand
        handleSetResultStore(
          `${searchByStore}`, 
          `${genres.find(val => val.id.toString() === genreValue)?.name}`,
          data.results
        )

        // Check if result is good before saving to database
        if (data.results.length > 0) {
          // Call server action, store data
          storeUserMovieSearch({
            searchType: searchByStore,
            searchQuery: genreValue
          })
        }
      }
    }

    if (searchByStore === SEARCH_BY[3].value) { // ratings
      if (ratingsValue) {
        handleScrollToResults()

        setIsFetching(true)
        const data = await fetchMovieByRatings({rating: ratingsValue})

        // Store to zustand
        handleSetResultStore(
          `${searchByStore}`, 
          `${ratingsValue}`,
          data.results
        )

        // Check if result is good before saving to database
        if (data.results.length > 0) {
          // Call server action, store data
          storeUserMovieSearch({
            searchType: searchByStore,
            searchQuery: ratingsValue
          })
        }
      }
    }
  }

  // Scroll to results after searching
  const handleScrollToResults = () => {
    const element = document.getElementById("results-container");

    // Scroll to the selected project
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full mt-0 lg:mt-[-20px]"> 
        <Select onValueChange={handleSearchByValue} value={searchByStore}>
          <SelectTrigger 
            className={`${searchByStore === '' ? 'w-[300px]': 'w-[120px]'} font-semibold bg-white text-black
                      ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 mr-3`}>
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            {SEARCH_BY.map(value => (
              <SelectItem 
                key={value.value}
                value={value.value}
                className="hover:cursor-pointer"
              >
                {value.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* [0] -> title */}
        {searchByStore === SEARCH_BY[0].value ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full lg:w-1/2 gap-x-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-[80%]" id="title">
                    <FormControl>
                      <Input 
                        className="text-black bg-lightWhite border-neutral-100 focus-visible:ring-neutral-300"
                        placeholder="Search title.. (e.g spiderman)" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className="bg-red-700 hover:bg-red-600 text-white"
                type="submit"
              >
                Search
              </Button>
            </form>
          </Form>
        ) : /* [1] -> keyword */ searchByStore === SEARCH_BY[1].value ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full lg:w-1/2 gap-x-3">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem className="w-[80%]" id="keyword">
                    <FormControl>
                      <Input 
                        className="text-black placeholder:text-xs bg-lightWhite border-neutral-100 focus-visible:ring-neutral-300"
                        placeholder="Search keywords separated by comma (e.g superhero, villain, funny)" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                className="bg-red-700 hover:bg-red-600 text-white"
                type="submit"
              >
                Search
              </Button>
            </form>
          </Form>
        ) : /* [2] -> genre */ searchByStore === SEARCH_BY[2].value ? (
          <>
            <Select onValueChange={handleGenreValue} value={genreValue}>
              <SelectTrigger 
                className="w-[250px] font-semibold bg-lightWhite text-black
                          ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 mr-3">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(value => (
                  <SelectItem 
                    key={value.id}
                    value={value.id.toString()}
                    className="hover:cursor-pointer"
                  >
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              className="bg-red-700 hover:bg-red-600 text-white"
              type="submit"
              onClick={onInputHanldersSubmit}
            >
              Search
            </Button>
          </>
        ) : /* [3] -> ratings */ searchByStore === SEARCH_BY[3].value ? (
          <>
            <Select onValueChange={handleRatingsValue} value={ratingsValue}>
              <SelectTrigger 
                className="w-[250px] font-semibold bg-lightWhite text-black
                          ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 mr-3">
                <SelectValue placeholder="Select ratings" />
              </SelectTrigger>
              <SelectContent>
                {SELECT_RATINGS
                  .sort((a, b) => b - a)
                  .map(value => (
                  <SelectItem 
                    key={value}
                    value={value.toString()}
                    className="hover:cursor-pointer"
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              className="bg-red-700 hover:bg-red-600 text-white"
              type="submit"
              onClick={onInputHanldersSubmit}
            >
              Search
            </Button>
          </>
        ) : null}
      </div>
    </>
  )
}

export default SearchInput