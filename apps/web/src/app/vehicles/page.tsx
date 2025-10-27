"use client";

import { api } from "@car-market/convex/_generated/api";
import { Button } from "@car-market/ui/button";
import { useQuery } from "convex/react";
import { Car, Grid, List } from "lucide-react";
import { useState } from "react";
import { Footer } from "../../../components/footer";
import { Navbar } from "../../../components/navbar";
import { VehicleCard } from "../../../components/vehicle-card";
import { VehicleFilters } from "../../../components/vehicle-filters";

export default function VehiclesPage() {
  const [filters, setFilters] = useState({
    make: undefined,
    model: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minYear: undefined,
    maxYear: undefined,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const vehicles = useQuery(api.vehicles.getVehicles, {
    status: "approved",
    ...filters,
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-4xl text-gray-900">
            Browse Vehicles
          </h1>
          <p className="text-gray-600 text-xl">
            Discover amazing cars from local sellers. Find your next vehicle
            today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <VehicleFilters
              onFiltersChange={(filters) => setFilters(filters)}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-semibold text-gray-900 text-lg">
                  {vehicles
                    ? `${vehicles.length} vehicles found`
                    : "Loading..."}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "outline"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setViewMode("list")}
                  size="sm"
                  variant={viewMode === "list" ? "default" : "outline"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Vehicles Grid/List */}
            {vehicles && vehicles.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <Car className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                  No vehicles found
                </h3>
                <p className="mb-4 text-gray-600">
                  Try adjusting your filters or check back later for new
                  listings.
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      make: undefined,
                      model: undefined,
                      minPrice: undefined,
                      maxPrice: undefined,
                      minYear: undefined,
                      maxYear: undefined,
                    })
                  }
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
