export interface Encryption {
    hash(plain: string): Promise<string>
    compare(plain: string, hash: string): Promise<boolean>
}