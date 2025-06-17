import { RoleAssignment } from "@/components/admin/role-assignment"

export default function UsersRolesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Asignación de Roles a Usuarios</h1>
      <RoleAssignment />
    </div>
  )
}
