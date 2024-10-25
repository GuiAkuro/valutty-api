import { Account } from "@/domain/models/account";
import { AccountsRepository } from "../accounts.repository";
import { Connection } from "pg";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { user } from "@/infrastructure/database/schemas/user";

export class AccountsPostgresRepository implements AccountsRepository {
  constructor(private db: NodePgDatabase) {}

  async create(): Promise<Account> {
    await this.db.insert(user).values({
      email: "email@email.com",
      password: "123",
      forename: "Guilherme",
      surname: "Oliveira",
    });

    return new Promise((res) =>
      res({
        email: "email@email.com",
        forename: "Guilherme",
        surname: "Oliveira",
      })
    );
  }
}
