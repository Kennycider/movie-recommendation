import NextTopLoader from 'nextjs-toploader';

const Page = () => {
  return (
    <NextTopLoader 
      color='#d12424'
      height={5}
      crawl={true}
      showSpinner={false}
    />
  )
}

export default Page