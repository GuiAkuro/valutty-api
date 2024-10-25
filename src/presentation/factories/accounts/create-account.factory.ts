import { CreateAccount } from "@/application/accounts/create-account";
import { db } from "@/infrastructure/database/connection";
import { AccountsPostgresRepository } from "@/infrastructure/repositories/postgres/accounts.postgres";

export function makeCreateAccount() {
  const repository = new AccountsPostgresRepository(db);
  return new CreateAccount(repository);
}
