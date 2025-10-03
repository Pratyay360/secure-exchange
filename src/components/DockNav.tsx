"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { MoonIcon, SunIcon, CirclePlus, BookOpen, Shield, Key, Lock, Unlock } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DockNav() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navItems = [
    { href: "/", icon: CirclePlus, label: "Home", color: "bg-black/10 dark:bg-white/10" },
    { href: "/aes-keys", icon: Key, label: "AES Keys", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { href: "/encrypt", icon: Lock, label: "AES Encrypt", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { href: "/decrypt", icon: Unlock, label: "AES Decrypt", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { href: "/ecc-keys", icon: Shield, label: "ECC Keys", color: "bg-green-100 dark:bg-green-900/30 text-green-600" },
    { href: "/ecc-encrypt", icon: Key, label: "ECC Encrypt", color: "bg-green-100 dark:bg-green-900/30 text-green-600" },
    { href: "/rsa-keys", icon: Lock, label: "RSA Keys", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
    { href: "/rsa-encrypt", icon: Lock, label: "RSA Encrypt", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
    { href: "/about", icon: BookOpen, label: "About", color: "bg-black/10 dark:bg-white/10" },
  ];

  return (
    <div className="z-50 sticky top-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <Dock magnification={60} distance={100}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <DockIcon 
                key={item.href}
                className={cn(
                  "p-3 transition-all",
                  item.color,
                  isActive && "ring-2 ring-offset-2 ring-primary"
                )}
              >
                <Link href={item.href} aria-label={item.label}>
                  <Icon size={24} />
                </Link>
              </DockIcon>
            );
          })}
          
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3 mt-2">
            <button 
              onClick={toggleTheme} 
              className="relative w-6 h-6"
              aria-label="Toggle theme"
            >
              <SunIcon
                className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                size={24}
              />
              <MoonIcon
                className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                size={24}
              />
            </button>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
