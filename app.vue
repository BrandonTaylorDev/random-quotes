<script lang="ts" setup>
  import type { Quote } from '~/types/Quote'

  useHead({
    title: 'Your Quote Is... | An App by Brandon Taylor',
    htmlAttrs: {
      lang: 'en'
    }
  })

  const quote = ref<Quote | null>(null)
  const showQuote = ref(false)
  const swappingQuote = ref(false)
  const firstLoad = ref(true)

  const fetchQuote = async () => {

    type Response = {
      success?: boolean
      error?: string
      quote?: Quote
    }

    const res: Response = await $fetch('/api/v1/get-quote', {
      method: 'GET'
    })

    if (!res.success || !res.quote) {
      quote.value = {
        quote: 'This is embarrassing. I am unable to fetch a quote at this time. Please try again later.',
        author: 'Brandon Taylor',
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
      }
      return
    }

    quote.value = res.quote
  }

  const swapQuote = () => {
    swappingQuote.value = true
    showQuote.value = false

    setTimeout(async () => {
      await fetchQuote()
      showQuote.value = true
      swappingQuote.value = false
    }, 1500)
  }

  onMounted(() => {
    fetchQuote().then(() => {
      setTimeout(() => {
        showQuote.value = true
        firstLoad.value = false
      }, 1500)
    })
  })
</script>

<template>
  <div class="min-h-dvh min-w-vw bg-slate-900 text-slate-300 flex flex-col">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    
    <!-- Portfolio Banner -->
    <div class="w-full bg-slate-800 border-b border-slate-700 py-2 px-4 text-center">
      <a
        href="https://www.brandontaylor.dev/projects"
        rel="noopener"
        class="text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        ← A project by Brandon Taylor.
      </a>
    </div>
    
    <div class="w-full flex-1 flex flex-col gap-4 justify-center items-center">
      <div :class="[ 'w-full max-w-prose flex flex-col gap-4 transition-opacity duration-1000 ease-linear text-center p-4', showQuote ? 'opacity-100' : 'opacity-0 pointer-events-none' ]">
        <div class="font-thin tracking-wider">
          <span class="text-3xl">
            {{ quote?.quote ?? 'An unknown error has occurred.' }}
          </span>
        </div>

        <div class="italic tracking-wide">
          <span>
            - {{ quote?.author ?? 'Brandon Taylor' }},
          </span>
          <span>
            {{ quote?.date ?? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()) }}
          </span>
        </div>
      </div>

      <div :class="[ 'transition-opacity duration-1000 ease-linear', firstLoad ? 'opacity-0 pointer-events-none' : null ]">
        <button type="button" :class="[ 'rounded-full p-2', swappingQuote ? 'animate-spin' : '' ]" @click="swapQuote" name="new-quote">
          <icon name="mdi:refresh" size="2em" mode="svg" />
        </button>
      </div>
    </div>
  </div>
</template>
