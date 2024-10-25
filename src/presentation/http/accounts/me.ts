import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export default async function meRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/accounts/me",
    {
      schema: {
        tags: ["Accounts"],
        response: {
          200: z.object({
            id: z.string(),
            email: z.string().email(),
            forename: z.string(),
            surname: z.string(),
          }),
        },
      },
    },
    (request, reply) => {
      reply.status(201).send({
        id: "123",
        email: "email",
        forename: "Guilherme",
        surname: "Oliveira",
      });
    }
  );
}
