import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];
type ProviderAvailability =
  Database["public"]["Tables"]["provider_availability"]["Row"];
type ProviderService =
  Database["public"]["Tables"]["provider_services"]["Row"];

export interface EnrichedReview extends Review {
  reviewer_name: string;
}

export interface EnrichedProviderService extends ProviderService {
  service_name: string;
  service_description: string | null;
  service_icon: string;
}

export interface ProviderProfile extends Profile {
  reviews: EnrichedReview[];
  availability: ProviderAvailability[];
  services: EnrichedProviderService[];
}

export async function getProviderById(
  providerId: string,
): Promise<ProviderProfile> {
  const [profileRes, reviewsRes, availabilityRes, servicesRes] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", providerId).single(),
      supabase
        .from("reviews")
        .select("*")
        .eq("reviewee_id", providerId)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("provider_availability")
        .select("*")
        .eq("provider_id", providerId)
        .order("day_of_week"),
      supabase
        .from("provider_services")
        .select("*")
        .eq("provider_id", providerId)
        .eq("is_active", true),
    ]);

  if (profileRes.error) throw profileRes.error;

  // Enrich reviews with reviewer names
  const reviews = (reviewsRes.data ?? []) as unknown as Review[];
  const reviewerIds = [...new Set(reviews.map((r) => r.reviewer_id))];
  let reviewerNames: Record<string, string> = {};

  if (reviewerIds.length > 0) {
    const { data: reviewers } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", reviewerIds);

    reviewerNames = (reviewers ?? []).reduce(
      (acc, r) => ({ ...acc, [r.id]: r.full_name }),
      {} as Record<string, string>,
    );
  }

  const enrichedReviews: EnrichedReview[] = reviews.map((review) => ({
    ...review,
    reviewer_name: reviewerNames[review.reviewer_id] ?? "Usuario",
  }));

  // Enrich services with name, description and icon
  const providerServices = (servicesRes.data ??
    []) as unknown as ProviderService[];
  const serviceIds = providerServices.map((ps) => ps.service_id);

  type ServiceInfo = { name: string; description: string | null; icon: string };
  let serviceInfo: Record<string, ServiceInfo> = {};

  if (serviceIds.length > 0) {
    const { data: svcData } = await supabase
      .from("services")
      .select("id, name, description, icon")
      .in("id", serviceIds);

    serviceInfo = (svcData ?? []).reduce(
      (acc, s) => ({
        ...acc,
        [s.id]: { name: s.name, description: s.description, icon: s.icon },
      }),
      {} as Record<string, ServiceInfo>,
    );
  }

  const enrichedServices: EnrichedProviderService[] = providerServices.map(
    (ps) => ({
      ...ps,
      service_name: serviceInfo[ps.service_id]?.name ?? "Servicio",
      service_description: serviceInfo[ps.service_id]?.description ?? null,
      service_icon: serviceInfo[ps.service_id]?.icon ?? "construct",
    }),
  );

  return {
    ...(profileRes.data as unknown as Profile),
    reviews: enrichedReviews,
    availability: (availabilityRes.data ??
      []) as unknown as ProviderAvailability[],
    services: enrichedServices,
  };
}
