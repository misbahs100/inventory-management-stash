import "@/styles/globals.css"

import * as React from "react"
import type { Metadata, Viewport } from "next"
import { env } from "@/env.mjs"

import { fontInter } from "@/config/fonts"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"

// import { ThemeToggle } from "@/components/theme-toggle"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.links.authorsWebsite,
    },
  ],
  creator: siteConfig.author,
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.links.openGraphImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontInter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster />
          <TailwindIndicator />
          {/* <ThemeToggle /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
