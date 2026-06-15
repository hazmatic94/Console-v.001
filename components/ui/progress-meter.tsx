import { Progress, Text } from "@radix-ui/themes";

type ProgressMeterProps = {
  value: number;
};

export function ProgressMeter({ value }: ProgressMeterProps) {
  return (
    <div className="flex min-w-0 items-center gap-[var(--spacing-8)]">
      <Progress value={value} size="1" color="gray" className="console-task-progress !h-[var(--progress-height)] flex-1 [&>div]:!bg-[var(--console-accent)]" />
      <Text as="p" className="w-[var(--control-icon-button-size)] text-right text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/item:text-[var(--primitive-50)]">
        {value}%
      </Text>
    </div>
  );
}
