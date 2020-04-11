
import express from "express"
import {TodoService} from "./todoService"

export class Routes
{
    constructor(){}

    public static RegisterAPIs(app: express.Application)
    {
        app.get('/', (req: express.Request, res: express.Response)=>{
            res.json("server is running")
        })


        app.post("/createTodo", TodoService.CreateTodo);

        app.get("/getAllTodo", TodoService.GetAllTodos);

    }
}