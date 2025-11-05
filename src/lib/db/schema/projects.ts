import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const projectBadgesTable = pgTable("project_badges", {
  id: uuid().primaryKey().defaultRandom(),
  projectId: uuid().notNull(),
  name: varchar({ length: 100 }).notNull(),
  color: varchar({ length: 50 }).default("gray"),
});

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  badges: many(projectBadgesTable),
}));

export const projectBadgesRelations = relations(projectBadgesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [projectBadgesTable.projectId],
    references: [projectsTable.id],
  }),
}));
