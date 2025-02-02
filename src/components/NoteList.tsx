"use client"

import { useNoteStore } from "@/store/NoteStore"

export default function NoteList() {
  const notes = useNoteStore((state) => state.notes)
  const deleteNote = useNoteStore((state) => state.deleteNote)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="bg-card text-card-foreground p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
          <p className="mb-2">{note.description}</p>
          <button
            onClick={() => deleteNote(note.id)}
            className="px-2 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

