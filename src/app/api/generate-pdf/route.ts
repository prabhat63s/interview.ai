import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
    return NextResponse.json({ message: "PDF generation is handled client-side for now." });
}
