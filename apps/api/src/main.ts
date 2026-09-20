import "reflect-metadata";
import { Controller, Get, Header, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { createOpenApiDocument } from "@nekoru/contracts";

const health = {
  status: "ok" as const,
  service: "nekoru-api",
  version: "0.0.0-phase0",
  environment: process.env.NEKORU_ENVIRONMENT ?? "local",
};

@Controller("api/v1")
class PhaseZeroController {
  @Get("health/live") getLive() {
    return health;
  }
  @Get("health/ready") getReady() {
    return health;
  }
  @Get("openapi.json")
  @Header("content-type", "application/json; charset=utf-8")
  getOpenApi() {
    return createOpenApiDocument();
  }
}

@Module({ controllers: [PhaseZeroController] })
class ApiModule {}

const app = await NestFactory.create<NestFastifyApplication>(
  ApiModule,
  new FastifyAdapter({ logger: true }),
);
app.enableShutdownHooks();
await app.listen({ host: "127.0.0.1", port: Number(process.env.PORT ?? 3001) });
