"use client";

import { useEffect, useState } from "react";
import {
  loadSettings,
  resetSettings,
  saveSettings,
  type SiteSettings,
} from "@/lib/admin/settings-store";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  if (!settings) {
    return <div className="p-8 text-neutral-400">로딩 중...</div>;
  }

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSettings({ ...settings, [key]: value });

  const updateAddress = (key: keyof SiteSettings["address"], value: string) =>
    setSettings({
      ...settings,
      address: { ...settings.address, [key]: value },
    });

  const updateHours = (key: keyof SiteSettings["hours"], value: string) =>
    setSettings({
      ...settings,
      hours: { ...settings.hours, [key]: value },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm("로컬 변경사항을 초기화하고 시드 설정으로 되돌립니다."))
      return;
    resetSettings();
    setSettings(loadSettings());
  };

  return (
    <div className="p-8 max-w-3xl">
      <header className="mb-8">
        <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
          Settings
        </p>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">사이트 설정</h1>
        <p className="text-neutral-500 text-sm">
          전화·주소·진료시간 등 사이트 전역에서 사용되는 정보입니다.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Section title="기본 정보">
          <Field label="병원명" value={settings.name} onChange={(v) => update("name", v)} />
          <Field label="짧은 이름" value={settings.shortName} onChange={(v) => update("shortName", v)} />
          <Field
            label="설명 (메타 description)"
            value={settings.description}
            onChange={(v) => update("description", v)}
            multiline
          />
          <Field label="전화" value={settings.phone} onChange={(v) => update("phone", v)} />
        </Section>

        <Section title="주소">
          <Field
            label="도로명 주소"
            value={settings.address.streetAddress}
            onChange={(v) => updateAddress("streetAddress", v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="시·구"
              value={settings.address.addressLocality}
              onChange={(v) => updateAddress("addressLocality", v)}
            />
            <Field
              label="시·도"
              value={settings.address.addressRegion}
              onChange={(v) => updateAddress("addressRegion", v)}
            />
          </div>
        </Section>

        <Section title="진료시간">
          <div className="grid grid-cols-2 gap-3">
            <Field label="평일" value={settings.hours.weekday} onChange={(v) => updateHours("weekday", v)} />
            <Field label="토요일" value={settings.hours.saturday} onChange={(v) => updateHours("saturday", v)} />
            <Field label="공휴일" value={settings.hours.holiday} onChange={(v) => updateHours("holiday", v)} />
            <Field label="일요일" value={settings.hours.sunday} onChange={(v) => updateHours("sunday", v)} />
          </div>
        </Section>

        <Section title="외부 링크">
          <Field label="네이버 블로그" value={settings.blogUrl} onChange={(v) => update("blogUrl", v)} />
          <Field label="네이버 예약" value={settings.bookingUrl} onChange={(v) => update("bookingUrl", v)} />
        </Section>

        <div className="flex items-center gap-3 sticky bottom-4 bg-white border border-neutral-200 rounded-2xl p-4 shadow-lg">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
          >
            저장
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-bold hover:bg-neutral-50 transition-colors"
          >
            초기화
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              저장됨 (이 브라우저에만)
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 leading-relaxed">
        ⚠ 현재 변경 사항은 이 브라우저에만 저장됩니다. 실제 사이트(SSR/SSG)에는
        반영되지 않습니다. 백엔드 연결 시 라이브 사이트로 푸시되도록 교체될
        예정입니다. 지금 바로 반영하려면 <strong>내보내기 → site-settings.json
        교체 → 재배포</strong>를 거쳐야 합니다.
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200 space-y-4">
      <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}

function Field({ label, value, onChange, multiline }: FieldProps) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-neutral-600 mb-1">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      )}
    </label>
  );
}
