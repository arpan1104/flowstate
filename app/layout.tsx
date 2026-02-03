import type { Metadata } from "next";
// 1. Import Poppins (the logo font)
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClietProvider from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Suspense } from "react";
import Loading from "@/components/auth/Loading";

// 2. Configure Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Wide range for UI
  variable: "--font-poppins", // This creates the CSS variable
});

export const metadata: Metadata = {
  title: "Flowstate",
  description: "Collaborative Productivity Application",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 3. Inject the variable into the body */}
      <body className={`${poppins.variable} antialiased`}>
        <Suspense fallback={<Loading />}>
          <ConvexClietProvider>
            <ThemeProvider>
              <Toaster />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </ConvexClietProvider>
        </Suspense>
      </body>
    </html>
  );
}