"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navItemContentVariants } from "@/lib/animations";
import NavIcon from "./nav-icon";

const utilityIcons = [
  { src: "/icons/calculator.svg", alt: "Calculator" },
  { src: "/icons/calendar.svg", alt: "Calendar" },
  { src: "/icons/search.svg", alt: "Search" },
  { src: "/icons/wallet.svg", alt: "Wallet" },
  { src: "/icons/marketplace.svg", alt: "Marketplace" },
];

const navItems = [
  { href: "/", label: "Dashboard", icon: "/icons/home.svg" },
  { href: "/listings", label: "Listings", icon: "/icons/toolbox.svg" },
  { href: "/users", label: "Users", icon: "/icons/profile.svg" },
  { href: "/request", label: "Request", icon: "/icons/article.svg" },
  { href: "/applications", label: "Applications", icon: "/icons/scroll.svg" },
  { href: "/tasks", label: "Tasks", icon: "/icons/task.svg" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const currentActiveIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <header className="w-full">
      <div className="bg-green-1 py-5 px-[6.1%] pr-[6.4%] flex items-center justify-between">
        <Image
          src="/images/expert-listing-logo.svg"
          alt="Expert Listing"
          width={200}
          height={27}
          priority
          className="w-auto h-6 md:h-auto md:w-[200px]"
        />
        
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            {utilityIcons.map((icon, index) => (
              <button
                key={index}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={icon.alt}
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </button>
            ))}
          </div>
          
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-black-2 font-medium text-sm md:text-base">D</span>
          </div>
          
          <button
            className="md:hidden ml-2 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-green-1 border-t border-white/10"
          >
            <div className="px-[6.1%] py-4 flex flex-wrap gap-4">
              {utilityIcons.map((icon, index) => (
                <button
                  key={index}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label={icon.alt}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="bg-white py-[14px] px-[4%] md:px-[6.1%] md:pr-[6.4%] border-b border-white-1 relative">
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2 md:gap-4 relative">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className="flex-1 relative z-10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-[rgba(23,109,88,0.15)] rounded-lg"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 sm:px-2 md:px-3 py-2 rounded-lg cursor-pointer relative z-10"
                  whileHover={!isActive ? { backgroundColor: "rgba(23, 109, 88, 0.08)" } : {}}
                >
                  <motion.div
                    variants={navItemContentVariants}
                    animate={isActive ? "active" : "inactive"}
                    className="relative"
                  >
                    <NavIcon
                      src={item.icon}
                      alt={item.label}
                      isActive={isActive}
                    />
                  </motion.div>
                  <motion.span
                    className={`text-[10px] sm:text-xs md:text-sm whitespace-nowrap ${isActive ? "font-semibold" : "font-normal"}`}
                    variants={navItemContentVariants}
                    animate={isActive ? "active" : "inactive"}
                  >
                    <span className="hidden sm:inline">{item.label}</span>
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
