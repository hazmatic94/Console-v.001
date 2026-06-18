"use client";

import { useEffect, useMemo, useState } from "react";
import { Ban, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PanelHeader } from "@/components/ui/panel-header";
import { Text } from "@/components/ui/primitives";

type CompletedTask = {
  category: "Trading" | "Design" | "Home improvement" | "Productivity" | "Bodybuilding";
  name: string;
  time: string;
};

type DayActivity = {
  reflection?: string;
  tasks: CompletedTask[];
};

const categoryColours: Record<CompletedTask["category"], string> = {
  Trading: "var(--console-status-amber)",
  Design: "var(--console-status-blue)",
  "Home improvement": "var(--console-status-green)",
  Productivity: "#e5f56f",
  Bodybuilding: "var(--console-danger)",
};

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const taskPool: CompletedTask[] = [
  { category: "Trading", name: "Run pre-market prep & bias plan", time: "7:45 AM" },
  { category: "Trading", name: "Backtest 5 setups on NQ", time: "12:30 PM" },
  { category: "Trading", name: "Journal yesterdays trades", time: "8:20 AM" },
  { category: "Design", name: "Document row variants", time: "10:15 AM" },
  { category: "Design", name: "Tighten CTA hover states", time: "11:40 AM" },
  { category: "Design", name: "Add components to design system", time: "10:50 AM" },
  { category: "Home improvement", name: "Collect cabinet references", time: "5:35 PM" },
  { category: "Home improvement", name: "Measure shelving wall", time: "4:10 PM" },
  { category: "Home improvement", name: "Create materials checklist", time: "6:05 PM" },
  { category: "Productivity", name: "Morning planning ritual", time: "9:05 AM" },
  { category: "Productivity", name: "Create shutdown checklist", time: "7:05 PM" },
  { category: "Productivity", name: "Track daily completion score", time: "8:00 PM" },
  { category: "Bodybuilding", name: "Log top sets and backoffs", time: "6:20 PM" },
  { category: "Bodybuilding", name: "Set protein floor", time: "8:10 AM" },
  { category: "Bodybuilding", name: "Track sleep for seven nights", time: "8:15 AM" },
];

const reflectionPool = [
  "Kept the work small enough to finish and left the next action obvious.",
  "Progress felt clearer once the day was anchored to one path at a time.",
  "Good momentum. The completed tasks created a useful record instead of noise.",
  "A quiet but useful day. The checkpoint notes made the next step easier.",
  "The rhythm held up across focus work, review and recovery.",
];

const completedPaths = [
  { title: "Console row system pass", meta: "Completed 14 Jun 2026", value: "18 tasks" },
  { title: "Daily planning reset", meta: "Completed 9 Jun 2026", value: "12 tasks" },
  { title: "Kitchen scope outline", meta: "Completed 4 Jun 2026", value: "9 tasks" },
];

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric" }).format(date);
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", weekday: "long" }).format(date);
}

function buildActivity(month: Date): Record<string, DayActivity> {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  return Object.fromEntries(
    Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const count = ((day * 7 + monthIndex) % 5) + 1;
      const tasks = Array.from({ length: count }, (_task, taskIndex) => {
        const task = taskPool[(day + taskIndex * 3 + monthIndex) % taskPool.length];
        return { ...task };
      });

      return [
        dateKey(new Date(year, monthIndex, day)),
        {
          reflection: reflectionPool[(day + monthIndex) % reflectionPool.length],
          tasks,
        },
      ];
    }),
  );
}

function densityClass(count: number, selected: boolean) {
  if (selected) return "border-[var(--console-accent)] bg-[var(--primitive-400)] text-[var(--console-text-inverse)]";

  const base = "border-[var(--console-border)] bg-[var(--console-input)]";
  if (count > 0) return `${base} text-[var(--console-text)]`;
  return `${base} text-[var(--console-text-muted)]`;
}

function CalendarDay({
  activity,
  date,
  inMonth,
  selected,
  onSelect,
}: {
  activity?: DayActivity;
  date: Date;
  inMonth: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const count = activity?.tasks.length ?? 0;
  const visibleTasks = activity?.tasks.slice(0, 4) ?? [];
  const hiddenTaskCount = Math.max(0, count - visibleTasks.length);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group/day flex min-h-[calc(var(--spacing-64)+var(--spacing-40))] flex-col border p-[var(--spacing-8)] text-left outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] ${densityClass(count, selected)} ${inMonth ? "" : "opacity-35"}`}
    >
      <span className="mb-[var(--spacing-8)] text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)]">
        {date.getDate()}
      </span>
      {visibleTasks.length > 0 && (
        <span className="flex min-h-0 flex-1 flex-col gap-[var(--spacing-4)]">
          {visibleTasks.map((task) => (
            <span key={`${task.name}-${task.time}`} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-8)]">
              <span className="flex min-w-0 items-center gap-[var(--spacing-4)]">
                <span aria-hidden="true" className="h-[14px] w-[var(--spacing-4)] shrink-0 rounded-[var(--radius-full)]" style={{ backgroundColor: categoryColours[task.category] }} />
                <span className={`truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] group-hover/day:text-[var(--console-text-inverse)] ${selected ? "text-[var(--console-text-inverse)]" : "text-[var(--console-text)]"}`}>
                  {task.name}
                </span>
              </span>
              <span className={`shrink-0 text-[length:var(--type-key-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] group-hover/day:text-[var(--primitive-50)] ${selected ? "text-[var(--primitive-50)]" : "text-[var(--console-text-muted)]"}`}>
                {task.time}
              </span>
            </span>
          ))}
          {hiddenTaskCount > 0 && (
            <span className={`text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] group-hover/day:text-[var(--primitive-50)] ${selected ? "text-[var(--primitive-50)]" : "text-[var(--console-text-muted)]"}`}>
              +{hiddenTaskCount} more
            </span>
          )}
        </span>
      )}
    </button>
  );
}

function SectionRow({
  meta,
  title,
  value,
}: {
  meta: string;
  title: string;
  value: string;
}) {
  return (
    <div className="group/path-row grid min-h-[var(--spacing-40)] grid-cols-[minmax(0,1fr)_auto] items-start gap-[var(--spacing-16)] border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-8)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
      <div className="grid min-w-0 grid-cols-[17px_minmax(0,1fr)] items-start gap-x-[var(--spacing-12)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/path-row:translate-x-[var(--motion-content-shift)] motion-reduce:transform-none motion-reduce:transition-none">
        <span
          aria-hidden="true"
          className="mt-[3px] grid size-[17px] shrink-0 place-items-center rounded-[var(--radius-full)] border border-[var(--console-accent)] bg-[var(--primitive-400)]"
        >
          <Check size={12} strokeWidth={2.2} className="text-[var(--console-accent)]" />
        </span>
        <div className="min-w-0">
          <Text as="p" className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] line-through decoration-[var(--console-text-inverse)]">
            {title}
          </Text>
          <Text as="p" className="truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
            {meta}
          </Text>
        </div>
      </div>
      <Text as="p" className="shrink-0 pt-[3px] text-right text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
        {value}
      </Text>
    </div>
  );
}

function DayNotes({
  activity,
  note,
  onNoteChange,
}: {
  activity?: DayActivity;
  note: string;
  onNoteChange: (value: string) => void;
}) {
  const notes = [
    ...(activity?.reflection ? [{ body: activity.reflection, meta: "Checkpoint reflection" }] : []),
    { body: "Energy was better after keeping the first task small and obvious.", meta: "Morning note" },
    { body: "The completed list gives a clearer record than trying to remember what moved.", meta: "Progress note" },
    { body: "Next checkpoint should compare the task plan against the actual day.", meta: "Follow-up" },
  ];

  return (
    <section className="shrink-0 border-t border-[var(--console-border)] bg-[var(--console-input)]">
      <PanelHeader title="Notes" secondary />
      <div className="flex max-h-[42dvh] min-h-[300px] flex-col">
        <div className="console-scroll-clean flex min-h-0 flex-1 flex-col overflow-y-auto">
          {notes.map((item) => (
            <div key={`${item.meta}-${item.body}`} className="group/note relative cursor-pointer border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-12)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
              <ChevronRight className="absolute left-[var(--spacing-8)] top-1/2 size-[var(--type-body01-size)] -translate-x-[var(--motion-chevron-shift)] -translate-y-1/2 text-[var(--primitive-50)] opacity-0 transition-[opacity,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/note:translate-x-0 group-hover/note:opacity-100 motion-reduce:transition-none" />
              <div className="min-w-0 transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/note:translate-x-[var(--motion-content-shift)] motion-reduce:transform-none motion-reduce:transition-none">
                <Text as="p" className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/note:text-[var(--primitive-50)]">
                  {item.meta}
                </Text>
                <Text as="p" className="mt-[var(--spacing-4)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)] transition-colors group-hover/note:text-[var(--console-text-inverse)]">
                  {item.body}
                </Text>
              </div>
            </div>
          ))}
        </div>
        <div className="px-[var(--spacing-16)] pb-[var(--spacing-40)] pt-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Add day notes..."
            rows={3}
            className="min-h-[88px] w-full resize-y rounded-[var(--radius-field)] border border-[var(--console-border)] bg-[var(--console-surface-hover)] p-[var(--spacing-12)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] caret-[var(--console-text-inverse)] outline-none transition-[border-color,box-shadow] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] placeholder:text-[var(--console-text-muted)] focus:border-[var(--console-accent-500)] focus:shadow-[0_0_0_var(--border-width)_var(--console-accent-500)]"
          />
        </div>
      </div>
    </section>
  );
}

function DayDetails({
  activity,
  note,
  onNoteChange,
  selectedDate,
}: {
  activity?: DayActivity;
  note: string;
  onNoteChange: (value: string) => void;
  selectedDate: Date;
}) {
  return (
    <aside aria-labelledby="progress-day-heading" className="flex min-w-0 flex-col bg-[var(--console-input)] lg:h-full lg:overflow-hidden">
      <h2 id="progress-day-heading" className="sr-only">Day details</h2>
      <PanelHeader title="Day details" secondary />
      <div className="console-scroll-clean min-h-0 flex-1 lg:overflow-y-auto lg:overscroll-contain">
        <div className="border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
          <Text as="p" className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
            Selected date
          </Text>
          <Text as="p" className="mt-[var(--spacing-4)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
            {formatDay(selectedDate)}
          </Text>
        </div>

        {activity ? (
          <div className="flex flex-col">
            <section>
              <PanelHeader title="Completed tasks" secondary />
              <div>
                {activity.tasks.map((task) => (
                  <div key={`${task.name}-${task.time}`} className="grid min-h-[var(--spacing-40)] grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-16)] border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-8)] sm:px-[var(--spacing-24)]">
                    <div className="min-w-0">
                      <div className="grid min-w-0 grid-cols-[var(--status-dot-size)_minmax(0,1fr)] items-start gap-x-[var(--spacing-8)]">
                        <span aria-hidden="true" className="mt-[7px] size-[var(--status-dot-size)] shrink-0 rounded-[var(--radius-full)]" style={{ backgroundColor: categoryColours[task.category] }} />
                        <div className="min-w-0">
                          <Text as="p" className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
                            {task.name}
                          </Text>
                          <Text as="p" className="mt-[var(--spacing-4)] truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                            {task.category}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Text as="p" className="shrink-0 text-right text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
                      {task.time}
                    </Text>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="completed-paths-heading">
              <PanelHeader title="Completed paths" secondary />
              <h2 id="completed-paths-heading" className="sr-only">Completed paths</h2>
              {completedPaths.map((path) => (
                <SectionRow key={path.title} title={path.title} meta={path.meta} value={path.value} />
              ))}
            </section>
          </div>
        ) : (
          <div className="min-h-full">
            <div className="grid min-h-[320px] place-items-center px-[var(--spacing-16)] py-[var(--spacing-24)] text-center sm:px-[var(--spacing-24)]">
              <div>
                <Ban size={36} strokeWidth={1.7} className="mx-auto text-[var(--console-text-inverse)]" />
                <Text as="p" className="mt-[var(--spacing-16)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
                  No activity recorded for this day.
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
      <DayNotes activity={activity} note={note} onNoteChange={onNoteChange} />
    </aside>
  );
}

export default function ProgressPage() {
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const activityByDay = useMemo(() => buildActivity(visibleMonth), [visibleMonth]);
  const selectedDayKey = dateKey(selectedDate);
  const selectedActivity = activityByDay[selectedDayKey];
  const days = useMemo(() => {
    const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const start = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1 - startOffset);

    return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
  }, [visibleMonth]);

  const changeMonth = (direction: number) => {
    setVisibleMonth((current) => {
      const nextMonth = new Date(current.getFullYear(), current.getMonth() + direction, 1);
      setSelectedDate(nextMonth);
      return nextMonth;
    });
  };

  const updateSelectedDayNote = (value: string) => {
    setDayNotes((current) => ({ ...current, [selectedDayKey]: value }));
  };

  useEffect(() => {
    document.documentElement.classList.add("console-page-scroll-lock");
    document.body.classList.add("console-page-scroll-lock");
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.classList.remove("console-page-scroll-lock");
      document.body.classList.remove("console-page-scroll-lock");
    };
  }, []);

  return (
    <div className="console-page-frame flex min-h-[calc(100dvh_-_var(--shell-header-height))] flex-col">
      <div className="console-page-panels grid flex-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)] lg:overflow-hidden">
        <section aria-labelledby="progress-heading" className="flex min-w-0 flex-col border-b border-[var(--console-border)] bg-[var(--console-input)] lg:h-full lg:overflow-hidden lg:border-b-0 lg:border-r">
          <h1 id="progress-heading" className="sr-only">Progress</h1>
          <PanelHeader title="Calendar" secondary />
          <div className="console-scroll-clean min-h-0 flex-1 lg:overflow-y-auto lg:overscroll-contain">
            <section aria-label="Monthly progress calendar" className="border-b border-[var(--console-border)]">
              <div className="flex min-h-[var(--spacing-40)] items-center gap-[var(--spacing-12)] border-b border-[var(--console-border)] px-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
                <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} className="grid size-[var(--control-icon-button-size)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
                  <ChevronLeft size={15} strokeWidth={1.8} />
                </button>
                <Text as="p" className="min-w-0 flex-1 text-center text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
                  {formatMonth(visibleMonth)}
                </Text>
                <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="grid size-[var(--control-icon-button-size)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-muted)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
                  <ChevronRight size={15} strokeWidth={1.8} />
                </button>
              </div>
              <div className="grid grid-cols-7 border-b border-[var(--console-border)]">
                {weekdayLabels.map((day) => (
                  <Text key={day} as="p" className="border-r border-[var(--console-border)] px-[var(--spacing-8)] py-[var(--spacing-8)] text-center text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] last:border-r-0">
                    {day}
                  </Text>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {days.map((day) => (
                  <CalendarDay
                    key={dateKey(day)}
                    activity={activityByDay[dateKey(day)]}
                    date={day}
                    inMonth={day.getMonth() === visibleMonth.getMonth()}
                    selected={dateKey(day) === dateKey(selectedDate)}
                    onSelect={() => setSelectedDate(day)}
                  />
                ))}
              </div>
            </section>

          </div>
        </section>

        <DayDetails activity={selectedActivity} note={dayNotes[selectedDayKey] ?? ""} onNoteChange={updateSelectedDayNote} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
