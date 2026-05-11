"use client";

import { useEffect, useState } from "react";
import { apiFetch, clearToken, getToken, setToken } from "@/lib/api/client";

interface AdminInfo {
  id: number;
  loginId: string;
  name: string;
  role: string | null;
}

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (!token) {
        if (!cancelled) setAuthed(false);
        return;
      }
      try {
        const me = await apiFetch<AdminInfo>("/api/auth/me");
        if (cancelled) return;
        setAdmin(me);
        setAuthed(true);
      } catch {
        if (cancelled) return;
        clearToken();
        setAuthed(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await apiFetch<{
        accessToken: string;
        admin: AdminInfo;
      }>("/api/auth/login", {
        method: "POST",
        body: { loginId, password },
      });
      setToken(data.accessToken);
      setAdmin(data.admin);
      setAuthed(true);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "로그인 중 오류가 발생했습니다.",
      );
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    setAdmin(null);
    setAuthed(false);
    setLoginId("");
    setPassword("");
  };

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-neutral-400 text-sm">로딩 중...</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm"
        >
          <div className="mb-6">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-bold text-neutral-900">
              관리자 로그인
            </h1>
            <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
              아이디와 비밀번호로 로그인합니다.
            </p>
          </div>
          <label className="block mb-3">
            <span className="block text-sm font-medium text-neutral-700 mb-2">
              아이디
            </span>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoFocus
              autoComplete="username"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary text-neutral-900"
              placeholder="login_id"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-neutral-700 mb-2">
              비밀번호
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary text-neutral-900"
              placeholder="비밀번호"
              required
            />
          </label>
          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:bg-neutral-300"
          >
            {submitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg shadow-lg">
        {admin && <span className="opacity-80">{admin.name}</span>}
        <button
          onClick={handleLogout}
          className="font-bold hover:underline"
        >
          로그아웃
        </button>
      </div>
    </>
  );
}
