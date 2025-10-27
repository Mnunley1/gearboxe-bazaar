"use client";

import { api } from "@car-market/convex/_generated/api";
import { Button } from "@car-market/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@car-market/ui/card";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Car, Eye, MessageCircle, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Footer } from "../../../components/footer";
import { Navbar } from "../../../components/navbar";

export default function DashboardPage() {
  const { isLoading, isAuthenticated, user } = useCurrentUser();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  // Always call hooks, but conditionally pass arguments
  const userVehicles = useQuery(
    api.vehicles.getVehiclesByUser,
    user?._id ? { userId: user._id } : "skip"
  );
  const unreadCount = useQuery(
    api.messages.getUnreadCount,
    user?._id ? { userId: user._id } : "skip"
  );

  // Show loading while auth is being determined
  if (!authLoaded || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-primary border-b-2" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Only redirect if Clerk auth is not loaded or user is not signed in
  if (!isSignedIn) {
    redirect("/sign-in");
  }

  // Show loading while Convex user data is being fetched
  // Don't redirect here - wait for user to be created/fetched
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-32 w-32 animate-spin rounded-full border-primary border-b-2" />
          <p className="mt-4 text-gray-600">Setting up your account...</p>
        </div>
      </div>
    );
  }

  const approvedVehicles =
    userVehicles?.filter((v) => v.status === "approved") || [];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-3xl text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name || "Seller"}!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Button asChild className="h-20 text-white" size="lg">
            <Link
              className="flex flex-col items-center justify-center"
              href="/myAccount/new-listing"
            >
              <Plus className="mb-2 h-6 w-6" />
              <span>List New Vehicle</span>
            </Link>
          </Button>

          <Button asChild className="h-20" size="lg" variant="outline">
            <Link
              className="flex flex-col items-center justify-center"
              href="/myAccount/my-listings"
            >
              <Eye className="mb-2 h-6 w-6" />
              <span>Manage Listings</span>
            </Link>
          </Button>

          <Button asChild className="h-20" size="lg" variant="outline">
            <Link
              className="flex flex-col items-center justify-center"
              href="/myAccount/messages"
            >
              <MessageCircle className="mb-2 h-6 w-6" />
              <span>Messages {unreadCount ? `(${unreadCount})` : ""}</span>
            </Link>
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Total Listings
                  </p>
                  <p className="font-bold text-2xl text-gray-900">
                    {userVehicles?.length || 0}
                  </p>
                </div>
                <Car className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-600 text-sm">
                    Approved Listings
                  </p>
                  <p className="font-bold text-2xl text-gray-900">
                    {approvedVehicles.length}
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="font-bold text-green-600 text-sm">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {userVehicles && userVehicles.length > 0 ? (
              <div className="space-y-4">
                {userVehicles.slice(0, 5).map((vehicle) => (
                  <div
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    key={vehicle._id}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {vehicle.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {vehicle.year} {vehicle.make} {vehicle.model} • $
                        {vehicle.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          vehicle.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : vehicle.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/vehicles/${vehicle._id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                {userVehicles.length > 5 && (
                  <div className="pt-4 text-center">
                    <Button asChild variant="outline">
                      <Link href="/myAccount/my-listings">
                        View All Listings
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Car className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h3 className="mb-2 font-medium text-gray-900 text-lg">
                  No listings yet
                </h3>
                <p className="mb-6 text-gray-600">
                  Start by creating your first vehicle listing
                </p>
                <Button asChild className="text-white">
                  <Link href="/myAccount/new-listing">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Listing
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
