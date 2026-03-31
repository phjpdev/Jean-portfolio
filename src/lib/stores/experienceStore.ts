import { writable } from 'svelte/store';
import type { ExperienceData } from '../types/experienceType';

const initialExperiences: ExperienceData[] = [
  {
    id: 'technova-2024-2025',
    period: '2024 - 2025',
    title: 'AI/ML Engineer',
    company: 'TechNova Analytics BV',
    location: 'Netherlands (Remote)',
    description: [
      'Built fraud-detection ML models improving true-positive accuracy by 28%.',
      'Developed NLP components using BERT, spaCy, and custom text classifiers.',
      'Implemented real-time inference pipelines with FastAPI + AWS Lambda + Redis.',
      'Reduced ML training time by 40% through optimized data pipelines and GPU batching.',
      'Collaborated with cross-border teams across NL, UK, DE, and PL.'
    ]
  },
  {
    id: 'neodigital-2021-2023',
    period: '2021 - 2023',
    title: 'Full-Stack Developer',
    company: 'NeoDigital GmbH',
    location: 'Germany (Remote)',
    description: [
      'Led development of an enterprise insurance platform using React & Next.js.',
      'Built scalable backend APIs using Node.js + PostgreSQL, ensuring GDPR compliance.',
      'Achieved 55% faster page performance through image optimization & code-splitting.',
      'Implemented multilingual UI/UX for German and English users.',
      'Contributed to microservices used by over 150K+ EU customers.'
    ]
  },
  {
    id: 'bluworks-2018-2020',
    period: '2018 - 2020',
    title: 'Mobile App Developer',
    company: 'BluWorks Software Labs',
    location: 'Philippines',
    description: [
      'Developed Flutter and React Native apps for logistics, booking, and delivery companies.',
      'Integrated Firebase, REST APIs, and secure authentication modules.',
      'Published 4 production apps on Google Play and App Store.',
      'Improved app performance and reduced crash rates through optimized state management.'
    ]
  }
];

export const experiences = writable<ExperienceData[]>(initialExperiences);

