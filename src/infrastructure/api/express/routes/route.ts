import type { Request, Response } from "express"

export type httpMethod = "get" | "post"

export const httpMethod = {
    GET: "get" as httpMethod,
    POST: "post" as httpMethod
} as const

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>
    getPath(): string
    getMethod(): httpMethod
}
