import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type Status =
  | "not_started"
  | "in_progress"
  | "pending_review"
  | "approved"
  | "needs_changes"
  | "internal_ready"
  | "blocked";
type Milestone = {
  id: string;
  title: string;
  status: Status;
  result: string;
  evidence_refs: string[];
  blockers: string[];
  next_step: string;
};
type Registry = {
  title: string;
  overall_status: Status;
  plain_summary: string;
  updated_at: string;
  milestones: Milestone[];
};

const labels: Record<Status, string> = {
  not_started: "Belum dimulai",
  in_progress: "Sedang disiapkan",
  pending_review: "Menunggu pemeriksaan",
  approved: "Disetujui",
  needs_changes: "Perlu diperbaiki",
  internal_ready: "Siap diuji internal",
  blocked: "Terhenti sementara",
};

const root = resolve(import.meta.dirname, "../..");
const registry = JSON.parse(
  await readFile(
    resolve(root, "docs/implementation/phase-0-status.json"),
    "utf8",
  ),
) as Registry;
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const markdown = `# Status Phase 0 — ${registry.title}\n\n> **${labels[registry.overall_status]}:** ${registry.plain_summary}\n\nDiperbarui: ${registry.updated_at}\n\n| Milestone | Status | Hasil yang mudah dipahami | Langkah berikutnya |\n| --- | --- | --- | --- |\n${registry.milestones.map((item) => `| ${item.id} — ${item.title} | **${labels[item.status]}** | ${item.result} | ${item.next_step} |`).join("\n")}\n\n## Hal yang masih menunggu\n\n${registry.milestones.flatMap((item) => item.blockers.map((blocker) => `- **${item.id}:** ${blocker}`)).join("\n")}\n\nDokumen ini dihasilkan dari \`phase-0-status.json\`; jangan mengeditnya langsung.\n`;

const cards = registry.milestones
  .map(
    (item) =>
      `<article class="card" data-status="${item.status}"><div class="card__top"><span>${escapeHtml(item.id)}</span><strong>${escapeHtml(labels[item.status])}</strong></div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.result)}</p><h3>Berikutnya</h3><p>${escapeHtml(item.next_step)}</p>${item.blockers.length ? `<details><summary>${item.blockers.length} hal masih menunggu</summary><ul>${item.blockers.map((blocker) => `<li>${escapeHtml(blocker)}</li>`).join("")}</ul></details>` : ""}</article>`,
  )
  .join("");
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Status Phase 0 Nekoru</title><style>:root{font-family:system-ui,sans-serif;color:#25233a;background:#f7f4ef}*{box-sizing:border-box}body{margin:0}main{width:min(70rem,calc(100% - 2rem));margin:auto;padding:3rem 0 5rem}.eyebrow{font-weight:800;color:#5548a9}.hero{background:#302b63;color:#fff;border-radius:1.5rem;padding:clamp(1.5rem,5vw,4rem);box-shadow:0 1rem 3rem #302b6326}.hero strong{display:inline-block;border:2px solid currentColor;border-radius:.5rem;padding:.35rem .65rem}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr));gap:1rem;margin-top:1.5rem}.card{background:#fff;border:1px solid #ded8ce;border-radius:1rem;padding:1.25rem;box-shadow:0 .35rem 1.2rem #302b6312}.card__top{display:flex;justify-content:space-between;gap:1rem;color:#5548a9}.card h2{font-size:1.15rem}.card h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;margin-top:1.5rem}.card strong{font-size:.8rem}.card[data-status=internal_ready]{border-top:6px solid #207a56}.card[data-status=in_progress]{border-top:6px solid #c2771a}.card[data-status=pending_review]{border-top:6px solid #6a5acd}summary{cursor:pointer;min-height:44px;padding:.75rem 0;font-weight:700}:focus-visible{outline:3px solid #e36d8d;outline-offset:3px}@media(max-width:420px){main{width:min(100% - 1rem,70rem);padding-top:.5rem}.hero{border-radius:1rem}}</style></head><body><main><section class="hero"><p class="eyebrow">NEKORU · PHASE 0</p><h1>${escapeHtml(registry.title)}</h1><p><strong>${escapeHtml(labels[registry.overall_status])}</strong></p><p>${escapeHtml(registry.plain_summary)}</p><small>Diperbarui ${escapeHtml(registry.updated_at)}</small></section><section class="grid" aria-label="Milestone Phase 0">${cards}</section></main></body></html>`;

await Promise.all([
  writeFile(resolve(root, "docs/implementation/phase-0-status.md"), markdown),
  writeFile(resolve(root, "docs/implementation/phase-0-status.html"), html),
]);
