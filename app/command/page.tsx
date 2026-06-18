import { RecentEntriesPanel } from "@/components/recent-entries-panel";
import { PanelHeader } from "@/components/ui/panel-header";
import { ProgressMeter } from "@/components/ui/progress-meter";
import { DisclosureRow, IndentedRow, type EntryTone } from "@/components/ui/rows";

const focusAreas = [
  {
    name: "Trading",
    tone: "trading",
    summary: "Market preparation and review",
    items: [
      { name: "Review weekly strategy", meta: "Next review Friday", progress: 72 },
      { name: "Refine execution checklist", meta: "6 of 8 checks defined", progress: 75 },
    ],
  },
  {
    name: "Design",
    tone: "design",
    summary: "Console product foundation",
    items: [
      { name: "Build the interface system", meta: "Typography, colour and spacing", progress: 64 },
      { name: "Shape the Command view", meta: "Current focus", progress: 38 },
    ],
  },
  {
    name: "Home improvement",
    tone: "home",
    summary: "Active plans around the house",
    items: [
      { name: "Kitchen renovation plan", meta: "Planning", progress: 42 },
      { name: "Lounge furniture shortlist", meta: "Research", progress: 68 },
      { name: "Downstairs room claim", meta: "Next action defined", progress: 24 },
    ],
  },
  { name: "Health", tone: "bodybuilding", summary: "Training and recovery", items: [] },
  { name: "Personal systems", tone: "productivity", summary: "Routines and operating rhythm", items: [] },
] satisfies Array<{ name: string; tone: EntryTone; summary: string; items: Array<{ name: string; meta: string; progress: number }> }>;

const recentEntries: Array<{ title: string; area: string; when: string; tone: EntryTone }> = [
  { title: "NQ strategy review", area: "Trading", when: "Today", tone: "trading" },
  { title: "Console layout direction", area: "Design", when: "Today", tone: "design" },
  { title: "Kitchen scope notes", area: "Home improvement", when: "Yesterday", tone: "home" },
  { title: "Upper-body training", area: "Health", when: "Yesterday", tone: "bodybuilding" },
  { title: "Weekly review complete", area: "Personal systems", when: "Jun 11", tone: "productivity" },
  { title: "Furniture references", area: "Home improvement", when: "Jun 10", tone: "home" },
  { title: "Pre-market checklist", area: "Trading", when: "Jun 10", tone: "trading" },
  { title: "Typography scale refined", area: "Design", when: "Jun 9", tone: "design" },
  { title: "Lower-body training", area: "Health", when: "Jun 9", tone: "bodybuilding" },
  { title: "Kitchen supplier notes", area: "Home improvement", when: "Jun 8", tone: "home" },
  { title: "Monthly direction review", area: "Personal systems", when: "Jun 7", tone: "productivity" },
  { title: "Navigation density pass", area: "Design", when: "Jun 7", tone: "design" },
  { title: "Execution journal", area: "Trading", when: "Jun 6", tone: "trading" },
  { title: "Recovery session", area: "Health", when: "Jun 5", tone: "bodybuilding" },
  { title: "Workspace reset", area: "Personal systems", when: "Jun 4", tone: "productivity" },
  { title: "Lounge measurements", area: "Home improvement", when: "Jun 3", tone: "home" },
];

function FocusArea({ area, initiallyOpen = false }: { area: (typeof focusAreas)[number]; initiallyOpen?: boolean }) {
  return (
    <details open={initiallyOpen} className="group bg-[var(--console-input)]">
      <DisclosureRow title={area.name} meta={area.summary} tone={area.tone} />

      {area.items.length > 0 && (
        <div className="bg-[var(--console-input)]">
          {area.items.map((item) => (
            <IndentedRow key={item.name} title={item.name} meta={item.meta}>
              <ProgressMeter value={item.progress} />
            </IndentedRow>
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
          <PanelHeader title="Current focus" actionLabel="Add focus area" secondary />
          <div>
            {focusAreas.map((area, index) => <FocusArea key={area.name} area={area} initiallyOpen={index < 3} />)}
          </div>
        </section>

        <RecentEntriesPanel entries={recentEntries} />
      </div>
    </div>
  );
}
