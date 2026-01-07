import { CoralHeader } from "@/components/coral-header"
import { CompromissosSection } from "@/components/compromissos-section"
import { CalendarioSection } from "@/components/calendario-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <CoralHeader />
      <CompromissosSection />
      <CalendarioSection />
    </main>
  )
}
