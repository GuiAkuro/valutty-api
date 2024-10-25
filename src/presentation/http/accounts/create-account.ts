import { makeCreateAccount } from "@/presentation/factories/accounts/create-account.factory";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export default async function createAccountRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/accounts",
    {
      schema: {
        tags: ["Accounts"],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
          forename: z.string(),
          surname: z.string(),
        }),
        response: {
          201: z.null(),
          400: z.null(),
          409: z.null(),
          500: z.null(),
        },
      },
    },
    (request, reply) => {
      const { email } = request.body;

      const createAccountUseCase = makeCreateAccount();
      createAccountUseCase.execute();

      reply.status(201).send();
    }
  );
}
