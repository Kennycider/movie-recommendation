import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GenresProp } from '@/lib/types/Genre'

const useGenreStore = create<GenresProp>()(
  persist(
    (set) => ({
      genres: [],
      setGenres: (data) => set({ genres: data })
    }),
    {
      name: 'genres-storage',
    }
  )
)

export default useGenreStore