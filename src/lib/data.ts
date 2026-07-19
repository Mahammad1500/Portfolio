export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
  skills: string[];
  certificateLink?: string;
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
  link?: string;
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
    "Backend Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer"
  ],
  bio: "Computer Science graduate from IIIT Lucknow building reliable backend systems, intelligent products, and polished full-stack experiences with a strong focus on impact and engineering quality.",
  email: "mahammadhussain1500@gmail.com",
  phone: "+91 9866067069",
  github: "https://github.com/Mahammad1500",
  linkedin: "https://www.linkedin.com/in/dudekulamahammadhussain",
  location: "Bengaluru, India",
  resumeLink: "https://drive.google.com/file/d/1hXS6WcPS9CsegXGCfpxpzQnRCpDP-dR9/view?usp=sharing"
};

export const STATS = [
  { label: "Problems Solved", value: 500, suffix: "+" },
  { label: "Projects Built", value: 7, suffix: "+" },
  { label: "Internships", value: 2, suffix: "" },
  { label: "CGPA", value: 8.35, suffix: "" },
  { label: "Experience", value: 6, suffix: "+ Months" }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "CoinDCX",
    role: "Software Development Engineer Intern — Backend",
    duration: "07/2026 — Present",
    location: "Bengaluru, India",
    achievements: [
      "Working with the Finance, Risk & Portfolio (FRP) engineering team to build backend services in Go and TypeScript for core financial and crypto trading workflows.",
      "Implementing REST APIs and business logic for internal platform services with a strong focus on scalability, reliability, and production readiness.",
      "Collaborating with cross-functional engineers to debug issues and ship meaningful features for the FRP platform."
    ],
    skills: ["Go", "TypeScript", "REST APIs", "Backend Engineering", "Finance Systems", "Crypto Platforms"]
  },
  {
    company: "Flipkart",
    role: "Software Development Engineer Intern '26",
    duration: "01/2026 — 06/2026",
    location: "Bengaluru, India",
    achievements: [
      "Developed two end-to-end XGBoost-based ML models to predict customer social media escalations before and after agent intervention, enabling proactive support action.",
      "Trained models on highly imbalanced large-scale datasets with 2.8Cr+ conversation-level records and 70K+ escalation cases, plus 60L+ agent-handled records with 65K+ escalation cases.",
      "Built the complete ML pipeline with feature engineering, imbalance handling, threshold tuning, and evaluation optimization, and deployed it into the customer-care agent interface to flag high-risk cases in real time.",
      "Performed logistic regression for week-over-week analysis and implemented causal modeling to uncover a 350+ bps controllable improvement opportunity."
    ],
    skills: ["Python", "SQL", "XGBoost", "Logistic Regression", "Causal Modeling", "Machine Learning", "GenAI", "LLMs"],
    certificateLink: "https://drive.google.com/file/d/1GtrtBYnXmZx7WB-v2Mwkgh2WCjJRG9lb/view"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "intervuex",
    title: "Intervuex",
    shortDesc: "A full-stack interview scheduling platform with admin and HR workspaces, conflict-aware scheduling, and candidate analytics.",
    longDesc: "Built a full-stack interview scheduling platform with separate Admin and HR workspaces, automatic conflict-aware panel scheduling, candidate pipeline tracking, and analytics dashboards. The system improves coordination and reduces manual interview overhead.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Mahammad1500/Intervuex",
    liveUrl: "https://intervuex-nine.vercel.app",
    category: "Full Stack",
    features: [
      "Separate Admin and HR workspaces with role-based access.",
      "Automatic conflict-aware interviewer scheduling for panel interviews.",
      "Candidate pipeline tracking and analytics dashboards.",
      "JWT-based authentication and workspace onboarding using unique Space Codes."
    ],
    challenges: "Designing a scheduling system that balances interviewer availability, candidate slots, and real-world coordination constraints without creating conflicts.",
    impact: "Cut manual interview coordination effort by approximately 60% and improved scheduling reliability for hiring teams.",
    lessons: "Learned how to build dependable multi-role workflows and ship a production-ready platform with clear data modeling and authentication patterns."
  },
  {
    id: "student-feedback",
    title: "Student Feedback Portal",
    shortDesc: "A secure portal for collecting and analyzing student feedback with role-based access and privacy-focused workflows.",
    longDesc: "Developed a web platform that replaces manual feedback collection with a secure digital workflow. The system supports Student, Teacher, and Admin roles and provides clear, privacy-safe handling of feedback data.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    githubUrl: "https://github.com/Mahammad1500/Student-Feedback-Portal",
    liveUrl: "https://github.com/Mahammad1500/Student-Feedback-Portal",
    category: "Full Stack",
    features: [
      "Secure authentication for Student, Teacher, and Admin roles.",
      "Digital feedback collection that reduces paperwork and manual processing.",
      "Structured data handling designed for privacy and compliance."
    ],
    challenges: "Building a trusted feedback system that preserves privacy while offering a smooth experience for different academic roles.",
    impact: "Reduced manual feedback processing workload by about 80% and improved the reliability of institutional reporting.",
    lessons: "Gained strong experience in designing secure role-based systems and simplifying complex workflows into practical product features."
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "C++", level: 90 },
      { name: "Go", level: 84 },
      { name: "Java", level: 78 },
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 86 },
      { name: "TypeScript", level: 88 },
      { name: "SQL", level: 84 }
    ]
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 86 },
      { name: "Redux", level: 78 },
      { name: "Node.js", level: 84 },
      { name: "Express.js", level: 84 },
      { name: "Tailwind CSS", level: 88 }
    ]
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 76 }
    ]
  },
  {
    title: "Machine Learning & GenAI",
    items: [
      { name: "XGBoost", level: 88 },
      { name: "Logistic Regression", level: 92 },
      { name: "Feature Engineering", level: 90 },
      { name: "Causal Modeling", level: 82 },
      { name: "GenAI", level: 84 },
      { name: "LLM-based Summarization", level: 82 }
    ]
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "Linux", level: 84 },
      { name: "VS Code", level: 95 },
      { name: "GitHub Copilot", level: 90 },
      { name: "Cursor", level: 88 },
      { name: "Windsurf", level: 84 },
      { name: "Claude Code", level: 82 }
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "The Polaris Fellowship 2026",
    issuer: "Polaris School of Technology",
    description: "Reached the top 1% of 10,000+ applicants across India after clearing four rigorous evaluation rounds for the Software Development Fellowship.",
    date: "2026",
    link: "https://drive.google.com/file/d/1RhXAlsYvvHVM0Lj8QMSUk8scJQ-yKzhG/view?usp=sharing"
  },
  {
    title: "Amazon ML Summer School 2024",
    issuer: "Amazon India",
    description: "Selected as a mentee and explored supervised learning, deep neural networks, reinforcement learning, and generative AI with mentorship from Amazon scientists.",
    date: "2024",
    link: "https://drive.google.com/file/d/106ORHQg0p-AbN7-MdRnFrV7N2D4PdbOH/view?usp=sharing"
  },
  {
    title: "Microsoft Campus Connect Program 2024",
    issuer: "Microsoft India",
    description: "Selected among the top 100 quiz winners nationally and recognized for strong technical engagement.",
    date: "2024",
    link: "https://www.linkedin.com/posts/dudekulamahammadhussain_microsoftcampusconnect-top100quizwinners-activity-7207246724766007296-xoxN"
  },
  {
    title: "Hacktoberfest 2023",
    issuer: "DigitalOcean / Open Source",
    description: "Completed a month-long open-source contribution challenge and merged 4 pull requests.",
    date: "2023",
    link: "https://www.holopin.io/hacktoberfest2023/userbadge/clntbi2x330620fmsguw76ucj"
  },
  {
    title: "LeetCode 500+ Problems",
    issuer: "LeetCode",
    description: "Built consistent problem-solving strength across data structures, algorithms, and competitive programming challenges.",
    date: "Ongoing",
    link: "https://leetcode.com/u/Mahammad1500/"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Indian Institute of Information Technology, Lucknow (IIITL)",
    degree: "Bachelor of Technology in Computer Science",
    duration: "Nov 2022 — June 2026",
    grade: "CGPA: 8.35/10",
    coursework: ["Operating Systems", "Software Engineering", "Computer Networks", "Machine Learning", "Data Structures and Algorithms", "Database Management Systems", "Object-Oriented Programming Systems"]
  },
  {
    institution: "Resonance Junior College",
    degree: "Intermediate (12th Grade)",
    duration: "Nov 2020 — July 2022",
    grade: "Percentage: 97.5%"
  },
  {
    institution: "Sri Chaitanya Techno School",
    degree: "Secondary Education (10th Grade)",
    duration: "July 2019 — April 2020",
    grade: "Percentage: 99.20%"
  }
];
