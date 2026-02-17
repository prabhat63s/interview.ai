import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        const { notes, role } = await req.json();

        // Check if notes are empty or just empty strings
        if (!notes || !Array.isArray(notes) || notes.every((n: string) => !n || !n.trim())) {
            return NextResponse.json({ analysis: null });
        }

        const prompt = `Analyze these interview notes for a ${role} position and provide insights:
    ${JSON.stringify(notes)}
    Provide analysis in JSON format with fields:
    - key_observations: list of main points relevant to the role
    - strengths: list of technical and soft skills demonstrated
    - areas_of_improvement: list of potential areas to improve
    - role_fit: a score from 0-100 indicating fit for the role
    - recommendations: specific suggestions for improvement`;

        const completion = await openai.chat.completions.create({
            model: "gpt-5-mini-2025-08-07",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        const analysis = JSON.parse(content);
        return NextResponse.json({ analysis });

    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ error: 'Failed to generate analytics' }, { status: 500 });
    }
}
