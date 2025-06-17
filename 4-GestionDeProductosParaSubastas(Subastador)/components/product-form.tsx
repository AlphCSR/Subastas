"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/types/product"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  basePrice: z.coerce.number().min(1, { message: "El precio base debe ser mayor que 0." }),
  category: z.string().min(1, { message: "Seleccione una categoría." }),
  status: z.string().min(1, { message: "Seleccione un estado." }),
  images: z.array(z.string()).min(1, {
    message: "Debe subir al menos una imagen.",
  }),
})

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: Product | Omit<Product, "id">) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [previewImages, setPreviewImages] = useState<string[]>(product?.images || [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      basePrice: product?.basePrice || 0,
      category: product?.category || "",
      status: product?.status || "Pendiente",
      images: product?.images || [],
    },
  })

  const handleImageUpload = () => {
    // En un entorno real, aquí se manejaría la subida de imágenes
    // Para este ejemplo, simplemente agregamos una imagen de placeholder
    const newImage = `/placeholder.svg?height=200&width=200&text=Imagen${previewImages.length + 1}`

    setPreviewImages([...previewImages, newImage])
    form.setValue("images", [...previewImages, newImage])
  }

  const removeImage = (index: number) => {
    const updatedImages = [...previewImages]
    updatedImages.splice(index, 1)
    setPreviewImages(updatedImages)
    form.setValue("images", updatedImages)
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (product) {
      onSubmit({ ...values, id: product.id })
    } else {
      onSubmit(values)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describa el producto en detalle" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio base ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Antigüedades">Antigüedades</SelectItem>
                      <SelectItem value="Arte">Arte</SelectItem>
                      <SelectItem value="Numismática">Numismática</SelectItem>
                      <SelectItem value="Instrumentos">Instrumentos</SelectItem>
                      <SelectItem value="Joyería">Joyería</SelectItem>
                      <SelectItem value="Coleccionables">Coleccionables</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Aprobado">Aprobado</SelectItem>
                    <SelectItem value="Rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Imágenes</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {previewImages.map((image, index) => (
                        <Card key={index} className="relative overflow-hidden">
                          <CardContent className="p-2">
                            <div className="relative aspect-square">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Imagen ${index + 1}`}
                                fill
                                className="object-cover rounded-md"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Card
                        className="flex items-center justify-center cursor-pointer border-dashed"
                        onClick={handleImageUpload}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Subir imagen</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {previewImages.length === 0 && (
                      <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md">
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">No hay imágenes seleccionadas</p>
                          <Button type="button" variant="outline" onClick={handleImageUpload}>
                            Subir imagen
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Suba al menos una imagen del producto.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">{product ? "Actualizar producto" : "Crear producto"}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
