import { compromissosData } from "@/lib/compromissos-data"
import { PartituraViewer } from "@/components/partitura-viewer"
import { CompromissoHeader } from "@/components/compromisso-header"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function CompromissoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const compromisso = compromissosData.find((c) => c.id === id)

  if (!compromisso) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Compromisso não encontrado</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
      {/* Header fixo */}
      <CompromissoHeader titulo={compromisso.nome} />

      <div className="pt-24 pb-6">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-8">
          {/* Seção de download do repertório */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-2 border-yellow-500/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Repertório Completo</h2>
                <p className="text-white/70 text-sm md:text-base">
                  Baixe todas as partituras deste evento em um único arquivo PDF
                </p>
                <p className="text-white/50 text-xs md:text-sm mt-1">Produzido por Immolatus Cantus</p>
              </div>
              <a href={compromisso.repertorioPdf} download>
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 md:px-8 w-full md:w-auto"
                >
                  <Download className="w-5 h-5 mr-3" />
                  Baixar Repertório PDF
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="pb-12">
        <PartituraViewer compromisso={compromisso} />
      </div>
    </div>
  )
}
