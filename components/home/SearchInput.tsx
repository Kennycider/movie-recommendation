"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
  const [searchByValue, setSearchByValue] = useState<string>("") // default
  const [genreValue, setGenreValue] = useState<string>("")
  const [ratingsValue, setRatingsValue] = useState<string>("")

  const { genres } = useGenreStore.getState()

  // Title and keyword handler
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      keyword: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (searchByValue === SEARCH_BY[0].value) { // title
      const query = form.getValues().title

      if (query) {
        const data = await fetchMovieByTitle({query: query})

        console.log(data)
      }
    }

    if (searchByValue === SEARCH_BY[1].value) { // title
      const query = form.getValues().keyword

      if (query) {
        // make array of keywords from e.g "superhero, action, adventure"
        const keywords = query.split(",").map(keyword => keyword.trim())
        const data = await fetchMovieByKeyword({query: keywords})

        console.log(data)
      }
    }
  }

  // Clear form input when switched
  useEffect(() => {
    form.reset()
    setGenreValue("")
    setRatingsValue("")
  }, [searchByValue, form])

  // Input handlers
  const handleSearchByValue = (value: string) => {
    setSearchByValue(value)
  }
  
  const handleGenreValue = (value: string) => {
    setGenreValue(value)
  }

  const handleRatingsValue = (value: string) => {
    setRatingsValue(value)
  }

  const onInputHanldersSubmit = async () => {
    if (searchByValue === SEARCH_BY[2].value) { // genre
      if (genreValue) {
        const data = await fetchMovieByGenre({genreId: genreValue})

        console.log(data)
      }
    }

    if (searchByValue === SEARCH_BY[3].value) { // ratings
      if (ratingsValue) {
        const data = await fetchMovieByRatings({rating: ratingsValue})

        console.log(data)
      }
    }
  }

  return (
    <>
      <div className="flex justify-center w-full mt-0 lg:mt-[-20px]"> 
        <Select onValueChange={handleSearchByValue}>
          <SelectTrigger 
            className={`${searchByValue === '' ? 'w-[300px]': 'w-[120px]'} font-semibold bg-white text-black
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
        {searchByValue === SEARCH_BY[0].value ? (
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
        ) : /* [1] -> keyword */ searchByValue === SEARCH_BY[1].value ? (
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
        ) : /* [2] -> genre */ searchByValue === SEARCH_BY[2].value ? (
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
        ) : /* [3] -> ratings */ searchByValue === SEARCH_BY[3].value ? (
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