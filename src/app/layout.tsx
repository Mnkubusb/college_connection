import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "../components/ui/theme-provider";
import Aside from "@/components/Aside";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "@/components/providers/confetti-provider";



const OleoScript = localFont({
  src: "./fonts/OleoScript.ttf",
  variable: "--font-oleo-script",
  weight: "400",
})

const JosefinSans = localFont({
  src: "./fonts/JosefinSansVF.ttf",
  variable: "--font-josefin-sans",
  weight: "100 900",
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "College Connections",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <Analytics />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${JosefinSans.variable} ${OleoScript.variable} antialiased`}
        >
          <ConfettiProvider />
          <Toaster />
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="flex flex-col-reverse sm:flex-row h-[100svh] overflow-hidden w-screen">
                <Aside/>
                {children}
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
