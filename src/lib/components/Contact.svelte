<script lang="ts">
  import { closeWindow, toggleMinimize, toggleMaximize } from "../stores/windowStore";
  import type { wType } from "../types/wType";
  import { browser } from '$app/environment';

  export let startDrag: (e: MouseEvent, id: string, action: 'move' | 'resize') => void;
  export let window: wType;

  let firstName = '';
  let lastName = '';
  let email = '';
  let selectedService = '';
  let selectedBudget = '';
  let message = '';
  let isSubmitting = false;
  let submitMessage = '';
  let submitMessageType: 'success' | 'error' | '' = '';

  const services = [
    'Web Design',
    'Web Development',
    'AI & Machine Learning',
    'Python Development',
    'Cloud & DevOps',
    'Mobile Development'
  ];

  const budgets = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $30,000',
    'Over $30,000',
    'Not sure yet'
  ];

  $: isFormValid = firstName.trim() !== '' && 
                   lastName.trim() !== '' && 
                   email.trim() !== '' && 
                   selectedService !== '' && 
                   selectedBudget !== '' && 
                   message.trim() !== '';

  async function handleSubmit() {
    if (!isFormValid || isSubmitting) {
      return;
    }
    
    isSubmitting = true;
    submitMessage = '';
    submitMessageType = '';
    
    try {
      // Submit directly to Formspree (works with static deployments)
      const formspreeEndpoint = 'https://formspree.io/f/mzdpzljy';
      const subject = `New Contact Form Submission from ${firstName} ${lastName}`;
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _to: 'jeanpatrick97816@gmail.com',
          name: `${firstName} ${lastName}`,
          email: email,
          service: selectedService,
          budget: selectedBudget,
          message: message,
          _replyto: email,
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        submitMessage = 'Thank you for your message! I will get back to you soon.';
        submitMessageType = 'success';
        
        // Reset form
        firstName = '';
        lastName = '';
        email = '';
        selectedService = '';
        selectedBudget = '';
        message = '';
      } else {
        // Show error message
        submitMessage = result.error || 'Failed to send message. Please try again later.';
        submitMessageType = 'error';
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submitMessage = 'An error occurred. Please try again later or email me directly at jeanpatrick97816@gmail.com';
      submitMessageType = 'error';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="bg-white h-full rounded-lg flex flex-col overflow-hidden font-sans">
  <!-- Contact Header -->
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
    <div class="flex-grow text-center font-semibold">Contact</div>
  </div>

  <div class="flex-grow overflow-y-auto bg-white p-8">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-3">Get in Touch</h1>
        <p class="text-lg text-gray-600 leading-relaxed">
          Interested in working together or have a question? Send me a message — I'm always open to new projects and collaborations.
        </p>
      </div>

      <!-- Contact Form -->
      <div class="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input
                type="text"
                id="firstName"
                bind:value={firstName}
                placeholder="Enter your first name here"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input
                type="text"
                id="lastName"
                bind:value={lastName}
                placeholder="Enter your last name here"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              placeholder="Enter your email address here"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <!-- Service Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Service</label>
            <div class="flex flex-wrap gap-2">
              {#each services as service}
                <button
                  type="button"
                  class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors {selectedService === service ? 'bg-gray-300 border-gray-400' : ''}"
                  on:click={() => selectedService = selectedService === service ? '' : service}
                >
                  {service}
                </button>
              {/each}
            </div>
          </div>

          <!-- Budget Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Budget</label>
            <div class="flex flex-wrap gap-2">
              {#each budgets as budget}
                <button
                  type="button"
                  class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors {selectedBudget === budget ? 'bg-gray-300 border-gray-400' : ''}"
                  on:click={() => selectedBudget = selectedBudget === budget ? '' : budget}
                >
                  {budget}
                </button>
              {/each}
            </div>
          </div>

          <!-- Message Textarea -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              bind:value={message}
              placeholder="I need help with ..."
              rows="6"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
              required
            ></textarea>
          </div>

          <!-- Submit Message -->
          {#if submitMessage}
            <div class="p-4 rounded-lg {submitMessageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}">
              {submitMessage}
            </div>
          {/if}

          <!-- Submit Button -->
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            class="w-full px-6 py-3 font-semibold rounded-lg transition-colors duration-200 {isFormValid && !isSubmitting ? 'bg-gray-700 text-white hover:bg-gray-800 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>

      <!-- Social Media Icons -->
      <div class="mt-8 flex justify-center gap-4">
        <!-- WhatsApp -->
        <a 
          href="https://wa.me/639667643587" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="WhatsApp"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

        <!-- Discord -->
        <a 
          href="https://discord.gg/396DsMtM" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Discord"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928-1.793 6.4-2.422 8.549-2.243a.076.076 0 0 1 .061.04c.014.01.027.02.04.032a.077.077 0 0 1 .003.06c-.01.05-.02.1-.03.151a.075.075 0 0 1-.08.054 13.165 13.165 0 0 1-1.995.283.077.077 0 0 0-.07.09c.003.05.006.1.01.15a.076.076 0 0 0 .05.063c.35.1.71.18 1.08.24a.076.076 0 0 0 .09-.05c.22-.5.4-1.02.54-1.55a.077.077 0 0 0-.04-.09 19.79 19.79 0 0 1-3.001-2.275.074.074 0 0 1 0-.1c.125-.162.25-.325.388-.475a.074.074 0 0 1 .1-.01c3.93 1.79 8.16 1.79 12.05 0a.074.074 0 0 1 .1.01c.138.15.263.313.388.475a.074.074 0 0 1 0 .1 19.8 19.8 0 0 1-3.001 2.275.077.077 0 0 0-.04.09c.14.53.32 1.05.54 1.55a.076.076 0 0 0 .09.05c.37-.06.73-.14 1.08-.24a.076.076 0 0 0 .05-.063c.004-.05.007-.1.01-.15a.077.077 0 0 0-.07-.09 13.165 13.165 0 0 1-1.995-.283.075.075 0 0 1-.08-.054c-.01-.05-.02-.1-.03-.151a.077.077 0 0 1 .003-.06c.013-.012.026-.022.04-.032a.076.076 0 0 1 .061-.04c2.149-.179 4.621.45 8.549 2.243a.074.074 0 0 1 .077.01c.12.098.24.198.372.292a.077.077 0 0 1-.008.128 13.107 13.107 0 0 1-1.872.892.076.076 0 0 0-.041.106c.352.699.764 1.364 1.226 1.994a.078.078 0 0 0 .084.028 19.9 19.9 0 0 0 6.002-3.03.077.077 0 0 0 .031-.057c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
        </a>

        <!-- Telegram -->
        <a 
          href="https://t.me/jeanpatrickreyes" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Telegram"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.193l-1.84 8.66c-.135.604-.48.75-.975.467l-2.69-1.983-1.297 1.248c-.15.15-.276.276-.566.276l.202-2.87 4.983-4.51c.217-.193-.048-.3-.336-.106l-6.155 3.88-2.653-.83c-.576-.18-.59-.576.12-.87l10.35-3.99c.48-.18.9.12.747.78z"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a 
          href="https://www.linkedin.com/in/jean-patrick-reyes-63089a3a4/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="LinkedIn"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        <!-- Twitter/X -->
        <a 
          href="https://x.com/jeanpatrickrey" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Twitter"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <!-- Facebook -->
        <a 
          href="https://www.facebook.com/profile.php?id=61584560752866" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200 group"
          title="Facebook"
        >
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

