import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Caveat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Austin STEM Center",
    template: "%s · Austin STEM Center",
  },
  description:
    "A nonprofit innovation hub in Austin, TX, with hands-on experiences in science, art, engineering, and creative exploration for students, educators, and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="notebook-rule relative flex flex-1 flex-col overflow-x-clip">
          <header className="header-bar notebook-rule sticky top-0 z-50 border-b border-ink/15 shadow-[0_2px_0_rgba(56,52,42,0.05)]">
            <div className="mx-auto w-full max-w-[1100px] pt-4 pb-3 pr-5 pl-[88px] max-sm:pl-[52px]">
              <SiteHeader />
            </div>
          </header>
          <div className="relative mx-auto w-full max-w-[1100px] flex-1 pb-[70px] pr-5 pl-[88px] max-sm:pl-[52px]">
            {children}
          </div>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
