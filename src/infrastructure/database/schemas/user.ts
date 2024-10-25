import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  forename: varchar({ length: 255 }).notNull(),
  surname: varchar({ length: 255 }).notNull(),
});
