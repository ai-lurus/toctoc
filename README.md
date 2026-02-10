# TocToc

Plataforma mobile de servicios a domicilio. Conecta clientes con profesionales de limpieza, plomería, electricidad, pintura, cerrajería, jardinería, mudanzas y fumigación.

## Stack

- **Mobile:** React Native + Expo (managed workflow, Expo Router)
- **Backend:** Supabase (PostgreSQL, Auth, Realtime, Storage, Edge Functions)
- **Pagos:** Stripe (PaymentIntents con captura manual)
- **State:** Zustand
- **Forms:** react-hook-form + zod
- **Chat:** react-native-gifted-chat

## Estructura del proyecto

```
toctoc/
├── app/                    # Expo Router (file-based routing)
│   ├── (auth)/             # Login, registro, selección de rol
│   ├── (client)/           # Tabs: Home, Historial, Chat, Perfil
│   └── (provider)/         # Tabs: Solicitudes, Servicios, Ganancias, Chat, Perfil
├── src/
│   ├── components/         # UI components, cards, forms, chat
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Supabase client, constants
│   ├── services/           # API wrappers sobre Supabase
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript types y enums
│   └── utils/              # Pricing, validation, formatting
├── supabase/
│   ├── migrations/         # SQL migrations
│   ├── functions/          # Edge Functions (Stripe, matching)
│   └── seed.sql            # Datos iniciales (categorías, servicios)
└── assets/
```

## Requisitos previos

- Node.js 18+
- iOS Simulator o Android Emulator (o Expo Go)

## Setup

1. **Clonar e instalar dependencias:**
   ```bash
   git clone <repo-url>
   cd toctoc
   npm install
   ```

2. **Configurar variables de entorno:**
   Crea el archivo `.env.local` con las keys que te compartieron (Supabase y Stripe). La base de datos ya está configurada y corriendo, **no necesitas hacer setup de Supabase ni correr migrations.**

3. **Iniciar la app:**
   ```bash
   npx expo start / npm start
   ```

## Base de datos

### Tablas

| Tabla | Propósito |
|-------|-----------|
| `profiles` | Extiende auth.users con datos de perfil y proveedor |
| `categories` | Catálogo de categorías (admin) |
| `services` | Servicios por categoría |
| `service_variables` | Variables configurables por servicio |
| `provider_services` | Servicios que ofrece cada proveedor + precio |
| `provider_availability` | Horarios semanales del proveedor |
| `service_requests` | Solicitudes de servicio (entidad central) |
| `payments` | PaymentIntents de Stripe |
| `chat_rooms` | Salas de chat (1 por request aceptado) |
| `chat_messages` | Mensajes en tiempo real |
| `reviews` | Calificaciones 1-5 + comentario |
| `platform_config` | Configuración de plataforma (comisión, timeouts) |

### Migrations

Las migrations están en `supabase/migrations/` y se aplican en orden numérico:

1. Enums
2. Profiles
3. Categories
4. Services
5. Service Variables
6. Provider Services
7. Provider Availability
8. Service Requests
9. Payments
10. Chat (rooms + messages)
11. Reviews
12. Platform Config

## Flujo de pagos (Stripe)

1. Cliente confirma servicio → Edge Function crea `PaymentIntent` con `capture_method: 'manual'` → Hold
2. Proveedor acepta → Edge Function captura el pago
3. Proveedor rechaza / timeout → Edge Function cancela el hold
4. Auto-release: cron a 24h post-completado captura si no se ha hecho


## Repos relacionados

- `toctoc-admin` — Panel administrativo web (categorías, precios, soporte)

## Scripts

```bash
npm start          # Expo start
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```
