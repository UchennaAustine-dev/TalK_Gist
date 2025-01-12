import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="font-playfair text-lg font-bold">
            TalkGist
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built with passion. Powered by Next.js and MongoDB.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/terms" className="text-sm underline underline-offset-4">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm underline underline-offset-4"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
