"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signOut } from 'next-auth/react';
import useResultStore from "@/stores/resultStore"
import useSearchMovieStore from "@/stores/searchMovieStore"

const AUTH_NAVLINKS = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Recommendations",
    href: "/recommendations"
  },
]

const PUBLIC_NAVLINKS = [
  {
    name: "Login",
    href: "/login"
  }
]

const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const resetResultStore = useResultStore(state => state.resetResults)
  const resetHasSearched = useResultStore(state => state.setHasSearched)
  const resetSearchBy = useSearchMovieStore(state => state.resetSearchBy)

  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const scrollTopTarget = 40
  const path = usePathname()

  const handleScroll = () => {
    if (document.documentElement.scrollTop >= scrollTopTarget) {
      setIsHeaderScrolled(true)
    }
    else {
      setIsHeaderScrolled(false)
    }
  }

  useEffect(() => {
    if (status === 'loading') return

    // When logout/session expired, clear search result
    if (!session) {
      resetResultStore()
      resetHasSearched(false)
      resetSearchBy()
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [status, session])

  const handleLogoutClick = async () => {
    signOut()
    .then(() => {
      router.push("/login")
      router.refresh()
    })
  }

  const renderNavLinks = () => {
    if (status === "loading") {
      return <li></li>
    }

    const navLinks = session ? AUTH_NAVLINKS : PUBLIC_NAVLINKS

    return (
      <>
        {navLinks.map((link, index) => (
          <li key={index} onClick={() => setIsHamburgerOpen(false)}>
            <Link 
              href={link.href}
              className={`text-white text-md ${path === link.href ? 'font-semibold': 'font-normal'}`}>
              {link.name}
            </Link>
          </li>
        ))}
        {session && 
          <li>
            <p className="text-white text-md font-normal hover:cursor-pointer" onClick={handleLogoutClick}>
              Logout
            </p>
          </li>
        }
      </>
    )
  }

  return (
    <>
      <header className={`sticky top-0 z-30 w-full flex justify-between items-center h-20 px-12 lg:px-64 
                        ${isHeaderScrolled ? 'bg-lightBlack' : 'bg-lightBlack'} transition-colors duration-300`}
      >
        {/* Large screen: Web icon */}
        <div className="">
          <Link
            href="/"
          >
            <Image 
              src="/icons/Film.png"
              alt="Film"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>
        
        {/* Large screen: Navlinks */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10">
            {renderNavLinks()}
          </ul>
        </nav>

        {/* Mobile screen: Hamburger icon */}
        <nav className="lg:hidden">
          <Image 
            src="https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF"
            alt="Hamburger"
            width={35}
            height={35}
            className="object-contain hover:cursor-pointer"
            onClick={() => setIsHamburgerOpen(true)}
            priority
          />
        </nav>
      </header>

      {/* Mobile screen: Hamburger opened */}
      <nav className={`fixed top-0 z-30 bg-lightBlack w-full
                    ${isHamburgerOpen ? 'h-full' : 'h-0 overflow-hidden'} transition-[height] duration-200 ease-in`}
      >
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex flex-col justify-center items-start w-1/2 ml-10 mt-24">
            <ul className="space-y-5">
              {renderNavLinks()}
            </ul>
          </div>
          
          {/* Right side */}
          <div className="w-1/2 flex justify-end items-end z-30">
            <div 
              className={`absolute top-10 right-10`}
              onClick={() => setIsHamburgerOpen(false)}>
              <label className="text-white text-2xl font-bold border-2 rounded-lg px-3 py-1 hover:cursor-pointer">X</label>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header