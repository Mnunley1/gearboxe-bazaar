"use client";

import { api } from "@car-market/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import {
  Car,
  ChevronDown,
  Heart,
  LogOut,
  MessageCircle,
  Plus,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type UserDropdownProps = {
  afterSignOutUrl?: string;
};

export function UserDropdown({ afterSignOutUrl = "/" }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const { user } = useUser();
  const { isAuthenticated } = useCurrentUser();
  const pathname = usePathname();
  const isAdmin = useQuery(api.users.isAdmin);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const userInitials = user?.fullName ? getInitials(user.fullName) : "U";

  const menuItems = [
    {
      label: "My Listings",
      href: "/myAccount/my-listings",
      icon: Car,
      active: pathname === "/myAccount/my-listings",
    },
    {
      label: "New Listing",
      href: "/myAccount/new-listing",
      icon: Plus,
      active: pathname === "/myAccount/new-listing",
    },
    {
      label: "Messages",
      href: "/myAccount/messages",
      icon: MessageCircle,
      active: pathname === "/myAccount/messages",
    },
    {
      label: "Favorites",
      href: "/myAccount/favorites",
      icon: Heart,
      active: pathname === "/myAccount/favorites",
    },
  ];

  const adminItems = [
    {
      label: "Admin Panel",
      href: "/admin",
      icon: Shield,
      active: pathname.startsWith("/admin"),
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="flex h-auto items-center space-x-2 px-3 py-2 hover:bg-gray-100 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        variant="ghost"
      >
        {/* User Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="font-medium text-sm text-white">{userInitials}</span>
        </div>

        {/* User Name */}
        <div className="hidden text-left sm:block">
          <div className="font-medium text-gray-900 text-sm">
            {user?.fullName || "User"}
          </div>
          <div className="text-gray-500 text-xs">
            {user?.emailAddresses?.[0]?.emailAddress || ""}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          {/* User Info Header */}
          <div className="border-gray-100 border-b px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-medium text-sm text-white">
                  {userInitials}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium text-gray-900 text-sm">
                  {user?.fullName || "User"}
                </div>
                <div className="truncate text-gray-500 text-xs">
                  {user?.emailAddresses?.[0]?.emailAddress || ""}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                    item.active
                      ? "border-primary border-r-2 bg-primary/5 text-primary"
                      : "text-gray-700"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <>
              <div className="border-gray-100 border-t pt-2">
                <div className="px-4 py-2">
                  <div className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    Admin
                  </div>
                </div>
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${
                        item.active
                          ? "border-primary border-r-2 bg-primary/5 text-primary"
                          : "text-gray-700"
                      }`}
                      href={item.href}
                      key={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* Sign Out */}
          <div className="border-gray-100 border-t pt-2">
            <button
              className="flex w-full items-center space-x-3 px-4 py-2 text-red-600 text-sm transition-colors hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
