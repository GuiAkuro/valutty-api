import Fastify from "fastify";
import autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import { env } from "./env";
import path from "path";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = Fastify({
  logger: env.DEVELOPMENT ? true : false,
});

server.withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.code(400).send({
      error: "Response Validation Error",
      message: "Request doesn't match the schema",
      statusCode: 400,
      details: {
        issues: err.validation,
        method: req.method,
        url: req.url,
      },
    });
  }

  if (isResponseSerializationError(err)) {
    return reply.code(500).send({
      error: "Internal Server Error",
      message: "Response doesn't match the schema",
      statusCode: 500,
      details: {
        issues: err.cause.issues,
        method: err.method,
        url: err.url,
      },
    });
  }
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Valutty",
      description: "Valutty api documentation",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

server.register(cors, {
  origin: "*",
});

server.register(autoload, {
  dir: path.join(__dirname, "presentation", "http"),
  dirNameRoutePrefix: false,
  options: {
    prefix: "/api",
  },
});

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("server is running!");
  });
