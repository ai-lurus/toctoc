import { PLATFORM_FEE_PERCENT } from "@/lib/constants";
import type { Json } from "@/types/database.types";

interface ServiceVariable {
  name: string;
  price_modifier: number;
  type: "number" | "select" | "boolean";
  options: Json | null;
}

/**
 * Calculate estimated price based on base price and selected variables.
 * All prices are in centavos (MXN cents).
 */
export function calculateEstimatedPrice(
  basePriceCents: number,
  variables: ServiceVariable[],
  selectedValues: Record<string, string | number | boolean>,
): number {
  let total = basePriceCents;

  for (const variable of variables) {
    const value = selectedValues[variable.name];
    if (value === undefined) continue;

    switch (variable.type) {
      case "number": {
        const numValue = typeof value === "number" ? value : parseFloat(String(value));
        if (!isNaN(numValue)) {
          total += variable.price_modifier * numValue;
        }
        break;
      }
      case "boolean": {
        if (value === true || value === "true") {
          total += variable.price_modifier;
        }
        break;
      }
      case "select": {
        // price_modifier acts as multiplier for select options
        total += variable.price_modifier;
        break;
      }
    }
  }

  return Math.round(Math.max(total, 0));
}

export function calculatePlatformFee(amountCents: number): number {
  return Math.round(amountCents * (PLATFORM_FEE_PERCENT / 100));
}

export function calculateProviderAmount(amountCents: number): number {
  return amountCents - calculatePlatformFee(amountCents);
}
