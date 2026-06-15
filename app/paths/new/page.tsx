import { ArrowRight, Sparkles } from "lucide-react";
import { PanelHeader } from "@/components/ui/panel-header";
import { Button, Heading, Text } from "@/components/ui/primitives";

export default function StartingNewPathPage() {
  return (
    <div className="flex min-h-[calc(100dvh-var(--shell-header-height))] flex-col">
      <div className="grid flex-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <section aria-labelledby="new-path-heading" className="flex min-w-0 flex-col border-b border-[var(--console-border)] bg-[var(--console-input)] lg:border-b-0 lg:border-r">
          <h1 id="new-path-heading" className="sr-only">Starting a new path</h1>
          <PanelHeader title="Path details" secondary />

          <div className="border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
            <Heading as="h2" className="!text-[length:var(--type-h2-size)] !font-normal !leading-[var(--leading-normal)] !tracking-[var(--tracking-heading)] text-[var(--console-text-inverse)]">
              Starting a new path
            </Heading>
            <Text as="p" className="mt-[var(--spacing-8)] max-w-[520px] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
              Shape a goal, project, or ambition into a living system you can return to, refine, and move through.
            </Text>
          </div>
          <div className="divide-y divide-[var(--console-border)]">
            {["What are you building?", "Why does it matter?", "What is the next visible step?"].map((label) => (
              <label key={label} className="block px-[var(--spacing-16)] py-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
                <Text as="span" className="block text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                  {label}
                </Text>
                <input
                  className="mt-[var(--spacing-8)] h-[var(--spacing-32)] w-full border border-[var(--console-border)] bg-[var(--console-input)] px-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] caret-[var(--console-text-inverse)] outline-none transition-colors placeholder:text-[var(--console-text-muted)] focus:border-[var(--console-accent-500)] focus:shadow-[0_0_0_1px_var(--console-accent-500)]"
                  placeholder="Start typing"
                />
              </label>
            ))}
          </div>
        </section>

        <aside className="min-w-0 bg-[var(--console-input)]">
          <PanelHeader title="Draft shape" secondary />
          <div className="p-[var(--spacing-16)] sm:p-[var(--spacing-24)]">
            <div className="grid size-[var(--spacing-40)] place-items-center text-[var(--console-accent)]">
              <Sparkles size={18} strokeWidth={1.7} />
            </div>
            <Text as="p" className="mt-[var(--spacing-12)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
              Keep the first version light. A path only needs enough structure to make the next move obvious.
            </Text>
            <Button size="2" variant="soft" color="gray" className="mt-[var(--spacing-24)] !h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
              Create path <ArrowRight size={15} strokeWidth={1.8} />
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
