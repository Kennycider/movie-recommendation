import Hero from "@/components/home/Hero";
import PopularMoviesContainer from "@/components/home/popularmovies/PopularMoviesContainer";
import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <PopularMoviesContainer />
      </Container>
    </>
  );
}