import type { Request, Response } from "express";
import type { LoginUseCase } from "../../../../../usecases/Login/login.usecase.js";
import { httpMethod, type Route } from "../route.js";



export class LoginRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly login: LoginUseCase) { }

    public static create(login: LoginUseCase) {
        return new LoginRoute("/login", httpMethod.POST, login)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            try {
                const { email, password } = request.body

                const output = await this.login.execute({ email, password })

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