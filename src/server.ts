import express from "express"
import bodyParser from "body-parser"
import { DB } from "./db"
import {Routes} from "./route"


class TodoApp
{
    app : express.Application

    constructor()
    {
        this.app = express();

        this.app.listen(7000, 'localhost', ()=>{
            console.log("server is running on port 8000");
        });

        DB.ConnectMongoDB();

        this.configBodyParser();

        Routes.RegisterAPIs(this.app);
       
    }


    
    private configBodyParser()
    {
        //middleware
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

}

let myTodoAPP = new TodoApp();