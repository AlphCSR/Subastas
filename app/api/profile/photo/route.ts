import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const photo = formData.get("photo") as File

    if (!photo) {
      return NextResponse.json({ success: false, message: "No se encontró la foto" }, { status: 400 })
    }

    // Simular subida de archivo
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // En una implementación real, aquí subirías el archivo a un servicio como Vercel Blob
    const photoUrl = `/uploads/profiles/${Date.now()}_${photo.name}`

    console.log("Uploading photo:", photo.name, photo.size)

    return NextResponse.json({
      success: true,
      message: "Foto subida exitosamente",
      data: {
        photoUrl,
        uploadedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al subir la foto" }, { status: 500 })
  }
}
