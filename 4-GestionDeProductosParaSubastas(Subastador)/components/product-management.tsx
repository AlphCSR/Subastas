"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductList from "./product-list"
import ProductForm from "./product-form"
import type { Product } from "@/types/product"

// Datos de prueba
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Reloj antiguo",
    description: "Reloj de pared del siglo XIX en excelente estado",
    basePrice: 500,
    category: "Antigüedades",
    status: "Pendiente",
    images: ["/placeholder.svg?height=200&width=200"],
  },
  {
    id: "2",
    name: "Cuadro de arte moderno",
    description: "Obra de arte contemporáneo de artista reconocido",
    basePrice: 1200,
    category: "Arte",
    status: "Aprobado",
    images: ["/placeholder.svg?height=200&width=200"],
  },
  {
    id: "3",
    name: "Colección de monedas",
    description: "Colección de monedas de plata de diferentes países",
    basePrice: 800,
    category: "Numismática",
    status: "Rechazado",
    images: ["/placeholder.svg?height=200&width=200"],
  },
  {
    id: "4",
    name: "Jarrón de porcelana",
    description: "Jarrón de porcelana china de la dinastía Ming",
    basePrice: 2500,
    category: "Antigüedades",
    status: "Aprobado",
    images: ["/placeholder.svg?height=200&width=200"],
  },
  {
    id: "5",
    name: "Guitarra vintage",
    description: "Guitarra eléctrica de los años 70 en buen estado",
    basePrice: 950,
    category: "Instrumentos",
    status: "Pendiente",
    images: ["/placeholder.svg?height=200&width=200"],
  },
]

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState("list")

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts([...products, newProduct])
    setActiveTab("list")
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))
    setEditingProduct(null)
    setActiveTab("list")
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setActiveTab("form")
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger value="list">Lista de Productos</TabsTrigger>
          <TabsTrigger value="form">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="list">
        <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      </TabsContent>

      <TabsContent value="form">
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setEditingProduct(null)
            setActiveTab("list")
          }}
        />
      </TabsContent>
    </Tabs>
  )
}
