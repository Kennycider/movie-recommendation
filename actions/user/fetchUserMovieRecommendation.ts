"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function fetchUserMovieRecommendation() {
  const session = await auth()

  if (!session?.user?.id) {
    console.error("No user session found")
    return null
  }

  try {
    // Fetch the top 5 searches (excluding 'movie-click')
    const topSearches = await prisma.userSearch.findMany({
      where: {
        userId: session.user.id,
        searchType: { not: 'movie-click' }
      },
      orderBy: [
        { searchCount: 'desc' },
        { updatedAt: 'desc' }
      ],
      take: 5
    })

    // Fetch the top 'movie-click' search
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

    // Combine the results
    const combinedResults = topMovieClick 
      ? [topMovieClick, ...topSearches]
      : topSearches

    return {
      recommendations: combinedResults,
      searchCount: topSearches.length
    }
  } catch(err) {
    console.error("Error fetching user movie recommendations:", err)
    return null
  } finally {
    await prisma.$disconnect()
  }
}