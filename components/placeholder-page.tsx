import { Flex, Heading, Text } from "@radix-ui/themes";
import { Circle, CircleDotDashed } from "lucide-react";

export function PlaceholderPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex min-h-[calc(100dvh-var(--shell-header-height))] w-full flex-col">
      <div className="flex min-h-14 shrink-0 items-center border-b border-[var(--console-border)] px-4 sm:px-6">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <Heading as="h1" size="3" weight="medium" className="tracking-[-0.015em]">{title}</Heading>
          <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">{eyebrow}</Text>
        </div>
      </div>

      <div className="relative flex min-h-[460px] flex-1 items-center justify-center px-6 py-16 sm:px-10">
        <Flex direction="column" gap="4" className="w-full max-w-[430px] -translate-y-4 sm:-translate-y-6">
          <div aria-hidden="true" className="relative h-12 w-12 text-[var(--console-accent)]">
            <CircleDotDashed className="absolute left-0 top-0" size={30} strokeWidth={1.25} />
            <Circle className="absolute bottom-0 right-0" size={27} strokeWidth={1.25} />
          </div>
          <Flex direction="column" gap="2">
            <Heading as="h2" size="4" weight="medium" className="tracking-[-0.02em]">{title} is ready</Heading>
            <Text as="p" size="2" className="max-w-[390px] leading-6 text-[var(--console-text-muted)]">{description}</Text>
          </Flex>
          <Text size="1" className="text-[var(--console-text-subtle)]">Foundation established · Content will appear here</Text>
        </Flex>
      </div>
    </div>
  );
}
