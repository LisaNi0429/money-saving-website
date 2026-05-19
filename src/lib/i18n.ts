import zh from './zh.json';
import en from './en.json';

export type Locale = 'zh' | 'en';
export const locales: Locale[] = ['zh', 'en'];
export const defaultLocale: Locale = 'zh';

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
};

const messages: Record<Locale, Record<string, unknown>> = { zh, en };

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

export function t(messages: Record<string, unknown>, key: string): string {
  const keys = key.split('.');
  let result: unknown = messages;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}
