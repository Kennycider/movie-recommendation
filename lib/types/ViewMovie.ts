interface SpokenLanguages {
  english_name: string
  iso_639_1: string
  name: string
}

interface ProductionCountries {
  iso_3116_1: string
  name: string
}

interface ProductionCompanies {
  id: number
  logo_path: string
  name: string
  original_country: string
}

interface Genres{
  id: number
  name: string
}

interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export default interface ViewMovie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollection[]
  budget: number
  genres: Genres[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompanies[]
  production_countries: ProductionCountries[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}