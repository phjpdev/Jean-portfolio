<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let progress = 0;

  onMount(() => {
    // Simulate boot progress
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        // Wait a moment before transitioning to lock screen
        setTimeout(() => {
          dispatch('bootComplete');
        }, 500);
      }
    }, 200);
  });
</script>

<div class="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
  <!-- Apple Logo -->
  <div class="flex flex-col items-center">
    <svg 
      class="w-20 h-20 mb-8 text-white" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C1.79 15.25 2.54 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
    
    <!-- Progress Bar -->
    <div class="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
      <div 
        class="h-full bg-white transition-all duration-300 ease-out"
        style="width: {progress}%"
      ></div>
    </div>
  </div>
</div>

