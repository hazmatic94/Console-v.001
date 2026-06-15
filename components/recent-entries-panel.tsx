"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text } from "@radix-ui/themes";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";

type RecentEntry = {
  title: string;
  area: string;
  when: string;
  tone: string;
};

const entryTones: Record<string, string> = {
  accent: "bg-[var(--console-accent)]",
  blue: "bg-[#7189ff]",
  amber: "bg-[#efb366]",
  red: "bg-[var(--console-danger)]",
  green: "bg-[#64bf76]",
};

export function RecentEntriesPanel({ entries }: { entries: RecentEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);

  const updateOverflow = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    setHasMore(element.scrollTop + element.clientHeight < element.scrollHeight - 2);
  }, []);

  useEffect(() => {
    updateOverflow();
    const element = scrollRef.current;
    if (!element) return;

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(element);
    return () => observer.disconnect();
  }, [entries.length, updateOverflow]);

  const scrollDown = () => {
    scrollRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <aside aria-labelledby="recent-entries-heading" className="grid h-[calc(100dvh-var(--shell-header-height))] min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-[var(--console-input)]">
      <section className="flex min-h-0 flex-col overflow-hidden">
        <h2 id="recent-entries-heading" className="sr-only">Recent entries</h2>
        <div className="flex h-[var(--spacing-40)] shrink-0 items-center border-b border-[var(--console-border)] bg-[var(--console-surface-secondary)] px-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
          <Text size="2" weight="medium" className="text-[var(--console-text-inverse)]">Recent entries</Text>
          <button type="button" aria-label="Add entry" className="ml-auto grid size-7 place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
            <Plus size={15} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div ref={scrollRef} onScroll={updateOverflow} className="h-full divide-y divide-[var(--console-border)] overflow-y-auto overscroll-contain">
            {entries.map((entry) => (
              <div key={`${entry.title}-${entry.when}`} className="group/entry grid h-[var(--spacing-40)] cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
                <div className="relative min-w-0">
                  <ChevronRight className="absolute -left-3 top-1/2 size-[14px] -translate-x-1 -translate-y-1/2 text-[var(--primitive-50)] opacity-0 transition-[opacity,transform] duration-150 group-hover/entry:translate-x-0 group-hover/entry:opacity-100 motion-reduce:transition-none" />
                  <div className="flex min-w-0 items-center gap-[var(--spacing-12)] transition-transform duration-150 group-hover/entry:translate-x-[var(--spacing-8)] motion-reduce:transform-none motion-reduce:transition-none">
                    <span className={`size-2 shrink-0 rounded-full ${entryTones[entry.tone]}`} />
                    <Text as="p" size="2" truncate className="text-[var(--console-text)] transition-colors group-hover/entry:text-[var(--console-text-inverse)]">{entry.title}</Text>
                  </div>
                </div>
                <Text size="1" className="text-[var(--console-text-muted)] transition-colors group-hover/entry:text-[var(--primitive-50)]">{entry.when}</Text>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[60px] items-end justify-center bg-gradient-to-b from-transparent to-[var(--console-input)]">
              <button type="button" onClick={scrollDown} aria-label="Scroll to more recent entries" className="pointer-events-auto grid size-8 animate-[console-scroll-cue_1.4s_ease-in-out_infinite] place-items-center rounded-full text-[var(--console-text-muted)] outline-none hover:text-[var(--console-text)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section aria-label="Start a new path" className="shrink-0 border-t border-[var(--console-border)] bg-[var(--console-input)] p-[var(--spacing-16)] sm:p-[var(--spacing-24)]">
        <div className="w-full rounded-[var(--radius-lg)] border border-[var(--console-border)] bg-[var(--console-surface-secondary)] p-[var(--spacing-16)]">
          <Text as="p" className="text-[14px] font-bold leading-[1.5] tracking-normal text-[var(--console-text-inverse)]">Start new path</Text>
          <Text as="p" className="mt-[var(--spacing-8)] text-[14px] leading-[1.5] text-[var(--console-text)]">
            Turn a goal, project, or ambition into a living system.
          </Text>
          <div className="mt-[var(--spacing-16)]">
            <Button size="2" variant="soft" color="gray" className="!h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[14px] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
              <Plus size={15} /> Start path
            </Button>
          </div>
        </div>
      </section>
    </aside>
  );
}
