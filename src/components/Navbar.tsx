"use client";

import { Menu, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/themetoggle";

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/aes-keys", label: "AES Keys" },
  { href: "/ecc-keys", label: "ECC Keys" },
  { href: "/rsa-keys", label: "RSA Keys" },
  { href: "/about", label: "About" },
];

const toolNavItems = [
  { href: "/encrypt", label: "AES Encrypt" },
  { href: "/decrypt", label: "AES Decrypt" },
  { href: "/ecc-encrypt", label: "ECC Encrypt" },
  { href: "/rsa-encrypt", label: "RSA Encrypt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-6 md:mr-12">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SecureExchange
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg transition-all ${
                pathname === item.href
                  ? "text-foreground font-semibold bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Tools Dropdown for Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  toolNavItems.some(item => pathname.startsWith(item.href))
                    ? "text-foreground font-semibold bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                Tools <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {toolNavItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "text-foreground font-semibold bg-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {/* Add more tools or links here if needed */}
              <DropdownMenuItem asChild>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  View All Tools
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 pt-6">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors text-lg ${
                      pathname === item.href
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Tools Collapsible */}
                <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen} className="w-full">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between w-full text-lg text-muted-foreground cursor-pointer hover:text-foreground">
                      <span>Tools</span>
                      <ChevronDown className={`h-5 w-5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 space-y-3 pt-3">
                    {toolNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block transition-colors text-base ${
                          pathname === item.href
                            ? "text-foreground font-semibold"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/tools"
                      className="block transition-colors text-base text-muted-foreground hover:text-foreground"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      View All Tools
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
                {/* Removed duplicate About link from mobile collapsible section */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}