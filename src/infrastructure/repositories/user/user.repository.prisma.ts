import { PrismaClient } from "@prisma/client";
import type { UserGateway } from "../../../domain/user/gateway/user.gateway.js";
import { User } from "../../../domain/user/entity/user.js";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient)
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }

        await this.prismaClient.user.create({ data })

    }

    public async GetAll(): Promise<User[]> {
        const AllUsers = await this.prismaClient.user.findMany()

        const output = AllUsers.map((u) => {
            return User.with({
                id: u.id,
                name: u.name,
                email: u.email,
                password: u.password
            })
        })

        return output
    }

    public async GetById(id: string): Promise<User> {
        const userId = await this.prismaClient.user.findUnique({ where: { id: id } })

        if (!userId) {
            throw new Error("usuario não encontrado")
        }

        const output = User.with({
            id: userId.id,
            name: userId.name,
            email: userId.email,
            password: userId.password
        })

        return output
    }

    public async GetByEmail(email: string): Promise<User> {
        const userEmail = await this.prismaClient.user.findUnique({ where: { email: email } })

        if (!userEmail) {
            throw new Error("usuario não encontrado")
        }

        const output = User.with({
            id: userEmail.id,
            name: userEmail.name,
            email: userEmail.email,
            password: userEmail.password
        })

        return output
    }

}