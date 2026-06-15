import { Progress, Text } from "@radix-ui/themes";
import { ChevronRight, Plus } from "lucide-react";
import { RecentEntriesPanel } from "@/components/recent-entries-panel";

const focusAreas = [
  {
    name: "Trading",
    summary: "Market preparation and review",
    items: [
      { name: "Review weekly strategy", meta: "Next review Friday", progress: 72 },
      { name: "Refine execution checklist", meta: "6 of 8 checks defined", progress: 75 },
    ],
  },
  {
    name: "Design",
    summary: "Console product foundation",
    items: [
      { name: "Build the interface system", meta: "Typography, colour and spacing", progress: 64 },
      { name: "Shape the Command view", meta: "Current focus", progress: 38 },
    ],
  },
  {
    name: "Home improvement",
    summary: "Active plans around the house",
    items: [
      { name: "Kitchen renovation plan", meta: "Planning", progress: 42 },
      { name: "Lounge furniture shortlist", meta: "Research", progress: 68 },
      { name: "Downstairs room claim", meta: "Next action defined", progress: 24 },
    ],
  },
  { name: "Health", summary: "Training and recovery", items: [] },
  { name: "Personal systems", summary: "Routines and operating rhythm", items: [] },
];

const recentEntries = [
  { title: "NQ strategy review", area: "Trading", when: "Today", tone: "accent" },
  { title: "Console layout direction", area: "Design", when: "Today", tone: "blue" },
  { title: "Kitchen scope notes", area: "Home", when: "Yesterday", tone: "amber" },
  { title: "Upper-body training", area: "Health", when: "Yesterday", tone: "red" },
  { title: "Weekly review complete", area: "Systems", when: "Jun 11", tone: "green" },
  { title: "Furniture references", area: "Home", when: "Jun 10", tone: "amber" },
  { title: "Pre-market checklist", area: "Trading", when: "Jun 10", tone: "accent" },
  { title: "Typography scale refined", area: "Design", when: "Jun 9", tone: "blue" },
  { title: "Lower-body training", area: "Health", when: "Jun 9", tone: "red" },
  { title: "Kitchen supplier notes", area: "Home", when: "Jun 8", tone: "green" },
  { title: "Monthly direction review", area: "Systems", when: "Jun 7", tone: "accent" },
  { title: "Navigation density pass", area: "Design", when: "Jun 7", tone: "blue" },
  { title: "Execution journal", area: "Trading", when: "Jun 6", tone: "amber" },
  { title: "Recovery session", area: "Health", when: "Jun 5", tone: "red" },
  { title: "Workspace reset", area: "Systems", when: "Jun 4", tone: "green" },
  { title: "Lounge measurements", area: "Home", when: "Jun 3", tone: "amber" },
];

function SectionHeader({ title, actionLabel, secondary = false }: { title: string; actionLabel: string; secondary?: boolean }) {
  return (
    <div className={`flex h-[var(--spacing-40)] items-center border-b border-[var(--console-border)] px-[var(--spacing-16)] sm:px-[var(--spacing-24)] ${secondary ? "bg-[var(--console-surface-secondary)]" : ""}`}>
      <Text size="2" weight="medium" className="text-[var(--console-text-inverse)]">{title}</Text>
      <button type="button" aria-label={actionLabel} className="ml-auto grid size-7 place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
        <Plus size={15} />
      </button>
    </div>
  );
}

function FocusArea({ area, initiallyOpen = false }: { area: (typeof focusAreas)[number]; initiallyOpen?: boolean }) {
  return (
    <details open={initiallyOpen} className="group bg-[var(--console-input)]">
      <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[16px_minmax(0,1fr)_auto] items-center gap-[var(--spacing-12)] border-b border-[var(--console-border)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
        <ChevronRight size={15} className="text-[var(--console-text-muted)] transition-transform group-open:rotate-90" />
        <div className="flex min-w-0 items-center gap-[var(--spacing-12)]">
          <Text as="p" size="2" weight="medium" className="shrink-0 text-[var(--console-text-inverse)]">{area.name}</Text>
          <Text as="p" size="1" truncate className="hidden text-[var(--console-text-muted)] sm:block">{area.summary}</Text>
        </div>
        <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-subtle)] transition-colors group-hover:text-[var(--console-text-muted)] hover:!bg-[var(--console-surface-secondary)] hover:!text-[var(--console-text-inverse)]">
          <Plus size={14} />
        </span>
      </summary>

      {area.items.length > 0 && (
        <div className="bg-[var(--console-input)]">
          {area.items.map((item) => (
            <div key={item.name} className="console-focus-task group/item grid h-[var(--spacing-40)] cursor-pointer grid-cols-[minmax(0,1fr)_112px] items-center gap-[var(--spacing-12)] border-b border-[var(--console-border)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:grid-cols-[minmax(0,1fr)_160px] sm:px-[var(--spacing-24)]">
              <div className="relative min-w-0 sm:pl-7">
                <ChevronRight className="absolute left-3 top-1/2 size-[14px] -translate-x-1 -translate-y-1/2 text-[var(--primitive-50)] opacity-0 transition-[opacity,transform] duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none" />
                <div className="flex min-w-0 items-center gap-[var(--spacing-12)] transition-transform duration-150 group-hover/item:translate-x-[var(--spacing-8)] motion-reduce:transform-none motion-reduce:transition-none">
                  <Text as="p" size="2" truncate className="text-[var(--console-text)] transition-colors group-hover/item:text-[var(--console-text-inverse)]">{item.name}</Text>
                  <Text as="p" size="1" truncate className="hidden text-[var(--console-text-muted)] transition-colors group-hover/item:text-[var(--primitive-50)] xl:block">{item.meta}</Text>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-[var(--spacing-8)]">
                <Progress value={item.progress} size="1" color="gray" className="console-task-progress !h-1 flex-1 [&>div]:!bg-[var(--console-accent)]" />
                <Text size="1" className="w-7 text-right text-[var(--console-text-muted)] transition-colors group-hover/item:text-[var(--primitive-50)]">{item.progress}%</Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </details>
  );
}

export default function CommandPage() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--shell-header-height))] flex-col">
      <div className="grid flex-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <section aria-labelledby="current-focus-heading" className="flex min-w-0 flex-col border-b border-[var(--console-border)] bg-[var(--console-input)] lg:border-b-0 lg:border-r">
          <h1 id="current-focus-heading" className="sr-only">Current focus</h1>
          <SectionHeader title="Current focus" actionLabel="Add focus area" secondary />
          <div>
            {focusAreas.map((area, index) => <FocusArea key={area.name} area={area} initiallyOpen={index < 3} />)}
          </div>
        </section>

        <RecentEntriesPanel entries={recentEntries} />
      </div>
    </div>
  );
}
