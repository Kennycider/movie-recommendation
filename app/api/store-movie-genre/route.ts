import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function POST() {
  const session = await auth()

  if (!session?.user?.id) {
    console.error("No user session found")
    return null
  }

  try {
    // First, fetch the top 'movie-click' search
    const topMovieClick = await prisma.userSearch.findFirst({
      where: {
        userId: session.user.id,
        searchType: 'movie-click'
      },
      orderBy: [
        { searchCount: 'desc' },
        { updatedAt: 'desc' }
      ]
    })

    // Then, fetch the top searches for other types
    const otherTopSearches = await prisma.userSearch.findMany({
      where: {
        userId: session.user.id,
        searchType: { not: 'movie-click' }
      },
      orderBy: [
        { searchCount: 'desc' },
        { updatedAt: 'desc' }
      ],
      take: 4 // We'll take 4 here, as we already have 1 movie-click
    })

    // Combine the results
    const combinedResults = topMovieClick 
      ? [topMovieClick, ...otherTopSearches]
      : otherTopSearches

    return combinedResults
  } catch(err) {
    console.error("Error fetching user movie recommendations:", err)
    return null
  } finally {
    await prisma.$disconnect()
  }
}