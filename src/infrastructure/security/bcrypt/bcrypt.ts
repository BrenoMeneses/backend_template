import { compare, hash } from "bcryptjs";
import type { Encryption } from "../../../domain/encryption/encryption.js";


export class BcryptAdapter implements Encryption {

    private readonly saltRounds: number = 8;

    public async hash(plain: string) {
        const hashPass = await hash(plain, this.saltRounds)
        return hashPass
    }

    public async compare(plain: string, hash: string) {
        const isTrue = await compare(plain, hash)
        return isTrue
    }

}