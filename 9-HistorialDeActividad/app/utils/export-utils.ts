// Función para exportar datos a Excel (compatible con navegador)
export const exportToExcel = (data: any[], fileName: string) => {
  // Crear CSV manualmente para compatibilidad con navegador
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Escapar comillas y envolver en comillas si contiene comas
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${fileName}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Función para exportar datos a PDF
export const exportToPdf = (data: any[], fileName: string) => {
  // Crear contenido HTML para el PDF
  const headers = Object.keys(data[0])
  const tableRows = data
    .map((item) => `<tr>${headers.map((header) => `<td>${item[header]}</td>`).join("")}</tr>`)
    .join("")

  const htmlContent = `
    <html>
      <head>
        <title>${fileName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>${fileName.charAt(0).toUpperCase() + fileName.slice(1).replace("-", " ")}</h1>
        <table>
          <thead>
            <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `

  // Crear blob y descargar como HTML (que se puede convertir a PDF)
  const blob = new Blob([htmlContent], { type: "text/html" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${fileName}.html`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
