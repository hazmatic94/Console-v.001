"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Text } from "@/components/ui/primitives";

type PathTask = {
  name: string;
  status?: string;
  xp?: string;
};

type PathItem = {
  meta?: string;
  name: string;
  status?: string;
  tasks: PathTask[];
};

type PathGroup = {
  color: string;
  name: string;
  paths: PathItem[];
};

const pathGroups = [
  {
    color: "var(--console-status-amber)",
    name: "Trading",
    paths: [
      {
        name: "Mastering EUR/USD",
        meta: "Build consistency around EUR/USD execution, review and discipline.",
        status: "Just added",
        tasks: [
          { name: "Journal yesterdays trades", xp: "+25xp" },
          { name: "Run pre-market prep & bias plan", xp: "+25xp" },
          { name: "Backtest 5 setups on NQ", xp: "+25xp" },
          { name: "No FOMO trades today (self-check at EOD)", xp: "+25xp" },
          { name: "Liquidity grabs this session", status: "Just added" },
        ],
      },
      {
        name: "NQ consistency phase",
        meta: "Create a repeatable process for clean NQ setups and execution reviews.",
        tasks: [
          { name: "Define A+ setup checklist", xp: "+25xp" },
          { name: "Screenshot three clean examples", xp: "+25xp" },
          { name: "Write entry invalidation rules", xp: "+25xp" },
          { name: "Review execution at market close", xp: "+25xp" },
        ],
      },
    ],
  },
  {
    color: "var(--console-status-blue)",
    name: "Design",
    paths: [
      {
        name: "Console interface system",
        meta: "Turn the product UI into a consistent, reusable design language.",
        status: "Just added",
        tasks: [
          { name: "Map component states", xp: "+25xp" },
          { name: "Document row variants", xp: "+25xp" },
          { name: "Tighten CTA hover states", xp: "+25xp" },
          { name: "Review responsive layouts", xp: "+25xp" },
          { name: "Publish design pass", status: "Just added" },
        ],
      },
      {
        name: "Path dashboard refresh",
        meta: "Clarify how paths, tasks and states should be scanned at a glance.",
        tasks: [
          { name: "Audit empty and filled states", xp: "+25xp" },
          { name: "Define path list hierarchy", xp: "+25xp" },
          { name: "Check mobile menu spacing", xp: "+25xp" },
          { name: "Add components to design system", xp: "+25xp" },
        ],
      },
    ],
  },
  {
    color: "var(--console-status-green)",
    name: "Home improvement",
    paths: [
      {
        name: "Kitchen renovation plan",
        meta: "Shape the kitchen project into clear decisions, quotes and build steps.",
        status: "Just added",
        tasks: [
          { name: "Collect cabinet references", xp: "+25xp" },
          { name: "Price benchtop options", xp: "+25xp" },
          { name: "Book electrician quote", xp: "+25xp" },
          { name: "Create materials checklist", xp: "+25xp" },
          { name: "Layout draft locked", status: "Just added" },
        ],
      },
      {
        name: "Garage storage reset",
        meta: "Create a cleaner garage setup with sorted tools and practical storage.",
        tasks: [
          { name: "Sort tools into keep and donate", xp: "+25xp" },
          { name: "Measure shelving wall", xp: "+25xp" },
          { name: "Choose storage bins", xp: "+25xp" },
          { name: "Schedule install block", xp: "+25xp" },
        ],
      },
    ],
  },
  {
    color: "#e5f56f",
    name: "Productivity",
    paths: [
      {
        name: "Daily execution system",
        meta: "Build a daily operating rhythm for planning, focus and review.",
        status: "Just added",
        tasks: [
          { name: "Set morning planning ritual", xp: "+25xp" },
          { name: "Create shutdown checklist", xp: "+25xp" },
          { name: "Batch admin into one block", xp: "+25xp" },
          { name: "Track daily completion score", xp: "+25xp" },
          { name: "First review cycle", status: "Just added" },
        ],
      },
      {
        name: "Deep work operating rhythm",
        meta: "Protect focused work blocks and remove the friction around starting.",
        tasks: [
          { name: "Block two protected sessions", xp: "+25xp" },
          { name: "Remove meeting conflicts", xp: "+25xp" },
          { name: "Create distraction parking list", xp: "+25xp" },
          { name: "Review weekly output", xp: "+25xp" },
        ],
      },
    ],
  },
  {
    color: "var(--console-danger)",
    name: "Bodybuilding",
    paths: [
      {
        name: "Hypertrophy phase one",
        meta: "Set up a focused training phase around progressive overload and recovery.",
        status: "Just added",
        tasks: [
          { name: "Lock four day split", xp: "+25xp" },
          { name: "Log top sets and backoffs", xp: "+25xp" },
          { name: "Add mobility warmup", xp: "+25xp" },
          { name: "Check weekly bodyweight trend", xp: "+25xp" },
          { name: "Phase one created", status: "Just added" },
        ],
      },
      {
        name: "Recovery and nutrition base",
        meta: "Support training with consistent protein, sleep and fatigue tracking.",
        tasks: [
          { name: "Set protein floor", xp: "+25xp" },
          { name: "Track sleep for seven nights", xp: "+25xp" },
          { name: "Plan two rest day meals", xp: "+25xp" },
          { name: "Review fatigue markers", xp: "+25xp" },
        ],
      },
    ],
  },
] satisfies PathGroup[];

function StatusPill({ children }: { children: string }) {
  return (
    <span className="rounded-[var(--radius-sm)] border border-[var(--console-border-accent)] bg-[var(--console-accent-500)] px-[var(--spacing-8)] py-[var(--spacing-4)] text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
      {children}
    </span>
  );
}

function PathTaskRow({
  name,
  status,
  checked,
  onToggle,
}: PathTask & {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onToggle}
      className={`group/path-task grid min-h-[var(--spacing-40)] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-16)] px-[var(--spacing-16)] text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)] ${checked ? "hover:bg-transparent" : "hover:bg-[var(--console-surface)]"}`}
    >
      <div className="relative min-w-0 sm:pl-[var(--control-icon-button-size)]">
        <div className={`flex min-w-0 items-center gap-[var(--spacing-12)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] motion-reduce:transform-none motion-reduce:transition-none ${checked ? "translate-x-[var(--motion-content-shift)]" : "group-hover/path-task:translate-x-[var(--motion-content-shift)]"}`}>
          <span
            aria-hidden="true"
            className={`grid size-[17px] shrink-0 place-items-center rounded-[var(--radius-full)] border transition-[background-color,border-color,opacity] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] motion-reduce:transition-none ${
              checked
                ? "border-[var(--console-accent)] bg-[var(--primitive-400)] opacity-100"
                : "border-[var(--console-text-muted)] opacity-0 group-hover/path-task:border-[var(--primitive-50)] group-hover/path-task:bg-[var(--primitive-400)] group-hover/path-task:opacity-100"
            }`}
          >
            <Check
              size={12}
              strokeWidth={2.2}
              className={`transition-opacity ${checked ? "text-[var(--console-accent)] opacity-100" : "text-[var(--primitive-50)] opacity-0 group-hover/path-task:opacity-100"}`}
            />
          </span>
          <Text as="p" className={`truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] transition-colors ${checked ? "text-[var(--console-text-inverse)] line-through decoration-[var(--console-text-inverse)]" : "text-[var(--console-text)] group-hover/path-task:text-[var(--console-text-inverse)]"}`}>
            {name}
          </Text>
        </div>
      </div>
      {status ? <StatusPill>{status}</StatusPill> : null}
    </button>
  );
}

function PathItemBlock({
  open,
  path,
  checkedTasks,
  onToggle,
  onToggleTask,
}: {
  open: boolean;
  path: PathItem;
  checkedTasks: Record<string, boolean>;
  onToggle: () => void;
  onToggleTask: (name: string) => void;
}) {
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div className={`border-b border-[var(--console-border)] ${open ? "bg-[var(--primitive-400)]" : ""}`}>
      <div className="group/path-item grid min-h-[var(--spacing-40)] grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-16)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className="flex min-w-0 items-center gap-[var(--spacing-12)] rounded-[var(--radius-sm)] text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
        >
          <Chevron size={16} strokeWidth={1.8} className="shrink-0 text-[var(--console-text-inverse)] transition-colors group-hover/path-item:text-[var(--console-accent-400)]" />
          <span className="flex min-w-0 items-center gap-[var(--spacing-12)]">
            <Text as="span" className="shrink-0 truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] transition-colors">
              {path.name}
            </Text>
            {path.meta && (
              <Text as="span" className="hidden truncate text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/path-item:text-[var(--console-text)] sm:block">
                {path.meta}
              </Text>
            )}
          </span>
        </button>
        {path.status ? <StatusPill>{path.status}</StatusPill> : null}
      </div>
      {open &&
        path.tasks.map((task) => {
          const taskKey = `${path.name}:${task.name}`;

          return (
            <PathTaskRow
              key={taskKey}
              {...task}
              checked={Boolean(checkedTasks[taskKey])}
              onToggle={() => onToggleTask(taskKey)}
            />
          );
        })}
    </div>
  );
}

function PathGroupHeader({ color, name, onToggle, open = false }: { color: string; name: string; onToggle: () => void; open?: boolean }) {
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div className="group/path-header grid min-h-[var(--spacing-40)] grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-16)] border-b border-[var(--console-border)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-w-0 items-center gap-[var(--spacing-12)] rounded-[var(--radius-sm)] text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
      >
        <Chevron size={16} strokeWidth={1.8} className="shrink-0 text-[var(--console-text-inverse)] transition-colors group-hover/path-header:text-[var(--console-accent-400)]" />
        <span aria-hidden="true" className="size-[var(--status-dot-size)] shrink-0 rounded-[var(--radius-full)]" style={{ backgroundColor: color }} />
        <Text as="p" className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
          {name}
        </Text>
      </button>
      <Link href={`/paths/new?type=${encodeURIComponent(name)}`} aria-label={`Add path to ${name}`} className="console-cta grid size-[var(--control-icon-button-size)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text)] outline-none transition-colors hover:bg-[var(--console-surface-secondary)] hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
        <Plus size={16} strokeWidth={1.8} />
      </Link>
    </div>
  );
}

function PathGroupSection({
  group,
  open,
  openPaths,
  checkedTasks,
  onToggleGroup,
  onTogglePath,
  onToggleTask,
}: {
  group: PathGroup;
  open: boolean;
  openPaths: Record<string, boolean>;
  checkedTasks: Record<string, boolean>;
  onToggleGroup: () => void;
  onTogglePath: (name: string) => void;
  onToggleTask: (name: string) => void;
}) {
  return (
    <>
      <PathGroupHeader color={group.color} name={group.name} open={open} onToggle={onToggleGroup} />
      {open &&
        group.paths.map((path) => (
          <PathItemBlock
            key={path.name}
            path={path}
            open={Boolean(openPaths[path.name])}
            checkedTasks={checkedTasks}
            onToggle={() => onTogglePath(path.name)}
            onToggleTask={onToggleTask}
          />
        ))}
    </>
  );
}

export default function PathsPage() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pathGroups.map((group) => [group.name, true])),
  );
  const [openPaths, setOpenPaths] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(pathGroups.flatMap((group) => group.paths.map((path) => [path.name, true]))),
  );
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleGroup = (name: string) => {
    setOpenGroups((current) => ({ ...current, [name]: !current[name] }));
  };

  const togglePath = (name: string) => {
    setOpenPaths((current) => ({ ...current, [name]: !current[name] }));
  };

  const toggleTask = (name: string) => {
    setCheckedTasks((current) => ({ ...current, [name]: !current[name] }));
  };

  return (
    <div className="min-h-[calc(100dvh_-_var(--shell-header-height))] bg-[var(--console-input)]">
      <section className="grid min-h-[180px] items-center border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-[var(--spacing-24)]">
        <div className="max-w-[560px]">
          <h1 className="text-[length:var(--type-h2-size)] font-normal leading-[var(--leading-normal)] tracking-[var(--tracking-heading)] text-[var(--console-text-inverse)]">
            Your Codex Paths
          </h1>
          <Text as="p" className="mt-[var(--spacing-12)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
            Each path is a focused area you're leveling up in. Track your progress, talk with your agent, and break things down one step at a time.
          </Text>
        </div>
        <Link href="/paths/new" className="console-cta mt-[var(--spacing-24)] inline-flex h-[var(--spacing-32)] w-fit items-center justify-center gap-[var(--spacing-8)] justify-self-start rounded-[var(--radius-sm)] border border-[var(--console-border)] bg-[var(--console-button-secondary)] px-[var(--spacing-12)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-button-secondary-text)] outline-none transition-colors hover:bg-[var(--console-button-secondary-hover)] hover:text-[var(--console-text-inverse)] active:bg-[var(--console-button-secondary-active)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] lg:mt-0 lg:justify-self-end">
          <Plus size={16} strokeWidth={1.8} />
          Create path
        </Link>
      </section>

      <section aria-label="Path list" className="border-b border-[var(--console-border)]">
        {pathGroups.map((group) => (
          <PathGroupSection
            key={group.name}
            group={group}
            open={Boolean(openGroups[group.name])}
            openPaths={openPaths}
            checkedTasks={checkedTasks}
            onToggleGroup={() => toggleGroup(group.name)}
            onTogglePath={togglePath}
            onToggleTask={toggleTask}
          />
        ))}
      </section>
    </div>
  );
}
