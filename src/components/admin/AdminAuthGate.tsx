"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "tok_admin_session_v1";
// TODO: replace with backend auth. For now, use NEXT_PUBLIC_ADMIN_PASSCODE or fall back to "tokbareun-admin".
const PASSCODE =
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? "tokbareun-admin";

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(window.sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
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
              현재는 임시 패스코드 인증입니다. 백엔드 연결 시 실제 인증으로
              교체될 예정입니다.
            </p>
          </div>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-neutral-700 mb-2">
              패스코드
            </span>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary text-neutral-900"
              placeholder="패스코드 입력"
            />
          </label>
          {error && (
            <p className="text-sm text-red-500 mb-3">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg shadow-lg hover:bg-neutral-800 transition-colors"
      >
        로그아웃
      </button>
    </>
  );
}
