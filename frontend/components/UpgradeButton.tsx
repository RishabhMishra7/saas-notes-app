"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { getUser } from "@/lib/auth";

interface UpgradeButtonProps {
  onUpgrade: () => void;
}

export default function UpgradeButton({ onUpgrade }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = getUser();

  if (!user || user.role !== "ADMIN" || user.tenant.plan === "PRO") {
    return null;
  }

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError("");
      await api.post(`/tenants/${user.tenant.slug}/upgrade`);

      // Update local storage with new plan
      const updatedUser = {
        ...user,
        tenant: { ...user.tenant, plan: "PRO" as const },
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      onUpgrade();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || "Upgrade failed");
      } else {
        setError("Upgrade failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="font-semibold">Upgrade to Pro</h3>
      <p className="text-sm text-gray-600 mt-1">
        You&apos;ve reached the free plan limit of 3 notes. Upgrade to Pro for
        unlimited notes!
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 disabled:opacity-50"
      >
        {loading ? "Upgrading..." : "Upgrade to Pro"}
      </button>
    </div>
  );
}
