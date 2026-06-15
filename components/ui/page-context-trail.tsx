import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageContextTrailProps = {
  backHref?: string;
  backLabel?: string;
  section: string;
  view?: string;
  className?: string;
};

export function PageContextTrail({ backHref, backLabel = "Go back", section, view, className = "" }: PageContextTrailProps) {
  return (
    <div className={`hidden min-w-0 items-center gap-[var(--spacing-8)] px-[var(--spacing-24)] md:flex ${className}`}>
      {backHref && (
        <Link
          href={backHref}
          aria-label={backLabel}
          className="group/back grid size-[var(--spacing-32)] shrink-0 place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
        >
          <ChevronLeft
            size={15}
            strokeWidth={1.7}
            className="translate-x-[var(--motion-chevron-shift)] transition-[color,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/back:translate-x-0 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>
      )}
      <p className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
        {section}
      </p>
      {view && (
        <>
          <span aria-hidden="true" className="text-[var(--console-text-subtle)]">/</span>
          <p className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
            {view}
          </p>
        </>
      )}
    </div>
  );
}
