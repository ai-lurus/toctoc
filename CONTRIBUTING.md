# Contribuir a TocToc

## Convenciones

### Estructura de archivos

- **Pantallas:** `app/` usa file-based routing de Expo Router
- **Componentes:** `src/components/` organizados por tipo (`ui`, `cards`, `forms`, `chat`)
- **Lógica de negocio:** `src/services/` para llamadas a Supabase, `src/store/` para estado global
- **Tipos:** `src/types/` para tipos de TypeScript y enums

### Naming

- Archivos de componentes: `PascalCase.tsx`
- Archivos de utilidades/hooks: `camelCase.ts`
- Carpetas de rutas: `kebab-case` o `[param]` para rutas dinámicas

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar pantalla de checkout
fix: corregir cálculo de precio con variables
chore: actualizar dependencias
```

### Base de datos

- Toda modificación de esquema debe ser una migration en `supabase/migrations/`
- Naming: `000XX_description.sql`
- Siempre incluir RLS policies para tablas nuevas
- Precios siempre en centavos (MXN)

### Código

- TypeScript strict mode
- Paths con alias `@/` apuntando a `src/`
- Zustand para estado global, react-hook-form + zod para formularios
- No usar `any` — preferir tipos explícitos

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# Editar .env.local con tus keys
npx expo start
```

## Pull Requests

1. Crea un branch desde `main`: `feat/nombre-feature`
2. Haz commits siguiendo la convención
3. Abre PR con descripción clara
4. Espera review antes de merge
