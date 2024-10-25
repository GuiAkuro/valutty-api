import { Account } from "@/domain/models/account";

export interface AccountsRepository {
  create: () => Promise<Account>;
}
