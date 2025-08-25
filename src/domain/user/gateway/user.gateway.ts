import { User } from "../entity/user.js";

export interface UserGateway {
    save(user: User): Promise<void>;
    GetById(id: string): Promise<User | null>;
    GetByEmail(email: string): Promise<User | null>;
    GetAll(): Promise<User[]>;
}
