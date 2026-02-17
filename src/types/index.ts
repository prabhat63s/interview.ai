export interface TechRole {
    languages: string[];
    difficulty: string;
    keywords: string[];
}

export interface TechRoles {
    [key: string]: TechRole;
}

export interface Question {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface CVAnalysis {
    candidate_name: string;
    suggested_role: string;
    confidence: number;
    reasoning: string;
    education: string;
    key_skills: string[];
    recommended_languages: string[];
    years_of_experience: string;
    experience_details?: {
        first_job_date?: string;
        excluded_internships?: string[];
    };
}

export interface CandidateInfo {
    id?: string;
    name: string;
    role: string;
    tool?: string;
    datetime?: string;
    experience: string;
    currentCTC: string;
    expectedCTC: string;
    relocation: string;
    cv_analysis?: CVAnalysis;
}

export interface AnalyticsData {
    score: number;
    avg_time: number;
    notes_analysis: {
        key_observations: string[];
        strengths: string[];
        areas_of_improvement: string[];
        role_fit: number;
        recommendations: string[];
    } | null;
    candidate_info: CandidateInfo;
}
