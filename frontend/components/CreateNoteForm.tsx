"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";

interface NoteFormData {
  title: string;
  content: string;
}

interface CreateNoteFormProps {
  onSuccess: () => void;
}

export default function CreateNoteForm({ onSuccess }: CreateNoteFormProps) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>();

  const onSubmit = async (data: NoteFormData) => {
    try {
      setError("");
      await api.post("/notes", data);
      reset();
      onSuccess();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || "Failed to create note");
      } else {
        setError("Failed to create note");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          {...register("content", { required: "Content is required" })}
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create Note
      </button>
    </form>
  );
}
