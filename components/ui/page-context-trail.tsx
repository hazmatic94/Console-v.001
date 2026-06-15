import { Text } from "@radix-ui/themes";

type PageContextTrailProps = {
  section: string;
  view: string;
  className?: string;
};

export function PageContextTrail({ section, view, className = "" }: PageContextTrailProps) {
  return (
    <div className={`hidden min-w-0 items-center gap-[var(--spacing-8)] px-[var(--spacing-24)] md:flex ${className}`}>
      <Text as="p" truncate className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
        {section}
      </Text>
      <span aria-hidden="true" className="text-[var(--console-text-subtle)]">/</span>
      <Text as="p" truncate className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
        {view}
      </Text>
    </div>
  );
}
