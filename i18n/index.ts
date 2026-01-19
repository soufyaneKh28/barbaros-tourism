import { type Locale, locales, defaultLocale } from './config';
import en from './messages/en.json';
import ar from './messages/ar.json';
import fr from './messages/fr.json';
import tr from './messages/tr.json';

export const messages = {
  en,
  ar,
  fr,
  tr,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

export { locales, defaultLocale };
export type { Locale };


