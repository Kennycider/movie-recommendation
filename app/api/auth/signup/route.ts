import { signUpUser } from "@/auth"
import { NextResponse } from "next/server";

interface UserProp {
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body: UserProp = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const response = await signUpUser(username, password);

    return NextResponse.json({ success: true, user: response });
  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
