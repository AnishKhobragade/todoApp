import {Request, Response} from "express"
import * as jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

export class AuthenticateService
{
    public static authenticate(req:any, res:Response, next: any)
    {
        //read token from authorization header

        let token :any = req.header("Authorization");

        if(!token)
        {
            return res.json("Access denied");
        }

        let option : jwt.VerifyOptions = {
            algorithms:["RS512"]
        }
        let filePath = path.join(path.resolve('.'), '/src/cert/public.key');
        const publicKey = fs.readFileSync(filePath).toString();
        try {

            //result is same as payload object during token creation
            let result = jwt.verify(token,publicKey,option);
            req.user = result;

            console.log(result);
            next();
        } catch (error) {
            console.log(error);
            res.json("Access denied, Bad request");
        }

    }
}