"use client";
import { Dock } from "@/components/magicui/dock";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { DockIcon } from "@/components/magicui/dock";
import Link from "next/link";
import { BookOpen, CirclePlus } from "lucide-react";
export default function DockNav() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div className="z-10 sticky top-0 flex flex-col font-bold">
        <Dock magnification={60} distance={100}>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Link href="/">
              <CirclePlus size={24} />
            </Link>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Link href="/about">
              <BookOpen size={24} />
            </Link>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3 mt-2">
            <div onClick={toggleTheme} className="relative w-6 h-6">
              <SunIcon
                className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                size={24}
              />
              <MoonIcon
                className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                size={24}
              />
            </div>
          </DockIcon>
        </Dock>
      </div>
    </>
  );
}
