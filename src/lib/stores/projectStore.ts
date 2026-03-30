import { writable } from 'svelte/store';
import type { ProjectData } from '../types/projectType';

const initialProjects: ProjectData[] = [
  {
    id: 'multi-track-polyphonic-music-generation',
    name: 'Multi-track Polyphonic Music Generation',
    icon: 'python',
    shortDescription: 'AI-powered music generation system that creates multi-track polyphonic compositions',
    githubUrl: 'https://www.carlostoxtli.com/hum2song',
    readmeUrl: 'data:text/plain,Multi-track Polyphonic Music Generation\n\nAn AI-powered music generation system that creates multi-track polyphonic compositions using advanced machine learning techniques.',
    technologies: ['Python', 'OpenAI', 'Varnish', 'Lodash'],
    type: 'application',
    image: 'human-song.png'
  },
  {
    id: 'leaf-diseases-detection-system',
    name: 'Leaf Diseases Detection System',
    icon: 'python',
    shortDescription: 'AI-powered system for detecting and classifying plant leaf diseases using computer vision',
    githubUrl: 'https://leaf-diseases-detect5.streamlit.app/',
    readmeUrl: 'data:text/plain,Leaf Diseases Detection System\n\nAn AI-powered system for detecting and classifying plant leaf diseases using computer vision and machine learning. Built with FastAPI, Streamlit, and OpenAI.',
    technologies: ['Python', 'FastAPI', 'Streamlit', 'Groq', 'OpenAI'],
    type: 'application',
    image: 'leaf-detection.png'
  },
  {
    id: 'order-system',
    name: 'Order System',
    icon: 'php',
    shortDescription: 'Comprehensive order management system with chatbot integration and Slack API',
    githubUrl: 'https://stickdatei-vektordatei.de/',
    readmeUrl: 'data:text/plain,Order System\n\nA comprehensive order management system built with PHP and Laravel, featuring chatbot integration and Slack API for seamless communication.',
    technologies: ['PHP', 'Laravel', 'JQuery', 'Slack API', 'Chatbot'],
    type: 'application',
    image: 'order-system.png'
  },
  {
    id: 'total-technic',
    name: 'Total Technic',
    icon: 'php',
    shortDescription: 'E-commerce platform with payment integration and AMP support',
    githubUrl: 'https://www.totaltechnik.com/',
    readmeUrl: 'data:text/plain,Total Technic\n\nAn e-commerce platform built with PHP and Yii framework, featuring PayPal integration, Bootstrap styling, and AMP support for mobile optimization.',
    technologies: ['PHP', 'Yii', 'JQuery', 'Bootstrap', 'AMP', 'PayPal'],
    type: 'application',
    image: 'total-technik.png'
  },
  {
    id: 'hire-talent-system',
    name: 'Hire Talent System',
    icon: 'vue',
    shortDescription: 'Progressive Web App for talent hiring and recruitment with AWS deployment',
    githubUrl: 'https://seemehired.com/',
    readmeUrl: 'data:text/plain,Hire Talent System\n\nA modern Progressive Web App (PWA) for talent hiring and recruitment, built with Vue.js and Nuxt.js, deployed on AWS with Nginx.',
    technologies: ['Vue.js', 'Nuxt.js', 'Node.js', 'Ubuntu', 'PWA', 'Nginx', 'AWS'],
    type: 'application',
    image: 'seemehHired.png'
  },
  {
    id: 'choosing-building-app',
    name: 'Choosing Building App',
    icon: 'react',
    shortDescription: 'Interactive building selection application with real-time features',
    githubUrl: 'https://www.off-pod.co.uk/',
    readmeUrl: 'data:text/plain,Choosing Building App\n\nAn interactive building selection application built with React, featuring GSAP animations, Firebase backend, and Onsen UI for mobile support.',
    technologies: ['React', 'Wix', 'GSAP', 'Node.js', 'Firebase', 'Onsen UI'],
    type: 'application',
    image: 'offpod.png'
  },
  {
    id: 'real-estate-marketplace-platform',
    name: 'Real Estate Marketplace Platform',
    icon: 'angular',
    shortDescription: 'AI-powered real estate marketplace with intelligent property recommendations',
    githubUrl: 'https://www.trulia.com/',
    readmeUrl: 'data:text/plain,Real Estate Marketplace Platform\n\nAn AI-powered real estate marketplace platform built with Angular.js, featuring OpenAI integration and Langchain for intelligent property recommendations.',
    technologies: ['Angular.js', 'OpenAI', 'Langchain', 'AWS'],
    type: 'application',
    image: 'trulia.png'
  },
  {
    id: 'ai-powered-event-intelligence',
    name: 'AI-Powered Event Intelligence',
    icon: 'nextjs',
    shortDescription: 'Intelligent event management platform with AI-powered insights and chatbot',
    githubUrl: 'https://www.thedatagraph.com/',
    readmeUrl: 'data:text/plain,AI-Powered Event Intelligence\n\nAn intelligent event management platform built with Next.js and Express.js, featuring OpenAI integration and chatbot capabilities for enhanced user experience.',
    technologies: ['Next.js', 'Express.js', 'OpenAI', 'Chatbot', 'Hostinger'],
    type: 'application',
    image: 'kivo.png'
  },
  {
    id: 'neviane-qr-code-reviews-generator',
    name: 'Neviane QR Code and Reviews Generator',
    icon: 'laravel',
    shortDescription: 'QR code generation and review management system with AI integration',
    githubUrl: 'https://review.neviane.com/',
    readmeUrl: 'data:text/plain,Neviane QR Code and Reviews Generator\n\nA comprehensive QR code generation and review management system built with Laravel and Blade, featuring OpenAI and Langchain integration for intelligent review processing.',
    technologies: ['Laravel', 'Blade', 'OpenAI', 'Langchain', 'AWS'],
    type: 'application',
    image: 'qr-code.png'
  },
  {
    id: 'video-auto-clipper',
    name: 'Video Auto Clipper',
    icon: 'nextjs',
    shortDescription: 'Automated video clipping system with AI-powered transcription and editing',
    githubUrl: 'https://autoclipper2741.vercel.app/',
    readmeUrl: 'data:text/plain,Video Auto Clipper\n\nAn automated video clipping system built with Next.js and Django, featuring HappyScribe API for transcription, OpenAI for intelligent editing, Pexel API for stock footage, and Dropbox integration.',
    technologies: ['Next.js', 'Django', 'HappyScribe API', 'OpenAI', 'Pexel API', 'Dropbox', 'Chatbot'],
    type: 'application',
    image: 'auto-clipper.png'
  },
  {
    id: 'muay-thai-training-combos',
    name: 'Muay Thai - Training & Combos',
    icon: 'swift',
    shortDescription: 'iOS app for Muay Thai practitioners to browse and log a range of combos',
    githubUrl: 'https://apps.apple.com/gb/app/muay-thai-training-combos/id1606507775',
    readmeUrl: 'data:text/plain,Muay Thai - Training & Combos\n\nAn iOS app for Muay Thai practitioners to browse and log a range of combos. The app is built using the latest SwiftUI APIs and persists data using Core Data. Features include combo tracking, calorie counter, training timer, instructional videos, and HealthKit integration.',
    technologies: ['SwiftUI', 'Core Data', 'HealthKit', 'WidgetKit', 'iOS'],
    type: 'application',
    image: 'muay-thai-app.png'
  },
  {
    id: 'earth-hero-climate-change',
    name: 'Earth Hero: Climate Change',
    icon: 'swift',
    shortDescription: 'iOS app to combat climate change, developed using UIKit and Firebase',
    githubUrl: 'https://apps.apple.com/us/app/earth-hero-climate-change/id1458057746',
    readmeUrl: 'data:text/plain,Earth Hero: Climate Change\n\nAn iOS app to combat climate change, developed using UIKit and Firebase. Explore personalized, eco-friendly actions that contribute to the well-being of planet Earth and communities—allowing users to shape their future and track their activities. Features include carbon footprint tracking, personalized climate actions, community engagement, and goal setting.',
    technologies: ['UIKit', 'AutoLayout', 'Firebase', 'Coordinator Pattern', 'iOS'],
    type: 'application',
    image: 'earth-hero-app.png'
  },
];

export const projects = writable<ProjectData[]>(initialProjects);