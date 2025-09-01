import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../../usecase.js";


export type DeleteUserInput = {
    id: string;
}

export type DeleteUserOutput = {
    message: string;
}

export class DeleteUserUseCase implements UseCase<DeleteUserInput, DeleteUserOutput> {

    private constructor(private readonly gateway: UserGateway) { }

    public static create(gateway: UserGateway) {
        return new DeleteUserUseCase(gateway)
    }

    public async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
        const userDelete = await this.gateway.delete(input.id)

        const output = { message: "usario deletado com sucesso" }

        return output
    }

}