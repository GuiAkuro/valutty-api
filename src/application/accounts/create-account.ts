import { CreateAccountUseCase } from "@/domain/usecases/accounts/create-account.usecase";
import { AccountsRepository } from "@/infrastructure/repositories/accounts.repository";
import { HashingService } from "@/infrastructure/services/hashing/hashing";

export class CreateAccount implements CreateAccountUseCase {
  constructor(
    private repository: AccountsRepository,
    private hashingService: HashingService
  ) {}

  execute() {
    const hashedPassword = this.hashingService.hash("123");
    console.log("hashed password: ", hashedPassword);

    return this.repository.create();
  }
}
