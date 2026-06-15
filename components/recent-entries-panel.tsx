"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PanelHeader } from "@/components/ui/panel-header";
import { RecentEntryRow, type EntryTone } from "@/components/ui/rows";
import { StartPathPanel } from "@/components/ui/start-path-panel";

type RecentEntry = {
  title: string;
  area: string;
  when: string;
  tone: EntryTone;
};

export function RecentEntriesPanel({ entries }: { entries: RecentEntry[] }) {
  const startPathRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);
  const [showPinnedStartPath, setShowPinnedStartPath] = useState(true);

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

  useEffect(() => {
    const updatePinnedStartPath = () => {
      const startPath = startPathRef.current;
      if (!startPath) return;

      const isMobileLayout = !window.matchMedia("(min-width: 768px)").matches;
      setShowPinnedStartPath(isMobileLayout && startPath.getBoundingClientRect().top > window.innerHeight);
    };

    updatePinnedStartPath();
    window.addEventListener("scroll", updatePinnedStartPath, { passive: true });
    window.addEventListener("resize", updatePinnedStartPath);

    const observer = new ResizeObserver(updatePinnedStartPath);
    if (startPathRef.current) observer.observe(startPathRef.current);

    return () => {
      window.removeEventListener("scroll", updatePinnedStartPath);
      window.removeEventListener("resize", updatePinnedStartPath);
      observer.disconnect();
    };
  }, []);

  const scrollDown = () => {
    scrollRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <>
      <aside aria-labelledby="recent-entries-heading" className="min-w-0 bg-[var(--console-input)] lg:grid lg:h-[calc(100dvh-var(--shell-header-height))] lg:grid-rows-[minmax(0,1fr)_auto] lg:overflow-hidden">
        <section className="flex min-h-0 flex-col lg:overflow-hidden">
          <h2 id="recent-entries-heading" className="sr-only">Recent entries</h2>
          <PanelHeader title="Recent entries" actionLabel="Add entry" secondary />

          <div className="relative min-h-0 flex-1 lg:overflow-hidden">
            <div ref={scrollRef} onScroll={updateOverflow} className="divide-y divide-[var(--console-border)] lg:h-full lg:overflow-y-auto lg:overscroll-contain">
              {entries.map((entry) => (
                <RecentEntryRow key={`${entry.title}-${entry.when}`} title={entry.title} when={entry.when} tone={entry.tone} />
              ))}
            </div>

            {hasMore && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[var(--scroll-cue-height)] items-end justify-center bg-gradient-to-b from-transparent to-[var(--console-input)]">
                <button type="button" onClick={scrollDown} aria-label="Scroll to more recent entries" className="pointer-events-auto grid size-[var(--control-icon-button-size)] animate-[console-scroll-cue_1.4s_ease-in-out_infinite] place-items-center rounded-full text-[var(--console-text-muted)] outline-none hover:text-[var(--console-text)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
                  <ChevronDown size={18} />
                </button>
              </div>
            )}
          </div>
        </section>

        <div ref={startPathRef}>
          <StartPathPanel />
        </div>
      </aside>

      {showPinnedStartPath && <StartPathPanel className="fixed inset-x-0 bottom-0 z-30 md:hidden" />}
    </>
  );
}
