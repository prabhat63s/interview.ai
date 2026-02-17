import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        const { language, difficulty } = await req.json();

        const prompt = `Generate 10 multiple choice questions for a ${difficulty} level ${language} programming interview.
    Each question should have 4 options with one correct answer.
    Format the response as a JSON object with a 'questions' array where each question object has:
    {
        "questions": [
            {
                "question": "question text",
                "options": ["option1", "option2", "option3", "option4"],
                "correct_answer": "correct option text"
            }
        ]
    }
    Questions should test both theoretical knowledge and practical programming concepts.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-5-mini-2025-08-07",
            messages: [
                { role: "system", content: "You are an expert programming interviewer. Respond strictly in the requested JSON format." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        const data = JSON.parse(content);

        if (!data.questions || !Array.isArray(data.questions)) {
            throw new Error("Invalid response format");
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Question Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
    }
}
