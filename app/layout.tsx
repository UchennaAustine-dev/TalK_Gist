import { Inter, Martel_Sans } from "next/font/google";
// import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { SearchBar } from "@/components/search-bar";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const martelSans = Martel_Sans({
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-calsans",
});

export const metadata = {
  title: "TalkGist - Share Your Stories",
  description:
    "A modern platform for sharing articles and engaging with readers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          martelSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">TalkGist</h1>
              <SearchBar />
            </header>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
