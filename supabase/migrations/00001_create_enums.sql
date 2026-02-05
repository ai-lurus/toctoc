-- Custom enum types
CREATE TYPE public.user_role AS ENUM ('client', 'provider');
CREATE TYPE public.request_status AS ENUM ('pending', 'waiting_acceptance', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('authorized', 'captured', 'cancelled', 'refunded');
CREATE TYPE public.variable_type AS ENUM ('number', 'select', 'boolean');
