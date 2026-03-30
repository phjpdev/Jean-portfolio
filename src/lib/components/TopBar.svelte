<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let currentTime = new Date();
  let showAppleMenu = false;
  let appleMenuRef: HTMLDivElement;

  onMount(() => {
    const timer = setInterval(() => {
      currentTime = new Date();
    }, 1000);

    const handleClickOutside = (event: MouseEvent) => {
      if (showAppleMenu && appleMenuRef && !appleMenuRef.contains(event.target as Node)) {
        showAppleMenu = false;
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function toggleAppleMenu(e: MouseEvent) {
    e.stopPropagation();
    showAppleMenu = !showAppleMenu;
  }

  function handleShutDown() {
    showAppleMenu = false;
    dispatch('shutDown');
  }

  function handleLockScreen() {
    showAppleMenu = false;
    dispatch('lockScreen');
  }
</script>

<!-- Status Bar -->
<div class="hidden md:flex h-6 bg-black/20 backdrop-blur-md items-center justify-between px-2 text-xs text-white relative z-50">
  <!-- Left side -->
  <div class="flex items-center space-x-4">
    <div class="relative" bind:this={appleMenuRef}>
      <button
        on:click={toggleAppleMenu}
        class="hover:bg-white/10 rounded px-1 py-0.5 transition-colors"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      </button>
      
      {#if showAppleMenu}
        <div class="absolute top-7 left-0 bg-gray-800 border border-gray-600 rounded-md shadow-2xl py-1 min-w-[180px] z-[100]">
          <button
            on:click={handleLockScreen}
            class="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Lock Screen
          </button>
          <div class="border-t border-gray-600 my-1"></div>
          <button
            on:click={handleShutDown}
            class="w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            Shut Down...
          </button>
        </div>
      {/if}
    </div>
    <span class="font-semibold">Finder</span>
    <span>File</span>
    <span>Edit</span>
    <span>View</span>
    <span>Go</span>
    <span>Window</span>
    <span>Help</span>
  </div>
  
  <!-- Right side -->
  <div class="flex items-center space-x-4">
    <span>100%</span>
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
    </svg>
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <svg viewBox="0 0 29 29" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z"></path></svg>
    <span>{formatDate(currentTime)}</span>
    <span>{formatTime(currentTime)}</span>
  </div>
</div>

<style>
</style>
