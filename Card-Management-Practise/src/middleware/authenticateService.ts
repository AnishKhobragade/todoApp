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
        let option : jwt.VerifyOptions = {
            algorithms:["RS512"]
        }
        let filePath = path.join(path.resolve('.'), '/src/utils/public.key');
        const publicKey = fs.readFileSync(filePath).toString();
        try {

            let result = jwt.verify(token,publicKey,option);
            req.user = result;

            console.log(result);
            next();
        } catch (error) {
            console.log(error);
            res.json("Access denied");
        }

    }
}