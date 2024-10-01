import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
    return NextResponse.json({ success: true, data: 'Recorded' });
  } catch (error) {
    console.error('Error recording search:', error)
    return NextResponse.json({ success: false, message: error });
  }
}

export async function POST(req: Request) {
  const { searchType, searchQuery } = await req.json()

  const session = await auth()
  if (!session?.user) return NextResponse.json({ success: false, message: 'no auth' });

  try {
    await addUserSearch(session.user.id, searchType, searchQuery)
    return NextResponse.json({ success: true, data: 'Recorded' });

  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, message: err}); 
  }
}