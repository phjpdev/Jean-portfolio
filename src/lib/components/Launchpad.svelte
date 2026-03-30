<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import photos from '$lib/assets/icons/photos.avif'; 
  import terminal from '$lib/assets/icons/terminal.avif';
  import safari from '$lib/assets/icons/safari.png';
  import projects from '$lib/assets/icons/projects.png';
  import blog from '$lib/assets/icons/blog.png';
  
  export let isOpen: boolean;
  const dispatch = createEventDispatcher();

  let searchText = '';
  let searchFocused = false;

  const apps = [
    { id: 'photos', name: 'Photos', icon: photos },
    { id: 'terminal', name: 'Terminal', icon: terminal },
    { id: 'safari', name: 'Safari', icon: safari },
    { id: 'projects', name: 'Projects', icon: projects },
    { id: 'blog', name: 'About Me', icon: blog },
    { id: 'experience', name: 'Work Experience', icon: null, isCustom: true, iconColor: 'from-blue-500 to-purple-600' },
    { id: 'resume', name: 'Resume', icon: null, isCustom: true, iconColor: 'from-red-500 to-pink-600' },
    { id: 'contact', name: 'Contact', icon: null, isCustom: true, iconColor: 'from-indigo-500 to-blue-600' }
  ];

  $: filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function launchApp(appId: string) {
  dispatch('launchApp', appId);
  dispatch('closeLaunchpad');
}

</script>

{#if isOpen}
  <div 
    class="fixed inset-0 z-50 bg-black/30 backdrop-blur-2xl"
    transition:fade={{ duration: 200 }}
    on:click={() => dispatch('closeLaunchpad')}
  >
    <div class="w-full h-full flex flex-col items-center pt-8">
      <div 
        class="w-64 h-8 bg-white/10 rounded-md flex items-center px-3 mb-8 transition-all duration-300 focus-within:bg-white/20 focus-within:ring-1 focus-within:ring-white/30"
        on:click|stopPropagation
      >
        <div class="flex items-center justify-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 text-white/50 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            bind:value={searchText}
            class="w-full bg-transparent text-white placeholder-white/50 outline-none font-light text-sm"
          />
        </div>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-x-8 gap-y-12 p-8 max-w-7xl mx-auto">
        {#if filteredApps.length > 0}
          {#each filteredApps as app}
            <div 
              class="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110"
              on:click|stopPropagation={() => launchApp(app.id)}
              in:scale={{duration: 200, delay: 100}}
              out:scale={{duration: 200}}
            >
              {#if app.isCustom}
                <div class="w-20 h-20 rounded-lg bg-gradient-to-br {app.iconColor || 'from-blue-500 to-purple-600'} flex items-center justify-center mb-2">
                  {#if app.id === 'experience'}
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  {:else if app.id === 'resume'}
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  {:else if app.id === 'contact'}
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  {/if}
                </div>
              {:else}
                <img src={app.icon} alt={app.name} class="w-20 h-20 mb-2 object-contain" />
              {/if}
              <span class="text-white text-sm text-center font-light">{app.name}</span>
            </div>
          {/each}
        {:else}
          <div class="col-span-full text-center text-white/70 font-light text-xl">
            No Results
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}


<style>
</style>