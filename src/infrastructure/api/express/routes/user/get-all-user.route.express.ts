import type { Request, Response } from "express";
import type { GetAllUsersUseCase } from "../../../../../usecases/user/get-all/get-all-users.usecase.js";
import { httpMethod, type Route } from "../route.js";

export class GetAllUserRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly GetAll: GetAllUsersUseCase) { }

    public static create(GetAll: GetAllUsersUseCase) {
        return new GetAllUserRoute("/user", httpMethod.GET, GetAll)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            
            try {
                const output = await this.GetAll.execute().then((u) => { return u })

                response.status(200).json(output).send()
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