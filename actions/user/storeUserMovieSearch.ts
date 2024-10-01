"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface SearchProp {
  searchType: string
  searchQuery: string
}

async function addUserSearch(userId: any, searchType: string, searchQuery: string) {
  try {
    const newSearch = await prisma.userSearch.upsert({
      where: {
        userId_searchType_searchQuery: {
          userId,
          searchType,
          searchQuery,
        },
      },
      update: {
        searchCount: { increment: 1 },
        updatedAt: new Date(),
      },
      create: {
        userId,
        searchType,
        searchQuery,
        searchCount: 1,
      },
    })

    console.log('Search recorded:', newSearch)
    return newSearch
  } catch (error) {
    console.error('Error recording search:', error)
    throw error
  }
}

export default async function storeUserMovieSearch(prop: SearchProp) {
  const session = await auth()

  try {
    if (!session?.user) return null

    await addUserSearch(session.user.id, prop.searchType, prop.searchQuery)
    
  } catch (err) {
    console.error(err)
  }
}