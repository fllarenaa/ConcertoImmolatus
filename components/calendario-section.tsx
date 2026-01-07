"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type EventoCalendario = {
  data: string
  evento: string
}

const eventos: EventoCalendario[] = [

  { data: "2026-01-12", evento: "Ensaio - Cristo Nossa Páscoa" },
  { data: "2026-01-17", evento: "Ensaio - Cristo Nossa Páscoa" },
  { data: "2026-01-19", evento: "Ensaio - Cristo Nossa Páscoa / O Cordeiro Que Foi Imolado" },
  { data: "2026-01-24", evento: "Ensaio - O Cordeiro Que Foi Imolado" },
  { data: "2026-01-26", evento: "Ensaio - O Crux Ave, Spes Unica" },
  { data: "2026-01-31", evento: "Ensaio - O Crux Ave, Spes Unica" },
  { data: "2026-02-02", evento: "Ensaio - Anima Christi" },
  { data: "2026-02-07", evento: "Ensaio - Anima Christi" },
  { data: "2026-02-09", evento: "Ensaio - Alleluia" },
  { data: "2026-02-14", evento: "Ensaio - Alleluia / Laudate Dominum" },
  { data: "2026-02-16", evento: "Ensaio - Laudate Dominum" },
  { data: "2026-02-21", evento: "Ensaio - Regina Caeli" },
  { data: "2026-02-23", evento: "Ensaio - Ave Verum Corpus" },
  { data: "2026-02-28", evento: "Ensaio - Ave Verum Corpus" },
  { data: "2026-03-02", evento: "Ensaio - Ó Hóstia Santa" },
  { data: "2026-03-07", evento: "Ensaio - Ó Hóstia Santa" },
  { data: "2026-03-09", evento: "Ensaio - O Senhor Ressuscitou" },
  { data: "2026-03-14", evento: "Ensaio - O Senhor Ressuscitou" },
  { data: "2026-03-16", evento: "Ensaio - Tarde Te Amei" },
  { data: "2026-03-21", evento: "Ensaio - Tarde Te Amei" },
  { data: "2026-03-23", evento: "Ensaio - Revisão Geral" },
  { data: "2026-03-28", evento: "Ensaio - Revisão Geral" },
  { data: "2026-03-30", evento: "Ensaio - Ensaio Final (geral)" },
  { data: "2026-04-04", evento: "Ensaio Final - Geral / Passagem de Som" },
  { data: "2026-04-05", evento: "Concerto de Páscoa" },

];


const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export function CalendarioSection() {
  const [mesAtual, setMesAtual] = useState(0)

  const getDiasDoMes = (mes: number) => {
    const primeiroDia = new Date(2026, mes, 1).getDay()
    const ultimoDia = new Date(2026, mes + 1, 0).getDate()

    const dias = []
    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null)
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(dia)
    }

    return dias
  }

  const getEventoNoDia = (dia: number | null) => {
    if (!dia) return null
    const dataStr = `2026-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    return eventos.find((e) => e.data === dataStr)
  }

  const proximoMes = () => {
    if (mesAtual < 11) setMesAtual(mesAtual + 1)
  }

  const mesAnterior = () => {
    if (mesAtual > 0) setMesAtual(mesAtual - 1)
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Calendário 2026</h2>
          <p className="text-muted-foreground text-lg">Confira todos os nossos compromissos do ano</p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <Button
                onClick={mesAnterior}
                disabled={mesAtual === 0}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <CardTitle className="text-2xl flex items-center gap-2">
                <CalendarIcon className="w-6 h-6" />
                {meses[mesAtual]} 2026
              </CardTitle>

              <Button
                onClick={proximoMes}
                disabled={mesAtual === 11}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {diasSemana.map((dia) => (
                <div key={dia} className="text-center font-semibold text-sm text-muted-foreground p-2">
                  {dia}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getDiasDoMes(mesAtual).map((dia, index) => {
                const evento = getEventoNoDia(dia)

                return (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square p-2 rounded-lg border-2 flex flex-col items-center justify-center text-center relative",
                      dia ? "bg-card hover:bg-muted/50 transition-colors" : "bg-transparent border-transparent",
                      evento ? "bg-secondary border-secondary text-secondary-foreground font-bold" : "border-border",
                    )}
                  >
                    {dia && (
                      <>
                        <span className={cn("text-sm", evento && "text-lg font-bold")}>{dia}</span>
                        {evento && <span className="text-[10px] leading-tight mt-1 font-normal">{evento.evento}</span>}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-center">Todos os Eventos de 2026</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {eventos.map((evento, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-3 flex flex-col items-center justify-center min-w-[60px]">
                    <span className="text-2xl font-bold">{new Date(evento.data + "T00:00:00").getDate()}</span>
                    <span className="text-xs">{meses[new Date(evento.data + "T00:00:00").getMonth()].slice(0, 3)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{evento.evento}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(evento.data + "T00:00:00").toLocaleDateString("pt-BR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
