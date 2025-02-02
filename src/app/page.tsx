"use client"

import NoteForm from "@/components/NoteForm"
import NoteList from "@/components/NoteList"
import StatusBanner from "@/components/StatusBanner"
import PWAInstall from "@/components/PWAinstall"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StatusBanner />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Offline Notes App</h1>
        <NoteForm />
        <NoteList />
      </main>
      <PWAInstall />
    </div>
  )
}

