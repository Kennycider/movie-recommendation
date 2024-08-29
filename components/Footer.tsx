import Image from "next/image"

const Footer = () => {
  return (
    <footer className="mt-auto z-30 flex justify-center items-center h-20 min-w-full bg-lightBlack">
      <div className="w-full flex justify-center lg:container gap-x-5 m-10">
        <Image 
          src="/icons/tmdb.svg"
          alt="tmdb_icon"
          width={35}
          height={35}
          className="object-contain"
        />
        <p className="text-white">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}

export default Footer