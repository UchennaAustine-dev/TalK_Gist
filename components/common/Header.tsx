"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, X, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-primary/40 to-secondary/40 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-secondary/40 to-neutral/40 dark:from-secondary-dark/20 dark:to-neutral-dark/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-primary/40 to-neutral/40 dark:from-primary-dark/20 dark:to-neutral-dark/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-secondary/40 to-primary/40 dark:from-secondary-dark/20 dark:to-primary-dark/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        {/* <Logo
            className="transition-transform hover:scale-110 cursor-pointer duration-500 ease-in-out"
            aria-label="Onwuka Uchenna Austine - Software Developer"
          /> */}

        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="transition-transform hover:scale-110"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className={`transition-all duration-300 hover:scale-110 ${
              isMenuOpen ? "rotate-45" : ""
            }`}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </nav>
      </header>

      {/* <NavigationMenu isMenuOpen={isMenuOpen} onMenuClose={closeMenu} /> */}
    </>
  );
};

export default Header;
