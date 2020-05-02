
import express from "express"
import {bankRoutes} from './../routes/bankRoutes'

export class Routes
{
    constructor(){}

    public static RegisterAPIs(app: express.Application)
    {
        app.get('/', (req: express.Request, res: express.Response)=>{
            res.json("server is running")
        });

        app.use("/api/bank", bankRoutes);
    }
}