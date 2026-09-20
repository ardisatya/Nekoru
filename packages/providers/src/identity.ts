import { verifyToken } from "@clerk/backend";
import type { IdentityContext, IdentityVerifier } from "@nekoru/application";
import type { PrefixedUlid } from "@nekoru/domain";

export class LocalIdentityVerifier implements IdentityVerifier {
  constructor(
    private readonly context: IdentityContext = {
      user_id: "usr_01J00000000000000000000000" as PrefixedUlid,
      provider_subject: "local_test_subject",
      environment: "local",
    },
  ) {}
  async verify(token: string): Promise<IdentityContext> {
    if (token !== "local-test-token") throw new Error("authentication_failed");
    return this.context;
  }
}

export class ClerkIdentityVerifier implements IdentityVerifier {
  constructor(
    private readonly secretKey: string,
    private readonly environment: string,
    private readonly resolveUserId: (subject: string) => Promise<PrefixedUlid>,
  ) {}
  async verify(token: string): Promise<IdentityContext> {
    const payload = await verifyToken(token, { secretKey: this.secretKey });
    return {
      user_id: await this.resolveUserId(payload.sub),
      provider_subject: payload.sub,
      environment: this.environment,
    };
  }
}
