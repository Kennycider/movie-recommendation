import Signup from "@/components/auth/Signup"

const page = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] bg-[url('/images/HeroBanner.jpg')] bg-cover">
      <div className="bg-[#0000006a] min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center">
        <Signup />
      </div>
    </div>
  )
}

export default page