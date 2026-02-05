import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type Service = Database["public"]["Tables"]["services"]["Row"];
type ServiceVariable = Database["public"]["Tables"]["service_variables"]["Row"];

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return data as unknown as Category[];
}

export async function getServicesByCategory(
  categoryId: string,
): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return data as unknown as Service[];
}

export async function getServiceWithVariables(
  serviceId: string,
): Promise<{ service: Service; variables: ServiceVariable[] }> {
  const [serviceResult, variablesResult] = await Promise.all([
    supabase.from("services").select("*").eq("id", serviceId).single(),
    supabase
      .from("service_variables")
      .select("*")
      .eq("service_id", serviceId)
      .order("sort_order"),
  ]);

  if (serviceResult.error) throw serviceResult.error;
  if (variablesResult.error) throw variablesResult.error;

  return {
    service: serviceResult.data as unknown as Service,
    variables: variablesResult.data as unknown as ServiceVariable[],
  };
}
