import ProductManagement from "@/components/product-management"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-10">
      <h1 className="text-3xl font-bold mb-8">Gestión de Productos para Subastas</h1>
      <ProductManagement />
    </main>
  )
}
