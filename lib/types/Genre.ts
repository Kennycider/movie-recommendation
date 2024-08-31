export interface GenreProp {
  id: number
  name: string
}

export interface GenresProp {
  genres: GenreProp[]
  setGenres: (data: GenreProp[]) => void
}