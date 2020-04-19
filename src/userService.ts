import express from "express"
import {userModel} from "./userModel"
import { ExecOptions } from "child_process";

export class UserService
{

    //Create New user

    public static async CreateUser(req:express.Request, res: express.Response)
    {
        try
        {
            console.log(req.body);
            let newUser = new userModel(req.body);

            await newUser.save();

            res.json(newUser);
        }
        catch(err)
        {
            res.json(err)
        }
    }

    //Find Queries

    public static async GetUser(req:express.Request, res: express.Response)
    {
        try{
            let allUsers = await userModel.find({}).sort("name");;
            res.json(allUsers)
        }
        catch(err)
        {
            res.json(err)
        }
    }

    public static async GetUserQuery(req:express.Request, res: express.Response)
    {
        //Find todo where name ?
        //name => query string => localhost:7000/getTodo?name=todo1
        //req.query

       try{

        console.log(req.query)

        //AND query
        let users = await userModel.find({  "name" : req.query.userName  });
        

        res.json(users);
       }
       catch(err)
       {
           res.json(err);
       }
    
    }


    public static async FindUserById(req:express.Request, res: express.Response)
    {
        try
        {
            let user = await userModel.findById(req.params.userId);
           // let todo = await todoModel.findById(req.params.todoId);
            res.json(user)
        }
        catch(err)
        {
            res.json(err)
        }
    }

    //update todo items

    public static async UpdateUser(req:express.Request, res:express.Response)
    {
        //find the todo item / retrieve the todo item to be get Updated

       try{
        let user :any = await userModel.findById(req.params.userId);
        
        user.name = req.body.userName;

        user.save();
        res.json(user)

       }
       catch(err)
       {
           res.json(err)
       }
    }


    //delete todo Item


    public static async DeleteUser(req:express.Request, res:express.Response)
    {
        try
        {
           // let todo = await todoModel.findByIdAndDelete(req.params.todoId)

           // await todoModel.findOneAndDelete({"_id": req.params.todoId})


            let user = await userModel.deleteOne({"_id": req.params.userId})

            res.json(user)
        }
        catch(err)
        {

        }
    }



}