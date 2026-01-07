"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, Music2, Calendar } from "lucide-react"
import { compromissosData, type Musica, type Compromisso } from "@/lib/compromissos-data"
import Link from "next/link"

type Props = {
  open: boolean
  onClose: () => void
}

type ResultItem = {
  musica: Musica
  compromisso: Compromisso
}

export function BuscaGlobalModal({ open, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const resultados = useMemo(() => {
    if (!searchTerm.trim()) return []

    const term = searchTerm.toLowerCase()
    const results: ResultItem[] = []

    compromissosData.forEach((compromisso) => {
      compromisso.musicas.forEach((musica) => {
        if (musica.nome.toLowerCase().includes(term)) {
          results.push({ musica, compromisso })
        }
      })
    })

    return results
  }, [searchTerm])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col bg-neutral-900 border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Buscar Músicas</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome da música..."
            className="pl-10 bg-neutral-800 border-yellow-500/30 text-white placeholder:text-white/50 h-12 text-lg"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {!searchTerm.trim() ? (
            <div className="text-center py-12 text-white/50">
              <Music2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Digite para pesquisar entre todas as músicas do coral</p>
            </div>
          ) : resultados.length === 0 ? (
            <div className="text-center py-12 text-white/50">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma música encontrada</p>
            </div>
          ) : (
            <>
              <p className="text-white/70 text-sm mb-4">{resultados.length} resultado(s) encontrado(s)</p>
              {resultados.map(({ musica, compromisso }, index) => (
                <Link
                  key={`${compromisso.id}-${musica.id}-${index}`}
                  href={`/compromisso/${compromisso.id}`}
                  onClick={onClose}
                  className="block bg-gradient-to-br from-neutral-800 to-neutral-850 border-2 border-yellow-500/20 hover:border-yellow-500/40 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={compromisso.imagem || "/placeholder.svg"}
                        alt={compromisso.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                        <Music2 className="w-4 h-4 text-yellow-500" />
                        {musica.nome}
                      </h3>
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {compromisso.nome}
                      </p>
                      <p className="text-white/40 text-xs mt-1">{musica.partituras.length} partitura(s)</p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
