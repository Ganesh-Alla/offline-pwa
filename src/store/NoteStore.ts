import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Note } from "@/types"

interface NoteStore {
  notes: Note[]
  addNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
    }),
    {
      name: "note-storage",
    },
  ),
)

