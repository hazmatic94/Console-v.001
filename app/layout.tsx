import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: { default: "Console", template: "%s · Console" },
  description: "A calm operating system for focused work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="gray" grayColor="slate" radius="medium" scaling="100%">
          <AppShell>{children}</AppShell>
        </Theme>
      </body>
    </html>
  );
}
