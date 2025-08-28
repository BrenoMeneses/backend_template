import { UserRepositoryPrisma } from "./infrastructure/repositories/user/user.repository.prisma.js"
import { prisma } from "./connection/connection.prisma.js"
import { CreateUserUseCase } from "./usecases/user/create/create-user.usecase.js"
import { GetAllUsersUseCase } from "./usecases/user/get-all-users/get-all-users.usecase.js"
import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.route.express.js"
import { GetAllUserRoute } from "./infrastructure/api/express/routes/user/get-all-user.route.express.js"
import { ApiExpress } from "./infrastructure/api/express/api.express.js"


function main() {

    const port = 3333

    const repository = UserRepositoryPrisma.create(prisma)
    
    const createUser = CreateUserUseCase.create(repository)
    const getAllUser = GetAllUsersUseCase.create(repository)

    const createRoute = CreateUserRoute.create(createUser)
    const getAllRoute = GetAllUserRoute.create(getAllUser)

    const api = ApiExpress.create([createRoute, getAllRoute])

    api.start(port)

}

main()