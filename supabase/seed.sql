-- Seed: Categories (already inserted, skip if exist)
INSERT INTO public.categories (id, name, description, icon, color, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Limpieza', 'Limpieza de hogar y oficinas', 'sparkles', '#10B981', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Plomería', 'Reparaciones e instalaciones de plomería', 'water', '#3B82F6', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Electricidad', 'Instalaciones y reparaciones eléctricas', 'flash', '#F59E0B', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Pintura', 'Pintura interior y exterior', 'color-palette', '#8B5CF6', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Cerrajería', 'Apertura, cambio de chapas y copias', 'key', '#EF4444', 5),
  ('c1000000-0000-0000-0000-000000000006', 'Jardinería', 'Mantenimiento de jardines y áreas verdes', 'leaf', '#059669', 6),
  ('c1000000-0000-0000-0000-000000000007', 'Mudanzas', 'Transporte y carga de muebles', 'cube', '#6366F1', 7),
  ('c1000000-0000-0000-0000-000000000008', 'Fumigación', 'Control de plagas y fumigación', 'bug', '#DC2626', 8)
ON CONFLICT (id) DO NOTHING;

-- Seed: Services for Limpieza
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Limpieza general', 'Limpieza completa de hogar', 80000, 'home', 1),
  ('a1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Limpieza profunda', 'Limpieza a detalle incluyendo áreas difíciles', 150000, 'sparkles', 2),
  ('a1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Limpieza de oficina', 'Limpieza de espacios de trabajo', 100000, 'business', 3);

-- Seed: Services for Plomería
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'Reparación de fugas', 'Detección y reparación de fugas de agua', 60000, 'water', 1),
  ('a1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Instalación de boiler', 'Instalación de calentador de agua', 120000, 'flame', 2),
  ('a1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000002', 'Destape de drenaje', 'Destape de tuberías y drenajes', 50000, 'construct', 3);

-- Seed: Services for Electricidad
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'Instalación eléctrica', 'Cableado e instalación de contactos', 80000, 'flash', 1),
  ('a1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000003', 'Reparación de cortos', 'Diagnóstico y reparación de cortos circuitos', 70000, 'warning', 2),
  ('a1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000003', 'Instalación de lámparas', 'Colocación de luminarias y lámparas', 45000, 'bulb', 3);

-- Seed: Services for Pintura
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000004', 'Pintura interior', 'Pintura de habitaciones y espacios internos', 100000, 'color-palette', 1),
  ('a1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000004', 'Pintura exterior', 'Pintura de fachadas y exteriores', 150000, 'brush', 2);

-- Seed: Services for Cerrajería
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000005', 'Apertura de puerta', 'Apertura de cerraduras sin llave', 40000, 'key', 1),
  ('a1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000005', 'Cambio de chapa', 'Reemplazo de cerraduras', 60000, 'lock-closed', 2);

-- Seed: Services for Jardinería
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000006', 'Poda y mantenimiento', 'Poda de árboles y mantenimiento general', 70000, 'leaf', 1),
  ('a1000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000006', 'Diseño de jardín', 'Diseño y plantación de jardines', 200000, 'flower', 2);

-- Seed: Services for Mudanzas
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000007', 'Mudanza local', 'Mudanza dentro de la misma ciudad', 250000, 'cube', 1),
  ('a1000000-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000007', 'Mudanza foránea', 'Mudanza a otra ciudad', 500000, 'car', 2);

-- Seed: Services for Fumigación
INSERT INTO public.services (id, category_id, name, description, base_price, icon, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000008', 'Fumigación residencial', 'Fumigación de casas y departamentos', 90000, 'bug', 1),
  ('a1000000-0000-0000-0000-000000000019', 'c1000000-0000-0000-0000-000000000008', 'Fumigación comercial', 'Fumigación de locales comerciales', 150000, 'storefront', 2);

-- Seed: Service Variables for Limpieza general
INSERT INTO public.service_variables (service_id, name, label, type, min_value, max_value, default_value, price_modifier, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'rooms', 'Número de habitaciones', 'number', 1, 10, '2', 15000, 1),
  ('a1000000-0000-0000-0000-000000000001', 'bathrooms', 'Número de baños', 'number', 1, 5, '1', 10000, 2),
  ('a1000000-0000-0000-0000-000000000001', 'deep_kitchen', 'Limpieza profunda de cocina', 'boolean', NULL, NULL, 'false', 25000, 3);

-- Seed: Service Variables for Pintura interior
INSERT INTO public.service_variables (service_id, name, label, type, min_value, max_value, default_value, price_modifier, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000010', 'sqm', 'Metros cuadrados', 'number', 5, 200, '20', 5000, 1),
  ('a1000000-0000-0000-0000-000000000010', 'paint_type', 'Tipo de pintura', 'select', NULL, NULL, 'standard', 0, 2);

-- Options for paint_type
UPDATE public.service_variables
SET options = '[{"label":"Estándar","value":"standard","modifier":0},{"label":"Premium","value":"premium","modifier":30000},{"label":"Ecológica","value":"eco","modifier":20000}]'::jsonb
WHERE name = 'paint_type' AND service_id = 'a1000000-0000-0000-0000-000000000010';

-- ============================================================================
-- MOCK DATA: Users, requests, payments, chats, reviews
-- All test users have password: password123
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Auth users (triggers handle_new_user → creates profile rows)
-- ---------------------------------------------------------------------------
-- 3 Clients
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, raw_app_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change_token_new, email_change)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'maria@test.com',  crypt('password123', gen_salt('bf')), now(), '{"full_name":"María García"}'::jsonb,    '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'carlos@test.com', crypt('password123', gen_salt('bf')), now(), '{"full_name":"Carlos López"}'::jsonb,    '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'ana@test.com',    crypt('password123', gen_salt('bf')), now(), '{"full_name":"Ana Rodríguez"}'::jsonb,  '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', ''),
-- 3 Providers
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'juan@test.com',    crypt('password123', gen_salt('bf')), now(), '{"full_name":"Juan Pérez"}'::jsonb,      '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'roberto@test.com', crypt('password123', gen_salt('bf')), now(), '{"full_name":"Roberto Sánchez"}'::jsonb, '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'd0000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'laura@test.com',   crypt('password123', gen_salt('bf')), now(), '{"full_name":"Laura Martínez"}'::jsonb,  '{"provider":"email","providers":["email"]}'::jsonb, now(), now(), '', '', '', '');

-- Auth identities (required for email login)
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', '{"sub":"d0000000-0000-0000-0000-000000000001","email":"maria@test.com"}'::jsonb,  'email', now(), now(), now()),
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', '{"sub":"d0000000-0000-0000-0000-000000000002","email":"carlos@test.com"}'::jsonb, 'email', now(), now(), now()),
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', '{"sub":"d0000000-0000-0000-0000-000000000003","email":"ana@test.com"}'::jsonb,    'email', now(), now(), now()),
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', '{"sub":"d0000000-0000-0000-0000-000000000004","email":"juan@test.com"}'::jsonb,    'email', now(), now(), now()),
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000005', '{"sub":"d0000000-0000-0000-0000-000000000005","email":"roberto@test.com"}'::jsonb, 'email', now(), now(), now()),
  (gen_random_uuid(), 'd0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000006', '{"sub":"d0000000-0000-0000-0000-000000000006","email":"laura@test.com"}'::jsonb,   'email', now(), now(), now());

-- ---------------------------------------------------------------------------
-- 2. Update profiles (trigger created them, now add role + provider details)
-- ---------------------------------------------------------------------------
-- Clients
UPDATE public.profiles SET role = 'client', phone = '+52 55 1234 0001' WHERE id = 'd0000000-0000-0000-0000-000000000001';
UPDATE public.profiles SET role = 'client', phone = '+52 55 1234 0002' WHERE id = 'd0000000-0000-0000-0000-000000000002';
UPDATE public.profiles SET role = 'client', phone = '+52 55 1234 0003' WHERE id = 'd0000000-0000-0000-0000-000000000003';

-- Providers
UPDATE public.profiles SET
  role = 'provider', phone = '+52 55 9876 0001',
  bio = 'Especialista en limpieza y plomería con más de 8 años de experiencia.',
  experience_years = 8, avg_rating = 4.75, total_reviews = 32
WHERE id = 'd0000000-0000-0000-0000-000000000004';

UPDATE public.profiles SET
  role = 'provider', phone = '+52 55 9876 0002',
  bio = 'Electricista y pintor certificado. Trabajo de calidad garantizado.',
  experience_years = 12, avg_rating = 4.50, total_reviews = 18
WHERE id = 'd0000000-0000-0000-0000-000000000005';

UPDATE public.profiles SET
  role = 'provider', phone = '+52 55 9876 0003',
  bio = 'Amante de las plantas y experta en control de plagas ecológico.',
  experience_years = 5, avg_rating = 4.90, total_reviews = 45
WHERE id = 'd0000000-0000-0000-0000-000000000006';

-- ---------------------------------------------------------------------------
-- 3. Provider services
-- ---------------------------------------------------------------------------
-- Juan Pérez → Limpieza general (express ON), Limpieza profunda, Reparación de fugas, Destape de drenaje
INSERT INTO public.provider_services (id, provider_id, service_id, base_price, immediate_available) VALUES
  ('ps000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 75000, true),
  ('ps000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 140000, false),
  ('ps000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000004', 55000, false),
  ('ps000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000006', 45000, false);

-- Roberto Sánchez → Instalación eléctrica, Reparación de cortos, Pintura interior, Pintura exterior
INSERT INTO public.provider_services (id, provider_id, service_id, base_price) VALUES
  ('ps000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000007', 85000),
  ('ps000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000008', 65000),
  ('ps000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000010', 95000),
  ('ps000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000011', 145000);

-- Laura Martínez → Poda y mantenimiento, Diseño de jardín, Fumigación residencial, Fumigación comercial
INSERT INTO public.provider_services (id, provider_id, service_id, base_price) VALUES
  ('ps000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000014', 65000),
  ('ps000000-0000-0000-0000-000000000010', 'd0000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000015', 190000),
  ('ps000000-0000-0000-0000-000000000011', 'd0000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000018', 85000),
  ('ps000000-0000-0000-0000-000000000012', 'd0000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000019', 140000);

-- ---------------------------------------------------------------------------
-- 4. Provider availability (Lunes-Viernes 8:00-18:00, Sábado 9:00-14:00)
-- ---------------------------------------------------------------------------
-- Juan Pérez
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time) VALUES
  ('d0000000-0000-0000-0000-000000000004', 1, '08:00', '18:00'),
  ('d0000000-0000-0000-0000-000000000004', 2, '08:00', '18:00'),
  ('d0000000-0000-0000-0000-000000000004', 3, '08:00', '18:00'),
  ('d0000000-0000-0000-0000-000000000004', 4, '08:00', '18:00'),
  ('d0000000-0000-0000-0000-000000000004', 5, '08:00', '18:00'),
  ('d0000000-0000-0000-0000-000000000004', 6, '09:00', '14:00');

-- Roberto Sánchez
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time) VALUES
  ('d0000000-0000-0000-0000-000000000005', 1, '07:00', '17:00'),
  ('d0000000-0000-0000-0000-000000000005', 2, '07:00', '17:00'),
  ('d0000000-0000-0000-0000-000000000005', 3, '07:00', '17:00'),
  ('d0000000-0000-0000-0000-000000000005', 4, '07:00', '17:00'),
  ('d0000000-0000-0000-0000-000000000005', 5, '07:00', '17:00');

-- Laura Martínez
INSERT INTO public.provider_availability (provider_id, day_of_week, start_time, end_time) VALUES
  ('d0000000-0000-0000-0000-000000000006', 1, '09:00', '19:00'),
  ('d0000000-0000-0000-0000-000000000006', 2, '09:00', '19:00'),
  ('d0000000-0000-0000-0000-000000000006', 3, '09:00', '19:00'),
  ('d0000000-0000-0000-0000-000000000006', 4, '09:00', '19:00'),
  ('d0000000-0000-0000-0000-000000000006', 5, '09:00', '19:00'),
  ('d0000000-0000-0000-0000-000000000006', 6, '10:00', '15:00');

-- ---------------------------------------------------------------------------
-- 5. Service requests (one per status to show full lifecycle)
-- ---------------------------------------------------------------------------

-- Request 1: COMPLETED — María pidió limpieza general a Juan
INSERT INTO public.service_requests (id, client_id, provider_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, final_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000001',
   'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004',
   'a1000000-0000-0000-0000-000000000001', 'completed',
   'Av. Reforma 222, Col. Juárez, CDMX', 19.4270, -99.1677,
   CURRENT_DATE - INTERVAL '10 days', '10:00',
   '{"rooms":3,"bathrooms":2,"deep_kitchen":true}'::jsonb,
   150000, 150000, 'Departamento de 3 recámaras, 2 baños. Favor de traer productos.');

-- Request 2: COMPLETED — Carlos pidió instalación eléctrica a Roberto
INSERT INTO public.service_requests (id, client_id, provider_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, final_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000002',
   'd0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005',
   'a1000000-0000-0000-0000-000000000007', 'completed',
   'Calle Durango 45, Col. Roma Norte, CDMX', 19.4195, -99.1630,
   CURRENT_DATE - INTERVAL '7 days', '09:00',
   NULL, 85000, 85000, 'Necesito 4 contactos nuevos en la sala.');

-- Request 3: IN_PROGRESS — Ana pidió fumigación residencial a Laura
INSERT INTO public.service_requests (id, client_id, provider_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000003',
   'd0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000006',
   'a1000000-0000-0000-0000-000000000018', 'in_progress',
   'Calle Ámsterdam 78, Col. Condesa, CDMX', 19.4115, -99.1712,
   CURRENT_DATE, '11:00',
   NULL, 85000, 'Casa de 2 pisos, hay mascotas. Usar productos pet-friendly.');

-- Request 4: ACCEPTED — María pidió pintura interior a Roberto
INSERT INTO public.service_requests (id, client_id, provider_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000004',
   'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000005',
   'a1000000-0000-0000-0000-000000000010', 'accepted',
   'Av. Reforma 222, Col. Juárez, CDMX', 19.4270, -99.1677,
   CURRENT_DATE + INTERVAL '3 days', '08:00',
   '{"sqm":30,"paint_type":"premium"}'::jsonb,
   275000, 'Pintar sala y comedor. Color blanco hueso. Pintura premium.');

-- Request 5: WAITING_ACCEPTANCE — Carlos pidió poda a Laura
INSERT INTO public.service_requests (id, client_id, provider_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000005',
   'd0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000006',
   'a1000000-0000-0000-0000-000000000014', 'waiting_acceptance',
   'Calle Séneca 12, Col. Polanco, CDMX', 19.4330, -99.1950,
   CURRENT_DATE + INTERVAL '5 days', '10:00',
   NULL, 65000, 'Jardín trasero, 3 árboles y setos.');

-- Request 6: PENDING — Ana quiere limpieza profunda (sin proveedor aún)
INSERT INTO public.service_requests (id, client_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000006',
   'd0000000-0000-0000-0000-000000000003',
   'a1000000-0000-0000-0000-000000000002', 'pending',
   'Calle Tamaulipas 100, Col. Condesa, CDMX', 19.4130, -99.1740,
   CURRENT_DATE + INTERVAL '7 days', '14:00',
   NULL, 150000, 'Depa de 2 recámaras. Primera vez que uso el servicio.');

-- Request 7: CANCELLED — Carlos canceló una mudanza
INSERT INTO public.service_requests (id, client_id, service_id, status, address, latitude, longitude, scheduled_date, scheduled_time, variables, estimated_price, notes) VALUES
  ('e0000000-0000-0000-0000-000000000007',
   'd0000000-0000-0000-0000-000000000002',
   'a1000000-0000-0000-0000-000000000016', 'cancelled',
   'Av. Insurgentes Sur 1500, Col. Del Valle, CDMX', 19.3870, -99.1780,
   CURRENT_DATE - INTERVAL '3 days', '07:00',
   NULL, 250000, 'Cancelado por cambio de planes.');

-- ---------------------------------------------------------------------------
-- 6. Payments
-- ---------------------------------------------------------------------------
-- Completed request 1 — captured
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
   'pi_mock_completed_001', 150000, 30000, 120000, 'captured');

-- Completed request 2 — captured
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002',
   'pi_mock_completed_002', 85000, 17000, 68000, 'captured');

-- In-progress request 3 — authorized (hold)
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003',
   'pi_mock_inprogress_003', 85000, 17000, 68000, 'authorized');

-- Accepted request 4 — authorized (hold)
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000004',
   'pi_mock_accepted_004', 275000, 55000, 220000, 'authorized');

-- Waiting acceptance request 5 — authorized (hold)
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000005',
   'pi_mock_waiting_005', 65000, 13000, 52000, 'authorized');

-- Cancelled request 7 — cancelled
INSERT INTO public.payments (id, request_id, stripe_payment_intent_id, amount, platform_fee, provider_amount, status) VALUES
  ('f0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000007',
   'pi_mock_cancelled_007', 250000, 50000, 200000, 'cancelled');

-- ---------------------------------------------------------------------------
-- 7. Chat rooms (for requests with assigned provider)
-- ---------------------------------------------------------------------------
INSERT INTO public.chat_rooms (id, request_id, client_id, provider_id) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004'),
  ('b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005'),
  ('b0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000006'),
  ('b0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000005');

-- ---------------------------------------------------------------------------
-- 8. Chat messages
-- ---------------------------------------------------------------------------
-- Chat room 1: María ↔ Juan (limpieza completada)
INSERT INTO public.chat_messages (room_id, sender_id, content, created_at) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Hola Juan, ¿puedes traer tus propios productos de limpieza?', now() - INTERVAL '11 days'),
  ('b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004', 'Claro María, llevo todo lo necesario. ¿Hay algún producto que prefieras?', now() - INTERVAL '11 days' + INTERVAL '5 minutes'),
  ('b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Si puedes usar productos ecológicos, mejor. Tengo un gato.', now() - INTERVAL '11 days' + INTERVAL '10 minutes'),
  ('b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004', 'Perfecto, uso productos pet-friendly. Nos vemos el martes a las 10.', now() - INTERVAL '11 days' + INTERVAL '15 minutes'),
  ('b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', '¡Quedó impecable! Muchas gracias, Juan.', now() - INTERVAL '10 days' + INTERVAL '4 hours');

-- Chat room 2: Carlos ↔ Roberto (eléctrica completada)
INSERT INTO public.chat_messages (room_id, sender_id, content, created_at) VALUES
  ('b0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Roberto, necesito los contactos a 1.2m de altura. ¿Es posible?', now() - INTERVAL '8 days'),
  ('b0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005', 'Sí, es la altura estándar. Llevo material para 4 contactos dobles.', now() - INTERVAL '8 days' + INTERVAL '20 minutes'),
  ('b0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Excelente. Te espero el viernes.', now() - INTERVAL '8 days' + INTERVAL '25 minutes'),
  ('b0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005', '¡Listo! Quedaron instalados y probados. Cualquier cosa me dices.', now() - INTERVAL '7 days' + INTERVAL '3 hours');

-- Chat room 3: Ana ↔ Laura (fumigación en progreso)
INSERT INTO public.chat_messages (room_id, sender_id, content, created_at) VALUES
  ('b0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Laura, tengo dos perros y un gato. ¿Los productos son seguros?', now() - INTERVAL '1 day'),
  ('b0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000006', 'Sí, uso productos 100% ecológicos y pet-friendly. Solo pido que las mascotas estén en otra habitación durante la aplicación.', now() - INTERVAL '1 day' + INTERVAL '10 minutes'),
  ('b0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 'Perfecto, los pongo en el cuarto de arriba. ¡Gracias!', now() - INTERVAL '1 day' + INTERVAL '15 minutes'),
  ('b0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000006', 'Ya estoy en camino, llego en 15 minutos.', now() - INTERVAL '30 minutes');

-- Chat room 4: María ↔ Roberto (pintura aceptada)
INSERT INTO public.chat_messages (room_id, sender_id, content, created_at) VALUES
  ('b0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'Hola Roberto, ¿el precio incluye la pintura o solo la mano de obra?', now() - INTERVAL '1 day'),
  ('b0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000005', 'Incluye todo: pintura premium, rodillos, cinta y protección de muebles.', now() - INTERVAL '1 day' + INTERVAL '30 minutes'),
  ('b0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'Genial. El color es blanco hueso para sala y comedor.', now() - INTERVAL '1 day' + INTERVAL '35 minutes');

-- ---------------------------------------------------------------------------
-- 9. Reviews (for completed requests)
-- ---------------------------------------------------------------------------
-- Review for request 1: María reviews Juan
INSERT INTO public.reviews (id, request_id, reviewer_id, reviewee_id, rating, comment) VALUES
  ('aa000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001',
   'd0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004',
   5, 'Excelente servicio. Juan fue muy puntual y dejó todo impecable. Los productos ecológicos no molestaron a mi gato. 100% recomendado.');

-- Review for request 1: Juan reviews María
INSERT INTO public.reviews (id, request_id, reviewer_id, reviewee_id, rating, comment) VALUES
  ('aa000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001',
   'd0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001',
   5, 'María fue muy amable y tenía todo listo para que yo pudiera trabajar. Excelente clienta.');

-- Review for request 2: Carlos reviews Roberto
INSERT INTO public.reviews (id, request_id, reviewer_id, reviewee_id, rating, comment) VALUES
  ('aa000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002',
   'd0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005',
   4, 'Buen trabajo, los contactos quedaron bien instalados. Llegó un poco tarde pero el resultado es profesional.');

-- Review for request 2: Roberto reviews Carlos
INSERT INTO public.reviews (id, request_id, reviewer_id, reviewee_id, rating, comment) VALUES
  ('aa000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002',
   'd0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000002',
   5, 'Carlos fue muy claro con lo que necesitaba. Todo bien.');
