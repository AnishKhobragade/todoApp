
import * as express from 'express'
import { InsertService } from './services/InsertService';

//MONGODB CRUD OPERATIONS
//https://docs.mongodb.com/manual/crud/
export class Routes {

    constructor(){}
    public static routes(app :express.Application): void {   

        app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).send({
                message: 'Server is running'
            })
        });

        app.get('/mongo/insertOne', InsertService.InsertOne)
        app.get('/mongo/insertMany', InsertService.InsertMany)
        

    }
}