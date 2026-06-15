"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

type SearchTriggerProps = {
  embedded?: boolean;
};

export function SearchTrigger({ embedded = false }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (embedded || open) {
      inputRef.current?.focus();
    }
  }, [embedded, open]);

  if (embedded || open) {
    return (
      <div className={embedded ? "flex w-full items-center" : "flex items-center justify-end md:px-[var(--spacing-24)]"}>
        <form
          role="search"
          className={`group/search flex h-[var(--spacing-32)] items-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] border border-[var(--console-accent-500)] bg-[var(--console-surface-hover)] px-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] shadow-[0_0_0_1px_var(--console-accent-500)] transition-colors focus-within:border-[var(--console-accent-500)] md:px-[var(--spacing-12)] ${embedded ? "w-full" : "md:w-[var(--shell-search-width)] min-[1100px]:!w-[var(--shell-search-width-expanded)]"}`}
          onSubmit={(event) => event.preventDefault()}
        >
          <Search size={15} strokeWidth={1.8} className="shrink-0 text-[var(--console-text-inverse)]" />
          <input
            ref={inputRef}
            aria-label="Search"
            value={query}
            onBlur={() => {
              if (!embedded && !query) setOpen(false);
            }}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setQuery("");
                setOpen(false);
              }
            }}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent p-0 text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] caret-[var(--console-text-inverse)] outline-none placeholder:text-[var(--console-text-muted)]"
          />
          <kbd className="ml-auto hidden rounded-[var(--radius-sm)] border border-[var(--primitive-50)] px-[var(--spacing-8)] py-[var(--spacing-4)] font-[var(--font-mono)] text-[length:var(--type-key-size)] leading-none text-[var(--primitive-50)] sm:block">⌘ K</kbd>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end md:px-[var(--spacing-24)]">
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="group/search flex h-[var(--spacing-32)] items-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] border border-[var(--console-border)] bg-[var(--console-surface-secondary)] px-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] outline-none transition-colors hover:bg-[var(--console-surface-hover)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)] md:w-[var(--shell-search-width)] md:px-[var(--spacing-12)] min-[1100px]:!w-[var(--shell-search-width-expanded)]"
      >
        <Search size={15} strokeWidth={1.8} className="text-[var(--console-text-inverse)]" />
        <span className="hidden text-[var(--console-text)] transition-colors group-hover/search:text-[var(--primitive-50)] md:block">Search</span>
        <kbd className="ml-auto hidden rounded-[var(--radius-sm)] border border-[var(--console-border)] px-[var(--spacing-8)] py-[var(--spacing-4)] font-[var(--font-mono)] text-[length:var(--type-key-size)] leading-none text-[var(--console-text-muted)] transition-colors group-hover/search:border-[var(--primitive-50)] group-hover/search:text-[var(--primitive-50)] md:block">⌘ K</kbd>
      </button>
    </div>
  );
}
