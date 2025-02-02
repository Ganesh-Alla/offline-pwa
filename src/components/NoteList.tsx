"use client"

import { useNoteStore } from "@/store/NoteStore"
import { useEffect, useState } from "react"

export default function NoteList() {
  const notes = useNoteStore((state) => state.notes)
  const deleteNote = useNoteStore((state) => state.deleteNote)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (notes.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No notes yet. Start by adding a new note!</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="bg-card text-card-foreground p-4 mb-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
          <p className="mb-2">{note.description}</p>
          <button
            onClick={() => deleteNote(note.id)}
            className={`px-2 py-1 rounded ${
              isOnline
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isOnline}
          >
            {isOnline ? "Delete" : "Offline - Cannot Delete"}
          </button>
        </div>
      ))}
    </div>
  )
}

