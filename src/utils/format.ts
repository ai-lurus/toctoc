import { DEFAULT_CURRENCY } from "@/lib/constants";

export function formatCurrency(
  amountInCents: number,
  currency: string = DEFAULT_CURRENCY,
): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${minutes} ${ampm}`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
