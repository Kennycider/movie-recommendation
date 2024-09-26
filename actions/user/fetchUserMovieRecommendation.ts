"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function fetchUserMovieRecommendation() {
  const session = await auth()

  try {
    const topSearches = await prisma.userSearch.findMany({
      orderBy: [
        {
          searchCount: 'desc',  // First, order by highest searchCount
        },
        {
          updatedAt: 'desc',    // Then, order by the latest updatedAt (if searchCount is the same)
        }
      ],
      where:{
        userId: session?.user?.id
      },
      take: 5,  // Limit the result to 3 rows
    });
    
    return topSearches
  } catch(err) {
    console.error(err)

    return null
  } finally {
    process.on('beforeExit', async () => {
      await prisma.$disconnect()
    })
  }
}