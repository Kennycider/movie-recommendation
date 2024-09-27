import Hero from "@/components/home/Hero";
import SearchResultContainer from "@/components/home/searchresults/SearchResultContainer";
import PopularMoviesContainer from "@/components/home/popularmovies/PopularMoviesContainer";
import Container from "@/components/Container";
import { AuthProvider } from "@/lib/providers"

export default function Home() {
  return (
    <>
      <AuthProvider>
        <Hero />
      </AuthProvider>
      <Container>
        <SearchResultContainer />
        <PopularMoviesContainer />
      </Container>
    </>
  );
}