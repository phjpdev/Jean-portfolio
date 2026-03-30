import { writable, get } from 'svelte/store';
import type { wType } from '../types/wType';

export const windows = writable<wType[]>([]);
let nextZIndex = 1;

export function addWindow(type: "terminal" | "safari" | "photos" | "blog" | "projects" | "experience" | "resume" | "contact") {
  const currentWindows = get(windows);
  const existingWindow = currentWindows.find((w) => w.type === type);
  if (existingWindow) {
    focusWindow(existingWindow.id);
    if (existingWindow.minimized) {
      toggleMinimize(existingWindow.id);
    }
    return;
  }

  const windowWidth = 900;
  const windowHeight = 600;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const newWindow: wType = {
    id: `${type}-${Date.now()}`,
    type,
    minimized: false,
    maximized: false,
    position: {
      x: (screenWidth - windowWidth) / 2,
      y: (screenHeight - windowHeight) / 2,
    },
    size: { width: windowWidth, height: windowHeight },
    zIndex: nextZIndex++,
  };
  windows.update(w => [...w, newWindow]);
}

export function focusWindow(id: string) {
  windows.update(currentWindows => {
    return currentWindows
      .map((w) => ({
        ...w,
        zIndex: w.id === id ? nextZIndex++ : w.zIndex,
      }))
      .sort((a, b) => a.zIndex - b.zIndex);
  });
}

export function closeWindow(id: string) {
  windows.update(currentWindows => currentWindows.filter((w) => w.id !== id));
}

export function toggleMinimize(id: string) {
  windows.update(currentWindows => 
    currentWindows.map((w) =>
      w.id === id ? { ...w, minimized: !w.minimized } : w
    )
  );
}

export function toggleMaximize(id: string) {
  windows.update(currentWindows => 
    currentWindows.map((w) => {
      if (w.id === id) {
        if (!w.maximized) {
          // Save original size and position before maximizing
          const topBarHeight = 24; // TopBar height is h-6 (24px)
          return {
            ...w,
            maximized: true,
            originalSize: { width: w.size.width, height: w.size.height },
            originalPosition: { x: w.position.x, y: w.position.y },
            position: { x: 0, y: topBarHeight },
            size: { width: window.innerWidth, height: window.innerHeight - topBarHeight },
          };
        } else {
          // Restore original size and position
          return {
            ...w,
            maximized: false,
            position: w.originalPosition || {
              x: (window.innerWidth - (w.originalSize?.width || 900)) / 2,
              y: (window.innerHeight - (w.originalSize?.height || 600)) / 2,
            },
            size: w.originalSize || { width: 900, height: 600 },
            originalSize: undefined,
            originalPosition: undefined,
          };
        }
      }
      return w;
    })
  );
}

export function isAppRunning(type: 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact'): boolean {
  const currentWindows = get(windows);
  return currentWindows.some(w => w.type === type && !w.minimized);
}

export function isAppMinimized(type: 'terminal' | 'safari' | 'photos' | 'blog' | 'projects' | 'experience' | 'resume' | 'contact'): boolean {
  const currentWindows = get(windows);
  return currentWindows.some(w => w.type === type && w.minimized);
}