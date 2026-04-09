import { NPMX_DOCS_SITE } from '#shared/utils/constants'
import type { RouteLocationRaw } from 'vue-router'

export interface FooterItem {
  to?: RouteLocationRaw
  i18n: string
  btn?: boolean
}

export interface FooterSection {
  title: string
  items: FooterItem[]
}

export const footerSections: FooterSection[] = [
  {
    title: 'footer.sections.resources',
    items: [
      { to: { name: 'blog' }, i18n: 'footer.blog' },
      { to: { name: 'about' }, i18n: 'footer.about' },
      { to: { name: 'accessibility' }, i18n: 'a11y.footer_title' },
      { to: { name: 'privacy' }, i18n: 'privacy_policy.title' },
    ],
  },
  {
    title: 'footer.sections.features',
    items: [
      { to: { name: 'compare' }, i18n: 'shortcuts.compare' },
      { to: { name: 'settings' }, i18n: 'shortcuts.settings' },
      { i18n: 'footer.keyboard_shortcuts', btn: true },
    ],
  },
  {
    title: 'footer.sections.other',
    items: [
      { to: { name: 'pds' }, i18n: 'pds.title' },
      { to: NPMX_DOCS_SITE, i18n: 'footer.docs' },
    ],
  },
]
