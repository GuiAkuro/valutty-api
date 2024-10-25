import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export default async function redefinePasswordRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/redefine-password",
    {
      schema: {
        tags: ["Authentication"],
        body: z.object({
          password: z.string(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    (request, reply) => {
      reply.status(201).send();
    }
  );
}
