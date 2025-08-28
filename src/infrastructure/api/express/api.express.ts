import express, { type Express } from "express";
import type { Route } from "./routes/route.js";

export class ApiExpress {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())
        this.setupRoutes(routes)
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes)
    }

    private setupRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const method = route.getMethod()
            const path = route.getPath()
            const handler = route.getHandler()

            this.app[method](path, handler)
        })
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log("rodando na porta " + port)
        })
    }

}