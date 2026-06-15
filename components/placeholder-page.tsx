import { Circle, CircleDotDashed } from "lucide-react";
import { Heading, Text } from "@/components/ui/primitives";

export function PlaceholderPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex min-h-[calc(100dvh-var(--shell-header-height))] w-full flex-col">
      <div className="flex min-h-[var(--spacing-64)] shrink-0 items-center border-b border-[var(--console-border)] px-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
        <div className="flex min-w-0 items-baseline gap-[var(--spacing-8)]">
          <Heading as="h1" size="3" weight="medium" className="tracking-[-0.015em]">{title}</Heading>
          <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">{eyebrow}</Text>
        </div>
      </div>

      <div className="relative flex min-h-[var(--placeholder-min-height)] flex-1 items-center justify-center px-[var(--spacing-24)] py-[var(--spacing-64)] sm:px-[var(--spacing-40)]">
        <div className="flex w-full max-w-[var(--placeholder-content-width)] -translate-y-[var(--spacing-16)] flex-col gap-[var(--spacing-16)] sm:-translate-y-[var(--spacing-24)]">
          <div aria-hidden="true" className="relative h-[var(--spacing-40)] w-[var(--spacing-40)] text-[var(--console-accent)]">
            <CircleDotDashed className="absolute left-0 top-0" size={30} strokeWidth={1.25} />
            <Circle className="absolute bottom-0 right-0" size={27} strokeWidth={1.25} />
          </div>
          <div className="flex flex-col gap-[var(--spacing-8)]">
            <Heading as="h2" size="4" weight="medium" className="tracking-[-0.02em]">{title} is ready</Heading>
            <Text as="p" size="2" className="max-w-[var(--placeholder-copy-width)] leading-6 text-[var(--console-text-muted)]">{description}</Text>
          </div>
          <Text size="1" className="text-[var(--console-text-subtle)]">Foundation established · Content will appear here</Text>
        </div>
      </div>
    </div>
  );
}
