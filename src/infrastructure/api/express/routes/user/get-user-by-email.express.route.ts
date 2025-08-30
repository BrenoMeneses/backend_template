import type { Request, Response } from "express";
import type { GetUserByEmailUseCase } from "../../../../../usecases/user/get-by-email/get-user-by-email.usecase.js";
import { httpMethod, type Route } from "../route.js";


export class GetUserByEmailRoute implements Route {

    private constructor(private readonly path: string, private readonly method: httpMethod, private readonly getByEmail: GetUserByEmailUseCase) { }

    public static create(getByEmail: GetUserByEmailUseCase) {
        return new GetUserByEmailRoute("/user/email/:email", httpMethod.GET, getByEmail)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            try {
                const { email } = request.params

                if (!email) { throw new Error("email inválido") }

                const user = await this.getByEmail.execute({ email })

                response.status(200).json(user)

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