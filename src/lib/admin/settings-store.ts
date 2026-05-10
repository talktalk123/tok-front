"use client";

import seed from "@/data/site-settings.json";

export interface SiteSettings {
  name: string;
  shortName: string;
  description: string;
  phone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  hours: {
    weekday: string;
    saturday: string;
    holiday: string;
    sunday: string;
  };
  blogUrl: string;
  bookingUrl: string;
}

const STORAGE_KEY = "tok_admin_settings_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadSettings(): SiteSettings {
  if (!isBrowser()) return seed as SiteSettings;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed as SiteSettings;
  }
  try {
    return JSON.parse(raw) as SiteSettings;
  } catch {
    return seed as SiteSettings;
  }
}

export function saveSettings(settings: SiteSettings): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function resetSettings(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
}

export function exportSettingsJson(): string {
  return JSON.stringify(loadSettings(), null, 2);
}
