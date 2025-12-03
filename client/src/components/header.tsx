import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-[#ff1493] bg-clip-text text-transparent">
              GlowShop
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="text-sm font-medium"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="relative overflow-visible"
              aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
              data-testid="button-theme-toggle"
            >
              <div className="relative">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 transition-all duration-300" />
                ) : (
                  <Sun className="h-5 w-5 transition-all duration-300" />
                )}
              </div>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-xl bg-background/95 border-b border-border/50">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
