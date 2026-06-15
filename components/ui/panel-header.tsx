import { IconActionButton } from "@/components/ui/icon-action-button";

type PanelHeaderProps = {
  title: string;
  actionLabel?: string;
  secondary?: boolean;
};

export function PanelHeader({ title, actionLabel, secondary = false }: PanelHeaderProps) {
  return (
    <div className={`flex h-[var(--spacing-40)] items-center border-b border-[var(--console-border)] px-[var(--spacing-16)] sm:px-[var(--spacing-24)] ${secondary ? "bg-[var(--console-surface-secondary)]" : ""}`}>
      <p className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
        {title}
      </p>
      {actionLabel && <IconActionButton label={actionLabel} className="ml-auto" />}
    </div>
  );
}
