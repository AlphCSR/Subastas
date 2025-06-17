import { RolesManagement } from "@/components/admin/roles-management"

export default function RolesPage() {
  return (
    <div className="container py-10 px-9">
      <h1 className="text-3xl font-bold mb-6">Gestión de Roles</h1>
      <RolesManagement />
    </div>
  )
}
