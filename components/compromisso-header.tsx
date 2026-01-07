"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  titulo: string
}

export function CompromissoHeader({ titulo }: Props) {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-yellow-400/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-yellow-400">{titulo}</h1>
        <div className="w-24" />
      </div>
    </header>
  )
}
