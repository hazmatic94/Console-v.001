"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PanelHeader } from "@/components/ui/panel-header";
import { Button, Heading, Text } from "@/components/ui/primitives";

const pathTypes = ["Trading", "Fitness", "Business", "Learning", "Career", "Personal", "Custom"];

const fieldClassName = "mt-[var(--spacing-8)] w-full border border-[var(--console-border)] bg-[var(--console-input)] px-[var(--spacing-8)] py-[var(--spacing-8)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)] caret-[var(--console-text-inverse)] outline-none transition-colors placeholder:text-[var(--console-text-muted)] focus:border-[var(--console-accent-500)] focus:shadow-[0_0_0_1px_var(--console-accent-500)]";

type PathTextAreaProps = {
  label: string;
  optional?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function PathTextArea({ label, optional = false, placeholder, value, onChange }: PathTextAreaProps) {
  return (
    <label className="block px-[var(--spacing-16)] py-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
      <Text as="span" className="block text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
        {label}
        {optional && <span className="text-[var(--console-text-muted)]"> (Optional)</span>}
      </Text>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className={`${fieldClassName} min-h-[160px] resize-y`}
      />
    </label>
  );
}

export default function StartingNewPathPage() {
  const [pathType, setPathType] = useState("Trading");
  const [customType, setCustomType] = useState("");
  const [achievement, setAchievement] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [context, setContext] = useState("");

  return (
    <div className="flex min-h-[calc(100dvh-var(--shell-header-height))] flex-col">
      <section aria-labelledby="create-path-heading" className="flex min-w-0 flex-1 flex-col bg-[var(--console-input)]">
        <h1 id="create-path-heading" className="sr-only">Create Path</h1>
        <PanelHeader title="Create Path" secondary />

        <div className="border-b border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
          <Heading as="h2" className="!text-[length:var(--type-h2-size)] !font-normal !leading-[var(--leading-normal)] !tracking-[var(--tracking-heading)] text-[var(--console-text-inverse)]">
            Create Path
          </Heading>
          <Text as="p" className="mt-[var(--spacing-8)] max-w-[560px] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
            Define a new path and let Console architect the progression system.
          </Text>
        </div>

        <form className="flex flex-1 flex-col">
          <div className="divide-y divide-[var(--console-border)] border-b border-[var(--console-border)]">
            <fieldset>
              <legend className="sr-only">Path Type</legend>
              <div className="px-[var(--spacing-16)] py-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
                <Text as="p" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
                  Path Type
                </Text>
              </div>
              <div className="divide-y divide-[var(--console-border)] border-t border-[var(--console-border)]">
                {pathTypes.map((type) => (
                  <label key={type} className="group/type grid h-[var(--spacing-40)] cursor-pointer grid-cols-[var(--spacing-24)_minmax(0,1fr)] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] transition-colors hover:bg-[var(--console-surface-hover)] sm:px-[var(--spacing-24)]">
                    <input
                      type="radio"
                      name="path-type"
                      value={type}
                      checked={pathType === type}
                      onChange={() => setPathType(type)}
                      className="peer size-[var(--spacing-24)] appearance-none border border-[var(--console-border)] bg-[var(--console-input)] transition-colors checked:border-[var(--console-text)] checked:bg-[radial-gradient(circle,var(--console-text-inverse)_0_4px,transparent_5px)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
                    />
                    <Text as="span" className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)] transition-colors group-hover/type:text-[var(--console-text-inverse)] peer-checked:text-[var(--console-text-inverse)]">
                      {type}
                    </Text>
                  </label>
                ))}
              </div>
              {pathType === "Custom" && (
                <label className="block border-t border-[var(--console-border)] px-[var(--spacing-16)] py-[var(--spacing-16)] sm:px-[var(--spacing-24)]">
                  <Text as="span" className="block text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                    Custom path type
                  </Text>
                  <input
                    value={customType}
                    onChange={(event) => setCustomType(event.target.value)}
                    placeholder="Type a path type"
                    className={`${fieldClassName} h-[var(--spacing-32)] py-0`}
                  />
                </label>
              )}
            </fieldset>

            <PathTextArea
              label="What are you trying to achieve?"
              placeholder="Become consistently profitable trading NQ."
              value={achievement}
              onChange={setAchievement}
            />
            <PathTextArea
              label="Where are you currently?"
              placeholder="I've been trading for 2 years but remain inconsistent."
              value={currentState}
              onChange={setCurrentState}
            />
            <PathTextArea
              label="Additional Context"
              optional
              placeholder="Any constraints, resources, experience, goals or context."
              value={context}
              onChange={setContext}
            />
          </div>

          <div className="mt-auto flex flex-col gap-[var(--spacing-8)] px-[var(--spacing-16)] py-[var(--spacing-16)] sm:flex-row sm:justify-end sm:px-[var(--spacing-24)]">
            <Button asChild size="2" variant="soft" color="gray" className="!h-[var(--spacing-32)] !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !px-[var(--spacing-12)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
              <Link href="/command">Cancel</Link>
            </Button>
            <Button type="button" size="2" className="!h-[var(--spacing-32)] !border !border-[var(--console-border-accent)] !bg-[var(--console-button-primary)] !px-[var(--spacing-12)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-primary-text)] !shadow-none hover:!bg-[var(--console-button-primary-hover)] hover:!text-[var(--console-text)] active:!bg-[var(--console-button-primary-active)]">
              Generate Path <ArrowRight size={15} strokeWidth={1.8} />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
