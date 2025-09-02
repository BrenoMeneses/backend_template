import type { Request, Response } from "express";
import type { DeleteUserUseCase } from "../../../../../usecases/user/delete/delete-user.usecase.js";
import { httpMethod, type Route } from "../route.js";

export class DeleteUserRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly DeleteUser: DeleteUserUseCase) { }

    public static create(DeleteUser: DeleteUserUseCase) {
        return new DeleteUserRoute("/user/:id", httpMethod.DELETE, DeleteUser)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            try {
                const { id } = request.params

                if (!id) { throw new Error("id inválido") }

                const output = await this.DeleteUser.execute({ id })

                response.status(200).json(output)
            } catch (error: any) {
                response.status(400).json({ message: error.message || "ocorreu algum erro" })
            }

        }

    }

    public getMethod(): httpMethod {
        return this.method
    }

    public getPath(): string {
        return this.path
    }

}