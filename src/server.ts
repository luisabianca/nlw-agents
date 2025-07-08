import fastify from "fastify";
import { sql } from "./db/connection.ts";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import {fastifyCors} from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
origin: '*'
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", () => {
  return "ok";
});

const start = async () => {
  try {
    await app.listen({ port: env.PORT });
    console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor", err);
    process.exit(1);
  }
};

app.register(getRoomsRoute)

start();
