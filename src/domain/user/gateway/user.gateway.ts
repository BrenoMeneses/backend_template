import { User } from "../entity/user.js";

export interface UserGateway {
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
    GetById(id: string): Promise<User>;
    GetByEmail(email: string): Promise<User>;
    GetAll(): Promise<User[]>;
}
