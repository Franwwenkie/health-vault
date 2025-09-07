"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  title?: string;
  subtitle?: string;
}

export default function Navigation({ title = "Health Vault", subtitle }: NavigationProps) {
  const pathname = usePathname();
  
  const getSubtitle = () => {
    if (subtitle) return subtitle;
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/devices") return "Device Management";
    if (pathname === "/mining") return "Health Data Mining";
    if (pathname === "/features") return "Features";
    return "Secure Health Data Platform";
  };

  return (
    <nav className="health-vault-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="health-vault-title text-xl">{title}</h1>
                <p className="text-xs text-slate-400">{getSubtitle()}</p>
              </div>
            </Link>
          </div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
