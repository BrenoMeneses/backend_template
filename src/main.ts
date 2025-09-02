import { UserRepositoryPrisma } from "./infrastructure/repositories/user/user.repository.prisma.js"
import { prisma } from "./connection/connection.prisma.js"
import { ApiExpress } from "./infrastructure/api/express/api.express.js"
import { BcryptAdapter } from "./infrastructure/security/bcrypt/bcrypt.js"

import { CreateUserUseCase } from "./usecases/user/create/create-user.usecase.js"
import { GetAllUsersUseCase } from "./usecases/user/get-all/get-all-users.usecase.js"
import { GetUserByIdUseCase } from "./usecases/user/get-by-id/get-user-by-id.usecase.js"
import { GetUserByEmailUseCase } from "./usecases/user/get-by-email/get-user-by-email.usecase.js"
import { DeleteUserUseCase } from "./usecases/user/delete/delete-user.usecase.js" 
import { LoginUseCase } from "./usecases/Login/login.usecase.js"

import { CreateUserRoute } from "./infrastructure/api/express/routes/user/create-user.route.express.js"
import { GetAllUserRoute } from "./infrastructure/api/express/routes/user/get-all-user.route.express.js"
import { GetUserByIdRoute } from "./infrastructure/api/express/routes/user/get-user-by-id.route.express.js"
import { GetUserByEmailRoute } from "./infrastructure/api/express/routes/user/get-user-by-email.route.express.js"
import { DeleteUserRoute } from "./infrastructure/api/express/routes/user/delete-user.route.express.js"
import { LoginRoute } from "./infrastructure/api/express/routes/login/login.route.express.js"


(function main() {

    const port = Number(process.env.PORT) || 3333

    const bcryptjs = BcryptAdapter.create(8)

    const repository = UserRepositoryPrisma.create(prisma)
    
    const createUser = CreateUserUseCase.create(repository, bcryptjs)
    const getAllUser = GetAllUsersUseCase.create(repository)
    const getById = GetUserByIdUseCase.create(repository)
    const getByEmail = GetUserByEmailUseCase.create(repository)
    const deleteUser = DeleteUserUseCase.create(repository)
    const Login = LoginUseCase.create(repository, bcryptjs)

    const createRoute = CreateUserRoute.create(createUser)
    const getAllRoute = GetAllUserRoute.create(getAllUser)
    const getByIdRoute = GetUserByIdRoute.create(getById)
    const getByEmailRoute = GetUserByEmailRoute.create(getByEmail)
    const deleteRoute = DeleteUserRoute.create(deleteUser)
    const loginRoute = LoginRoute.create(Login)

    const api = ApiExpress.create([createRoute, getAllRoute, getByIdRoute, getByEmailRoute, deleteRoute, loginRoute])

    api.start(port)

})()