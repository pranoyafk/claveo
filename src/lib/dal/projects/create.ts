import { db } from "@/lib/db";
import { projectBadgesTable, projectsTable } from "@/lib/db/schema/projects";
import { CreateProjectSchema, type CreateProjectSchemaType } from "@/lib/schemas/createProject";
import { type } from "arktype";
import "server-only";

export async function createProject(data: CreateProjectSchemaType) {
  const out = CreateProjectSchema(data);
  if (out instanceof type.errors) {
    return { success: false, errors: "Invalid Body" };
  }

  try {
    const [createdProject] = await db
      .insert(projectsTable)
      .values({
        name: out.name,
      })
      .returning({ id: projectsTable.id });

    if (!createdProject) {
      return { success: false, errors: "Could not create project" };
    }

    await db.insert(projectBadgesTable).values({
      name: "Success",
      color: "green",
      projectId: createdProject.id,
    });
  } catch {
    return { success: false, errors: "Could not create project" };
  }

  return { success: true };
}
