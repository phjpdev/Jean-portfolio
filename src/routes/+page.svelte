<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
  import Desktop from "./../lib/components/Desktop.svelte";
  import Dock from "../lib/components/Dock.svelte";
  import Window from "../lib/components/Window.svelte";
  import Launchpad from "../lib/components/Launchpad.svelte";
  import PowerOnScreen from "../lib/components/PowerOnScreen.svelte";
  import BootScreen from "../lib/components/BootScreen.svelte";
  import LockScreen from "../lib/components/LockScreen.svelte";
  import { windows, addWindow, isAppRunning, isAppMinimized } from "../lib/stores/windowStore";

  let isLaunchpadOpen = false;
  let bootState: 'powerOff' | 'booting' | 'locked' | 'unlocked' = 'powerOff';

  onMount(() => {
    if (browser) {
      document.title = "Jean Patrick | Portfolio";
      // Check if already unlocked in this session
      const unlocked = sessionStorage.getItem('macos_unlocked');
      if (unlocked === 'true') {
        bootState = 'unlocked';
        if (window.innerWidth >= 768) {
          addWindow("terminal");
        }
      }
    }
  });

  function handlePowerOn() {
    bootState = 'booting';
  }

  function handleBootComplete() {
    bootState = 'locked';
  }

  function handleUnlock() {
    bootState = 'unlocked';
    if (browser) {
      sessionStorage.setItem('macos_unlocked', 'true');
      if (window.innerWidth >= 768) {
        addWindow("terminal");
      }
    }
  }

  function handleShutDown() {
    bootState = 'powerOff';
    if (browser) {
      sessionStorage.removeItem('macos_unlocked');
    }
  }

  function handleLockScreen() {
    bootState = 'locked';
  }

  function handleOpenLaunchpad() {
    isLaunchpadOpen = true;
  }

  function handleLaunchApp(event: CustomEvent<string>) {
    addWindow(event.detail as "terminal" | "safari" | "photos" | "blog" | "projects" | "experience" | "resume" | "contact");
    isLaunchpadOpen = false;
  }
</script>

<main class="min-h-screen relative overflow-hidden">
  {#if bootState === 'powerOff'}
    <PowerOnScreen on:powerOn={handlePowerOn} />
  {:else if bootState === 'booting'}
    <BootScreen on:bootComplete={handleBootComplete} />
  {:else if bootState === 'locked'}
    <LockScreen on:unlock={handleUnlock} on:shutDown={handleShutDown} />
  {:else}
    <Desktop on:shutDown={handleShutDown} on:lockScreen={handleLockScreen} />
    
    {#each $windows as window (window.id)}
      <Window {window} />
    {/each}
    
    <Dock {isAppRunning} {isAppMinimized} {addWindow} on:openLaunchpad={handleOpenLaunchpad} />
    
    <Launchpad isOpen={isLaunchpadOpen} on:launchApp={handleLaunchApp} on:closeLaunchpad={() => isLaunchpadOpen = false} />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>
