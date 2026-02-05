CREATE TABLE public.chat_rooms (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id  UUID NOT NULL REFERENCES public.service_requests(id),
  client_id   UUID NOT NULL REFERENCES public.profiles(id),
  provider_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(request_id)
);

ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can read chat rooms"
  ON public.chat_rooms FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = provider_id);

CREATE POLICY "System can create chat rooms"
  ON public.chat_rooms FOR INSERT
  WITH CHECK (auth.uid() = client_id OR auth.uid() = provider_id);

-- Chat messages
CREATE TABLE public.chat_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id    UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id  UUID NOT NULL REFERENCES public.profiles(id),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_chat_messages_room ON public.chat_messages(room_id, created_at);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Only room participants can read messages
CREATE POLICY "Participants can read messages"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms cr
      WHERE cr.id = room_id
      AND (cr.client_id = auth.uid() OR cr.provider_id = auth.uid())
    )
  );

-- Only room participants can send messages
CREATE POLICY "Participants can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.chat_rooms cr
      WHERE cr.id = room_id
      AND (cr.client_id = auth.uid() OR cr.provider_id = auth.uid())
    )
  );

-- Enable realtime for chat_messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
