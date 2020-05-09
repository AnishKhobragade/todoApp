import express from "express"
import bodyParser from "body-parser"
import { DB } from "./startup/db"
import {Routes} from "./startup/routes"
import { AuthenticateService } from "./middleware/authenticateService"

class CardApp
{
    app : express.Application

    constructor()
    {
        this.app = express();

        this.app.listen(8000, 'localhost', ()=>{
            console.log("server is running on port 8000");
        });

        DB.ConnectMongoDB();

        this.configBodyParser();

        this.app.use(AuthenticateService.authenticate);

        Routes.RegisterAPIs(this.app);
       
    }

    private configBodyParser()
    {
        //middleware
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

}

let myTodoAPP = new CardApp();