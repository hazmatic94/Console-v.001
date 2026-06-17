import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/primitives";

type StartPathPanelProps = {
  actionHref?: string | null;
  actionLabel?: string;
  className?: string;
  copy?: string;
  sticky?: boolean;
  title?: string;
};

export function StartPathPanel({
  actionHref = "/paths/new",
  actionLabel = "Start path",
  className = "",
  copy = "Turn a goal, project, or ambition into a living system.",
  sticky = false,
  title = "Start new path",
}: StartPathPanelProps) {
  return (
    <section aria-label={title} className={`shrink-0 border-t border-[var(--console-border)] bg-[var(--console-input)] p-[var(--spacing-16)] sm:p-[var(--spacing-24)] ${sticky ? "sticky bottom-0 z-20" : ""} ${className}`}>
      <div className="w-full rounded-[var(--radius-lg)] border border-[var(--console-border)] bg-[var(--console-surface-secondary)] p-[var(--spacing-16)]">
        <p className="text-[length:var(--type-body01-size)] font-bold leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">{title}</p>
        <p className="mt-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] text-[var(--console-text)]">
          {copy}
        </p>
        <div className="mt-[var(--spacing-16)]">
          {actionHref ? (
            <Button asChild size="2" variant="soft" color="gray" className="console-cta !h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] hover:!text-[var(--console-text-inverse)] active:!bg-[var(--console-button-secondary-active)]">
              <Link href={actionHref}>
                <Plus size={15} strokeWidth={1.8} /> {actionLabel}
              </Link>
            </Button>
          ) : (
            <Button type="button" size="2" variant="soft" color="gray" className="console-cta !h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] hover:!text-[var(--console-text-inverse)] active:!bg-[var(--console-button-secondary-active)]">
              <Plus size={15} strokeWidth={1.8} /> {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
