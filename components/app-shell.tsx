"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Flex, Text, Tooltip } from "@radix-ui/themes";
import {
  ChevronRight,
  Command as CommandIcon,
  LogOut,
  Network,
  Palette,
  Route,
  Settings,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import { PageContextTrail } from "@/components/ui/page-context-trail";
import { SearchTrigger } from "@/components/ui/search-trigger";

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

function Brand({ mobileFull = false }: { mobileFull?: boolean }) {
  return (
    <Link href="/command" aria-label="Console home" className="flex h-[var(--spacing-32)] w-full min-w-0 items-center justify-center rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] min-[1100px]:justify-start">
      <Image src="/console-rail-icon.svg" alt="" width={27} height={44} priority className={`${mobileFull ? "hidden" : "block"} h-[var(--logo-rail-height)] w-[var(--logo-rail-width)] shrink-0 min-[1100px]:hidden`} />
      <Image src="/console-lockup.svg" alt="Console" width={150} height={45} priority className={`${mobileFull ? "block" : "hidden"} h-[var(--logo-lockup-height)] w-[var(--logo-lockup-width)] shrink-0 min-[1100px]:block`} />
    </Link>
  );
}

function MobileMenuButton({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-[var(--spacing-16)] w-[18px]">
      <span className={`absolute left-0 top-[4px] h-px w-full bg-current transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] ${open ? "translate-y-[4px] rotate-45" : ""}`} />
      <span className={`absolute left-0 top-[12px] h-px w-full bg-current transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
    </span>
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
            className={`group flex items-center rounded-[var(--radius-sm)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] ${expanded ? "h-[var(--spacing-32)] w-full gap-[var(--spacing-8)] px-[var(--spacing-8)]" : "size-[var(--spacing-32)] justify-center min-[1100px]:h-[var(--spacing-32)] min-[1100px]:w-full min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-8)] min-[1100px]:px-[var(--spacing-8)]"} ${
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
      <div className={`group/user flex h-[var(--shell-header-height)] cursor-pointer items-center border-b border-[var(--console-border)] ${expanded ? "gap-[var(--spacing-12)]" : "justify-center min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-12)]"}`}>
        <div className="relative size-[var(--avatar-size)] shrink-0 overflow-hidden rounded-full border border-[var(--console-border-strong)] bg-[var(--console-surface)]">
          <Image src="/harry-maher-avatar.png" alt="Harry Maher" fill sizes="36px" className="object-cover object-center" />
        </div>
        <div className={expanded ? "min-w-0" : "hidden min-w-0 min-[1100px]:block"}>
          <Text as="p" truncate className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">Harry Maher</Text>
          <Text as="p" truncate className="mt-px text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)] transition-colors group-hover/user:text-[var(--primitive-50)]">The Architect</Text>
        </div>
        <ChevronRight size={15} strokeWidth={1.7} className={`ml-auto shrink-0 -translate-x-[var(--motion-chevron-shift)] text-[var(--console-text-muted)] transition-[color,transform] duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/user:translate-x-0 group-hover/user:text-[var(--console-text-inverse)] motion-reduce:transform-none motion-reduce:transition-none ${expanded ? "block" : "hidden min-[1100px]:block"}`} />
      </div>
    </div>
  );
}

function HeaderContext() {
  const pathname = usePathname();
  const context = headerContext[pathname] ?? { section: "Console", view: "Overview" };

  return <PageContextTrail section={context.section} view={context.view} />;
}

function Sidebar({ onNavigate, expanded = false }: { onNavigate?: () => void; expanded?: boolean }) {
  const logoutButton = (
    <button
      type="button"
      aria-label="Log out"
      className={`flex items-center rounded-[var(--radius-sm)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] ${expanded ? "h-[var(--spacing-32)] w-full gap-[var(--spacing-8)] px-[var(--spacing-8)]" : "size-[var(--spacing-32)] justify-center min-[1100px]:h-[var(--spacing-32)] min-[1100px]:w-full min-[1100px]:justify-start min-[1100px]:gap-[var(--spacing-8)] min-[1100px]:px-[var(--spacing-8)]"}`}
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

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex h-dvh flex-col overflow-y-auto bg-[var(--console-sidebar)]">
      <div className="flex h-[var(--shell-header-height)] shrink-0 items-center justify-between border-b border-[var(--console-border)] px-[var(--spacing-16)]">
        <div className="w-[var(--logo-lockup-width)]">
          <Brand mobileFull />
        </div>
        <Dialog.Close>
          <button
            type="button"
            aria-label="Close navigation"
            className="grid size-[var(--spacing-32)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-inverse)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </Dialog.Close>
      </div>

      <div className="border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-16)]">
        <SearchTrigger embedded />
      </div>

      <UserIdentity expanded />
      <div className="py-[var(--spacing-16)]">
        <Navigation onNavigate={onNavigate} expanded />
      </div>
      <div className="mt-auto border-t border-[var(--console-border)] px-[var(--spacing-24)] py-[var(--spacing-24)]">
        <button
          type="button"
          aria-label="Log out"
          className="flex h-[var(--spacing-32)] w-full items-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] px-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
        >
          <LogOut size={16} strokeWidth={1.8} className="text-[var(--console-danger)]" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[var(--console-bg)]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[var(--shell-sidebar-width)] flex-col border-r border-[var(--console-border)] bg-[var(--console-sidebar)] md:flex">
        <div className="flex h-[var(--shell-header-height)] shrink-0 items-center justify-center border-b border-[var(--console-border)] px-[var(--spacing-16)] min-[1100px]:px-[var(--spacing-24)]">
          <Brand />
        </div>
        <div className="min-h-0 flex-1">
          <Sidebar />
        </div>
      </aside>

      <header className="sticky top-0 z-40 grid h-[var(--shell-header-height)] grid-cols-[minmax(0,1fr)_auto] items-center border-b border-[var(--console-border)] bg-[var(--console-header)] px-[var(--spacing-16)] backdrop-blur-xl md:ml-[var(--shell-sidebar-width)] md:w-[calc(100%-var(--shell-sidebar-width))] md:grid-cols-[minmax(280px,1fr)_auto] md:px-0">
        <div className="flex min-w-0 items-center justify-between md:hidden">
          <div className="w-[var(--logo-lockup-width)]">
            <Brand mobileFull />
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <button
                type="button"
                aria-label="Open navigation"
                className="grid size-[var(--spacing-32)] place-items-center rounded-[var(--radius-sm)] text-[var(--console-text-inverse)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
              >
                <MobileMenuButton open={open} />
              </button>
            </Dialog.Trigger>
            <Dialog.Content className="console-mobile-menu !fixed !inset-x-0 !inset-y-0 !m-0 !h-dvh !w-full !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !bg-[var(--console-sidebar)] !p-0">
              <Dialog.Title className="sr-only">Navigation</Dialog.Title>
              <MobileMenu onNavigate={() => setOpen(false)} />
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <HeaderContext />
        <div className="hidden md:block">
          <SearchTrigger />
        </div>
      </header>

      <div className="min-h-[calc(100dvh-var(--shell-header-height))] md:grid md:grid-cols-[var(--shell-sidebar-width)_minmax(0,1fr)]">
        <div className="min-w-0 md:col-start-2">
          <main className="min-h-[calc(100dvh-var(--shell-header-height))] w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
