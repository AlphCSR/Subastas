import StateMachinePanel from "@/components/state-machine-panel"

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración de Subastas</h1>
        <StateMachinePanel />
      </div>
    </main>
  )
}
