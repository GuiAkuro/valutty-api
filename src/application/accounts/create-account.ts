import { CreateAccountUseCase } from "@/domain/usecases/accounts/create-account.usecase";
import { AccountsRepository } from "@/infrastructure/repositories/accounts.repository";

export class CreateAccount implements CreateAccountUseCase {
  constructor(private repository: AccountsRepository) {}

  execute() {
    return this.repository.create();
  }
}
