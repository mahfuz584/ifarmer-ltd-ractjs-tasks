"use client";

import { cn } from "@/lib/utils";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Assignment-1", path: "/" },
    { name: "Assignment-2", path: "/assignment-2" },
  ];

  return (
    <nav className="bg-slate-800 text-slate-200 shadow-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold text-white">My Assignments</div>
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "rounded-lg px-4 py-2 font-medium transition-colors hover:bg-slate-700",
                pathname === item.path && "bg-blue-600 text-white"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden rounded-md p-2 hover:bg-slate-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-2 px-6 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "rounded-lg px-4 py-2 font-medium transition-colors hover:bg-slate-700",
                pathname === item.path && "bg-blue-600 text-white"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
