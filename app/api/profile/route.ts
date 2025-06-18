import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular actualización de perfil
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // En una implementación real, aquí actualizarías la base de datos
    console.log("Updating profile:", data)

    return NextResponse.json({
      success: true,
      message: "Perfil actualizado exitosamente",
      data: {
        id: "1",
        ...data,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al actualizar perfil" }, { status: 500 })
  }
}
