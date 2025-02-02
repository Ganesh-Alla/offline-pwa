"use client"

import { useState, useEffect } from "react"
import { useNoteStore } from "@/store/NoteStore"
import type React from "react" // Added import for React

export default function NoteForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const addNote = useNoteStore((state) => state.addNote)

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }

    function handleOffline() {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check initial status
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && description.trim()) {
      addNote({
        id: Date.now().toString(),
        title,
        description,
        createdAt: Date.now(),
      })
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        type="submit"
        className={`w-full p-2 rounded ${
          isOnline
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!isOnline}
      >
        {isOnline ? "Add Note" : "Offline - Cannot Add Note"}
      </button>
    </form>
  )
}

