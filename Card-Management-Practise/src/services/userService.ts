import { userModel } from "./../models/userModel"
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"
import { ResponseService} from "./../utils/responseService"

export class UserService{

    public static async register(req:any) {
        try {
            //password encryption
            let hashPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPassword;
            let newUser = new userModel(req.body);
            await newUser.save();
            return newUser;
        } catch(err) {
            return err;
        }
    }

    public static async login(req:any)
    {
        //check for user exist??
        let user : any = await userModel.findOne({email : req.body.email});

        if(!user)
        {
            return ResponseService.getInValidResponse({'message': `user not registered with email ${req.body.email}`});
        }

        //Check  for password match

        let isPasswordMatched :boolean = await bcrypt.compare(req.body.password,user.password);

        if(!isPasswordMatched)
        {
            return ResponseService.getInValidResponse({'message': "Wrong password, please try again"});
        }

        //user login sucess..generate json web token
        let privateKey = "";
        let filePath = path.join(path.resolve('.'), '/src/cert/private.key');
        try{
            privateKey = fs.readFileSync(filePath).toString();
        }
        catch(err)
        {
            console.log(err);
        }
        

        let payload = {
            "name":user.Name,
            "email":user.email,
            "userId":user._id
        };

        const secret = "mysecretkey";

        let option : jwt.SignOptions = {
            algorithm:"RS512",
            expiresIn:"4h"
        }

        let token = await jwt.sign(payload,privateKey, option);

        return ResponseService.getValidResponse({'message': "login success", 'token': token});
    }

     public static async getAllUsers(){
        try {
            let users =  await userModel.find().exec();
            return users;
        } catch(err) {
            return err;
        }
    }

    public static async getUserById(req:any){
        try {
            let user = await userModel.findById(req.params.userId).exec();
            return user;
        } catch(err) {
            return err;
        }
    }

    public static async updateUser(req:any){
        try {
            let user : any = await userModel.findById(req.params.userId);
            user.name = req.body.name;
            user.save();            
            return user;
        } catch(err) {
            return err;
        }
    }

    public static async deleteUser(req:any){
        try {
            await userModel.findByIdAndRemove(req.params.userId).exec();
            return { message: 'Successfully deleted user!'};
        } catch(err) {
            return err;
        }
    }
}

