"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import { Ban, ChevronLeft, Plus, X } from "lucide-react";
import { PanelHeader } from "@/components/ui/panel-header";
import { Button, Heading, Text } from "@/components/ui/primitives";
import { StartPathPanel } from "@/components/ui/start-path-panel";

type PathType = {
  color?: string;
  name: string;
  tone?: string;
};

const pathTypes: PathType[] = [
  { name: "Trading", tone: "bg-[var(--console-danger)]" },
  { name: "Fitness", tone: "bg-[var(--console-status-green)]" },
  { name: "Business", tone: "bg-[var(--console-status-blue)]" },
  { name: "Learning", tone: "bg-[var(--console-status-amber)]" },
  { name: "Career", tone: "bg-[var(--console-accent)]" },
  { name: "Personal", tone: "bg-[var(--console-status-green)]" },
];

const pathTypeSwatches = [
  { name: "Cloud", value: "#bec2c8" },
  { name: "Steel", value: "#98a4b3" },
  { name: "Indigo", value: "#5d68d8" },
  { name: "Cyan", value: "#2eb8cd" },
  { name: "Green", value: "#4fbd84" },
  { name: "Yellow", value: "#f7c400" },
  { name: "Red", value: "#f25353" },
];

const defaultPathTypeColor = pathTypeSwatches[0].value;
const hexColorPattern = /^#[0-9a-fA-F]{6}$/;

function hsvToHex(hue: number, saturation: number, value: number) {
  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = value - chroma;
  const [red, green, blue] =
    hue < 60 ? [chroma, x, 0] :
    hue < 120 ? [x, chroma, 0] :
    hue < 180 ? [0, chroma, x] :
    hue < 240 ? [0, x, chroma] :
    hue < 300 ? [x, 0, chroma] :
    [chroma, 0, x];

  return `#${[red, green, blue].map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, "0")).join("")}`;
}

function hexToHsv(hex: string) {
  if (!hexColorPattern.test(hex)) return { hue: 0, saturation: 0, value: 0.75 };

  const red = parseInt(hex.slice(1, 3), 16) / 255;
  const green = parseInt(hex.slice(3, 5), 16) / 255;
  const blue = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const hue = delta === 0 ? 0 : max === red ? 60 * (((green - blue) / delta) % 6) : max === green ? 60 * ((blue - red) / delta + 2) : 60 * ((red - green) / delta + 4);

  return {
    hue: Math.round(hue < 0 ? hue + 360 : hue),
    saturation: max === 0 ? 0 : delta / max,
    value: max,
  };
}

type PathFieldProps = {
  label: string;
  optional?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function PathSummaryText({ children, label }: { children: string; label: string }) {
  return (
    <section>
      <Text as="p" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
        {label}
      </Text>
      <Text as="p" className="mt-[var(--spacing-8)] whitespace-pre-wrap text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
        {children}
      </Text>
    </section>
  );
}

function PathField({ label, optional = false, placeholder, value, onChange }: PathFieldProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-[var(--spacing-12)]">
        <Text as="span" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
          {label}
        </Text>
        {optional && (
          <Text as="span" className="shrink-0 text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
            Optional
          </Text>
        )}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="console-form-field"
      />
    </label>
  );
}

export default function StartingNewPathPage() {
  const [pathType, setPathType] = useState("");
  const [customPathTypes, setCustomPathTypes] = useState<PathType[]>([]);
  const [newPathTypeOpen, setNewPathTypeOpen] = useState(false);
  const [newPathTypeName, setNewPathTypeName] = useState("");
  const [newPathTypeColor, setNewPathTypeColor] = useState("");
  const [customColorOpen, setCustomColorOpen] = useState(false);
  const [customColorHsv, setCustomColorHsv] = useState(hexToHsv(defaultPathTypeColor));
  const [customSwatchColor, setCustomSwatchColor] = useState<string | null>(null);
  const [pathInformation, setPathInformation] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const allPathTypes = [...pathTypes, ...customPathTypes];
  const visibleSwatches = customSwatchColor ? [...pathTypeSwatches.slice(0, -1), { name: "Custom", value: customSwatchColor }] : pathTypeSwatches;
  const displayPathTypeColor = newPathTypeColor || defaultPathTypeColor;
  const canAddPathType = newPathTypeName.trim().length > 0;
  const selectedPathType = allPathTypes.find((type) => type.name === pathType);
  const pathInformationSummary = pathInformation.trim();
  const currentStateSummary = currentState.trim();
  const additionalContextSummary = additionalContext.trim();
  const hasPathSummary = Boolean(pathType || pathInformationSummary || currentStateSummary || additionalContextSummary);

  const updateCustomColor = (nextHsv: typeof customColorHsv) => {
    const nextColor = hsvToHex(nextHsv.hue, nextHsv.saturation, nextHsv.value);
    setCustomColorHsv(nextHsv);
    setCustomSwatchColor(nextColor);
    setNewPathTypeColor(nextColor);
  };

  const selectSwatch = (color: string) => {
    setNewPathTypeColor(color);
    setCustomColorHsv(hexToHsv(color));
  };

  const pickCustomColor = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const saturation = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const value = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    updateCustomColor({ ...customColorHsv, saturation, value });
  };

  const addPathType = () => {
    const name = newPathTypeName.trim();

    if (!name) return;

    const nextType = {
      name,
      color: hexColorPattern.test(newPathTypeColor) ? newPathTypeColor : defaultPathTypeColor,
    };
    setCustomPathTypes((current) => [...current, nextType]);
    setPathType(name);
    setNewPathTypeName("");
    setNewPathTypeColor("");
    setCustomColorHsv(hexToHsv(defaultPathTypeColor));
    setCustomColorOpen(false);
    setNewPathTypeOpen(false);
  };

  return (
    <div className="console-page-frame flex min-h-[calc(100dvh_-_var(--shell-header-height))] flex-col">
      <div className="console-page-panels grid flex-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)] lg:overflow-hidden">
        <section aria-labelledby="create-path-heading" className="flex min-w-0 flex-col border-b border-[var(--console-border)] bg-[var(--console-input)] lg:h-full lg:overflow-hidden lg:border-b-0 lg:border-r">
          <h1 id="create-path-heading" className="sr-only">Create Path</h1>
          <PanelHeader title="Create Path" secondary />

          <div className="console-scroll-clean min-h-0 flex-1 lg:overflow-y-auto lg:overscroll-contain">
            <div className="px-[var(--spacing-16)] pt-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
              <Link href="/command" className="group/back mb-[var(--spacing-24)] inline-flex h-[var(--spacing-32)] items-center gap-[var(--spacing-8)] rounded-[var(--radius-sm)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)] outline-none transition-colors hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]">
                <ChevronLeft size={15} strokeWidth={1.7} className="translate-x-[var(--motion-chevron-shift)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-hover/back:translate-x-0" />
                Back
              </Link>
              <div className="flex max-w-[560px] flex-col gap-[var(--spacing-8)]">
                <Heading as="h2" className="!text-[length:var(--type-h2-size)] !font-normal !leading-[var(--leading-normal)] !tracking-[var(--tracking-heading)] text-[var(--console-text-inverse)]">
                  Start a New Path
                </Heading>
                <Text as="p" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
                  Help us understand your path to help you move forward.
                </Text>
              </div>
            </div>

            <form className="flex flex-col">
              <div className="flex flex-col gap-[var(--spacing-24)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
                <fieldset>
                  <legend className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
                    Path type
                  </legend>
                  <div className="mt-[var(--spacing-12)] grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center">
                    <div className="relative min-w-0">
                      <div className="flex max-w-full gap-[var(--spacing-8)] overflow-x-auto overflow-y-hidden pr-[var(--spacing-32)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {allPathTypes.map((type) => (
                          <label key={type.name} className="group/type shrink-0 cursor-pointer">
                            <input
                              type="radio"
                              name="path-type"
                              value={type.name}
                              checked={pathType === type.name}
                              onChange={() => setPathType(type.name)}
                              className="peer sr-only"
                            />
                            <span className="console-path-type-pill">
                              <span aria-hidden="true" className={`size-[var(--status-dot-size)] rounded-[var(--radius-full)] ${type.tone ?? ""}`} style={type.color ? { backgroundColor: type.color } : undefined} />
                              {type.name}
                            </span>
                          </label>
                        ))}
                      </div>
                      <span aria-hidden="true" className="console-path-type-fade" />
                    </div>
                    <div className="relative shrink-0 border-l border-[var(--console-border)] pl-[var(--spacing-32)]">
                      <Button
                        type="button"
                        size="2"
                        variant="soft"
                        color="gray"
                        className="!h-[var(--spacing-32)] !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !px-[var(--spacing-12)] !text-[length:var(--type-body03-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] hover:!text-[var(--console-text-inverse)] active:!bg-[var(--console-button-secondary-active)]"
                        onClick={() => setNewPathTypeOpen((open) => !open)}
                      >
                        <Plus size={14} strokeWidth={1.8} /> Add new
                      </Button>

                      {newPathTypeOpen && (
                        <div className="console-category-popover">
                          <div className="flex items-center justify-between gap-[var(--spacing-8)] border-b border-[var(--console-border)] pb-[var(--spacing-12)]">
                            <Text as="p" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-inverse)]">
                              Create new path type
                            </Text>
                            <button
                              type="button"
                              aria-label="Close new path type"
                              className="grid size-[var(--spacing-24)] shrink-0 place-items-center rounded-[var(--radius-sm)] text-[var(--console-text)] outline-none transition-colors hover:text-[var(--console-text-inverse)] focus-visible:ring-2 focus-visible:ring-[var(--console-focus)]"
                              onClick={() => setNewPathTypeOpen(false)}
                            >
                              <X size={14} strokeWidth={1.8} />
                            </button>
                          </div>

                          <label className="block border-b border-[var(--console-border)] py-[var(--spacing-16)]">
                            <Text as="span" className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                              Type path
                            </Text>
                            <input
                              value={newPathTypeName}
                              onChange={(event) => setNewPathTypeName(event.target.value)}
                              placeholder="Name path type here..."
                              className="console-category-input"
                            />
                          </label>

                          <div className={`console-category-colour-panel ${customColorOpen ? "console-category-colour-section" : ""} border-b border-[var(--console-border)] py-[var(--spacing-16)]`}>
                            <Text as="p" className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                              Select swatch
                            </Text>
                            {customColorOpen ? (
                              <div className="mt-[var(--spacing-12)] grid grid-cols-[minmax(0,1fr)_var(--spacing-24)] gap-[var(--spacing-16)]">
                                <div className="min-w-0">
                                  <span className="mb-[var(--spacing-12)] flex min-w-0 items-center gap-[var(--spacing-12)]">
                                    <span aria-hidden="true" className="console-category-swatch console-category-swatch-preview shrink-0" style={{ backgroundColor: displayPathTypeColor }} />
                                    <Text as="span" className="truncate text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                                      HEX {displayPathTypeColor}
                                    </Text>
                                  </span>
                                  <button
                                    type="button"
                                    aria-label="Pick custom colour"
                                    className="console-category-picker"
                                    style={{ "--picker-hue": customColorHsv.hue } as CSSProperties}
                                    onPointerDown={pickCustomColor}
                                    onPointerMove={(event) => {
                                      if (event.buttons === 1) pickCustomColor(event);
                                    }}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="console-category-picker-handle"
                                      style={{
                                        left: `${customColorHsv.saturation * 100}%`,
                                        top: `${(1 - customColorHsv.value) * 100}%`,
                                      }}
                                    />
                                  </button>
                                </div>
                                <div className="console-category-hue-stack">
                                  <button
                                    type="button"
                                    aria-label="Show colour swatches"
                                    aria-pressed="true"
                                    className="console-category-wheel"
                                    onClick={() => setCustomColorOpen(false)}
                                  >
                                    <span className="console-category-tooltip">Swatches</span>
                                  </button>
                                  <input
                                    aria-label="Colour hue"
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={customColorHsv.hue}
                                    onChange={(event) => updateCustomColor({ ...customColorHsv, hue: Number(event.target.value) })}
                                    className="console-category-hue"
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="mt-[var(--spacing-12)] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[var(--spacing-16)]">
                                  <div className="flex flex-nowrap gap-[var(--spacing-12)]">
                                    {visibleSwatches.map((swatch) => (
                                      <button
                                        key={swatch.value}
                                        type="button"
                                        aria-label={swatch.name}
                                        aria-pressed={newPathTypeColor === swatch.value}
                                        className="console-category-swatch"
                                        style={{ backgroundColor: swatch.value }}
                                        onClick={() => selectSwatch(swatch.value)}
                                      >
                                        <span className="console-category-tooltip">{swatch.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                  <div className="border-l border-[var(--console-border)] pl-[var(--spacing-16)]">
                                    <button
                                      type="button"
                                      aria-label="Custom colour"
                                      aria-pressed={customColorOpen}
                                      className="console-category-wheel"
                                      onClick={() => setCustomColorOpen(true)}
                                    >
                                      <span className="console-category-tooltip">Custom</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <Button
                            type="button"
                            size="2"
                            variant="soft"
                            color="gray"
                            disabled={!canAddPathType}
                            className="!mt-[var(--spacing-16)] !h-[var(--spacing-32)] !w-full !border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[length:var(--type-body01-size)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] hover:!text-[var(--console-text-inverse)] active:!bg-[var(--console-button-secondary-active)]"
                            onClick={addPathType}
                          >
                            <Plus size={15} strokeWidth={1.8} /> Add path type
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <PathField
                  label="Path Information"
                  placeholder="Give us a breakdown on what you're trying to achieve..."
                  value={pathInformation}
                  onChange={setPathInformation}
                />
                <PathField
                  label="Where are you currently?"
                  placeholder="Explain your knowledge around this path"
                  value={currentState}
                  onChange={setCurrentState}
                />
                <PathField
                  label="Anything else we should know?"
                  optional
                  placeholder="Feel free to add any additional context"
                  value={additionalContext}
                  onChange={setAdditionalContext}
                />
              </div>
            </form>
          </div>
        </section>

        <aside aria-labelledby="path-summary-heading" className="flex min-w-0 flex-col bg-[var(--console-input)] lg:h-full lg:overflow-hidden">
          <h2 id="path-summary-heading" className="sr-only">Path summary</h2>
          <PanelHeader title="Path summary" secondary />
          <div className="console-scroll-clean flex min-h-0 flex-1 flex-col lg:overflow-y-auto lg:overscroll-contain">
            {hasPathSummary ? (
              <div className="flex flex-1 flex-col gap-[var(--spacing-24)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
                {pathType && (
                  <section>
                    <Text as="p" className="text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                      Path type
                    </Text>
                    <span className="console-path-type-pill console-path-type-pill-selected mt-[var(--spacing-8)]">
                      <span
                        aria-hidden="true"
                        className={`size-[var(--status-dot-size)] rounded-[var(--radius-full)] ${selectedPathType?.tone ?? ""}`}
                        style={selectedPathType?.color ? { backgroundColor: selectedPathType.color } : undefined}
                      />
                      {pathType}
                    </span>
                  </section>
                )}
                {pathInformationSummary && <PathSummaryText label="Goal">{pathInformationSummary}</PathSummaryText>}
                {currentStateSummary && <PathSummaryText label="Current status">{currentStateSummary}</PathSummaryText>}
                {additionalContextSummary && <PathSummaryText label="Additional context">{additionalContextSummary}</PathSummaryText>}
              </div>
            ) : (
              <div className="grid min-h-[360px] flex-1 place-items-center px-[var(--spacing-16)] py-[var(--spacing-24)] text-center sm:px-[var(--spacing-24)]">
                <div>
                  <Ban size={36} strokeWidth={1.7} className="mx-auto text-[var(--console-text-inverse)]" />
                  <Text as="p" className="mt-[var(--spacing-16)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text)]">
                    No path information yet.
                  </Text>
                  <Text as="p" className="mt-[var(--spacing-4)] text-[length:var(--type-body01-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">
                    Complete the fields to begin building your path
                  </Text>
                </div>
              </div>
            )}
            <StartPathPanel
              actionHref={null}
              actionLabel="Generate Path"
              className="lg:pb-[var(--spacing-40)]"
              copy="Console will use this information to understand your goal, current position, and progression requirements."
              title="Build your path"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
