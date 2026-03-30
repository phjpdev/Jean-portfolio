<script lang="ts">
  import { onMount } from 'svelte';
  import type { ExperienceData } from '../types/experienceType';
  import { experiences } from '../stores/experienceStore';
  import { closeWindow, toggleMinimize, toggleMaximize } from "../stores/windowStore";
  import type { wType } from "../types/wType";

  export let startDrag: (e: MouseEvent, id: string, action: 'move' | 'resize') => void;
  export let window: wType;

  let selectedExperience: ExperienceData | null = null;

  onMount(() => {
    if ($experiences.length > 0) {
      selectExperience($experiences[0]);
    }
  });

  function selectExperience(experience: ExperienceData) {
    selectedExperience = experience;
  }
</script>

<div class="bg-white h-full rounded-lg flex flex-col overflow-hidden font-sans">
  <!-- Experience Header -->
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
    <div class="flex-grow text-center font-semibold">Work Experience</div>
  </div>

  <div class="flex-grow flex overflow-hidden">
    <div class="w-80 border-r border-gray-200 overflow-y-auto bg-gray-50">
      {#each $experiences as experience, index}
        <div 
          class="p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 {selectedExperience === experience ? 'bg-blue-100 border-l-2 border-blue-500' : ''}"
          on:click={() => selectExperience(experience)}
        >
          <div class="mb-2">
            <div class="text-xs text-gray-500 mb-1">{experience.period}</div>
            <h3 class="font-semibold text-gray-800 mb-1">{experience.title}</h3>
            <div class="text-sm text-gray-600">{experience.company}</div>
            <div class="text-xs text-gray-500">{experience.location}</div>
          </div>
        </div>
        {#if index < $experiences.length - 1}
          <hr class="border-gray-300" />
        {/if}
      {/each}
    </div>

    <div class="flex-1 overflow-hidden flex flex-col bg-white">
      {#if selectedExperience}
        <div class="overflow-y-auto flex-grow p-6">
          <div class="max-w-3xl">
            <div class="mb-6">
              <div class="text-sm text-gray-500 mb-2">{selectedExperience.period}</div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{selectedExperience.title}</h1>
              <div class="text-xl text-gray-700 mb-1">{selectedExperience.company}</div>
              <div class="text-sm text-gray-500">{selectedExperience.location}</div>
            </div>

            <div class="border-t pt-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
              <ul class="space-y-3">
                {#each selectedExperience.description as item}
                  <li class="text-gray-700 leading-relaxed">{item}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {:else}
        <div class="p-6 flex items-center justify-center h-full">
          <p class="text-gray-600 text-center">Select a work experience to view details</p>
        </div>
      {/if}
    </div>
  </div>
</div>

