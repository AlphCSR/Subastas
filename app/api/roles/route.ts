import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular creación de rol
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const role = {
      id: Date.now().toString(),
      ...data,
      userCount: 0,
      createdAt: new Date().toISOString(),
    }

    console.log("Creating role:", role)

    return NextResponse.json({
      success: true,
      message: "Rol creado exitosamente",
      data: role,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al crear rol" }, { status: 500 })
  }
}
