-- 00017_seed_mock_providers.sql
-- Seed: Mock providers, services, availability, and reviews for development/demo
-- UUIDs use fixed prefixes so the seed is idempotent (safe to re-run).

-- ── Clean up previous seed data (leaf tables first, then parents) ────────────
DELETE FROM public.reviews
  WHERE id::text LIKE '11111111-0000-0000-0000-%';

DELETE FROM public.service_requests
  WHERE id::text LIKE 'ffffffff-0000-0000-0000-%';

DELETE FROM public.provider_availability
  WHERE provider_id::text LIKE 'cccccccc-0000-0000-0000-%';

DELETE FROM public.provider_services
  WHERE provider_id::text LIKE 'cccccccc-0000-0000-0000-%';

DELETE FROM public.profiles
  WHERE id::text LIKE 'cccccccc-0000-0000-0000-%'
     OR id::text LIKE 'dddddddd-0000-0000-0000-%';

DELETE FROM public.services
  WHERE id::text LIKE 'bbbbbbbb-0000-0000-0000-%';

DELETE FROM public.categories
  WHERE id::text LIKE 'aaaaaaaa-0000-0000-0000-%';

DELETE FROM auth.users
  WHERE id::text LIKE 'cccccccc-0000-0000-0000-%'
     OR id::text LIKE 'dddddddd-0000-0000-0000-%';

-- ── Seed auth.users so profiles FK is satisfied ──────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  ('cccccccc-0000-0000-0000-000000000001', 'maria@toctoc.local',    '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('cccccccc-0000-0000-0000-000000000002', 'juan@toctoc.local',     '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('cccccccc-0000-0000-0000-000000000003', 'ana@toctoc.local',      '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('cccccccc-0000-0000-0000-000000000004', 'carlos.r@toctoc.local', '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('cccccccc-0000-0000-0000-000000000005', 'rosa@toctoc.local',     '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('dddddddd-0000-0000-0000-000000000001', 'carlos.m@example.com',  '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('dddddddd-0000-0000-0000-000000000002', 'laura.s@example.com',   '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated'),
  ('dddddddd-0000-0000-0000-000000000003', 'diego.r@example.com',   '', now(), now(), now(), '{}', '{}', 'authenticated', 'authenticated');

-- ── Categories ───────────────────────────────────────────────────────────────
INSERT INTO public.categories (id, name, description, icon, color, sort_order)
VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'Limpieza',     'Limpieza del hogar y oficinas',        'sparkles',   '#4A89F3', 1),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'Jardinería',   'Cuidado y mantenimiento de jardines',  'leaf',       '#10CE8A', 2),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'Reparaciones', 'Plomería, electricidad y más',         'construct',  '#FFB400', 3);

-- ── Services ─────────────────────────────────────────────────────────────────
-- base_price in centavos MXN (24000 = $240 MXN)
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order)
VALUES
  ('bbbbbbbb-0000-0000-0000-000000000001',
   'aaaaaaaa-0000-0000-0000-000000000001',
   'Limpieza general',
   'Limpieza de áreas comunes, habitaciones y cocina. Duración estimada: 2–3 horas.',
   24000, 'home', 1),

  ('bbbbbbbb-0000-0000-0000-000000000002',
   'aaaaaaaa-0000-0000-0000-000000000001',
   'Limpieza profunda',
   'Limpieza detallada incluyendo ventanas, cajones y áreas de difícil acceso. Duración estimada: 4–5 horas.',
   28000, 'sparkles', 2),

  ('bbbbbbbb-0000-0000-0000-000000000003',
   'aaaaaaaa-0000-0000-0000-000000000001',
   'Limpieza express',
   'Limpieza rápida de las áreas más usadas del hogar. Ideal para días ocupados. Duración estimada: 1–2 horas.',
   18000, 'flash', 3);

-- ── Client profiles (needed as reviewers) ────────────────────────────────────
INSERT INTO public.profiles (id, email, full_name, role, is_active)
VALUES
  ('dddddddd-0000-0000-0000-000000000001', 'carlos.m@example.com', 'Carlos M.', 'client', true),
  ('dddddddd-0000-0000-0000-000000000002', 'laura.s@example.com',  'Laura S.',  'client', true),
  ('dddddddd-0000-0000-0000-000000000003', 'diego.r@example.com',  'Diego R.',  'client', true)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- ── Provider profiles ────────────────────────────────────────────────────────
-- avg_rating and total_reviews are set manually after seed (triggers disabled).
INSERT INTO public.profiles (id, email, full_name, role, bio, experience_years, avatar_url, avg_rating, total_reviews, is_active)
VALUES
  ('cccccccc-0000-0000-0000-000000000001',
   'maria@toctoc.local', 'María López', 'provider',
   'Especialista en limpieza residencial con 5 años de experiencia. Me caracterizo por la atención al detalle y puntualidad.',
   5, 'https://i.pravatar.cc/150?u=maria', 4.9, 127, true),

  ('cccccccc-0000-0000-0000-000000000002',
   'juan@toctoc.local', 'Juan Pérez', 'provider',
   'Experto en limpieza profunda de hogares y oficinas. 7 años trabajando con clientes satisfechos.',
   7, 'https://i.pravatar.cc/150?u=juan', 4.7, 95, true),

  ('cccccccc-0000-0000-0000-000000000003',
   'ana@toctoc.local', 'Ana García', 'provider',
   'Servicio de limpieza confiable y eficiente. Especialista en limpieza express para personas ocupadas.',
   3, 'https://i.pravatar.cc/150?u=ana', 4.8, 156, true),

  ('cccccccc-0000-0000-0000-000000000004',
   'carlos.r@toctoc.local', 'Carlos Rodríguez', 'provider',
   'Detallista y profesional. Me especializo en dejar cada rincón impecable.',
   4, 'https://i.pravatar.cc/150?u=carlos_r', 4.6, 89, true),

  ('cccccccc-0000-0000-0000-000000000005',
   'rosa@toctoc.local', 'Rosa Martínez', 'provider',
   'Con 6 años de experiencia, ofrezco el mejor servicio de limpieza del mercado. Más de 200 hogares atendidos.',
   6, 'https://i.pravatar.cc/150?u=rosa', 4.9, 203, true)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  experience_years = EXCLUDED.experience_years,
  avatar_url = EXCLUDED.avatar_url,
  avg_rating = EXCLUDED.avg_rating,
  total_reviews = EXCLUDED.total_reviews,
  is_active = EXCLUDED.is_active;

-- ── Provider services (base_price in centavos MXN) ───────────────────────────
-- immediate_available=true means provider can start the same day (express mode)
INSERT INTO public.provider_services (id, provider_id, service_id, base_price, immediate_available, is_active)
VALUES
  -- María López: general + profunda
  ('eeeeeee0-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 24000, true,  true),
  ('eeeeeee0-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000002', 30000, false, true),
  -- Juan Pérez: general + profunda
  ('eeeeeee0-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000001', 22000, true,  true),
  ('eeeeeee0-0000-0000-0000-000000000004', 'cccccccc-0000-0000-0000-000000000002', 'bbbbbbbb-0000-0000-0000-000000000002', 28000, false, true),
  -- Ana García: general + express
  ('eeeeeee0-0000-0000-0000-000000000005', 'cccccccc-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000001', 26000, true,  true),
  ('eeeeeee0-0000-0000-0000-000000000006', 'cccccccc-0000-0000-0000-000000000003', 'bbbbbbbb-0000-0000-0000-000000000003', 18000, true,  true),
  -- Carlos Rodríguez: general + profunda
  ('eeeeeee0-0000-0000-0000-000000000007', 'cccccccc-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000001', 23000, false, true),
  ('eeeeeee0-0000-0000-0000-000000000008', 'cccccccc-0000-0000-0000-000000000004', 'bbbbbbbb-0000-0000-0000-000000000002', 29000, false, true),
  -- Rosa Martínez: general + express
  ('eeeeeee0-0000-0000-0000-000000000009', 'cccccccc-0000-0000-0000-000000000005', 'bbbbbbbb-0000-0000-0000-000000000001', 25000, true,  true),
  ('eeeeeee0-0000-0000-0000-000000000010', 'cccccccc-0000-0000-0000-000000000005', 'bbbbbbbb-0000-0000-0000-000000000003', 20000, true,  true);

-- ── Provider availability ─────────────────────────────────────────────────────
-- day_of_week: 0=Sunday, 1=Monday … 6=Saturday
-- All providers: weekdays 08:00–18:00
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time)
SELECT p.id, d.day, '08:00:00'::time, '18:00:00'::time
FROM (
  VALUES
    ('cccccccc-0000-0000-0000-000000000001'::uuid),
    ('cccccccc-0000-0000-0000-000000000002'::uuid),
    ('cccccccc-0000-0000-0000-000000000003'::uuid),
    ('cccccccc-0000-0000-0000-000000000004'::uuid),
    ('cccccccc-0000-0000-0000-000000000005'::uuid)
) AS p(id)
CROSS JOIN (VALUES (1),(2),(3),(4),(5)) AS d(day);

-- Saturday: only María, Ana, Rosa (09:00–14:00)
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time)
VALUES
  ('cccccccc-0000-0000-0000-000000000001', 6, '09:00:00', '14:00:00'),
  ('cccccccc-0000-0000-0000-000000000003', 6, '09:00:00', '14:00:00'),
  ('cccccccc-0000-0000-0000-000000000005', 6, '09:00:00', '14:00:00');

-- Sunday: Rosa only (10:00–13:00)
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time)
VALUES ('cccccccc-0000-0000-0000-000000000005', 0, '10:00:00', '13:00:00');

-- ── Completed service requests (required as FK for reviews) ───────────────────
INSERT INTO public.service_requests
  (id, client_id, provider_id, service_id, status, address, scheduled_date, scheduled_time, estimated_price)
VALUES
  ('ffffffff-0000-0000-0000-000000000001',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001',
   'bbbbbbbb-0000-0000-0000-000000000001', 'completed',
   'Calle Falsa 123, CDMX', '2025-12-01', '09:00:00', 24000),

  ('ffffffff-0000-0000-0000-000000000002',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000001',
   'bbbbbbbb-0000-0000-0000-000000000002', 'completed',
   'Av. Insurgentes 456, CDMX', '2025-12-08', '10:00:00', 30000),

  ('ffffffff-0000-0000-0000-000000000003',
   'dddddddd-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000002',
   'bbbbbbbb-0000-0000-0000-000000000001', 'completed',
   'Paseo de la Reforma 789, CDMX', '2025-12-10', '08:00:00', 22000),

  ('ffffffff-0000-0000-0000-000000000004',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000003',
   'bbbbbbbb-0000-0000-0000-000000000003', 'completed',
   'Calle Falsa 123, CDMX', '2025-12-15', '14:00:00', 18000),

  ('ffffffff-0000-0000-0000-000000000005',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000004',
   'bbbbbbbb-0000-0000-0000-000000000002', 'completed',
   'Av. Insurgentes 456, CDMX', '2025-12-20', '09:00:00', 29000),

  ('ffffffff-0000-0000-0000-000000000006',
   'dddddddd-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000005',
   'bbbbbbbb-0000-0000-0000-000000000001', 'completed',
   'Paseo de la Reforma 789, CDMX', '2025-12-22', '08:00:00', 25000),

  ('ffffffff-0000-0000-0000-000000000007',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000002',
   'bbbbbbbb-0000-0000-0000-000000000002', 'completed',
   'Calle Falsa 123, CDMX', '2025-12-28', '10:00:00', 28000),

  ('ffffffff-0000-0000-0000-000000000008',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000005',
   'bbbbbbbb-0000-0000-0000-000000000003', 'completed',
   'Av. Insurgentes 456, CDMX', '2026-01-05', '11:00:00', 20000);

-- ── Reviews ───────────────────────────────────────────────────────────────────
INSERT INTO public.reviews (id, request_id, reviewer_id, reviewee_id, rating, comment)
VALUES
  -- María López (2 reviews)
  ('11111111-0000-0000-0000-000000000001',
   'ffffffff-0000-0000-0000-000000000001',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000001',
   5, 'Excelente servicio, muy profesional y puntual. ¡La casa quedó impecable!'),

  ('11111111-0000-0000-0000-000000000002',
   'ffffffff-0000-0000-0000-000000000002',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000001',
   5, 'Muy recomendable, dejó todo impecable y fue muy amable.'),

  -- Juan Pérez (2 reviews)
  ('11111111-0000-0000-0000-000000000003',
   'ffffffff-0000-0000-0000-000000000003',
   'dddddddd-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000002',
   5, 'Gran trabajo de limpieza profunda. Muy detallista y cuidadoso.'),

  ('11111111-0000-0000-0000-000000000004',
   'ffffffff-0000-0000-0000-000000000007',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000002',
   4, 'Buen servicio, llegó a tiempo y trabajó bien. Lo contrataré de nuevo.'),

  -- Ana García (1 review)
  ('11111111-0000-0000-0000-000000000005',
   'ffffffff-0000-0000-0000-000000000004',
   'dddddddd-0000-0000-0000-000000000001', 'cccccccc-0000-0000-0000-000000000003',
   5, 'Muy rápida y eficiente. Perfecta para días ocupados. ¡100% recomendada!'),

  -- Carlos Rodríguez (1 review)
  ('11111111-0000-0000-0000-000000000006',
   'ffffffff-0000-0000-0000-000000000005',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000004',
   4, 'Buen servicio en general. Muy detallista con las áreas difíciles.'),

  -- Rosa Martínez (2 reviews)
  ('11111111-0000-0000-0000-000000000007',
   'ffffffff-0000-0000-0000-000000000006',
   'dddddddd-0000-0000-0000-000000000003', 'cccccccc-0000-0000-0000-000000000005',
   5, 'Increíble servicio. La mejor limpiadora que he contratado.'),

  ('11111111-0000-0000-0000-000000000008',
   'ffffffff-0000-0000-0000-000000000008',
   'dddddddd-0000-0000-0000-000000000002', 'cccccccc-0000-0000-0000-000000000005',
   5, 'Súper profesional y rápida. Muy recomendada sin duda.');

-- Restore avg_rating/total_reviews since trigger may not have fired during seed
UPDATE public.profiles SET avg_rating = 4.90, total_reviews = 127 WHERE id = 'cccccccc-0000-0000-0000-000000000001';
UPDATE public.profiles SET avg_rating = 4.70, total_reviews = 95  WHERE id = 'cccccccc-0000-0000-0000-000000000002';
UPDATE public.profiles SET avg_rating = 4.80, total_reviews = 156 WHERE id = 'cccccccc-0000-0000-0000-000000000003';
UPDATE public.profiles SET avg_rating = 4.60, total_reviews = 89  WHERE id = 'cccccccc-0000-0000-0000-000000000004';
UPDATE public.profiles SET avg_rating = 4.90, total_reviews = 203 WHERE id = 'cccccccc-0000-0000-0000-000000000005';
