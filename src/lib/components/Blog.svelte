<script lang="ts">
    import { closeWindow, toggleMinimize, toggleMaximize } from "../stores/windowStore";
    import type { wType } from "../types/wType";
  
    export let startDrag: (e: MouseEvent, id: string, action: 'move' | 'resize') => void;
    export let window: wType;

    function getTechColor(tech: string): string {
      return 'bg-gray-500 text-white';
    }


    const aboutMe = {
      name: "Jean Patrick Reyes",
      title: "AI/ML Engineer & Full-Stack Developer",
      dateOfBirth: "",
      address: "Dalanghita st. Brgy San Juan, Taytay, Rizal, Philippines",
      zipCode: "",
      email: "jeanpatrick97816@gmail.com",
      phone: "+63 966 764 3587",
      description: `I'm Jean, a Filipino AI/ML Engineer and Full-Stack Developer with over 8 years of experience working on production-grade AI systems, enterprise web apps, and mobile applications. I've collaborated with teams in the USA, Germany, Australia and the Philippines, helping companies build efficient, scalable, and secure digital products.

I specialize in machine learning, React/Next.js, Node.js, Python Frameworks, and cloud technologies such as AWS, Azure, Cloudflare and GCP.`,
      projectsComplete: 86,
      socialLinks: {
        twitter: "https://x.com/Johncarlocos",
        facebook: "https://www.facebook.com/profile.php?id=61583826572375",
        telegram: "https://t.me/johncarlo2741"
      }
    };

    const services = [
      { 
        name: "Web Design", 
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      },
      { 
        name: "Web Development", 
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      },
      { 
        name: "AI & Machine Learning", 
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      },
      { 
        name: "Python Development", 
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      },
      { 
        name: "Cloud & DevOps", 
        icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      },
      { 
        name: "Mobile Development", 
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      }
    ];

    const skillCategories = [
      {
        name: "Frontend",
        icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        technologies: ["React", "Next.js", "Vue", "TypeScript", "Flutter", "React Native"]
      },
      {
        name: "Backend",
        icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
        technologies: ["Python", "Django", "FastAPI", "Node.js", "Express.js", "Nest.js", "C#", "GraphQL API"]
      },
      {
        name: "AI / ML",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        technologies: ["BERT", "spaCy", "NLP", "Machine Learning", "AI Integration"]
      },
      {
        name: "Databases",
        icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
        technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase", "SQLite"]
      },
      {
        name: "Cloud & DevOps",
        icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
        technologies: ["AWS", "Azure", "GCP", "Firebase", "Docker", "CI/CD", "Kubernetes", "Nginx", "Cloudflare"]
      }
    ];
</script>
  
<div class="bg-white h-full rounded-lg flex flex-col overflow-hidden font-sans">
  <!-- About Me Header -->
  <div class="bg-gray-100 px-2 py-2 flex items-center cursor-move border-b border-gray-200" on:mousedown={(e) => startDrag(e, window.id, "move")}>
    <div class="flex space-x-2 mr-4">
      <button class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none" on:click={() => closeWindow(window.id)}>
        <svg class="w-3 h-3 text-red-800 opacity-0 hover:opacity-100" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none" on:click={() => toggleMinimize(window.id)}>
        <svg class="w-3 h-3 text-yellow-800 opacity-0 hover:opacity-100" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M20 12H4" />
        </svg>
      </button>
      <button class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none" on:click={() => toggleMaximize(window.id)}>
        <svg class="w-3 h-3 text-green-800 opacity-0 hover:opacity-100" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
        </svg>
      </button>
    </div>
    <div class="flex-grow text-center font-semibold">About Me</div>
  </div>
  
  <div class="flex-grow flex overflow-hidden">
    <div class="flex-1 overflow-y-auto bg-white p-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{aboutMe.name}</h1>
          <h2 class="text-2xl text-gray-600 mb-6">{aboutMe.title}</h2>
        </div>

        <div class="prose prose-lg max-w-none mb-12">
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{aboutMe.description}</p>
        </div>

        <!-- Services Section -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div class="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
            Services
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each services as service}
              <div class="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={service.icon} />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Skills Section -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg class="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Tech Stack & Skills
          </h2>
          <div class="space-y-5">
            {#each skillCategories as category}
              <div>
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={category.icon} />
                    </svg>
                  </div>
                  <h3 class="text-base font-semibold text-gray-900">{category.name}</h3>
                </div>
                <div class="flex flex-wrap gap-2 ml-11">
                  {#each category.technologies as tech}
                    <span class="px-3 py-1.5 {getTechColor(tech)} text-sm font-semibold uppercase tracking-wide">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
<style>
  :global(.prose) {
    color: #374151;
  }
  
  :global(.prose p) {
    margin-bottom: 1rem;
  }
</style>
