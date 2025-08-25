import type { User } from "../../../domain/user/entity/user.js";
import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import type { UseCase } from "../../usecase.js";

export type GetAllUsersInput = void;

export type GetAllUsersOutput = {
    users: {
        id: string,
        name: string,
        email: string,
        password: string
    }[]
}

export class GetAllUsers implements UseCase<GetAllUsersInput, GetAllUsersOutput>{
    private constructor(private readonly gatway: UserGateway){
        console.log(this.gatway)
    }

    public async execute(): Promise<GetAllUsersOutput> {
        const users = await this.gatway.GetAll()

        const output = this.presentOutput(users)

        return output
    }

    private presentOutput(users: User[]){
        return {
            users: users.map((u)=>{
                return {
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    password: u.password
                }
            })
        }
    }
}