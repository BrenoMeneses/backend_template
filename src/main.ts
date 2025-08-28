import { UserRepositoryPrisma } from "./infrastructure/repositories/user/user.repository.prisma.js"
import { CreateUserUseCase } from "./usecases/user/create/create-user.usecase.js"
import { PrismaClient } from "@prisma/client"
import { GetAllUsersUseCase } from "./usecases/user/get-all-users/get-all-users.usecase.js"

function main() {

    const user = {
        name: "MIGUEL",
        email: "MIGUEL@GMAIL",
        password: "123456"
    }

    const prisma = new PrismaClient()
    const aRepository = UserRepositoryPrisma.create(prisma)

    //const createUserUseCase = CreateUserUseCase.create(aRepository)
    //createUserUseCase.execute(user)

    const getAll = GetAllUsersUseCase.create(aRepository)

    console.log(getAll.execute().then((a)=>{console.log(a)}))
}

main()