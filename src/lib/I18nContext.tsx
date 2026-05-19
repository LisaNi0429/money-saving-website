'use client';
import { createContext, useContext } from 'react';
import type { Locale } from './i18n';

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: 'zh',
  t: (key: string) => key,
});

export function useTranslation() {
  return useContext(I18nContext);
}
