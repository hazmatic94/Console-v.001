import { ChevronRight, Plus } from "lucide-react";
import type { ReactNode } from "react";

export type EntryTone = "accent" | "blue" | "amber" | "red" | "green";

const entryTones: Record<EntryTone, string> = {
  accent: "bg-[var(--console-accent)]",
  blue: "bg-[var(--console-status-blue)]",
  amber: "bg-[var(--console-status-amber)]",
  red: "bg-[var(--console-danger)]",
  green: "bg-[var(--console-status-green)]",
};

type DisclosureRowProps = {
  title: string;
  meta: string;
};

export function DisclosureRow({ title, meta }: DisclosureRowProps) {
  return (
    <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[16px_minmax(0,1fr)_auto] items-center gap-[var(--spacing-12)] border-b border-[var(--console-border)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
      <ChevronRight size={15} className="text-[var(--console-text-muted)] transition-[color,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover:text-[var(--console-text-inverse)] group-open:rotate-90" />
      <div className="flex min-w-0 items-center gap-[var(--spacing-12)]">
        <p className="shrink-0 text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">{title}</p>
        <p className="hidden truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover:text-[var(--console-text)] sm:block">{meta}</p>
      </div>
      <span className="grid size-[var(--control-icon-button-size)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-subtle)] transition-colors group-hover:text-[var(--console-text-muted)] hover:!bg-[var(--console-surface-secondary)] hover:!text-[var(--console-text-inverse)]">
        <Plus size={15} strokeWidth={1.8} />
      </span>
    </summary>
  );
}

type IndentedRowProps = {
  title: string;
  meta?: string;
  children?: ReactNode;
};

export function IndentedRow({ title, meta, children }: IndentedRowProps) {
  return (
    <div className="console-focus-task group/item grid h-[var(--spacing-40)] cursor-pointer grid-cols-[minmax(0,1fr)_var(--focus-task-progress-column)] items-center gap-[var(--spacing-12)] border-b border-[var(--console-border)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:grid-cols-[minmax(0,1fr)_var(--focus-task-progress-column-wide)] sm:px-[var(--spacing-24)]">
      <div className="relative min-w-0 sm:pl-[var(--control-icon-button-size)]">
        <ChevronRight className="absolute left-[var(--focus-task-chevron-left)] top-1/2 size-[var(--type-body01-size)] -translate-x-[var(--motion-chevron-shift)] -translate-y-1/2 text-[var(--primitive-50)] opacity-0 transition-[opacity,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none" />
        <div className="flex min-w-0 items-center gap-[var(--spacing-12)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/item:translate-x-[var(--motion-content-shift)] motion-reduce:transform-none motion-reduce:transition-none">
          <p className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)] transition-colors group-hover/item:text-[var(--console-text-inverse)]">{title}</p>
          {meta && <p className="hidden truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/item:text-[var(--primitive-50)] xl:block">{meta}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

type RecentEntryRowProps = {
  title: string;
  when: string;
  tone: EntryTone;
};

export function RecentEntryRow({ title, when, tone }: RecentEntryRowProps) {
  return (
    <div className="group/entry grid h-[var(--spacing-40)] cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
      <div className="relative min-w-0">
        <ChevronRight className="absolute -left-[var(--spacing-12)] top-1/2 size-[var(--type-body01-size)] -translate-x-[var(--motion-chevron-shift)] -translate-y-1/2 text-[var(--primitive-50)] opacity-0 transition-[opacity,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/entry:translate-x-0 group-hover/entry:opacity-100 motion-reduce:transition-none" />
        <div className="flex min-w-0 items-center gap-[var(--spacing-12)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/entry:translate-x-[var(--motion-content-shift)] motion-reduce:transform-none motion-reduce:transition-none">
          <span className={`size-[var(--status-dot-size)] shrink-0 rounded-full ${entryTones[tone]}`} />
          <p className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)] transition-colors group-hover/entry:text-[var(--console-text-inverse)]">{title}</p>
        </div>
      </div>
      <p className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/entry:text-[var(--primitive-50)]">{when}</p>
    </div>
  );
}
