"use client"
import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const NAVLINKS = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "About",
    href: "/about"
  },
]

const Header = () => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false)
  const path = usePathname()

  const handleScroll = () => {
    if (document.documentElement.scrollTop >= 40) {
      setIsHeaderScrolled(true)
    }
    else {
      setIsHeaderScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    
  }, [isHamburgerOpen])

  return (
    <>
      <header className={`sticky top-0 w-full flex justify-between items-center h-20 border-b px-12 lg:px-64 
                        ${isHeaderScrolled ? 'bg-red-500' : 'bg-transparent'} transition-colors duration-300`}
      >
        <div className="">
          <Image 
            src="/icons/Film.png"
            alt="Film"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        
        {/* Large screen devices */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10">
            {NAVLINKS.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.href}
                  className={`${path === link.href ? 'font-bold': 'font-normal'}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile screen devices */}
        <nav className="lg:hidden">
          <div className="">
            <Image 
              src="/icons/Hamburger.png"
              alt="Hamburger"
              width={35}
              height={35}
              className="object-contain hover:cursor-pointer"
              onClick={() => setIsHamburgerOpen(true)}
            />
          </div>
        </nav>
      </header>

      {/* Hamburger Opened */}
      <nav className={`fixed top-0 bg-lightBlack w-full
                    ${isHamburgerOpen ? 'h-full' : 'h-0 overflow-hidden'} transition-[height] duration-200 ease-in`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center items-start w-1/2 ml-10 mt-24">
            <ul className="space-y-5">
              {NAVLINKS.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className={`text-white text-xl ${path === link.href ? 'font-semibold' : 'font-normal'}`}
                    onClick={() => setIsHamburgerOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 flex justify-end items-end">
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