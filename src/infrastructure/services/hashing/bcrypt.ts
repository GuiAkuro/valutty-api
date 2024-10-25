import bcrypt from "bcrypt";
import { HashingService } from "./hashing";
import { env } from "@/env";

export class BcryptService implements HashingService {
  async hash(value: string) {
    return await bcrypt.hash(value, env.HASH_SALT);
  }

  async compare(hashed: string, value: string) {
    return await bcrypt.compare(value, hashed);
  }
}
