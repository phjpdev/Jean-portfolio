<script lang="ts">
  import { onMount } from 'svelte';
  import type { ProjectData } from '../types/projectType';
  import { projects } from '../stores/projectStore';
  import { closeWindow, toggleMinimize, toggleMaximize } from "../stores/windowStore";
  import type { wType } from "../types/wType";
  import SvelteMarkdown from 'svelte-markdown';
  import CodeBlockWrapper from './CodeBlockWrapper.svelte';
  import ProjectIcons from './ProjectIcons.svelte';
  import { getTagColor, getTypeColor } from '../utils/tagColors';
  import 'github-markdown-css/github-markdown-light.css';

  export let startDrag: (e: MouseEvent, id: string, action: 'move' | 'resize') => void;
  export let window: wType;

  let selectedProject: ProjectData | null = null;
  let readmeContent: string = '';
  let isLoading: boolean = false;
  let imageMap: Record<string, string> = {};

  onMount(() => {
    // Preload all project images
    const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg}', { eager: true });
    for (const path in imageModules) {
      const image = imageModules[path] as { default: string };
      const name = path.split('/').pop() || '';
      imageMap[name] = image.default;
    }

    if ($projects.length > 0) {
      selectProject($projects[0]);
    }
  });

  function getImagePath(imageName: string): string {
    if (!imageName) return '';
    return imageMap[imageName] || '';
  }

  function isMobileApp(project: ProjectData): boolean {
    // Check if it's a mobile app by icon or technologies
    return project.icon === 'swift' || 
           project.technologies.some(tech => 
             ['iOS', 'SwiftUI', 'UIKit', 'Android', 'React Native', 'Flutter'].includes(tech)
           );
  }

  async function selectProject(project: ProjectData) {
    selectedProject = project;
    isLoading = true;
    try {
      const response = await fetch(project.readmeUrl);
      readmeContent = await response.text();
    } catch (error) {
      console.error('Failed to fetch README:', error);
      readmeContent = 'Failed to load README content.';
    } finally {
      isLoading = false;
    }
  }

  function openProjectLink(url: string) {
    if (typeof globalThis !== 'undefined') {
      globalThis.window.open(url, '_blank');
    }
  }

  const renderers = {
    code: CodeBlockWrapper
  };

</script>

<div class="bg-white h-full rounded-lg flex flex-col overflow-hidden font-sans">
  <!-- Projects Header -->
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
    <div class="flex-grow text-center font-semibold">Projects</div>
  </div>

  <div class="flex-grow flex overflow-hidden">
    <div class="w-80 border-r border-gray-200 overflow-y-auto bg-gray-50">
      {#each $projects as project,index}
        <div 
          class="p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 {selectedProject === project ? 'bg-blue-100 border-l-2 border-blue-500' : ''}"
          on:click={() => selectProject(project)}
        >
          <div class="flex items-center mb-2">
            <div class="w-6 h-6 mr-2 text-gray-600">
              <ProjectIcons iconName={project.icon} />
            </div>
            <h3 class="font-semibold flex-grow text-gray-800 truncate">{project.name}</h3>
            <button 
              class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
              on:click|stopPropagation={() => openProjectLink(project.githubUrl)}
              title="Open project"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{project.shortDescription}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            <span class="px-2 py-1 text-xs font-medium rounded-full capitalize {getTypeColor(project.type)}">
              {project.type}
            </span>
            {#each project.technologies as tech}
              <span class="px-2 py-1 text-xs font-medium rounded-full {getTagColor(tech)}">
                {tech}
              </span>
            {/each}
          </div>
        </div>
        {#if index < $projects.length - 1}
          <hr class="border-gray-300" />
        {/if}
      {/each}
    </div>

    <div class="flex-1 overflow-hidden flex flex-col bg-white">
      {#if selectedProject}
        <div class="overflow-y-auto flex-grow">
          {#if isLoading}
            <div class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          {:else}
            <div class="p-6">
              {#if selectedProject.image}
                {#if isMobileApp(selectedProject)}
                  <!-- Mobile app: 50% width, centered -->
                  <div class="mb-6 flex justify-center">
                    <div class="rounded-lg overflow-hidden shadow-lg max-w-md">
                      <img 
                        src={getImagePath(selectedProject.image)} 
                        alt={selectedProject.name}
                        class="w-[50%] h-auto m-auto object-contain"
                      />
                    </div>
                  </div>
                {:else}
                  <!-- Web project: full width -->
                  <div class="mb-6 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={getImagePath(selectedProject.image)} 
                      alt={selectedProject.name}
                      class="w-full h-auto object-cover"
                    />
                  </div>
                {/if}
              {/if}
              <div class="markdown-body prose prose-sm max-w-none">
                <SvelteMarkdown source={readmeContent} {renderers} />
              </div>
            </div>
          {/if}
        </div>
      {:else}
        <div class="p-6 flex items-center justify-center h-full">
          <p class="text-gray-600 text-center">Select a project to view details</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.markdown-body) {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    :global(.markdown-body) {
      padding: 15px;
    }
  }
</style>
