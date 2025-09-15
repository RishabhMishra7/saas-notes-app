"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout, isAuthenticated } from "@/lib/auth";
import NotesList from "@/components/NotesList";
import CreateNoteForm from "@/components/CreateNoteForm";
import UpgradeButton from "@/components/UpgradeButton";

// Define the User type
interface User {
  email: string;
  role: string;
  tenant: {
    name: string;
    plan: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();

  // Initialize as null, then load from localStorage on client
  const [user, setUser] = useState<User | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Runs only on client
    const storedUser = getUser();
    setUser(storedUser);

    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  // Wait until user is loaded
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">
              {user.tenant.name} - Notes Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.email} ({user.role}) - {user.tenant.plan} Plan
              </span>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Notes</h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {showCreateForm ? "Cancel" : "New Note"}
              </button>
            </div>

            {showCreateForm && (
              <div className="mb-6">
                <CreateNoteForm
                  onSuccess={() => {
                    setShowCreateForm(false);
                    setRefreshKey((prev) => prev + 1);
                  }}
                />
              </div>
            )}

            <NotesList key={refreshKey} />
          </div>

          <div>
            <UpgradeButton onUpgrade={() => window.location.reload()} />
          </div>
        </div>
      </main>
    </div>
  );
}
