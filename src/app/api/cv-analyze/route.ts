import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { TECH_ROLES } from '@/lib/constants';
import pdf from 'pdf-parse';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await pdf(buffer);
        const text = data.text;

        const prompt = `Analyze this CV and extract the following information with high attention to detail:
    1. The candidate's full name from the CV
    2. The most appropriate technical role from these options: ${Object.keys(TECH_ROLES).join(', ')}
    3. Analyze work experience holistically:
       - Consider all professional experience in the CV
       - Include relevant projects and contributions
       - Consider depth and breadth of experience
       - Provide total years of experience as a single number or range (e.g. "5 years" or "4-5 years")
    4. Extract education details, including degree and institution
    5. List key technical and soft skills with confidence levels
    6. For the selected role, identify the most relevant programming languages or tools

    CV Content:
    ${text.slice(0, 10000)}

    Respond in JSON format with:
    {
        "candidate_name": "full name from CV",
        "suggested_role": "one of the roles listed above",
        "confidence": "score between 0 and 1",
        "reasoning": "brief explanation for the suggestion",
        "education": "detailed education background",
        "key_skills": ["list of key technical and soft skills"],
        "recommended_languages": ["list of relevant programming languages"],
        "years_of_experience": "total years of experience"
    }
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-5-mini-2025-08-07",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");

        const analysis = JSON.parse(content);

        // Filter languages based on the suggested role
        if (analysis.suggested_role && TECH_ROLES[analysis.suggested_role]) {
            const roleLanguages = TECH_ROLES[analysis.suggested_role].languages;
            analysis.recommended_languages = analysis.recommended_languages.filter((lang: string) =>
                roleLanguages.some(rl => rl.toLowerCase() === lang.toLowerCase())
            );
        }

        return NextResponse.json(analysis);

    } catch (error) {
        console.error('CV Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze CV' }, { status: 500 });
    }
}
