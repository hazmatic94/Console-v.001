"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import {
  ChevronRight,
  Command as CommandIcon,
  LogOut,
  Menu,
  Network,
  Palette,
  Route,
  Search,
  Settings,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = { label: string; href: string; icon: LucideIcon };

const navItems: NavItem[] = [
  { label: "Command", href: "/command", icon: CommandIcon },
  { label: "Paths", href: "/paths", icon: Route },
  { label: "Missions", href: "/missions", icon: Target },
  { label: "Architect", href: "/architect", icon: Network },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Design system", href: "/design-system", icon: Palette },
];

const headerContext: Record<string, { section: string; view: string }> = {
  "/command": { section: "Command", view: "Current focus" },
  "/paths": { section: "Paths", view: "Overview" },
  "/missions": { section: "Missions", view: "Overview" },
  "/architect": { section: "Architect", view: "Overview" },
  "/settings": { section: "Settings", view: "Preferences" },
  "/design-system": { section: "Design system", view: "Foundation" },
};

function Brand() {
  return (
    <Link href="/command" aria-label="Console home" className="flex h-[var(--spacing-32)] min-w-0 items-center justify-center rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] min-[1100px]:justify-start">
      <Image src="/console-icon.svg" alt="" width={19} height={19} priority className="size-[19px] min-[1100px]:hidden" />
      <Image src="/console-wordmark.svg" alt="Console" width={97} height={22} priority className="hidden h-[22px] w-[97px] min-[1100px]:block" />
    </Link>
  );
}

function Navigation({ onNavigate, expanded = false }: { onNavigate?: () => void; expanded?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className={expanded ? "flex flex-col gap-px px-[var(--spacing-24)]" : "flex flex-col items-center gap-px px-[var(--spacing-16)] min-[1100px]:items-stretch min-[1100px]:px-[var(--spacing-24)]"}>
      {navItems.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;
        const link = (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            aria-label={label}
            className={`group flex items-center rounded-[var(--radius-sm)] text-[13px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] ${expanded ? "h-[var(--spacing-32)] w-full gap-[var(--spacing-8)] px-[var(--spacing-8)]" : "size-[var(--spacing-32)] justify-center min-[1100px]:h-[var(--spacing-32)] min-[1100px]:w-full min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-8)] min-[1100px]:px-[var(--spacing-8)]"} ${
              active
                ? "bg-[var(--console-nav-item-selected)] text-[var(--console-text-inverse)]"
                : "text-[var(--console-text-muted)] hover:bg-[var(--console-surface)] hover:text-[var(--console-text)]"
            }`}
          >
            <Icon size={16} strokeWidth={active ? 2 : 1.7} className={active ? "text-[var(--console-accent)]" : undefined} />
            <span className={expanded ? "inline" : "hidden min-[1100px]:inline"}>{label}</span>
          </Link>
        );

        return expanded ? link : (
          <Tooltip key={href} content={label} side="right" delayDuration={250} className="console-rail-tooltip !border !border-[var(--console-border)] !bg-[var(--console-input)] !text-[var(--console-text-muted)] !shadow-none min-[1100px]:!hidden">
            {link}
          </Tooltip>
        );
      })}
    </nav>
  );
}

function UserIdentity({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className={`h-[var(--shell-header-height)] shrink-0 ${expanded ? "px-[var(--spacing-24)]" : "px-[var(--spacing-16)] min-[1100px]:px-[var(--spacing-24)]"}`}>
      <div className={`flex h-[var(--shell-header-height)] items-center border-b border-[var(--console-border)] ${expanded ? "gap-[var(--spacing-12)]" : "justify-center min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-12)]"}`}>
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-[var(--console-border-strong)] bg-[var(--console-surface)]">
          <Image src="/harry-maher-avatar.png" alt="Harry Maher" fill sizes="36px" className="object-cover object-center" />
        </div>
        <div className={expanded ? "min-w-0" : "hidden min-w-0 min-[1100px]:block"}>
          <Text as="p" size="2" weight="medium" truncate className="text-[var(--console-text-inverse)]">Harry Maher</Text>
          <Text as="p" size="1" truncate className="mt-px text-[var(--console-text-muted)]">The Architect</Text>
        </div>
        <ChevronRight size={15} strokeWidth={1.7} className={`ml-auto shrink-0 text-[var(--console-text-muted)] ${expanded ? "block" : "hidden min-[1100px]:block"}`} />
      </div>
    </div>
  );
}

function HeaderContext() {
  const pathname = usePathname();
  const context = headerContext[pathname] ?? { section: "Console", view: "Overview" };

  return (
    <div className="hidden min-w-0 items-center gap-[var(--spacing-8)] px-[var(--spacing-24)] md:flex">
      <Text size="2" weight="medium" truncate className="text-[var(--console-text-inverse)]">{context.section}</Text>
      <span aria-hidden="true" className="text-[var(--console-text-subtle)]">/</span>
      <Text size="2" truncate className="text-[var(--console-text-muted)]">{context.view}</Text>
    </div>
  );
}

function CommandTrigger() {
  return (
    <div className="flex items-center justify-end md:px-[var(--spacing-24)]">
      <button type="button" aria-label="Open search" className="group/search flex h-[var(--spacing-32)] items-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] border border-[var(--console-border)] bg-[var(--console-surface-secondary)] px-[var(--spacing-8)] text-[13px] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] md:w-[180px] md:px-[var(--spacing-12)] min-[1100px]:!w-[220px]">
        <Search size={15} strokeWidth={1.8} className="text-[var(--console-text-inverse)]" />
        <span className="hidden text-[var(--console-text)] transition-colors group-hover/search:text-[var(--primitive-50)] md:block">Search</span>
        <kbd className="ml-auto hidden rounded-[4px] border border-[var(--console-border)] px-1.5 py-0.5 font-[var(--font-mono)] text-[10px] leading-none text-[var(--console-text-muted)] transition-colors group-hover/search:border-[var(--primitive-50)] group-hover/search:text-[var(--primitive-50)] md:block">⌘ K</kbd>
      </button>
    </div>
  );
}

function Sidebar({ onNavigate, expanded = false }: { onNavigate?: () => void; expanded?: boolean }) {
  const logoutButton = (
    <button
      type="button"
      aria-label="Log out"
      className={`flex items-center rounded-[var(--radius-sm)] text-[13px] text-[var(--console-text-inverse)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] ${expanded ? "h-[var(--spacing-32)] w-full gap-[var(--spacing-8)] px-[var(--spacing-8)]" : "size-[var(--spacing-32)] justify-center min-[1100px]:h-[var(--spacing-32)] min-[1100px]:w-full min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-8)] min-[1100px]:px-[var(--spacing-8)]"}`}
    >
      <LogOut size={16} strokeWidth={1.8} className="text-[var(--console-danger)]" />
      <span className={expanded ? "inline" : "hidden min-[1100px]:inline"}>Log out</span>
    </button>
  );

  return (
    <Flex direction="column" className="h-full bg-[var(--console-sidebar)]">
      <UserIdentity expanded={expanded} />
      <div className="pt-[var(--spacing-16)]">
        <Navigation onNavigate={onNavigate} expanded={expanded} />
      </div>
      <div className={`mt-auto pb-[var(--spacing-24)] ${expanded ? "px-[var(--spacing-24)]" : "px-[var(--spacing-16)] min-[1100px]:px-[var(--spacing-24)]"}`}>
        {expanded ? logoutButton : (
          <Tooltip content="Log out" side="right" delayDuration={250} className="console-rail-tooltip !border !border-[var(--console-border)] !bg-[var(--console-input)] !text-[var(--console-text-muted)] !shadow-none min-[1100px]:!hidden">
            {logoutButton}
          </Tooltip>
        )}
      </div>
    </Flex>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[var(--console-bg)]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[var(--shell-sidebar-width)] flex-col border-r border-[var(--console-border)] bg-[var(--console-sidebar)] md:flex">
        <div className="flex h-[var(--shell-header-height)] shrink-0 items-center justify-center border-b border-[var(--console-border)] px-[var(--spacing-16)] min-[1100px]:justify-start min-[1100px]:px-[var(--spacing-24)]">
          <Brand />
        </div>
        <div className="min-h-0 flex-1">
          <Sidebar />
        </div>
      </aside>

      <header className="sticky top-0 z-40 grid h-[var(--shell-header-height)] grid-cols-[minmax(0,1fr)_auto] items-center border-b border-[var(--console-border)] bg-[var(--console-header)] px-[var(--spacing-12)] backdrop-blur-xl md:ml-[var(--shell-sidebar-width)] md:w-[calc(100%-var(--shell-sidebar-width))] md:grid-cols-[minmax(280px,1fr)_auto] md:px-0">
        <div className="flex min-w-0 items-center gap-[var(--spacing-8)] md:hidden">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <IconButton variant="ghost" color="gray" aria-label="Open navigation" className="md:!hidden">
                <Menu size={18} />
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Content className="!fixed !inset-y-0 !left-0 !m-0 !h-dvh !w-[min(82vw,280px)] !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-y-0 !border-l-0 !border-r !border-[var(--console-border)] !bg-[var(--console-sidebar)] !p-0">
              <Dialog.Title className="sr-only">Navigation</Dialog.Title>
              <div className="absolute right-3 top-3 z-10">
                <Dialog.Close>
                  <IconButton variant="ghost" color="gray" aria-label="Close navigation"><X size={18} /></IconButton>
                </Dialog.Close>
              </div>
              <Sidebar onNavigate={() => setOpen(false)} expanded />
            </Dialog.Content>
          </Dialog.Root>
          <Brand />
        </div>

        <HeaderContext />
        <CommandTrigger />
      </header>

      <div className="min-h-[calc(100dvh-var(--shell-header-height))] md:grid md:grid-cols-[var(--shell-sidebar-width)_minmax(0,1fr)]">
        <div className="min-w-0 md:col-start-2">
          <main className="min-h-[calc(100dvh-var(--shell-header-height))] w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
