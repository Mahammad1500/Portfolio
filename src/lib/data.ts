export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  challenges: string;
  impact: string;
  lessons: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  items: { name: string; level: number }[];
}

export interface AchievementItem {
  title: string;
  issuer: string;
  description: string;
  date: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  coursework?: string[];
}

export const PERSONAL_INFO = {
  name: "Mahammad Hussain",
  roles: [
    "Software Development Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Open Source Contributor",
    "Competitive Programmer"
  ],
  bio: "Software Development Engineer and Machine Learning Engineer with a passion for designing scalable systems, training high-performance ML models, and building elegant web applications. Combining mathematical rigor with modern frontend craftsmanship to create software that leaves a lasting impact.",
  email: "mahammadhussain.dev@gmail.com",
  phone: "+91 XXXXX XXXXX",
  github: "https://github.com",
  linkedin: "https://linkedin.com/in",
  location: "Lucknow, India"
};

export const STATS = [
  { label: "Problems Solved", value: 400, suffix: "+" },
  { label: "Projects Built", value: 2, suffix: "+" },
  { label: "Internships", value: 1, suffix: "" },
  { label: "CGPA", value: 8.5, suffix: "" },
  { label: "Experience", value: 6, suffix: "+ Months" }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Flipkart",
    role: "Software Development Engineer Intern",
    duration: "Summer 2025",
    location: "Bengaluru, India",
    achievements: [
      "Engineered predictive machine learning models using XGBoost, Logistic Regression, and Causal Modeling on large-scale datasets.",
      "Optimized feature engineering pipelines for user behavior analysis, improving data processing throughput and model training efficiency.",
      "Assisted in deploying real-time prediction microservices designed for high availability and low latency during peak customer activity.",
      "Quantified causal business impact and performance metrics via A/B testing, driving data-backed improvements to recommendation systems."
    ],
    skills: ["XGBoost", "Logistic Regression", "Causal Modeling", "LLMs", "Feature Engineering", "Python", "PySpark", "Machine Learning"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "intervuex",
    title: "Intervuex",
    shortDesc: "An AI-powered collaborative mock technical interview and feedback platform.",
    longDesc: "A premium full-stack platform designed to run automated, real-time mock technical interviews. Includes collaborative coding rooms, auto-scheduling algorithms, and interactive candidate analytics.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Full Stack",
    features: [
      "Collaborative whiteboard and code editor with real-time sync.",
      "AI evaluation and detailed rating generation after interview completion.",
      "Automated slot matcher for candidates and interviewers."
    ],
    challenges: "Handling real-time synchronization of code editors and communication streams across highly latent network connections.",
    impact: "Reduced HR scheduling friction by 40% and improved applicant preparation flow through actionable automated feedback.",
    lessons: "Learned deep state syncing concepts in React and optimized Socket.io listeners to prevent message bottlenecks."
  },
  {
    id: "feedback-portal",
    title: "Student Feedback Portal",
    shortDesc: "A secure analytical feedback visualization dashboard for academic institutions.",
    longDesc: "A secure dashboard designed to aggregate, analyze, and visualize feedback from university students. Integrates advanced natural language processing to cluster textual responses and detect sentiment, providing administrators with clean charts and actionable insights.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Python", "FastAPI", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    category: "AI & Analytics",
    features: [
      "SSO login integration and student response anonymization module.",
      "Sentiment classification engine (FastAPI + HuggingFace Transformer).",
      "Dynamic dashboard with multi-filter charts (PDF/CSV report generation)."
    ],
    challenges: "Ensuring student privacy through anonymization tokens while strictly enforcing the one-response-per-student constraint.",
    impact: "Streamlined department-level feedback analysis, reducing manual spreadsheet reporting time by 75%.",
    lessons: "Mastered PostgreSQL indexing strategies for analytical queries and implemented robust JWT-based security layers."
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "C++", level: 90 },
      { name: "Python", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 }
    ]
  },
  {
    title: "Frameworks & Backend",
    items: [
      { name: "Next.js", level: 85 },
      { name: "React.js", level: 90 },
      { name: "FastAPI", level: 80 },
      { name: "Node.js", level: 82 },
      { name: "Express", level: 85 }
    ]
  },
  {
    title: "Databases & ORMs",
    items: [
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 85 },
      { name: "Prisma", level: 84 },
      { name: "Redis", level: 75 }
    ]
  },
  {
    title: "Machine Learning & AI",
    items: [
      { name: "XGBoost", level: 88 },
      { name: "Logistic Regression", level: 92 },
      { name: "Causal Modeling", level: 80 },
      { name: "LLMs / Prompt Eng.", level: 82 },
      { name: "Scikit-Learn", level: 85 }
    ]
  },
  {
    title: "Developer Tools & Cloud",
    items: [
      { name: "Docker", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Vercel", level: 85 }
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Amazon ML Summer School Scholar",
    issuer: "Amazon India",
    description: "Selected to participate in the intensive training camp covering Machine Learning, Deep Learning, NLP, and Large Scale Prediction Systems led by Amazon Scientists.",
    date: "2025"
  },
  {
    title: "Microsoft Campus Connect Facilitator",
    issuer: "Microsoft India",
    description: "Selected as a student facilitator to drive technical workshops, cloud computing meetups, and developer community engagements.",
    date: "2024"
  },
  {
    title: "Competitive Programming Excellence",
    issuer: "LeetCode & CodeChef",
    description: "Solved 400+ problems across competitive programming platforms. Ranked in top percentiles, displaying strong algorithmic proficiency.",
    date: "Ongoing"
  },
  {
    title: "Hacktoberfest Contributor",
    issuer: "DigitalOcean / Open Source",
    description: "Contributed to multiple web development and ML open-source repositories, completing verified pull requests.",
    date: "2024, 2025"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Indian Institute of Information Technology (IIIT), Lucknow",
    degree: "Bachelor of Technology (B.Tech)",
    duration: "2022 - 2026",
    grade: "8.5 CGPA",
    coursework: ["Data Structures & Algorithms", "Database Management Systems", "Machine Learning", "Operating Systems", "Web Development", "Object Oriented Programming"]
  },
  {
    institution: "Resonance Junior College",
    degree: "Intermediate Education (Class XII)",
    duration: "2020 - 2022",
    grade: "95%+"
  },
  {
    institution: "Sri Chaitanya Techno School",
    degree: "Secondary School Certificate (Class X)",
    duration: "2020",
    grade: "10.0 CGPA"
  }
];
