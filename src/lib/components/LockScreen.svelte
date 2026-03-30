<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  let password = '';
  let showError = false;
  let currentTime = new Date();
  let currentDate = new Date();

  function handleShutDown() {
    dispatch('shutDown');
  }

  onMount(() => {
    const timer = setInterval(() => {
      currentTime = new Date();
      currentDate = new Date();
    }, 1000);

    return () => clearInterval(timer);
  });

  function handleSubmit() {
    if (password.trim() !== '') {
      // Any password works
      dispatch('unlock');
    } else {
      showError = true;
      setTimeout(() => {
        showError = false;
      }, 1000);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }
</script>

<div 
  class="fixed inset-0 z-[9998] flex items-center justify-center"
  style="background-image: url('/lock-back.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
  transition:fade={{ duration: 500 }}
>
  <!-- Background Overlay for better text readability -->
  <div class="absolute inset-0 bg-black/30"></div>
  
  <!-- Lock Screen Content -->
  <div class="relative z-10 w-full h-full flex flex-col justify-between text-white">
    <!-- Top Section - Time and Date -->
    <div class="flex flex-col items-center pt-28 relative">
      <!-- Top Right System Icons -->
      <div class="absolute top-4 right-4 flex items-center gap-3 text-white/90">
        <!-- Battery Percentage -->
        <span class="text-xs font-medium">100%</span>
        
        <!-- Wi-Fi Icon -->
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
        
        <!-- Search Icon -->
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        <!-- Control Center Icon (Toggle Switches) -->
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <!-- Top toggle (off position - circle on left) -->
          <rect x="2" y="4" width="16" height="8" rx="4" fill="currentColor" opacity="0.3"/>
          <circle cx="6" cy="8" r="3" fill="currentColor"/>
          <!-- Bottom toggle (on position - circle on right) -->
          <rect x="2" y="14" width="16" height="8" rx="4" fill="currentColor" opacity="0.3"/>
          <circle cx="18" cy="18" r="3" fill="currentColor"/>
        </svg>
      </div>
      <!-- Date -->
      <div class="text-2xl font-light" transition:fade={{ delay: 500 }}>
        {currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </div>
      <!-- Time -->
      <div class="text-8xl font-thin mb-1" transition:fade={{ delay: 300 }}>
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
    </div>

    <!-- Bottom Section - User Profile and Password Input -->
    <div class="flex flex-col items-center pb-16">
      <!-- User Avatar/Name -->
      <div class="mb-6 flex flex-col items-center" transition:fade={{ delay: 700 }}>
        <div 
          class="w-16 h-16 rounded-full mb-2 bg-cover bg-center border-2 border-white/20"
          style="background-image: url('/avatar.jpg');"
        ></div>
        <div class="text-sm font-light">Jean Patrick</div>
      </div>

      <!-- Password Input -->
      <div class="w-80" transition:fade={{ delay: 900 }}>
        <div class="relative flex items-center gap-2">
          <!-- Shut Down Button -->
          <button
            class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
            on:click={handleShutDown}
            title="Shut Down"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>

          <!-- Password Input Field -->
          <div class="flex-1 relative">
            <input
              type="password"
              bind:value={password}
              on:keydown={handleKeydown}
              placeholder="Enter Password"
              class="w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-1.5 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-black/50 transition-all text-center text-sm font-light"
              autofocus
            />
            {#if showError}
              <div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-red-400 text-sm animate-pulse">
                Please enter a password
              </div>
            {/if}
          </div>

          <!-- Submit Button -->
          <button
            class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
            on:click={handleSubmit}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>

