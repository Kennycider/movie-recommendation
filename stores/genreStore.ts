import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GenreProp {
  id: number
  name: string
}

interface GenresProp {
  genres: GenreProp[]
  setGenres: (data: GenreProp[]) => void
}

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