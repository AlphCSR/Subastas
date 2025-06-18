import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular creación de reclamo
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const claim = {
      id: Date.now().toString(),
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      userId: "current-user-id",
    }

    console.log("Creating claim:", claim)

    return NextResponse.json({
      success: true,
      message: "Reclamo creado exitosamente",
      data: claim,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al crear reclamo" }, { status: 500 })
  }
}
