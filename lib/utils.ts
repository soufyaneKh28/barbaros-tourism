import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { defaultLocale } from "@/i18n/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalized(content: any, locale: string) {
  if (!content || typeof content !== 'object') return content

  return content[locale] || content[defaultLocale] || content['en'] || ''
}
