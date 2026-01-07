"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Music } from "lucide-react"
import { compromissosData } from "@/lib/compromissos-data"
import Link from "next/link"

export function CompromissosSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Compromissos</h2>
          <p className="text-muted-foreground text-lg">Confira nossos próximos eventos e apresentações</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compromissosData.map((compromisso) => (
            <Card key={compromisso.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-muted">
                  <img
                    src={compromisso.imagem || "/placeholder.svg"}
                    alt={compromisso.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  {compromisso.nome}
                </CardTitle>
                <CardDescription className="mb-4">
                  {compromisso.musicas.length} música{compromisso.musicas.length > 1 ? "s" : ""}
                </CardDescription>
                <Link href={`/compromisso/${compromisso.id}`}>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Music className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
