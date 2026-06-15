import { Plus, type LucideIcon } from "lucide-react";

type IconActionButtonProps = {
  label: string;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
};

export function IconActionButton({ label, icon: Icon = Plus, className = "", onClick }: IconActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-[var(--control-icon-button-size)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] ${className}`}
    >
      <Icon size={15} strokeWidth={1.8} />
    </button>
  );
}
