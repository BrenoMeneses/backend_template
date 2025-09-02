import type { Encryption } from "../../domain/encryption/encryption.js";
import type { UserGateway } from "../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../usecase.js";

export type LoginInput = {
    email: string;
    password: string;
}

export type LoginOutput = {
    response: boolean;
}

export class LoginUseCase implements UseCase<LoginInput, LoginOutput> {

    private constructor(private readonly gateway: UserGateway, private readonly encryption: Encryption) { }

    public static create(gateway: UserGateway, encryption: Encryption) {
        return new LoginUseCase(gateway, encryption)
    }

    public async execute(input: LoginInput): Promise<LoginOutput> {
        const user = await this.gateway.GetByEmail(input.email)

        const passVerify = await this.encryption.compare(input.password, user.password)

        if (!passVerify) { throw new Error("Senha incorreta") }

        return { response: true }
    }

}