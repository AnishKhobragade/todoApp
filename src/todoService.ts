import express from "express"
import {todoModel} from "./todoModel"

export class TodoService
{
    public static async CreateTodo(req:express.Request, res: express.Response)
    {
        try
        {
            console.log(req.body);
            let todoItem = new todoModel(req.body);

            await todoItem.save();

            res.json(todoItem);
        }
        catch(err)
        {
            res.json(err)
        }
    }


    public static async GetAllTodos(req:express.Request, res: express.Response)
    {
        try{
            let allTodos = await todoModel.find({});
            res.json(allTodos)
        }
        catch(err)
        {
            res.json(err)
        }
    }



}