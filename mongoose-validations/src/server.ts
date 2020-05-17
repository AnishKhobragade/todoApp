import express from "express";
import * as bodyParser from "body-parser"
import {Db} from "./db"
import {Routes} from './routes'

//MONGODB CRUD OPERATIONS
//https://docs.mongodb.com/manual/crud/

class App {

    public app: express.Application;
    public port = process.env.PORT || '4000';
    public host = 'localhost'
    
    constructor() {
        this.app = express();

        this.app.listen(parseInt(this.port),this.host, () => {
            console.log('Express server listening on port ',this.port );
        })

        this.config();        
        Routes.routes(this.app);
        Db.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

let MongoApp = new App();

