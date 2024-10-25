import { Account } from "@/domain/models/account";

export interface CreateAccountUseCase {
  execute: () => Promise<Account>;
}
