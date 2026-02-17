import { TechRoles } from '@/types';

export const TECH_ROLES: TechRoles = {
    "Frontend Developer": {
        "languages": ["JavaScript", "TypeScript", "React", "Angular", "Vue.js"],
        "difficulty": "Medium",
        "keywords": ["react", "angular", "vue", "html", "css", "frontend", "ui", "ux"]
    },
    "Backend Developer": {
        "languages": ["Python", "Java", "Go", "Node.js", "Ruby"],
        "difficulty": "Hard",
        "keywords": ["backend", "api", "database", "server", "django", "spring", "golang"]
    },
    "Full Stack Developer": {
        "languages": ["JavaScript", "Python", "Java", "TypeScript", "PHP"],
        "difficulty": "Hard",
        "keywords": ["fullstack", "full-stack", "frontend", "backend", "web"]
    },
    "DevOps Engineer": {
        "languages": ["Terraform", "Kubernetes", "Docker", "Jenkins", "Ansible"],
        "difficulty": "Medium",
        "keywords": ["devops", "ci/cd", "aws", "docker", "kubernetes", "infrastructure"]
    },
    "Mobile Developer": {
        "languages": ["Swift", "Kotlin", "React Native", "Flutter", "Android Studio"],
        "difficulty": "Medium",
        "keywords": ["mobile", "android", "ios", "react native", "flutter"]
    },
    "Product Manager": {
        "languages": ["JIRA", "Confluence", "Product Vision", "Roadmap", "User Stories"],
        "difficulty": "Medium",
        "keywords": ["product", "agile", "scrum", "jira", "miro", "roadmap", "user stories", "backlog"]
    },
    "Salesforce Developer": {
        "languages": ["Apex", "Lightning Web Components", "Visualforce", "SOQL", "Flow Builder"],
        "difficulty": "Medium",
        "keywords": ["salesforce", "apex", "lwc", "visualforce", "soql", "crm"]
    },
    "AWS Cloud Engineer": {
        "languages": ["AWS CLI", "CloudFormation", "Lambda", "EC2", "S3"],
        "difficulty": "Hard",
        "keywords": ["aws", "cloud", "ec2", "s3", "lambda", "cloudformation"]
    },
    "Azure Developer": {
        "languages": ["Azure CLI", "ARM Templates", "Azure Functions", "Azure DevOps", "Power Platform"],
        "difficulty": "Hard",
        "keywords": ["azure", "cloud", "functions", "devops", "power apps"]
    },
    "Google Cloud Expert": {
        "languages": ["Google Cloud SDK", "Cloud Functions", "BigQuery", "Kubernetes Engine", "App Engine"],
        "difficulty": "Hard",
        "keywords": ["gcp", "google cloud", "bigquery", "kubernetes", "app engine"]
    },
    "Data Scientist": {
        "languages": ["Python", "R", "TensorFlow", "PyTorch", "Scikit-learn"],
        "difficulty": "Hard",
        "keywords": ["data science", "machine learning", "ai", "statistics", "deep learning"]
    },
    "Business Analyst": {
        "languages": ["SQL", "Excel", "Tableau", "Power BI", "BPMN"],
        "difficulty": "Medium",
        "keywords": ["business analysis", "requirements", "process modeling", "data analysis"]
    },
    "QA Engineer": {
        "languages": ["Selenium", "Cypress", "JUnit", "TestNG", "Postman"],
        "difficulty": "Medium",
        "keywords": ["testing", "automation", "quality assurance", "test cases"]
    }
};

export const CTC_RANGES = [
    "10-15 LPA", "15-20 LPA", "20-25 LPA", "25-30 LPA",
    "30-40 LPA", "40-50 LPA", "50-75 LPA", "75-100 LPA", "Above 1 Cr"
];
