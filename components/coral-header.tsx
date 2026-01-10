"use client"

import { Music, Search, Home, Calendar, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BuscaGlobalModal } from "@/components/busca-global-modal"
import Link from "next/link"

export function CoralHeader() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white py-12 px-4 border-b border-yellow-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />
                <Music className="relative w-14 h-14 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Concerto PSAMD
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto text-pretty">
              Louvando a Deus através da música sacra
            </p>
            <p className="text-sm text-white/50 mt-2">Immolatus Cantus</p>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowSearch(true)}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 shadow-lg hover:shadow-yellow-500/30 transition-all"
            >
              <Search className="w-5 h-5 mr-3" />
              Buscar em todas as músicas
            </Button>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-yellow-500/20 z-40 safe-area-pb">
        <div className="flex items-center justify-around py-2 px-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white/70 hover:text-yellow-500 hover:bg-transparent h-auto py-2"
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Início</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-yellow-500 hover:bg-transparent h-auto py-2"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">Buscar</span>
          </Button>

          <a href="#compromissos">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white/70 hover:text-yellow-500 hover:bg-transparent h-auto py-2"
            >
              <Music2 className="w-6 h-6" />
              <span className="text-xs">Eventos</span>
            </Button>
          </a>

          <a href="#calendario">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 text-white/70 hover:text-yellow-500 hover:bg-transparent h-auto py-2"
            >
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Calendário</span>
            </Button>
          </a>
        </div>
      </nav>

      <BuscaGlobalModal open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  )
}
