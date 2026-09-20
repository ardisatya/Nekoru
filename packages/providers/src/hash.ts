import { createHash } from "node:crypto";
import type { HashService } from "@nekoru/application";
import {
  toCanonicalJson,
  type CanonicalJsonValue,
  type Sha256,
} from "@nekoru/domain";

export class NodeHashService implements HashService {
  sha256(value: CanonicalJsonValue): Sha256 {
    return `sha256:${createHash("sha256").update(toCanonicalJson(value), "utf8").digest("hex")}`;
  }
}
