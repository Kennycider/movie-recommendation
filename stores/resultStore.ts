import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Movie from '@/lib/types/Movie'

export interface ResultStoreProp {
  searchQuery: string
  setSearchQuery: (data: string) => void
  isFetching: boolean
  setIsFetching: (data: boolean) => void
  results: Movie[]
  setResults: (data: Movie[]) => void
}

const useResultStore = create<ResultStoreProp>()(
  persist(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (data) => set({searchQuery: data}),
      isFetching: false,
      setIsFetching: (data) => set({ isFetching: data }),
      results: [],
      setResults: (data) => set({ results: data })
    }),
    {
      name: 'search-result-storage',
    }
  )
)

export default useResultStore