import type { User } from "../../../domain/user/entity/user.js";
import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../../usecase.js";

export type GetByIdInput = {
    id: string;
}

export type GetByIdOutput = {
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
    }
}

export class GetUserByIdUseCase implements UseCase<GetByIdInput, GetByIdOutput> {

    private constructor(private readonly gateway: UserGateway) { }

    public static create(gateway: UserGateway) {
        return new GetUserByIdUseCase(gateway)
    }

    public async execute(input: GetByIdInput): Promise<GetByIdOutput> {
        const user = await this.gateway.GetById(input.id)

        const output = this.presentOutput(user)

        return output
    }

    private presentOutput(user: User){
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        }
    }

}