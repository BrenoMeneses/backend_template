import type { Request, Response } from "express";
import type { GetUserByIdUseCase } from "../../../../../usecases/user/get-by-id/get-user-by-id.usecase.js";
import { httpMethod, type Route } from "../route.js";

export class GetUserByIdRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly GetById: GetUserByIdUseCase) { }

    public static create(GetById: GetUserByIdUseCase) {
        return new GetUserByIdRoute("/user/id/:id", httpMethod.GET, GetById)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            
            try {
                const { id } = request.params

                if (!id) { throw new Error("id invalido") }

                const output = await this.GetById.execute({ id })

                response.status(200).json(output)

            } catch (error: any) {
                response.status(400).json({ message: error.message || "ocorreu algum erro" })
            }

        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): httpMethod {
        return this.method
    }

}