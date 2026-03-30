<script lang="ts">
  import { createEventDispatcher,onMount } from 'svelte';
  import { windows } from '../stores/windowStore';

  export let isAppRunning: (type: 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact') => boolean;
  export let isAppMinimized: (type: 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact') => boolean;
  export let addWindow: (type: 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact') => void;

  import launchpad from '$lib/assets/icons/launchpad.png';
  import terminal from '$lib/assets/icons/terminal.avif';
  import safari from '$lib/assets/icons/safari.png';
  import photos from '$lib/assets/icons/photos.avif';
  import blog from '$lib/assets/icons/blog.png';
  import projects from '$lib/assets/icons/projects.png';

  const dispatch = createEventDispatcher();
  let showPopup = false;
  let windowWidth = 0;

  onMount(() => {
    windowWidth = window.innerWidth;

    const handleResize = () => {
      windowWidth = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleDockClick(appType: string) {
    if (!isLargeScreen) {
      showPopup = true;
    } else {
      if (appType === 'launchpad') {
        dispatch('openLaunchpad');
      } else {
        addWindow(appType as 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact');
      }
    }
  }

  function closePopup() {
    showPopup = false;
  }

  $: terminalWindow = $windows.find(w => w.type === 'terminal');
  $: safariWindow = $windows.find(w => w.type === 'safari');
  $: photosWindow = $windows.find(w => w.type === 'photos');
  $: blogWindow = $windows.find(w => w.type === 'blog');
  $: projectsWindow = $windows.find(w => w.type === 'projects');
  $: experienceWindow = $windows.find(w => w.type === 'experience');
  $: resumeWindow = $windows.find(w => w.type === 'resume');
  $: contactWindow = $windows.find(w => w.type === 'contact');
  $: isLargeScreen = windowWidth >= 1024;

</script>

<div class="dock fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex space-x-4 items-end">
  <div class="dock-item" on:click={() => handleDockClick('launchpad')}>
    <img src={launchpad} alt="Launchpad" class="h-12 w-12" />
  </div>
  
  <div class="dock-item" on:click={() => handleDockClick("terminal")}>
    <img src={terminal} alt="Terminal" class="h-12 w-12" />
    {#if terminalWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>
  
  {#if isLargeScreen}
    <div class="dock-item" on:click={() => handleDockClick("safari")}>
      <img src={safari} alt="safari" class="h-12 w-12" />
      {#if safariWindow}
        <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
      {/if}
    </div>
  {/if}

  <div class="dock-item" on:click={() => handleDockClick("photos")}>
    <img src={photos} alt="Photos" class="h-12 w-12" />
    {#if photosWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>

  {#if isLargeScreen}
  <div class="dock-item" on:click={() => handleDockClick("blog")}>
    <img src={blog} alt="About Me" class="h-12 w-12" />
    {#if blogWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
    </div>
  {/if}

  <div class="dock-item" on:click={() => handleDockClick("projects")}>
    <img src={projects} alt="Projects" class="h-12 w-12" />
    {#if projectsWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>

  <div class="dock-item" on:click={() => handleDockClick("experience")}>
    <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    {#if experienceWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>

  <div class="dock-item" on:click={() => handleDockClick("resume")}>
    <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    {#if resumeWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>

  <div class="dock-item" on:click={() => handleDockClick("contact")}>
    <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    {#if contactWindow}
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
    {/if}
  </div>
</div>


{#if showPopup}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm mx-auto">
      <h2 class="text-lg font-semibold mb-4">Limited Features</h2>
      <p class="mb-4">For full feature access, please use a desktop device.</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={closePopup}>Close</button>
    </div>
  </div>
{/if}

<style>
  .dock {
    height: 68px;
  }

  .dock-item {
    @apply w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer relative;
    transition: all 0.2s ease;
  }

  .dock:hover .dock-item {
    transform: translateY(0px) scale(1);
  }

  .dock .dock-item:hover {
    transform: translateY(-10px) scale(1.2);
  }

  .dock:hover .dock-item:hover + .dock-item {
    transform: translateY(-5px) scale(1.1);
  }

  .dock:hover .dock-item:hover + .dock-item + .dock-item {
    transform: translateY(-2px) scale(1.05);
  }
</style>
