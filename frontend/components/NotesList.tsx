"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Note } from "@/types";

interface NotesListProps {
  onEdit?: (note: Note) => void;
}

export default function NotesList({ onEdit }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await api.get<Note[]>("/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="text-gray-500">No notes yet. Create your first note!</div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <p className="text-gray-600 mt-2">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onEdit?.(note)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
