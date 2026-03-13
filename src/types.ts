export interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  tech: string[];
  description: string[];
}

export interface Achievement {
  text: string;
}
