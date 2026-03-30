import { writable } from 'svelte/store';
import type { ExperienceData } from '../types/experienceType';

const initialExperiences: ExperienceData[] = [
  {
    id: 'riseapps-2023-2025',
    period: '2023-2025',
    title: 'Senior Python & AI developer',
    company: 'Riseapps',
    location: 'United States',
    description: [
      'Led the design, development, and deployment of advanced machine learning and AI solutions using Python, applying TensorFlow, PyTorch, and scikit-learn to address complex business challenges.',
      'Architected and implemented end-to-end data pipelines, covering data ingestion, preprocessing, model training, evaluation, and scalable deployment on cloud platforms such as AWS and Azure.',
      'Integrated machine learning models into production systems, ensuring high performance, reliability, and accuracy while supporting real-world workloads.',
      'Collaborated closely with cross-functional teams, including product, engineering, and data stakeholders, to deliver data-driven solutions aligned with business objectives.',
      'Automated data processing and operational workflows through Python scripting, significantly improving system efficiency and reducing manual overhead.',
      'Monitored and optimized deployed models through performance tuning, error analysis, and iterative improvements to maintain production readiness.',
      'Contributed to technical decision-making and best practices, supporting scalable AI system design and long-term maintainability.'
    ]
  },
  {
    id: 'cycura-2021-2023',
    period: '2021-2023',
    title: 'AI Mobile Developer',
    company: 'Cycura',
    location: 'Canada',
    description: [
      'Developed and maintained high-quality iOS applications using Swift and SwiftUI, delivering performant, user-friendly mobile solutions aligned with Apple\'s design and development guidelines.',
      'Designed and implemented scalable iOS application architectures using MVVM, ensuring clean separation of concerns and maintainable codebases.',
      'Integrated RESTful and GraphQL APIs into iOS applications to enable real-time data synchronization, authentication, and backend-driven features.',
      'Embedded AI-powered functionalities into iOS apps, including on-device inference and intelligent data processing supported by cloud-based services.',
      'Optimized iOS application performance through efficient memory management, asynchronous programming, and UI responsiveness improvements.',
      'Implemented secure data storage and authentication mechanisms using Keychain, Core Data, and Apple security best practices.',
      'Collaborated closely with backend and product teams to deliver end-to-end mobile solutions, from development and testing to App Store deployment.'
    ]
  },
  {
    id: 'freelance-2017-2021',
    period: '2017-2021',
    title: 'Freelance Software Engineer / AI Developer',
    company: 'Remote',
    location: 'Remote',
    description: [
      'Designed, developed, and maintained high-performance, scalable backend services using Node.js, Express, and MongoDB to support data-intensive applications.',
      'Architected RESTful APIs to enable seamless communication between users, databases, and third-party services, ensuring reliability and security.',
      'Integrated external platforms and services, including Stripe and Twilio, to extend application functionality and support payment and communication workflows.',
      'Built and managed cloud-based deployment pipelines on AWS, leveraging Docker and Elastic Beanstalk for consistent development and production environments.',
      'Implemented automated build, test, and deployment processes to improve delivery speed and system stability.',
      'Designed efficient solutions for processing and transferring large volumes of data across distributed systems.'
    ]
  },
  {
    id: 'insurnest-2016-2017',
    period: '2016-2017',
    title: 'Backend Developer',
    company: 'Insurnest',
    location: 'Sweden',
    description: [
      'Designed, developed, and maintained high-performance backend services using Node.js, Express, and MongoDB to support data-intensive applications.',
      'Contributed to the design and implementation of RESTful APIs enabling reliable communication between users, databases, and third-party services.',
      'Integrated external platforms and services, including Stripe and Twilio, to support payment processing and communication workflows.',
      'Built and managed AWS-based deployment environments using Docker and Elastic Beanstalk for development and production workloads.',
      'Supported automated build and deployment processes to improve release consistency and system stability.'
    ]
  },
  {
    id: 'tallium-2014-2016',
    period: '2014-2016',
    title: 'Junior Full Stack Developer',
    company: 'Tallium',
    location: 'Philippines',
    description: [
      'Worked closely with senior developers to build, optimize, and maintain responsive web applications while learning best practices in full stack development.',
      'Assisted in developing frontend and backend features using early React.js, Node.js, Laravel, and Python under senior guidance.',
      'Contributed to database design and maintenance using SQL Server and PostgreSQL, improving data storage, retrieval, and processing efficiency.',
      'Supported RESTful API development and backend integrations to enable smooth communication between application components and external services.',
      'Collaborated with cross-functional teams to deliver reliable, user-focused solutions while gaining hands-on experience in modern software development workflows.'
    ]
  }
];

export const experiences = writable<ExperienceData[]>(initialExperiences);

