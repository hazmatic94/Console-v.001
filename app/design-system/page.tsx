import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import { IconActionButton } from "@/components/ui/icon-action-button";
import { PageContextTrail } from "@/components/ui/page-context-trail";
import { PanelHeader } from "@/components/ui/panel-header";
import { Button, Heading, Text } from "@/components/ui/primitives";
import { ProgressMeter } from "@/components/ui/progress-meter";
import { DisclosureRow, IndentedRow, RecentEntryRow } from "@/components/ui/rows";
import { SearchTrigger } from "@/components/ui/search-trigger";
import { StartPathPanel } from "@/components/ui/start-path-panel";

const typographyStyles = [
  {
    name: "h1",
    sample: "Heading one",
    use: "Primary page and major section titles",
    size: "32px",
    lineHeight: "150%",
    tracking: "-0.5px",
    className: "text-[length:var(--type-h1-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-heading)]",
  },
  {
    name: "h2",
    sample: "Heading two",
    use: "Section titles and prominent content labels",
    size: "24px",
    lineHeight: "150%",
    tracking: "-0.5px",
    className: "text-[length:var(--type-h2-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-heading)]",
  },
  {
    name: "body01",
    sample: "The quick brown fox jumps over the lazy dog.",
    use: "Default body and application content",
    size: "14px",
    lineHeight: "150%",
    tracking: "0px",
    className: "text-[14px] leading-[1.5] tracking-normal",
  },
  {
    name: "body02",
    sample: "Secondary text, system labels, and table cells.",
    use: "Secondary text, system labels and table cells",
    size: "16px",
    lineHeight: "150%",
    tracking: "0px",
    className: "text-[16px] leading-[1.5] tracking-normal",
  },
  {
    name: "body03",
    sample: "Captions, helper text and compact metadata.",
    use: "Captions, helper text, tags and metadata",
    size: "12px",
    lineHeight: "150%",
    tracking: "0px",
    className: "text-[12px] leading-[1.5] tracking-normal",
  },
];

const colourGroups = [
  {
    name: "Primitives",
    description: "Raw neutral values used to construct every semantic colour",
    tokens: [
      { name: "50", variable: "--primitive-50", value: "#a6a6a6", use: "Light neutral · text default" },
      { name: "100", variable: "--primitive-100", value: "#5f5f5f", use: "Muted neutral · text muted" },
      { name: "200", variable: "--primitive-200", value: "#3d3d3d", use: "Subtle neutral · quiet text" },
      { name: "300", variable: "--primitive-300", value: "#262626", use: "Strong neutral separator" },
      { name: "400", variable: "--primitive-400", value: "#212121", use: "Default border and active surface" },
      { name: "500", variable: "--primitive-500", value: "#1e1e1e", use: "Muted border and hover surface" },
      { name: "600", variable: "--primitive-600", value: "#1b1b1b", use: "Interactive and selected surface" },
      { name: "700", variable: "--primitive-700", value: "#171717", use: "Primary contained surface" },
      { name: "800", variable: "--primitive-800", value: "#131313", use: "Sidebar and secondary surface" },
      { name: "900", variable: "--primitive-900", value: "#000000", use: "Application canvas" },
      { name: "n0", variable: "--primitive-n0", value: "#ffffff", use: "Inverse and high-contrast text" },
    ],
  },
  {
    name: "Surfaces",
    description: "Application backgrounds and interactive layers",
    tokens: [
      { name: "canvas", variable: "--console-bg", value: "#000000", use: "primitive-900 · Primary application canvas" },
      { name: "sidebar", variable: "--console-sidebar", value: "#131313", use: "primitive-800 · Persistent navigation surface" },
      { name: "header", variable: "--console-header", value: "#131313", use: "primitive-800 · Global status header" },
      { name: "surface", variable: "--console-surface", value: "#171717", use: "primitive-700 · Default contained surface" },
      { name: "surface-secondary", variable: "--console-surface-secondary", value: "#131313", use: "primitive-800 · Secondary section headers and supporting surfaces" },
      { name: "surface-raised", variable: "--console-surface-raised", value: "#131313", use: "primitive-800 · Raised controls and secondary layers" },
      { name: "surface-hover", variable: "--console-surface-hover", value: "#1b1b1b", use: "primitive-600 · Hover and selected navigation states" },
      { name: "input", variable: "--console-input", value: "#171717", use: "primitive-700 · Dense rows, fields and input-like surfaces" },
      { name: "nav-item-selected", variable: "--console-nav-item-selected", value: "#1b1b1b", use: "primitive-600 · Selected sidebar navigation item" },
    ],
  },
  {
    name: "Accent",
    description: "Focused emphasis and interactive states",
    tokens: [
      { name: "400", variable: "--console-accent-400", value: "#a7cfc2", use: "Primary accent, focus and high-emphasis details" },
      { name: "500", variable: "--console-accent-500", value: "#293a35", use: "Accent hover and restrained tinted surfaces" },
      { name: "600", variable: "--console-accent-600", value: "#1c2623", use: "Accent active and pressed states" },
    ],
  },
  {
    name: "Borders",
    description: "Separation, structure and control definition",
    tokens: [
      { name: "border", variable: "--console-border", value: "#212121", use: "primitive-400 · Default separators and outlines" },
      { name: "border-strong", variable: "--console-border-strong", value: "#1e1e1e", use: "primitive-500 · Emphasized controls and boundaries" },
      { name: "border-accent", variable: "--console-border-accent", value: "#1c2623", use: "accent-600 · Accent controls and selected states" },
    ],
  },
  {
    name: "Status",
    description: "Semantic feedback and consequential actions",
    tokens: [
      { name: "danger", variable: "--console-danger", value: "#e97878", use: "Destructive actions and critical feedback" },
    ],
  },
  {
    name: "Text",
    description: "Content hierarchy and interface communication",
    tokens: [
      { name: "text", variable: "--console-text", value: "#a6a6a6", use: "primitive-50 · Primary text and high emphasis" },
      { name: "text-muted", variable: "--console-text-muted", value: "#5f5f5f", use: "primitive-100 · Secondary text and descriptions" },
      { name: "text-subtle", variable: "--console-text-subtle", value: "#3d3d3d", use: "primitive-200 · Metadata and quiet labels" },
      { name: "text-inverse", variable: "--console-text-inverse", value: "#ffffff", use: "primitive-n0 · Text on dark accent controls" },
      { name: "accent", variable: "--console-accent", value: "#a7cfc2", use: "accent-400 · Focus and active details" },
    ],
  },
];

const buttonTokens = [
  { name: "primary", variable: "--console-button-primary", value: "accent-400", use: "Default primary action" },
  { name: "primary-hover", variable: "--console-button-primary-hover", value: "accent-500", use: "Primary hover state" },
  { name: "primary-active", variable: "--console-button-primary-active", value: "accent-600", use: "Primary pressed state" },
  { name: "primary-text", variable: "--console-button-primary-text", value: "primitive-900", use: "High-contrast text on primary actions" },
  { name: "secondary", variable: "--console-button-secondary", value: "primitive-600", use: "Default secondary action" },
  { name: "secondary-hover", variable: "--console-button-secondary-hover", value: "primitive-500", use: "Secondary hover state" },
  { name: "secondary-active", variable: "--console-button-secondary-active", value: "primitive-400", use: "Secondary pressed state" },
  { name: "secondary-text", variable: "--console-button-secondary-text", value: "primitive-50", use: "Text on secondary actions" },
];

const spacingTokens = [
  { name: "spacing4", variable: "--spacing-4", value: "4px", pixels: 4, use: "Fine alignment and compact offsets" },
  { name: "spacing8", variable: "--spacing-8", value: "8px", pixels: 8, use: "Tight control and icon spacing" },
  { name: "spacing12", variable: "--spacing-12", value: "12px", pixels: 12, use: "Compact component padding" },
  { name: "spacing16", variable: "--spacing-16", value: "16px", pixels: 16, use: "Default content and control spacing" },
  { name: "spacing24", variable: "--spacing-24", value: "24px", pixels: 24, use: "Section padding and grouped content" },
  { name: "spacing32", variable: "--spacing-32", value: "32px", pixels: 32, use: "Large component separation" },
  { name: "spacing40", variable: "--spacing-40", value: "40px", pixels: 40, use: "Disclosure rows and spacious offsets" },
  { name: "spacing64", variable: "--spacing-64", value: "64px", pixels: 64, use: "Major layout and page rhythm" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-[calc(100dvh-var(--shell-header-height))] w-full">
      <div className="flex min-h-14 items-center border-b border-[var(--console-border)] px-4 sm:px-6">
        <Heading as="h1" size="3" weight="medium" className="tracking-[-0.015em]">
          Design system
        </Heading>
      </div>

      <div className="py-6 md:py-8">
          <div className="mb-6 max-w-2xl px-4 sm:px-6">
            <Text as="p" size="2" className="leading-6 text-[var(--console-text-muted)]">
              The visual source of truth for Console. Use this space to inspect and refine the foundations used across the application.
            </Text>
          </div>

          <div className="border-y border-[var(--console-border)]">
            <details open className="group">
              <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[128px_minmax(0,1fr)_16px] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface)] focus-visible:bg-[var(--console-surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
                <Text size="2" weight="medium" className="text-[var(--console-text)]">Typography</Text>
                <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">Font family, hierarchy and type styles</Text>
                <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} className="ml-auto text-[var(--console-text-muted)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-open:rotate-90" />
              </summary>

              <div className="border-t border-[var(--console-border)] px-4 py-8 sm:px-6 md:py-10">
                <div className="grid gap-8 border-b border-[var(--console-border)] pb-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] md:items-center md:gap-12">
                  <div>
                    <Text as="p" size="1" className="mb-3 uppercase tracking-[0.16em] text-[var(--console-text-subtle)]">Primary family</Text>
                    <div className="flex items-baseline gap-4">
                      <span className="text-[48px] font-medium leading-none tracking-[-0.04em] sm:text-[64px]">Inter</span>
                      <span className="text-[32px] leading-none text-[var(--console-text-muted)] sm:text-[44px]">Aa</span>
                    </div>
                  </div>
                  <div className="border-l border-[var(--console-border)] pl-5">
                    <Text as="p" size="2" weight="medium">System sans-serif</Text>
                    <Text as="p" size="2" className="mt-1 leading-6 text-[var(--console-text-muted)]">
                      Inter when available, followed by Apple and system UI fonts. Regular and medium weights establish the interface hierarchy.
                    </Text>
                  </div>
                </div>

                <div className="divide-y divide-[var(--console-border)]">
                  {typographyStyles.map((style) => (
                    <div key={style.name} className="grid gap-5 py-7 md:grid-cols-[150px_minmax(0,1fr)_220px] md:items-center md:gap-8">
                      <div>
                        <Text as="p" size="2" weight="medium">{style.name}</Text>
                        <Text as="p" size="1" className="mt-1.5 leading-5 text-[var(--console-text-subtle)]">{style.use}</Text>
                      </div>
                      <p className={`${style.className} m-0 text-[var(--console-text)]`}>{style.sample}</p>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-[var(--console-text-muted)] md:border-l md:border-[var(--console-border)] md:pl-6">
                        <dt className="text-[var(--console-text-subtle)]">Size</dt><dd>{style.size}</dd>
                        <dt className="text-[var(--console-text-subtle)]">Line height</dt><dd>{style.lineHeight}</dd>
                        <dt className="text-[var(--console-text-subtle)]">Kerning</dt><dd>{style.tracking}</dd>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <details open className="group border-t border-[var(--console-border)]">
              <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[128px_minmax(0,1fr)_16px] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface)] focus-visible:bg-[var(--console-surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
                <Text size="2" weight="medium" className="text-[var(--console-text)]">Colours</Text>
                <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">Surfaces, borders and text hierarchy</Text>
                <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} className="ml-auto text-[var(--console-text-muted)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-open:rotate-90" />
              </summary>

              <div className="border-t border-[var(--console-border)]">
                <div className="hidden h-10 grid-cols-[minmax(160px,0.7fr)_minmax(220px,1fr)_minmax(180px,1fr)] items-center border-b border-[var(--console-border)] px-6 text-xs font-medium text-[var(--console-text-subtle)] md:grid">
                  <span>Token</span>
                  <span>Value</span>
                  <span>Role</span>
                </div>

                {colourGroups.map((group) => (
                  <section key={group.name} aria-labelledby={`colour-${group.name.toLowerCase()}`}>
                    <div className="border-b border-[var(--console-border)] bg-[var(--console-surface)] px-4 py-4 sm:px-6">
                      <Text id={`colour-${group.name.toLowerCase()}`} as="p" size="2" weight="medium">{group.name}</Text>
                      <Text as="p" size="1" className="mt-1 text-[var(--console-text-subtle)]">{group.description}</Text>
                    </div>

                    <div className="divide-y divide-[var(--console-border)] border-b border-[var(--console-border)]">
                      {group.tokens.map((token) => (
                        <div key={token.variable} className="grid min-h-16 gap-3 px-4 py-4 sm:px-6 md:grid-cols-[minmax(160px,0.7fr)_minmax(220px,1fr)_minmax(180px,1fr)] md:items-center md:py-3">
                          <div>
                            <Text as="p" size="2" weight="medium">{token.name}</Text>
                            <code className="mt-1 block font-mono text-[11px] text-[var(--console-text-subtle)]">{token.variable}</code>
                          </div>
                          <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="size-7 shrink-0 rounded-[var(--radius-sm)] border border-[var(--console-border-strong)]" style={{ backgroundColor: token.value }} />
                            <code className="font-mono text-xs uppercase text-[var(--console-text-muted)]">{token.value}</code>
                          </div>
                          <Text as="p" size="1" className="leading-5 text-[var(--console-text-muted)]">{token.use}</Text>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </details>

            <details open className="group border-t border-[var(--console-border)]">
              <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[128px_minmax(0,1fr)_16px] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface)] focus-visible:bg-[var(--console-surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
                <Text size="2" weight="medium" className="text-[var(--console-text)]">Buttons</Text>
                <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">Primary, secondary, sizes and interaction states</Text>
                <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} className="ml-auto text-[var(--console-text-muted)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-open:rotate-90" />
              </summary>

              <div className="border-t border-[var(--console-border)]">
                <section className="border-b border-[var(--console-border)] px-4 py-8 sm:px-6 md:py-10">
                  <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                      <Text as="p" size="2" weight="medium">Primary</Text>
                      <Text as="p" size="1" className="mt-1 text-[var(--console-text-subtle)]">Use once per focused surface for the clearest next action.</Text>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button size="1" className="!border !border-[var(--console-border-accent)] !bg-[var(--console-button-primary)] !text-[var(--console-button-primary-text)] !shadow-none hover:!bg-[var(--console-button-primary-hover)] hover:!text-[var(--console-text)] active:!bg-[var(--console-button-primary-active)]">
                          Small
                        </Button>
                        <Button size="2" className="!border !border-[var(--console-border-accent)] !bg-[var(--console-button-primary)] !text-[var(--console-button-primary-text)] !shadow-none hover:!bg-[var(--console-button-primary-hover)] hover:!text-[var(--console-text)] active:!bg-[var(--console-button-primary-active)]">
                          Continue <ArrowRight size={14} />
                        </Button>
                        <Button size="3" className="!border !border-[var(--console-border-accent)] !bg-[var(--console-button-primary)] !text-[var(--console-button-primary-text)] !shadow-none hover:!bg-[var(--console-button-primary-hover)] hover:!text-[var(--console-text)] active:!bg-[var(--console-button-primary-active)]">
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="lg:border-l lg:border-[var(--console-border)] lg:pl-12">
                      <Text as="p" size="2" weight="medium">Secondary</Text>
                      <Text as="p" size="1" className="mt-1 text-[var(--console-text-subtle)]">Use for supporting actions and lower-emphasis choices.</Text>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button size="1" variant="soft" color="gray" className="!border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
                          Small
                        </Button>
                        <Button size="2" variant="soft" color="gray" className="!border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
                          <Plus size={15} strokeWidth={1.8} /> Add item
                        </Button>
                        <Button size="3" variant="soft" color="gray" className="!border !border-[var(--console-border)] !bg-[var(--console-button-secondary)] !text-[var(--console-button-secondary-text)] !shadow-none hover:!bg-[var(--console-button-secondary-hover)] active:!bg-[var(--console-button-secondary-active)]">
                          Large
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--console-border)] pt-6">
                    <Text size="1" className="mr-2 text-[var(--console-text-subtle)]">States</Text>
                    <Button size="2" disabled>Disabled primary</Button>
                    <Button size="2" variant="soft" color="gray" disabled>Disabled secondary</Button>
                  </div>
                </section>

                <div className="hidden h-10 grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(180px,1fr)] items-center border-b border-[var(--console-border)] px-6 text-xs font-medium text-[var(--console-text-subtle)] md:grid">
                  <span>Token</span>
                  <span>Maps to</span>
                  <span>Role</span>
                </div>
                <div className="divide-y divide-[var(--console-border)]">
                  {buttonTokens.map((token) => (
                    <div key={token.variable} className="grid min-h-16 gap-3 px-4 py-4 sm:px-6 md:grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(180px,1fr)] md:items-center md:py-3">
                      <div>
                        <Text as="p" size="2" weight="medium">{token.name}</Text>
                        <code className="mt-1 block font-mono text-[11px] text-[var(--console-text-subtle)]">{token.variable}</code>
                      </div>
                      <code className="font-mono text-xs text-[var(--console-text-muted)]">{token.value}</code>
                      <Text as="p" size="1" className="leading-5 text-[var(--console-text-muted)]">{token.use}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <details open className="group border-t border-[var(--console-border)]">
              <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[128px_minmax(0,1fr)_16px] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface)] focus-visible:bg-[var(--console-surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
                <Text size="2" weight="medium" className="text-[var(--console-text)]">Components</Text>
                <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">Reusable app primitives rendered from the shared source</Text>
                <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} className="ml-auto text-[var(--console-text-muted)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-open:rotate-90" />
              </summary>

              <div className="border-t border-[var(--console-border)]">
                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Top bar context" secondary />
                  <div className="grid gap-[var(--spacing-16)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)] lg:grid-cols-2">
                    <div className="h-[var(--shell-header-height)] border border-[var(--console-border)] bg-[var(--console-header)]">
                      <PageContextTrail section="Command" view="Current focus" className="!flex h-full" />
                    </div>
                    <div className="h-[var(--shell-header-height)] border border-[var(--console-border)] bg-[var(--console-header)]">
                      <PageContextTrail section="Design system" view="Foundation" className="!flex h-full" />
                    </div>
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Panel headers" secondary />
                  <div className="grid gap-[var(--spacing-16)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)] lg:grid-cols-2">
                    <div className="border border-[var(--console-border)] bg-[var(--console-input)]">
                      <PanelHeader title="Current focus" actionLabel="Add focus area" secondary />
                    </div>
                    <div className="border border-[var(--console-border)] bg-[var(--console-input)]">
                      <PanelHeader title="Recent entries" actionLabel="Add entry" secondary />
                    </div>
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Icon actions" secondary />
                  <div className="flex flex-wrap items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
                    {["Add item", "Add row", "Add focus area"].map((label) => (
                      <div key={label} className="flex items-center gap-[var(--spacing-8)] border border-[var(--console-border)] bg-[var(--console-input)] px-[var(--spacing-8)] py-[var(--spacing-4)]">
                        <IconActionButton label={label} />
                        <Text as="p" className="text-[length:var(--type-body03-size)] leading-[var(--leading-normal)] tracking-[var(--tracking-body)] text-[var(--console-text-muted)]">{label}</Text>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Disclosure rows" actionLabel="Add row" secondary />
                  <details open className="group bg-[var(--console-input)]">
                    <DisclosureRow title="Trading" meta="Market preparation and review" />
                    <div>
                      <IndentedRow title="Review weekly strategy" meta="Next review Friday">
                        <ProgressMeter value={72} />
                      </IndentedRow>
                      <IndentedRow title="Refine execution checklist" meta="6 of 8 checks defined">
                        <ProgressMeter value={75} />
                      </IndentedRow>
                    </div>
                  </details>
                  <details className="group bg-[var(--console-input)]">
                    <DisclosureRow title="Personal systems" meta="Routines and operating rhythm" />
                  </details>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Indented rows" secondary />
                  <div className="bg-[var(--console-input)]">
                    <IndentedRow title="Build the interface system" meta="Typography, colour and spacing">
                      <ProgressMeter value={64} />
                    </IndentedRow>
                    <IndentedRow title="Shape the Command view" meta="Current focus">
                      <ProgressMeter value={38} />
                    </IndentedRow>
                    <IndentedRow title="Kitchen renovation plan" meta="Planning">
                      <ProgressMeter value={42} />
                    </IndentedRow>
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Recent entry rows" actionLabel="Add entry" secondary />
                  <div className="divide-y divide-[var(--console-border)] border-t border-[var(--console-border)]">
                    <RecentEntryRow title="NQ strategy review" when="Today" tone="accent" />
                    <RecentEntryRow title="Console layout direction" when="Today" tone="blue" />
                    <RecentEntryRow title="Kitchen scope notes" when="Yesterday" tone="amber" />
                    <RecentEntryRow title="Upper-body training" when="Yesterday" tone="red" />
                    <RecentEntryRow title="Weekly review complete" when="Jun 11" tone="green" />
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Progress meters" secondary />
                  <div className="grid gap-[var(--spacing-16)] px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)] lg:grid-cols-3">
                    <div className="group/item bg-[var(--console-input)]">
                      <ProgressMeter value={24} />
                    </div>
                    <div className="group/item bg-[var(--console-input)]">
                      <ProgressMeter value={68} />
                    </div>
                    <div className="group/item bg-[var(--console-input)]">
                      <ProgressMeter value={92} />
                    </div>
                  </div>
                </section>

                <section className="border-b border-[var(--console-border)]">
                  <PanelHeader title="Search trigger" secondary />
                  <div className="flex justify-end px-[var(--spacing-16)] py-[var(--spacing-24)] sm:px-[var(--spacing-24)]">
                    <SearchTrigger />
                  </div>
                </section>

                <section>
                  <PanelHeader title="Start path panel" secondary />
                  <div className="max-w-md bg-[var(--console-input)]">
                    <StartPathPanel />
                  </div>
                </section>
              </div>
            </details>

            <details open className="group border-t border-[var(--console-border)]">
              <summary className="grid h-[var(--spacing-40)] cursor-pointer list-none grid-cols-[128px_minmax(0,1fr)_16px] items-center gap-[var(--spacing-12)] px-[var(--spacing-16)] outline-none transition-colors hover:bg-[var(--console-surface)] focus-visible:bg-[var(--console-surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--console-focus)] sm:px-[var(--spacing-24)]">
                <Text size="2" weight="medium" className="text-[var(--console-text)]">Spacing</Text>
                <Text size="1" className="hidden text-[var(--console-text-subtle)] sm:block">A consistent scale for components and layout rhythm</Text>
                <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} className="text-[var(--console-text-muted)] transition-transform duration-[var(--motion-chevron-duration)] ease-[var(--motion-chevron-ease)] group-open:rotate-90" />
              </summary>

              <div className="border-t border-[var(--console-border)]">
                <div className="hidden h-[var(--spacing-40)] grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(180px,1fr)] items-center border-b border-[var(--console-border)] px-[var(--spacing-24)] text-xs font-medium text-[var(--console-text-subtle)] md:grid">
                  <span>Token</span>
                  <span>Scale</span>
                  <span>Role</span>
                </div>
                <div className="divide-y divide-[var(--console-border)]">
                  {spacingTokens.map((token) => (
                    <div key={token.variable} className="grid min-h-16 gap-[var(--spacing-12)] px-[var(--spacing-16)] py-[var(--spacing-16)] sm:px-[var(--spacing-24)] md:grid-cols-[minmax(180px,0.8fr)_minmax(220px,1fr)_minmax(180px,1fr)] md:items-center md:py-[var(--spacing-12)]">
                      <div>
                        <Text as="p" size="2" weight="medium">{token.name}</Text>
                        <code className="mt-1 block font-mono text-[11px] text-[var(--console-text-subtle)]">{token.variable}</code>
                      </div>
                      <div className="flex items-center gap-[var(--spacing-16)]">
                        <Text size="1" className="w-10 shrink-0 text-[var(--console-text-muted)]">{token.value}</Text>
                        <span aria-hidden="true" className="block h-[var(--spacing-24)] rounded-[var(--radius-sm)] border border-[var(--console-border-accent)] bg-[var(--console-accent-500)]" style={{ width: `${Math.max(token.pixels, 8)}px` }} />
                      </div>
                      <Text as="p" size="1" className="leading-5 text-[var(--console-text-muted)]">{token.use}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>
      </div>
    </div>
  );
}
