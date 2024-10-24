import z, { boolean, number } from "zod";

const envSchema = z.object({
  DEVELOPMENT: z.string().transform((value) => value === "true"),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  HASH_SALT: z.string().transform(Number),
});

export const env = envSchema.parse(process.env);
