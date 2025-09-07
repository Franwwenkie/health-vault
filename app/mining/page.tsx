"use client";

import Navigation from "@/components/Navigation";
import HealthMiningLeaderboard from "@/components/HealthMiningLeaderboard";

export default function MiningPage() {
  return (
    <div className="min-h-screen health-vault-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <HealthMiningLeaderboard />
      </main>
    </div>
  );
}
