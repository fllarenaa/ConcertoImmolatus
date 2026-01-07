"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Volume2, Maximize, Download, X, Search, Music2, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Compromisso } from "@/lib/compromissos-data"

type Props = {
  compromisso: Compromisso
}

type VoiceType = "soprano" | "alto" | "tenor" | "baixo"

const voices: { type: VoiceType; label: string; color: string }[] = [
  { type: "soprano", label: "Soprano", color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30" },
  { type: "alto", label: "Alto", color: "from-gray-500/20 to-gray-600/10 border-gray-500/30" },
  { type: "tenor", label: "Tenor", color: "from-yellow-400/20 to-yellow-500/10 border-yellow-400/30" },
  { type: "baixo", label: "Baixo", color: "from-gray-400/20 to-gray-500/10 border-gray-400/30" },
]

export function PartituraViewer({ compromisso }: Props) {
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const touchStartX = useRef(0)
  const partituraRef = useRef<HTMLDivElement>(null)

  const selectedMusica = compromisso.musicas[selectedMusicIndex]

  const musicasFiltradas = useMemo(() => {
    if (!searchTerm.trim()) return compromisso.musicas

    const term = searchTerm.toLowerCase()
    return compromisso.musicas.filter((musica) => musica.nome.toLowerCase().includes(term))
  }, [searchTerm, compromisso.musicas])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX.current - touchEndX

      if (diff > 50) {
        nextPage()
      } else if (diff < -50) {
        prevPage()
      }
    }

    const element = partituraRef.current
    if (element) {
      element.addEventListener("touchstart", handleTouchStart)
      element.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentPage, selectedMusica.partituras.length])

  const nextPage = () => {
    if (currentPage < selectedMusica.partituras.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const selectMusica = (index: number) => {
    setSelectedMusicIndex(index)
    setCurrentPage(0)
  }

  const downloadPartitura = () => {
    const link = document.createElement("a")
    link.href = selectedMusica.partituras[currentPage]
    link.download = `${selectedMusica.nome}-pagina-${currentPage + 1}.jpg`
    link.click()
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="flex items-center justify-between p-3 md:p-4 bg-neutral-900 border-b border-neutral-800">
          <h2 className="text-white font-semibold text-sm md:text-lg truncate flex-1">{selectedMusica.nome}</h2>
          <Button
            onClick={() => setIsFullscreen(false)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-neutral-800 flex-shrink-0"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        <div
          ref={partituraRef}
          className="flex-1 flex items-center justify-center bg-black p-2 md:p-4 relative overflow-hidden"
        >
          <img
            src={selectedMusica.partituras[currentPage] || "/placeholder.svg"}
            alt={`Partitura página ${currentPage + 1}`}
            className="max-w-full max-h-full object-contain touch-manipulation"
          />

          {/* Desktop navigation arrows */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === selectedMusica.partituras.length - 1}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Bottom controls - mobile friendly */}
        <div className="p-3 md:p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between gap-2">
          <Button
            onClick={prevPage}
            disabled={currentPage === 0}
            variant="outline"
            size="sm"
            className="md:hidden bg-neutral-800 hover:bg-neutral-700 text-white border-0 disabled:opacity-30 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center">
            <p className="text-white/70 text-xs md:text-sm whitespace-nowrap">
              {currentPage + 1} / {selectedMusica.partituras.length}
            </p>
            <div className="flex gap-1">
              {selectedMusica.partituras.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "h-1.5 md:h-2 rounded-full transition-all",
                    currentPage === index ? "bg-yellow-500 w-4 md:w-6" : "bg-neutral-600 w-1.5 md:w-2",
                  )}
                />
              ))}
            </div>
            <Button
              onClick={downloadPartitura}
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs md:text-sm flex-shrink-0"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">Baixar</span>
            </Button>
          </div>

          <Button
            onClick={nextPage}
            disabled={currentPage === selectedMusica.partituras.length - 1}
            variant="outline"
            size="sm"
            className="md:hidden bg-neutral-800 hover:bg-neutral-700 text-white border-0 disabled:opacity-30 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl pb-20 md:pb-12">
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar música neste evento..."
            className="pl-10 bg-neutral-800 border-yellow-500/30 text-white placeholder:text-white/50 h-12"
          />
        </div>
        {searchTerm.trim() && (
          <p className="text-white/60 text-sm mt-2">
            {musicasFiltradas.length} música(s) encontrada(s) em "{compromisso.nome}"
          </p>
        )}
      </div>

      <div className="mb-8">
        {musicasFiltradas.length === 0 ? (
          <div className="bg-neutral-800/50 border-2 border-yellow-500/20 rounded-xl p-8 text-center">
            <Music2 className="w-12 h-12 mx-auto mb-4 text-white/30" />
            <p className="text-white/50">Nenhuma música encontrada com "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {musicasFiltradas.map((musica, index) => {
              const realIndex = compromisso.musicas.findIndex((m) => m.id === musica.id)
              const isSelected = selectedMusicIndex === realIndex

              return (
                <button
                  key={musica.id}
                  onClick={() => {
                    setSelectedMusicIndex(realIndex)
                    setCurrentPage(0)
                  }}
                  className={cn(
                    "p-5 rounded-xl font-medium transition-all border-2 text-left",
                    isSelected
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-black border-yellow-400 shadow-xl shadow-yellow-400/30 scale-105"
                      : "bg-gradient-to-br from-neutral-800 to-neutral-850 text-white/80 border-white/10 hover:border-yellow-500/30 hover:shadow-lg",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Music2
                      className={cn("w-5 h-5 mt-0.5 flex-shrink-0", isSelected ? "text-black" : "text-yellow-500")}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg mb-1">{musica.nome}</h4>
                      <p className={cn("text-sm", isSelected ? "text-black/70" : "text-white/50")}>
                        {musica.partituras.length} partitura(s)
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {musicasFiltradas.length > 0 && (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            {selectedMusica.videoYoutubeId && (
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/20 rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Youtube className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedMusica.nome}</h3>
                    <p className="text-white/60 text-sm">Assista a performance desta música</p>
                  </div>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedMusica.videoYoutubeId}`}
                    title={selectedMusica.nome}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}



            {/* Visualizador de partituras */}
            <div className="bg-gradient-to-br from-white via-neutral-50 to-neutral-100 rounded-2xl shadow-2xl p-4 md:p-8 min-h-[70vh] flex flex-col">
              <div className="mb-4 md:mb-6 pb-4 border-b-2 border-neutral-200 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 truncate">{selectedMusica.nome}</h2>
                  <p className="text-neutral-600 mt-1 text-sm md:text-base">
                    Página {currentPage + 1} de {selectedMusica.partituras.length}
                  </p>
                </div>
                <Button
                  onClick={() => setIsFullscreen(true)}
                  variant="outline"
                  size="sm"
                  className="border-neutral-300 hover:bg-neutral-100 flex-shrink-0"
                >
                  <Maximize className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Tela Cheia</span>
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center mb-4 md:mb-6 relative">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/50 to-transparent rounded-lg" />
                  <img
                    src={selectedMusica.partituras[currentPage] || "/placeholder.svg"}
                    alt={`Partitura página ${currentPage + 1}`}
                    className="relative z-10 max-w-full max-h-[60vh] object-contain drop-shadow-xl rounded"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white border-0 disabled:opacity-30 disabled:bg-neutral-600 px-6 md:px-8"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Anterior
                </Button>

                <div className="flex gap-2">
                  {selectedMusica.partituras.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        currentPage === index ? "bg-yellow-500 w-8" : "bg-neutral-400 w-2 hover:bg-neutral-500",
                      )}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextPage}
                  disabled={currentPage === selectedMusica.partituras.length - 1}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white border-0 disabled:opacity-30 disabled:bg-neutral-600 px-6 md:px-8"
                >
                  Próxima
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            

                   {/* <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-2 border-red-500/20 rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Youtube className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedMusica.nome}</h3>
                    <p className="text-white/60 text-sm">Assista a performance desta música</p>
                  </div>
                </div>
                <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedMusica.videoYoutubeId}`}
                    title={selectedMusica.nome}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div> */}


          </div>

          {/* Sidebar de áudios */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Áudios por Voz
              </h3>

              <div className="space-y-3">
                {voices.map(({ type, label, color }) => (
                  <div
                    key={type}
                    className={cn("bg-gradient-to-br backdrop-blur-sm rounded-xl p-4 md:p-5 border-2 shadow-lg", color)}
                  >
                    <p className="font-semibold text-white mb-3 text-base md:text-lg">{label}</p>
                    <audio
                      controls
                      className="w-full h-10 md:h-12 rounded-lg"
                      src={selectedMusica.audios[type]}
                      style={{
                        filter: "invert(1) hue-rotate(180deg)",
                      }}
                    >
                      Seu navegador não suporta áudio.
                    </audio>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl overflow-hidden shadow-lg border-2 border-white/10 hidden lg:block">
                <img
                  src={compromisso.imagem || "/placeholder.svg"}
                  alt={compromisso.nome}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
