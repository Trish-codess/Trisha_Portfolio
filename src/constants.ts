import { Education, SkillGroup, Experience, Project, Achievement } from './types';

export const PERSONAL_INFO = {
  name: "Trisha Das",
  phone: "+91 7973155547",
  location: "Gurugram, India",
  email: "trishad.1212@gmail.com",
  linkedin: "linkedin.com/trishad12",
  github: "github.com/Trish-codess",
};

export const EDUCATION: Education[] = [
  {
    institution: "Indian Institute of Technology Guwahati",
    location: "Guwahati, Remote",
    degree: "Bachelor of Science – Data Science and AI",
    period: "2025–2029",
  },
  {
    institution: "Masters’ Union",
    location: "Gurugram, Haryana",
    degree: "Data Science and AI",
    period: "2025–2029",
  },
  {
    institution: "SGGS Khalsa Collegiate Public School",
    location: "Chandigarh",
    degree: "Non Medical",
    period: "2023–2025",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["C", "Python", "HTML", "CSS", "Java"],
  },
  {
    category: "Data Analysis",
    skills: ["EDA", "Data Cleaning", "Feature Engineering", "Statistical Analysis"],
  },
  {
    category: "Visualization",
    skills: ["Tableau", "D3.js", "Flourish Studio", "Excel"],
  },
  {
    category: "AI/ML",
    skills: ["GenAI", "LLMs", "Prompt Engineering", "HuggingFace", "AI Agents", "Kaggle"],
  },
  {
    category: "Automation",
    skills: ["n8n", "LangFlow", "API Integration", "Microsoft Fabric"],
  },
  {
    category: "Tools/Platforms",
    skills: ["Git", "GitHub", "Jupyter", "VS Code", "JSON", "Arduino IDE"],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "AISmith (AXELNOVA Labs LLP)",
    role: "Full-Stack + AI Developer Intern",
    period: "Mar 2026 – Present",
    location: "Remote",
    description: [
      "Working on the development of a production-ready web applications and agents.",
      "Building and integrating AI-powered features using LLM APIs (Gemini/OpenAI) including chatbot workflows and intelligent data processing.",
      "Collaborating with the engineering team on feature development, debugging, and preparing components for deployment.",
    ],
  },
  {
    company: "AI and Data Projects",
    role: "Analyst | GenAI Developer",
    period: "Sep 2025 – Present",
    location: "Gurugram, India",
    description: [
      "Performed EDA, data cleaning, and insight extraction across real-world and Kaggle datasets; built interactive dashboards using Tableau, D3.js, Flourish Studio, and VibeCode for insight-driven visualization.",
      "Developed GenAI pipelines using LLMs to analyze datasets, generate structured JSON outputs, and automate workflows via LangFlow and n8n; created AI prototypes including Decorly.AI, Kairos, and Priya.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Decorly.AI – GenAI Interior Designer",
    subtitle: "Python, HuggingFace, LLM, VibeCode, API, JSON",
    tech: ["Python", "HuggingFace", "LLM", "VibeCode", "API", "JSON"],
    description: [
      "Developed a GenAI interior-design generator producing décor, layout, and color palette recommendations using LLM pipelines.",
      "Analyzed user preferences and generated structured JSON outputs for automated visualization and design rendering.",
      "Built workflow orchestration and visual rendering logic through VibeCode, focusing on personalization and rapid experimentation.",
    ],
  },
  {
    title: "Kairos – AI Client-Management Automation System",
    subtitle: "n8n, Python, API, LLM, JSON",
    tech: ["n8n", "Python", "API", "LLM", "JSON"],
    description: [
      "Built an AI-powered workflow automation system for freelancers to manage clients, reminders, tasks, and communication.",
      "Integrated LLM reasoning pipelines via LangFlow to generate structured outputs and trigger automated workflows in n8n.",
      "Automated scheduling, follow-ups, and task tracking while designing dashboards to reflect client status, next actions, and workflow efficiency.",
    ],
  },
  {
    title: "Priya – Custom GenAI Chatbot",
    subtitle: "LangFlow, Python, API, LLM, JSON, ElevenLabs",
    tech: ["LangFlow", "Python", "API", "LLM", "JSON", "ElevenLabs"],
    description: [
      "Created a personalized RAG BASED GenAI chatbot capable of contextual responses, reasoning chains, and memory-aware interactions.",
      "Designed structured prompting templates to improve intent recognition and maintain consistent output formats.",
      "Integrated external APIs through LangFlow workflows and tested across use cases including Q&A, recommendations, and dataset interrogation.",
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    text: "Awarded 2nd Place at the Masters’ Union AI Buildathon, out of 10 total teams for delivering a high-performing GenAI solution – DECORLY – within a competitive, time-bound environment.",
  },
  {
    text: "Consistently recognized for problem-solving ability, analytical rigor, and rapid prototyping across academic projects and internal evaluations.",
  },
];
