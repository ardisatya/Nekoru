import type { ReactNode } from "react";

export function StatusMessage({
  tone,
  title,
  children,
}: {
  tone: "info" | "success" | "warning" | "danger";
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`nk-status nk-status--${tone}`}
      aria-labelledby={`status-${tone}`}
    >
      <h2 id={`status-${tone}`}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
