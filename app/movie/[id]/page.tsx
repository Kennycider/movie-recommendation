import ViewMovieContainer from "@/components/viewmovie/ViewMovieContainer"
import RelatedMoviesContainer from "@/components/viewmovie/RelatedMoviesContainer"
import Container from "@/components/Container"

interface ParamsProp {
  id: string | number
}

const page = ({params}: {params: ParamsProp}) => {
  return (
    <main className="min-h-screen h-fit">
      <ViewMovieContainer id={params.id}/>
      <Container>
        <RelatedMoviesContainer id={params.id} />
      </Container>
    </main>
  )
}

export default page