import { CreateAccount } from "@/application/accounts/create-account";
import { db } from "@/infrastructure/database/connection";
import { AccountsPostgresRepository } from "@/infrastructure/repositories/postgres/accounts.postgres";
import { BcryptService } from "@/infrastructure/services/hashing/bcrypt";

export function makeCreateAccount() {
  const hashingService = new BcryptService();
  const repository = new AccountsPostgresRepository(db);
  return new CreateAccount(repository, hashingService);
}
