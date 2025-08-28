import { UserRepositoryPrisma } from "./infrastructure/repositories/user/user.repository.prisma.js"
import { CreateUserUseCase } from "./usecases/user/create/create-user.usecase.js"
import { PrismaClient } from "@prisma/client"

function main() {

    const user = {
        name: "string",
        email: "string@",
        password: "string"
    }

    const prisma = new PrismaClient()
    const aRepository = UserRepositoryPrisma.create(prisma)

    const createUserUseCase = CreateUserUseCase.create(aRepository)

    createUserUseCase.execute(user)
}

main()