"use client"

import { useState, useEffect } from "react"

export default function StatusBanner() {
  const [isOnline, setIsOnline] = useState(true)

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

  if (isOnline) {
    return (
      <div className="bg-green-500 text-white p-2 text-center">You are online. Your notes will sync automatically.</div>
    )
  } else {
    return (
      <div className="bg-yellow-500 text-white p-2 text-center">
        You are offline. Your notes are still accessible, but changes won&apos;t be saved until you&apos;re back online.
      </div>
    )
  }
}

