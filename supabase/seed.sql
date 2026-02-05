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
