PRD Operativo Unificado: Toctoc
 Estado: Scope cerrado MVP
 Listo para: Diseño UI, Desarrollo, Planificación Scrum

1. Visión del Producto
Nombre: Toctoc
Tipo: App móvil (iOS / Android)
Modelo: Marketplace + servicio inmediato bajo demanda
Servicios: Limpieza, cocina, lavado de autos, plomería, etc.
Target: Adultos y personas mayores
Propuesta de valor:
 Permitir solicitar servicios de hogar de forma simple, clara y confiable mediante dos modos:
Agendar con proveedor específico (marketplace)
Servicio inmediato con match automático (tipo Uber)

Prioridades absolutas:
Claridad
Confianza
Baja carga cognitiva
Usuarios principales:

Clientes: Personas que necesitan servicios de limpieza en Guadalajara
Proveedores: Profesionales de la limpieza que ofrecen sus servicios

Ubicación inicial: Guadalajara, Jalisco, México


2. Decisiones de Producto (Cerradas)
No hay servicios recurrentes
No hay repetición automática de servicios
Pago se autoriza al solicitar y se cobra solo si el proveedor acepta
El proveedor define su precio
Toctoc agrega su tarifa de plataforma
No hay contraofertas
No hay negociación por chat
No hay carrito complejo
No hay pagos al finalizar

3. Roles del Sistema
3.1 Cliente
Responsabilidades:
Solicitar servicios
Configurar detalles del servicio
Seleccionar proveedor o pedir match inmediato
Autorizar pago
Chatear con proveedor
Calificar servicio


Restricciones:
No puede negociar precio
No puede cambiar rol
No puede modificar precio final
No puede modificar servicio una vez aceptado

3.2 Proveedor
Responsabilidades:
Registrarse y verificarse
Definir servicios ofrecidos
Definir precios
Definir disponibilidad
Activar/desactivar mercado inmediato
Aceptar o rechazar solicitudes
Ejecutar servicios
Finalizar servicios


Restricciones:
No puede editar precio al recibir solicitud
No puede contraofertar
No puede ver datos de pago del cliente
No puede cambiar rol

4. Principios Funcionales No Negociables
Pago se ejecuta solo si proveedor acepta
Precio = precio proveedor + tarifa Toctoc
Precio siempre visible
1 acción primaria por pantalla
Inputs progresivos
Copy explícito
Sin servicios recurrentes
Sin negociación por chat
Sin carrito complejo

5. Mapa de Pantallas
5.1 Comunes
Pantalla
Rol
Responsabilidad
Splash
Ambos
Mostrar marca
Login
Ambos
Autenticación
Registro
Ambos
Crear cuenta
Selección de rol
Ambos
Definir rol irreversible
Términos y condiciones
Ambos
Legal
Soporte / contacto

Perfil de usuario
Ambos

Ambos
Soporte humano

Editar datos, cambiar contraseña, salir




5.2 Cliente
Pantalla
Responsabilidad
Home Cliente
Iniciar solicitud
Selección de servicio
Elegir tipo de servicio
Configuración progresiva / Agendar
Definir parámetros / Elegir fecha/hora
Lista de proveedores
Ver opciones
Perfil proveedor
Ver detalle
Checkout
Autorizar pago / ver detalles del servicio (carrito
Esperando aceptación
Estado intermedio
Match / servicio activo
Servicio en curso
Finalización
Calificar
Historial
Ver servicios pasados
Métodos de pago

Calificación
Gestionar tarjetas

Formulario de review y rating


5.3 Proveedor
Pantalla
Responsabilidad
Onboarding
Alta inicial
Home proveedor
Estado general
Gestión de servicios
Crear / editar servicios
Disponibilidad
Definir horarios
Solicitudes
Ver solicitudes
Detalle solicitud
Aceptar / rechazar
Servicio activo
Ejecutar
Perfil proveedor
Configuración
Ganancias / historial

Calificación
Finanzas

Formulario de review del cliente




6. Flujos Principales
6.1 Flujo A — Cliente agenda con proveedor
Home Cliente
Selección de servicio
Lista de proveedores
Perfil proveedor
Configuración progresiva
Agendar
Carrito
Esperando aceptación
Resultado
Aceptado → Servicio activo
Pago
Rechazado → Reintentar búsqueda

—------------------------------------------------------------------
FLUJO CLIENTE
Registro/Acceso

Abre app → Selecciona "Cliente" → Registra teléfono/email → Crea perfil
O: Accede con teléfono/email existente

Solicitar Servicio

Toca "Solicitar servicio"
Llena formulario: tipo de limpieza, fecha, hora, tiempo estimado, presupuesto, dirección, notas
Confirma y publica solicitud

Recibir Ofertas

Ve lista de proveedores que ofertaron
Compara precios, calificación, experiencia
Toca "Aceptar" en el proveedor elegido

Confirmación y Pago

Aparece pantalla de confirmación
Se procesa pago (dinero retenido en Stripe)
Recibe confirmación de pago

Seguimiento

Ve nombre, foto, ubicación del proveedor
Accede a chat para comunicarse
Ve estado: "En camino" → "Iniciado" → "Finalizado"

Calificación

Al terminar servicio, aparece pantalla de calificación
Califica de 1-5 estrellas y escribe comentario opcional
Confirma reseña

Pago Liberado

Sistema automáticamente libera fondos al proveedor
Cliente recibe recibo

6.2 Flujo B — Cliente servicio inmediato
Home Cliente
boton “Limpieza inmediata”
Configuración rápida (Pantalla Detalles servicio)
Configurar servicio
Direccion (requerido
Fecha (requerido
Hora (requerido
Notas
Buscando proveedor
Match encontrado
Servicio activo
Finalización
Calificación

6.3 Flujo C — Proveedor recibe solicitud
Notificación
Detalle solicitud
Aceptar / Rechazar
Resultado
Aceptado → Servicio activo
Rechazado → Cierre
—----------------------------------------------------
FLUJO PROVEEDOR
Registro/Acceso

Abre app → Selecciona "Proveedor" → Registra teléfono/email → Crea perfil
O: Accede con teléfono/email existente

Completar Perfil

Foto de perfil
Nombre
Zona de cobertura/ubicación
Habilidades (tipos de limpieza que ofrece)
Años de experiencia
Costo sugerido por hora
Documentación opcional (certificados, referencias)

Ver Ofertas Disponibles

Home muestra feed de solicitudes cercanas
Puede filtrar por: precio, distancia, fecha, tipo
Toca una solicitud para ver detalles completos

Enviar Oferta

Ver detalles de solicitud
Ajusta precio/fecha si es necesario
Toca "Enviar oferta"
Espera respuesta del cliente

Confirmación Bilateral

Si cliente rechaza: vuelve a feed de ofertas
Si cliente acepta: aparece pantalla de confirmación
Acceso a chat se habilita automáticamente

Realizar Servicio

Ve dirección exacta del cliente
Comienza el servicio
Puede actualizar estado: "En camino" → "Iniciado" → "Finalizado"
Cliente confirmará completado

Recibir Pago y Calificación

Fondos se liberan automáticamente
Recibe calificación del cliente
Ve dinero en su cuenta

Ver Reports y Ganancias

Dashboard con servicios completados
Total de ganancias
Promedio de calificación
Historial de clientes


7. Lógica de Precios
Proveedor define precio base
Cliente configura variables
Sistema calcula:
Precio proveedor
Tarifa Toctoc
Total
Siempre visible:
Desglose
Total
Copy obligatorio:
“El pago se realiza solo si el proveedor acepta”

8. Validaciones por Pantalla
Registro
Email válido
Contraseña mínima
Rol obligatorio
Aceptar términos
Errores:
“Correo inválido”
“Debes aceptar los términos”
“Este correo ya está registrado”

Configuración de servicio
m² > 0
Horas > 0
Campos obligatorios completos

Errores:
“Ingresa el tamaño de tu casa”
“Selecciona un tipo de limpieza”

Agendar
Fecha futura válida
Horario dentro de disponibilidad
Dirección obligatoria
Errores:
“Selecciona una fecha válida”
“Horario no disponible”
“Ingresa tu dirección”

Pago
Tarjeta válida
Stripe token válido
Errores:
“Tarjeta inválida”
“No se pudo autorizar el pago”

Proveedor – Servicios
Precio > 0
Tipo obligatorio
Errores:
“Ingresa un precio válido”
“Selecciona un servicio”


9. Estados y Transiciones
Cliente
Estado
Disparador
Buscando proveedor
Match en progreso
Esperando aceptación
Solicitud enviada
Aceptado
Proveedor acepta
Rechazado
Proveedor rechaza
En servicio
Proveedor inicia
Finalizado
Proveedor finaliza


Proveedor
Estado
Disparador
Disponible
Mercado activo ON
Solicitud recibida
Cliente solicita
Aceptado
Proveedor acepta
En servicio
Servicio iniciado
Finalizado
Servicio terminado


10. Errores Globales
Escenario
Mensaje
Sin proveedores disponibles
“No hay proveedores disponibles ahora. Intenta agendar.”
Timeout de match
“No encontramos proveedor cercano.”
Pago fallido
“No se pudo autorizar el pago.”
Proveedor cancela
“El proveedor canceló el servicio.”
Conexión fallida
“Error de conexión. Intenta de nuevo.”


11. Reglas de Negocio
El proveedor no puede editar precio al recibir solicitud
El cliente no negocia
El proveedor no contraoferta
El pago se ejecuta solo al aceptar
El cliente puede cancelar antes de aceptación
El proveedor puede rechazar sin penalización (MVP)
El cliente califica solo al finalizar
Verificación: Solo usuarios verificados (teléfono confirmado) pueden ofertar/solicitar
Pricing: Proveedor puede ajustar precio de oferta, cliente lo ve antes de aceptar
Pago Retenido: Dinero se retiene en Stripe hasta que cliente confirme servicio
Liberación Automática: Si pasan 24 horas desde "finalizado", se libera automáticamente
Comisión: Plataforma retiene 20% del monto (el resto al proveedor)
Calificaciones: Solo aparecen después de completar el servicio
Una solicitud = Un proveedor: Cliente solo puede aceptar un proveedor por solicitud
Múltiples ofertas: Proveedor puede enviar ofertas a múltiples solicitudes simultáneamente
Chat: Se habilita solo después de match confirmado
Cancelación: Cliente puede cancelar hasta 2 horas antes (reembolso completo); después de 2 horas, comisión de cancelación

12. Scope Excluido Explícitamente
Servicios recurrentes
Repetir servicio
Contraofertas
Negociación por chat
Pagos al finalizar
Carrito complejo
Subcuentas proveedor
Suscripciones
Programas de lealtad

13. Dependencias Técnicas
Stripe para pagos
Geolocalización
Panel admin controla:
Categorías
Servicios
Subtipos
Variables de precio
Tarifa Toctoc
Filtros
Sellos de verificación

14. Criterios de Aceptación (Macro)
Un flujo se considera correcto si:
Cliente puede:
Registrarse
Solicitar un servicio
Ver precio claro
Autorizar pago
Ver aceptación
Chatear
Calificar
Proveedor puede:
Registrarse
Definir servicios y precios
Aceptar una solicitud
Ejecutar un servicio
Finalizarlo

15. Roadmap MVP (Scrum)
Sprint 1
Auth
Registro
Roles
Home Cliente
Sprint 2
Configuración servicio
Lista proveedores
Perfil proveedor

Sprint 3
Pago
Esperando aceptación
Servicio activo
Sprint 4
Proveedor onboarding
Solicitudes
Gestión de servicios
Sprint 5
Chat
Calificaciones
Historial

16. Estado del PRD
Alcance cerrado
Reglas definidas
Flujos completos
Sin decisiones abiertas críticas
Listo para:
Diseño UI
Desarrollo
Planificación Scrum
