import { type } from "arktype";

export const CreateProjectSchema = type({
  name: `string`,
});

export type CreateProjectSchemaType = typeof CreateProjectSchema.infer;
