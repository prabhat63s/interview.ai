import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
    return NextResponse.json({ message: "Session management is handled client-side with Zustand." });
}
