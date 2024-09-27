import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SearchMovie {
  searchBy: string
  setSearchBy: (data: string) => void
  resetSearchBy: () => void
}

const useSearchMovieStore = create<SearchMovie>()(
  persist(
    (set) => ({
      searchBy: "",
      setSearchBy: (data) => set({searchBy: data}),
      resetSearchBy: () => set({searchBy: ""})
    }),
    {
      name: 'search-movie-storage',
    }
  )
)

export default useSearchMovieStore