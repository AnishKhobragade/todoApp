
import express from "express"
import {TodoService} from "./todoService"
import { todoModel } from "todoModel";

export class Routes
{
    constructor(){}

    public static RegisterAPIs(app: express.Application)
    {
        app.get('/', (req: express.Request, res: express.Response)=>{
            res.json("server is running")
        });

        app.post("/createTodo", TodoService.CreateTodo);

        app.get("/getAllTodo", TodoService.GetAllTodos);

        app.get('/getTodo', TodoService.GetTodoQuery);

        app.post("/search", TodoService.Search);

        app.get("/todo/:todoId", TodoService.FindItemById);

        app.put("/todo/:todoId", TodoService.UpdateTodo);

        app.delete("/todo/:todoId", TodoService.DeleteTodo);


    }
}