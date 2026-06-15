import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/primitives";

type StartPathPanelProps = {
  className?: string;
  sticky?: boolean;
};

export function StartPathPanel({ className = "", sticky = false }: StartPathPanelProps) {
  return (
    <section aria-label="Start a new path" className={`shrink-0 border-t border-[var(--console-border)] bg-[var(--console-input)] p-[var(--spacing-16)] sm:p-[var(--spacing-24)] ${sticky ? "sticky bottom-0 z-20" : ""} ${className}`}>
      <div className="w-full rounded-[var(--radius-lg)] border border-[var(--console-border)] bg-[var(--console-surface-secondary)] p-[var(--spacing-16)]">
        <p className="text-[length:var(--type-body01-size)] font-bold leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">Start new path</p>
        <p className="mt-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] text-[var(--console-text)]">
          Turn a goal, project, or ambition into a living system.
        </p>
        <div className="mt-[var(--spacing-16)]">
          <Button asChild size="2" variant="soft" color="gray" className="!h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
            <Link href="/paths/new">
              <Plus size={15} strokeWidth={1.8} /> Start path
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
