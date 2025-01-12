import Link from "next/link";
import { AuthButtons } from "../auth-buttons";
import { ModeToggle } from "../mode-toggle";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-playfair text-2xl font-bold">TalkGist</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/posts"
            className="transition-colors hover:text-foreground/80"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80"
          >
            About
          </Link>
          <AuthButtons />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
