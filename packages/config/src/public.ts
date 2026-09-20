import { z } from "zod";

const booleanFlag = z
  .enum(["true", "false"])
  .transform((value) => value === "true");
export const environmentSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEKORU_ENVIRONMENT: z.enum([
      "local",
      "ci",
      "development",
      "staging",
      "production",
    ]),
    DATABASE_URL: z.string().url(),
    NEKORU_ENABLE_PROTOTYPE: booleanFlag.default(false),
    NEKORU_AUTH_PROVIDER: z
      .enum(["local_double", "clerk"])
      .default("local_double"),
    NEKORU_EVENT_PROVIDER: z
      .enum(["local_double", "qstash"])
      .default("local_double"),
    NEKORU_PRODUCT_ANALYTICS_ENABLED: booleanFlag.default(false),
    NEKORU_AI_EVALUATION_ENABLED: booleanFlag.default(false),
    NEKORU_ASSESSMENT_ENABLED: booleanFlag.default(false),
    NEKORU_READINESS_ENABLED: booleanFlag.default(false),
    NEKORU_OFFLINE_RUNTIME_ENABLED: booleanFlag.default(false),
  })
  .superRefine((value, context) => {
    const forbidden = [
      value.NEKORU_AI_EVALUATION_ENABLED,
      value.NEKORU_ASSESSMENT_ENABLED,
      value.NEKORU_READINESS_ENABLED,
      value.NEKORU_OFFLINE_RUNTIME_ENABLED,
    ];
    if (forbidden.some(Boolean))
      context.addIssue({
        code: "custom",
        message: "Capability setelah Phase 0 harus tetap disabled",
      });
  });

export type NekoruEnvironment = z.infer<typeof environmentSchema>;
