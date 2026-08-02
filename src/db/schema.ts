import { pgTable, serial, text, timestamp, varchar, boolean, integer } from "drizzle-orm/pg-core";

// Booking / reservation enquiries submitted through the booking flow.
export const bookingInquiries = pgTable("booking_inquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  roomType: varchar("room_type", { length: 120 }),
  checkIn: varchar("check_in", { length: 20 }),
  checkOut: varchar("check_out", { length: 20 }),
  adults: integer("adults").default(2),
  children: integer("children").default(0),
  promoCode: varchar("promo_code", { length: 60 }),
  airportPickup: boolean("airport_pickup").default(false),
  packageName: varchar("package_name", { length: 160 }),
  message: text("message"),
  status: varchar("status", { length: 30 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// General contact / event / wedding / conference enquiries.
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  subject: varchar("subject", { length: 160 }),
  category: varchar("category", { length: 60 }).default("general"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Newsletter / journal subscribers.
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
