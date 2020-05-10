
import express from "express"
import {bankRoutes} from './../routes/bankRoutes'
import {cardRoutes} from './../routes/cardRoutes'
import {userRoutes} from './../routes/userRoutes'
import { AuthenticateService } from "./../middleware/authenticateService";
import {UserController} from "./../controllers/userController"
const userController = new UserController();

export class Routes
{
    constructor(){}

    public static RegisterAPIs(app: express.Application)
    {
        
        app.get('/', (req: express.Request, res: express.Response)=>{
            res.json("server is running")
        });

        //Non Authenticated APIS' or say Public API
        app.post('/register',userController.register);
        app.post('/login', userController.login);

        //Apply Authentication for All Below API's
        app.use(AuthenticateService.authenticate);

        app.use("/api/bank",bankRoutes);
        
        app.use("/api/user", userRoutes);

        app.use("/api/card",cardRoutes);
    }
}