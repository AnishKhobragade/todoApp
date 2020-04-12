import express from "express"
import {todoModel} from "./todoModel"
import { ExecOptions } from "child_process";

export class TodoService
{

    //Create New Todo Item

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

    //Find Queries

    public static async GetAllTodos(req:express.Request, res: express.Response)
    {
        try{
            let allTodos = await todoModel.find({}).sort("name");;
            res.json(allTodos)
        }
        catch(err)
        {
            res.json(err)
        }
    }

    public static async GetTodoQuery(req:express.Request, res: express.Response)
    {
        //Find todo where name ?
        //name => query string => localhost:7000/getTodo?name=todo1
        //req.query

       try{

        console.log(req.query)

        //AND query
        let todo = await todoModel.find({  "name" : req.query.myTodoName, isCompleted : true  })
        .select("-_id -assign").sort("createdDate");
        

        res.json(todo);
       }
       catch(err)
       {
           res.json(err);
       }
    
    }

    public static async Search(req:express.Request, res: express.Response)
    {
        try{

            console.log(req.query.author)

            let todo = await todoModel.find( { "isCompleted" : null}) 
        res.json(todo);
        }
        catch(err)
        {
            res.json(err)
        }
    
    }

    public static async FindItemById(req:express.Request, res: express.Response)
    {
        try
        {
            let todo = await todoModel.findById(req.params.todoId);
           // let todo = await todoModel.findById(req.params.todoId);
            res.json(todo)
        }
        catch(err)
        {
            res.json(err)
        }
    }

    //update todo items

    public static async UpdateTodo(req:express.Request, res:express.Response)
    {
        //find the todo item / retrieve the todo item to be get Updated

       try{
        let todo :any = await todoModel.findById(req.params.todoId);
        
        todo.description = req.body.description;

        todo.save();
        res.json(todo)

       }
       catch(err)
       {
           res.json(err)
       }
    }


    //delete todo Item


    public static async DeleteTodo(req:express.Request, res:express.Response)
    {
        try
        {
           // let todo = await todoModel.findByIdAndDelete(req.params.todoId)

           // await todoModel.findOneAndDelete({"_id": req.params.todoId})


            let deletedTodo = await todoModel.deleteOne({"_id": req.params.todoId})

            res.json(deletedTodo)
        }
        catch(err)
        {

        }
    }



}