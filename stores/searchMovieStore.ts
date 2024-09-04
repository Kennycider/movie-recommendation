import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SearchMovie {
  searchBy: string
  setSearchBy: (data: string) => void
}

const useSearchMovieStore = create<SearchMovie>()(
  persist(
    (set) => ({
      searchBy: "",
      setSearchBy: (data) => set({searchBy: data})
    }),
    {
      name: 'search-movie-storage',
    }
  )
)

export default useSearchMovieStore