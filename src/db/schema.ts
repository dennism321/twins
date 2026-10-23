import {
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const serviceCategoryEnum = pgEnum("service_category", ["hair", "nails"]);
export const sisterPreferenceEnum = pgEnum("sister_preference", [
  "any",
  "amalia",
  "anastasia",
]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  serviceId: varchar("service_id", { length: 64 }).notNull(),
  serviceName: varchar("service_name", { length: 160 }).notNull(),
  category: serviceCategoryEnum("category").notNull(),
  preferredDate: date("preferred_date").notNull(),
  preferredTime: varchar("preferred_time", { length: 5 }).notNull(),
  sister: sisterPreferenceEnum("sister").notNull().default("any"),
  notes: text("notes"),
  locale: varchar("locale", { length: 2 }).notNull().default("el"),
  status: bookingStatusEnum("status").notNull().default("pending"),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
