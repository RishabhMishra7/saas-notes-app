"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { LoginResponse } from "@/types";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      setLoading(true);

      const response = await api.post<LoginResponse>("/auth/login", data);
      saveAuth(response.data.token, response.data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as {
          response?: { data?: { error?: string } };
          message?: string;
        };
        const errorMessage =
          error.response?.data?.error || error.message || "Login failed";
        setError(errorMessage);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="admin@acme.test"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="w-full px-3 py-2 border rounded-md"
          placeholder="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-sm text-gray-600 mt-4">
        <p>Test Accounts (password: password):</p>
        <ul className="mt-2 space-y-1">
          <li>admin@acme.test (Admin - Acme)</li>
          <li>user@acme.test (Member - Acme)</li>
          <li>admin@globex.test (Admin - Globex)</li>
          <li>user@globex.test (Member - Globex)</li>
        </ul>
      </div>
    </form>
  );
}
