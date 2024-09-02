import Hero from "@/components/home/Hero";
import SearchResultContainer from "@/components/home/searchresults/SearchResultContainer";
import PopularMoviesContainer from "@/components/home/popularmovies/PopularMoviesContainer";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <SearchResultContainer />
        <PopularMoviesContainer />
      </Container>
    </>
  );
}