"use client";

import { Button } from "@car-market/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserDropdown } from "./user-dropdown";

export function Navbar() {
  const { isAuthenticated } = useConvexAuth();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show loading state while auth is being determined
  if (!authLoaded) {
    return (
      <nav className="border-gray-200 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link className="flex items-center space-x-2" href="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-bold text-sm text-white">G</span>
              </div>
              <span className="font-bold text-gray-900 text-xl">
                Gearboxe Market
              </span>
            </Link>

            {/* Loading state */}
            <div className="flex items-center space-x-4">
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-gray-200 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link className="flex items-center space-x-2" href="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-bold text-sm text-white">G</span>
              </div>
              <span className="font-bold text-gray-900 text-xl">
                Gearboxe Market
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden items-center space-x-6 md:flex">
              <Link
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  pathname === "/vehicles" ? "text-primary" : "text-gray-700"
                }`}
                href="/vehicles"
              >
                Browse Vehicles
              </Link>
              <Link
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  pathname === "/events" ? "text-primary" : "text-gray-700"
                }`}
                href="/events"
              >
                Events
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated || isSignedIn ? (
              <UserDropdown afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="text-white" size="sm">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              size="sm"
              variant="ghost"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-gray-200 border-t bg-white md:hidden">
            <div className="space-y-1 px-4 py-2">
              <Link
                className={`block px-3 py-2 font-medium text-sm transition-colors hover:text-primary ${
                  pathname === "/vehicles" ? "text-primary" : "text-gray-700"
                }`}
                href="/vehicles"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Vehicles
              </Link>
              <Link
                className={`block px-3 py-2 font-medium text-sm transition-colors hover:text-primary ${
                  pathname === "/events" ? "text-primary" : "text-gray-700"
                }`}
                href="/events"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
