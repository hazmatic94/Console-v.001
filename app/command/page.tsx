import { RecentEntriesPanel } from "@/components/recent-entries-panel";
import { PanelHeader } from "@/components/ui/panel-header";
import { ProgressMeter } from "@/components/ui/progress-meter";
import { DisclosureRow, IndentedRow, type EntryTone } from "@/components/ui/rows";

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

const recentEntries: Array<{ title: string; area: string; when: string; tone: EntryTone }> = [
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

function FocusArea({ area, initiallyOpen = false }: { area: (typeof focusAreas)[number]; initiallyOpen?: boolean }) {
  return (
    <details open={initiallyOpen} className="group bg-[var(--console-input)]">
      <DisclosureRow title={area.name} meta={area.summary} />

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
