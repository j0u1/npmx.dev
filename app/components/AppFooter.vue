<script setup lang="ts">
import { footerSections } from '~/utils/footer-navigation'

const discord = useDiscordLink()
const route = useRoute()
const isHome = computed(() => route.name === 'index')

const modalRef = useTemplateRef('modalRef')
const showModal = () => modalRef.value?.showModal?.()
const closeModal = () => modalRef.value?.close?.()

const socialLinks = computed(() => [
  {
    id: 'github',
    href: 'https://repo.npmx.dev',
    icon: 'i-simple-icons:github',
    label: $t('footer.source'),
  },
  {
    id: 'discord',
    href: discord.value.url,
    icon: 'i-simple-icons:discord',
    label: discord.value.label,
  },
  {
    id: 'bluesky',
    href: 'https://social.npmx.dev',
    icon: 'i-simple-icons:bluesky',
    label: $t('footer.social'),
  },
])
</script>

<template>
  <footer class="border-t border-transparent lg:border-border lg:mt-auto">
    <div class="container flex flex-col text-sm text-fg-subtle sm:gap-2.5 sm:px-3 sm:pt-8">
      <div class="hidden lg:flex justify-between py-3 gap-15">
        <div class="flex flex-col gap-3 w-full">
          <AppLogo class="text-white h-7 w-fit" />
          <BuildEnvironment v-if="!isHome" footer />
          <div class="flex items-center gap-3">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.href"
              :aria-label="link.label"
              :title="link.label"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors duration-200 hover:text-fg focus-visible:text-fg"
            >
              <span :class="link.icon" class="h-7 w-7" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-3 lg:flex-row">
          <!-- Desktop: Show all links. Mobile: Links are in MobileMenu -->
          <div class="flex gap-8">
            <div
              v-for="(section, index) in footerSections"
              :key="index"
              class="flex flex-col gap-4 min-w-[152px]"
            >
              <p class="uppercase font-mono">{{ $t(section.title) }}</p>
              <div class="flex flex-col gap-2">
                <template v-for="(item, itemIndex) in section.items" :key="itemIndex">
                  <button
                    v-if="item?.btn"
                    type="button"
                    class="cursor-pointer inline-flex w-fit items-center justify-start rounded-md px-2 py-1 font-mono text-fg-subtle transition-colors duration-200 hover:(bg-bg-subtle text-fg) focus-visible:(bg-bg-subtle text-fg)"
                    @click.prevent="showModal"
                    aria-haspopup="dialog"
                  >
                    {{ $t(item.i18n) }}
                  </button>
                  <LinkBase v-else :to="item?.to" variant="footer" class="w-fit">
                    {{ $t(item.i18n ?? '') || item.i18n }}
                  </LinkBase>
                </template>
              </div>
            </div>
          </div>
          <Modal
            ref="modalRef"
            :modalTitle="$t('footer.keyboard_shortcuts')"
            class="w-auto max-w-lg"
          >
            <p class="mb-2 font-mono text-fg-subtle">
              {{ $t('shortcuts.section.global') }}
            </p>
            <ul class="mb-6 flex flex-col gap-2">
              <li class="flex gap-2 items-center">
                <kbd class="kbd">/</kbd>
                <span>{{ $t('shortcuts.focus_search') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">?</kbd>
                <span>{{ $t('shortcuts.show_kbd_hints') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">,</kbd>
                <span>{{ $t('shortcuts.settings') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">c</kbd>
                <span>{{ $t('shortcuts.compare') }}</span>
              </li>
            </ul>
            <p class="mb-2 font-mono text-fg-subtle">
              {{ $t('shortcuts.section.search') }}
            </p>
            <ul class="mb-6 flex flex-col gap-2">
              <li class="flex gap-2 items-center">
                <kbd class="kbd">↑</kbd>/<kbd class="kbd">↓</kbd>
                <span>{{ $t('shortcuts.navigate_results') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">Enter</kbd>
                <span>{{ $t('shortcuts.go_to_result') }}</span>
              </li>
            </ul>
            <p class="mb-2 font-mono text-fg-subtle">
              {{ $t('shortcuts.section.package') }}
            </p>
            <ul class="mb-8 flex flex-col gap-2">
              <li class="flex gap-2 items-center">
                <kbd class="kbd">.</kbd>
                <span>{{ $t('shortcuts.open_code_view') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">d</kbd>
                <span>{{ $t('shortcuts.open_docs') }}</span>
              </li>
              <li class="flex gap-2 items-center">
                <kbd class="kbd">c</kbd>
                <span>{{ $t('shortcuts.compare_from_package') }}</span>
              </li>
            </ul>
            <p class="text-fg-muted leading-relaxed">
              <i18n-t keypath="shortcuts.disable_shortcuts" tag="span" scope="global">
                <template #settings>
                  <NuxtLink
                    :to="{ name: 'settings' }"
                    class="hover:text-fg underline decoration-fg-subtle/50 hover:decoration-fg"
                    @click="closeModal"
                  >
                    {{ $t('settings.title') }}
                  </NuxtLink>
                </template>
              </i18n-t>
            </p>
          </Modal>
        </div>
      </div>
      <p
        class="text-xs text-fg-muted text-center sm:text-start border-t border-border mx-auto w-full py-4"
      >
        <span class="sm:hidden">{{ $t('non_affiliation_disclaimer') }}</span>
        <span class="hidden sm:inline">{{ $t('trademark_disclaimer') }}</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.kbd {
  @apply items-center justify-center text-sm text-fg bg-bg-muted border border-border rounded px-2;
}
</style>
