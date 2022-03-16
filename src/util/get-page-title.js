import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle (pageTitle) { // 拼接标题
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
