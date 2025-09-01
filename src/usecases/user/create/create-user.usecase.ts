import type { Encryption } from "../../../domain/encryption/encryption.js";
import { User } from "../../../domain/user/entity/user.js";
import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../../usecase.js";

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
}

export type CreateUserOutput = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase implements UseCase<CreateUserInput, CreateUserOutput> {

    private constructor(private readonly gateway: UserGateway, private readonly encryption: Encryption) { }

    public static create(gateway: UserGateway, encryption: Encryption) {
        return new CreateUserUseCase(gateway, encryption)
    }

    public async execute(input: CreateUserInput): Promise<CreateUserOutput> {

        const passwordHash = await this.encryption.hash(input.password)

        const user = User.create(input.name, input.email, passwordHash)
        await this.gateway.save(user)

        const output = this.presentOutput(user)

        return output
    }

    private presentOutput(user: User) {
        const output = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }
        return output
    }

}