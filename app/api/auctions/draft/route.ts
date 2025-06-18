import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular guardado como borrador
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const draft = {
      id: Date.now().toString(),
      ...data,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("Saving draft:", draft)

    return NextResponse.json({
      success: true,
      message: "Borrador guardado exitosamente",
      data: draft,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al guardar borrador" }, { status: 500 })
  }
}
