export type UserRole = "client" | "provider";

export type RequestStatus =
  | "pending"
  | "waiting_acceptance"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "authorized"
  | "captured"
  | "cancelled"
  | "refunded";

export type VariableType = "number" | "select" | "boolean";
