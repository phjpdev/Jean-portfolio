export interface Developer {
  // name: string;
  // role: string;
  // company: string;
  about: string;
  code: string[];
  interests: string[];
  operatingSystems: string[];
  toolsUsed: string[];
  ides: string[];
}

export const johncarlo: Developer = {
  about: "Hey, I'm Jean Patrick, a Filipino AI/ML Engineer and Full-Stack Developer with over 8 years of experience \nworking on production-grade AI systems, enterprise web apps, and mobile applications. \nI specialize in machine learning, React/Next.js, Node.js, Python Frameworks, and cloud technologies.",
  code: ["Python", "TypeScript", "JavaScript", "C#", "Node.js"],
  interests: [
    "AI & Machine Learning",
    "Full-Stack Development",
    "Mobile Development",
    "Cloud & DevOps",
    "Web Design",
  ],
  operatingSystems: ["macOS", "Ubuntu", "Windows"],
  toolsUsed: ["Docker", "Git", "Kubernetes", "Nginx", "Postman", "CI/CD"],
  ides: ["VSCode", "Cursor", "Android Studio", "Xcode"],
};