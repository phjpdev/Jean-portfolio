<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  function handlePowerOn() {
    dispatch('powerOn');
  }
</script>

<div 
  class="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
  transition:fade={{ duration: 300 }}
>
  <!-- Power Button - Top Right -->
  <button
    on:click={handlePowerOn}
    class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all cursor-pointer"
    title="Power On"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  </button>
</div>

