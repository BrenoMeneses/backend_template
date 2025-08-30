import type { User } from "@prisma/client";
import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../../usecase.js";


export type GetUserByEmailInput = {
    email: string;
}

export type GetUserByEmailOutput = {
    users: {
        id: string,
        name: string,
        email: string,
        password: string
    }
}

export class GetUserByEmailUseCase implements UseCase<GetUserByEmailInput, GetUserByEmailOutput> {

    constructor(private readonly gateway: UserGateway) { }

    public static create(gateway: UserGateway){
        return new GetUserByEmailUseCase(gateway)
    }

    public async execute(input: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
        const user = await this.gateway.GetByEmail(input.email)

        const output = this.presentOutput(user)

        return output
    }

    private presentOutput(user: User) {
        return {
            users: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        }
    }

}