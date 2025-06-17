## **1. Autenticación y Gestión de Usuarios**

### 1.1. Vista de Registro

- **Campos**: Nombre, correo, contraseña, confirmación de contraseña, teléfono, dirección.
- **Funcionalidades**: Validaciones en tiempo real, captcha, botón de "Registrarse", mensaje de confirmación.
- **Redirección**: Al correo de activación.

### 1.2. Vista de Inicio de Sesión

- **Campos**: Correo, contraseña.
- **Opciones**: “Olvidé mi contraseña”, “Mantener sesión iniciada”.
- **Redirección**: A dashboard según rol.

### 1.3. Vista de Recuperación de Contraseña

- **Flujo**: Correo → Enlace de recuperación → Nueva contraseña.
- **Mensajes**: Confirmación de solicitud, expiración del enlace.

---

## **2. Perfil del Usuario**

### 2.1. Vista de Perfil

- **Funciones**: Ver y editar datos personales, foto, dirección.
- **Botones**: “Editar”, “Guardar cambios”, “Cambiar contraseña”.

### 2.2. Vista de Cambiar Contraseña

- **Campos**: Contraseña actual, nueva contraseña, confirmar nueva contraseña.

### 2.3. Vista de Historial de Actividad

- **Tabla**: Fecha, acción, IP, dispositivo.
- **Filtros**: Por tipo de acción y fecha.

---

## **3. Gestión de Roles y Permisos (Administrador)**

### 3.1. Vista de Roles

- **Lista**: Nombre del rol, permisos asignados.
- **Acciones**: Crear, editar, eliminar rol.

### 3.2. Vista de Asignación de Roles

- **Tabla de usuarios**: Nombre, correo, rol actual.
- **Modal**: Selección de nuevos roles.

---

## **4. Gestión de Productos para Subastas (Subastador)**

### 4.1. Lista de Productos

- **Tabla**: Nombre, categoría, estado, acciones (editar/eliminar).
- **Filtros**: Por categoría, estado.

### 4.2. Formulario de Producto

- **Campos**: Nombre, descripción, imágenes, precio base, categoría.

---

## **5. Subastas**

### 5.1. Vista de Crear Subasta

- **Campos**: Producto, duración, precio base, incremento mínimo, reglas.
- **Selector**: Tipo de subasta (abierta, con reserva, etc.).

### 5.2. Lista de Subastas Activas

- **Vista para todos los usuarios**.
- **Elementos**: Imagen, título, tiempo restante, precio actual, botón "Pujar".

### 5.3. Detalle de Subasta

- **Contenido**: Historial de pujas, botón para pujar, configurar puja automática.
- **Actualización**: En tiempo real (WebSockets).

---

## **6. Pujas en Tiempo Real (Postores)**

### 6.1. Modal de Puja

- **Campos**: Monto, botón “Pujar”.
- **Restricciones**: Validación de monto mínimo.

### 6.2. Configuración de Puja Automática

- **Campo**: Límite máximo.
- **Información**: Estado actual, activación/desactivación.

---

## **7. Finalización y Resultados**

### 7.1. Vista de Subastas Finalizadas

- **Tabla**: Producto, precio final, ganador.
- **Filtro**: Por fecha, categoría, participación personal.

### 7.2. Vista de Ganador

- **Notificación**: Ganaste la subasta, detalles de pago, estado del envío.

---

## **8. Pagos y Administración de Medios de Pago**

### 8.1. Vista de Pago de Subasta

- **Opciones**: Tarjeta, cuenta bancaria, billetera.
- **Resumen**: Producto ganado, monto, estado del pago.

### 8.2. Vista de Medios de Pago

- **Lista**: Tipo, fecha de registro, estado.
- **Acciones**: Agregar, eliminar, establecer predeterminado.

---

## **9. Historial de Actividad**

### 9.1. Vista de Subastas Ganadas

### 9.2. Vista de Pujas Realizadas

- **Tablas**: Con filtros por estado, fecha y categoría.
- **Botón de exportación**: PDF / Excel.

---

## **10. Módulo de Reportes (Administrador/Subastador)**

### 10.1. Reportes Disponibles

- Subastas realizadas
- Pujas por usuario
- Pagos recibidos
- Exportables (PDF/Excel)

---

## **11. Gestión de Reclamos y Disputas**

### 11.1. Vista de Crear Reclamo

- **Campos**: Subasta afectada, motivo, evidencia.

### 11.2. Vista de Reclamos del Usuario

- **Tabla**: Estado, fecha, decisión tomada.

### 11.3. Panel de Soporte (Admin)

- **Cola de revisión**: Reclamos pendientes.
- **Acciones**: Ver evidencia, marcar como resuelto.

---

## **12. Reclamo de Premios**

### 12.1. Vista de Reclamo de Premio

- Confirmación de datos de envío.
- Método de entrega.

### 12.2. Confirmar Recepción

- Estado del premio: entregado, en camino, pendiente.

### 12.3. Reportar Problemas de Entrega

- Crea automáticamente un reclamo.

---

## **13. Gestión Técnica (Soporte)**

- Vista para monitorear:
    - Subastas con errores
    - Entregas no confirmadas
    - Notificaciones no enviadas

---

## **14. Máquina de Estados (Administrador/Desarrollador)**

- **Panel visual**: Estados actuales de subastas (Pending, Active, Ended, etc.).
- **Gestión**: Ver historial de transición de estados.
- **Integración**: Visualización de SAGA en vivo (para debugging).

---

## **15. Navegación Global y Paneles**

### 15.1. Dashboard del Usuario

- Subastas activas, pujas recientes, historial rápido.

### 15.2. Dashboard del Subastador

- Subastas creadas, pagos recibidos, reportes.

### 15.3. Dashboard del Administrador

- Métricas clave del sistema, últimos reclamos, usuarios nuevos.

---
