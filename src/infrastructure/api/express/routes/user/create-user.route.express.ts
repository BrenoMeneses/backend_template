import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../../../../../usecases/user/create/create-user.usecase.js";
import { httpMethod, type Route } from "../route.js";

export type CreateUserResponse = {
    id: string,
    name: string,
    email: string
}

export class CreateUserRoute implements Route {

    private constructor(private readonly path: string, private readonly httpMethod: httpMethod, CreateUser: CreateUserUseCase) { }

    public static create(CreateUserUseCase: CreateUserUseCase){
        return new CreateUserRoute("/user", httpMethod.POST, CreateUserUseCase)
    }

    public getHandler(request: Request, response: Response) {
        return async (request: Request, response: Response) => {
            const { name, email, password } = request.body
        }
    }

    public getMethod(): httpMethod {
        return httpMethod.POST
    }

    public getPath(): string {
        return this.path
    }

}