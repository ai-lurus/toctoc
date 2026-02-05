CREATE TABLE public.reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id  UUID NOT NULL REFERENCES public.service_requests(id),
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
  reviewee_id UUID NOT NULL REFERENCES public.profiles(id),
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(request_id, reviewer_id) -- one review per user per request
);

CREATE INDEX idx_reviews_reviewee ON public.reviews(reviewee_id);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON public.reviews FOR SELECT
  USING (true);

-- Only post-completed service, only participants
CREATE POLICY "Participants can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id
    AND EXISTS (
      SELECT 1 FROM public.service_requests sr
      WHERE sr.id = request_id
      AND sr.status = 'completed'
      AND (sr.client_id = auth.uid() OR sr.provider_id = auth.uid())
    )
  );

-- Trigger to update avg_rating on provider profile
CREATE OR REPLACE FUNCTION public.update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET
    avg_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews
      WHERE reviewee_id = NEW.reviewee_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_rating_on_review
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_provider_rating();
