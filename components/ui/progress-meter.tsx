type ProgressMeterProps = {
  value: number;
};

export function ProgressMeter({ value }: ProgressMeterProps) {
  return (
    <div className="flex min-w-0 items-center gap-[var(--spacing-8)]">
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className="console-task-progress h-[var(--progress-height)] flex-1 overflow-hidden rounded-[var(--radius-full)] bg-[var(--console-border)]">
        <div className="h-full bg-[var(--console-accent)]" style={{ width: `${value}%` }} />
      </div>
      <p className="w-[var(--control-icon-button-size)] text-right text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/item:text-[var(--primitive-50)]">
        {value}%
      </p>
    </div>
  );
}
