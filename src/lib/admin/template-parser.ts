import type { AiPost } from "@/lib/ai-posts";
import { slugify } from "@/lib/admin/posts-store";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export interface ParseResult {
  post: AiPost | null;
  errors: string[];
  warnings: string[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function parsePost(text: string): ParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!text.trim()) {
    return { post: null, errors: ["내용을 입력해주세요."], warnings };
  }

  const match = text.replace(/^﻿/, "").match(FRONTMATTER_RE);
  if (!match) {
    return {
      post: null,
      errors: [
        "프론트매터(--- 로 감싼 메타데이터)를 찾을 수 없습니다. 마스터 템플릿 형식을 확인해주세요.",
      ],
      warnings,
    };
  }

  const fmRaw = match[1];
  const body = (match[2] ?? "").trim();

  const fields: Record<string, string> = {};
  for (const line of fmRaw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();
    // unwrap quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fields[key] = value;
  }

  const title = fields.title?.trim();
  if (!title) errors.push("title 항목이 필요합니다.");
  if (!body) errors.push("본문(HTML)이 비어 있습니다.");

  // slug: from field, or auto from title
  let slug = fields.slug?.trim();
  if (!slug && title) {
    slug = slugify(title);
    warnings.push(`slug가 비어 있어 제목에서 자동 생성됨: "${slug}"`);
  }
  if (slug && !/^[a-z0-9가-힣-]+$/.test(slug)) {
    errors.push(
      "slug에는 소문자 영숫자/한글/하이픈만 사용할 수 있습니다.",
    );
  }

  // summary: from field, or auto from body
  let summary = fields.summary?.trim();
  if (!summary && body) {
    const text = stripHtml(body);
    summary = text.slice(0, 160) + (text.length > 160 ? "…" : "");
    warnings.push("summary가 비어 있어 본문에서 자동 생성됨.");
  }

  // dates
  const publishedAt = fields.publishedAt?.trim() || todayISO();
  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    errors.push("publishedAt 형식이 잘못되었습니다. (YYYY-MM-DD)");
  }
  const updatedAt = todayISO();

  const tags = (fields.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const category = fields.category?.trim() || "clinic-info";
  const language = fields.language?.trim() || "ko-KR";

  if (errors.length > 0) {
    return { post: null, errors, warnings };
  }

  const post: AiPost = {
    slug: slug!,
    title: title!,
    summary: summary ?? "",
    content: body,
    category,
    tags,
    language,
    publishedAt,
    updatedAt,
  };

  return { post, errors, warnings };
}

export function serializePost(post: AiPost): string {
  const lines = [
    "---",
    `title: ${post.title}`,
    `slug: ${post.slug}`,
    `summary: ${post.summary ?? ""}`,
    `category: ${post.category}`,
    `tags: ${post.tags.join(", ")}`,
    `publishedAt: ${post.publishedAt}`,
    `language: ${post.language}`,
    "---",
    "",
    post.content,
  ];
  return lines.join("\n");
}

export const MASTER_TEMPLATE_REFERENCE = `---
title: 글 제목을 입력하세요
slug:
summary:
category: clinic-info
tags: 태그1, 태그2
publishedAt:
language: ko-KR
---
<h2>개요</h2>
<p>이 글이 다루는 주제를 환자 시선에서 한 단락으로 소개합니다.</p>

<h2>핵심 항목</h2>
<ul>
  <li>핵심 1</li>
  <li>핵심 2</li>
  <li>핵심 3</li>
</ul>

<h2>마무리</h2>
<p>요약 또는 다음 단계 안내(예약·전화 문의).</p>
`;
