import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../../../../../usecases/user/create/create-user.usecase.js";
import { httpMethod, type Route } from "../route.js";

export class CreateUserRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly CreateUser: CreateUserUseCase) { }

    public static create(CreateUser: CreateUserUseCase) {
        return new CreateUserRoute("/user", httpMethod.POST, CreateUser)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            try {
                const { name, email, password } = request.body

                const output = await this.CreateUser.execute({ name, email, password })

                response.status(200).json(output).send()
            } catch (error: any) {
                console.log(error)
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