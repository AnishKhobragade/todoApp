import { Request, Response } from 'express';
import { UserService } from './../services/userService'
import {AuthorizationService} from './../middleware/authorizationService'
import { Permission } from './../dataTransferModel/permission';


export class UserController {

    public async register(req: Request, res: Response) {
        let response = await UserService.register(req);
        return res.send(response);
    }

    public async login(req: Request, res: Response) {
        let response = await UserService.login(req);
        return res.send(response);
    }

    public  async getAllUsers(req: any, res: Response) {

        let isPermission = AuthorizationService.hasPermission(req.user.role, Permission.GetAllUser);
        if(isPermission)
        {
            let data =   await UserService.getAllUsers();
            return res.json(data);
        }
        return res.status(401).json("Access denied, You dont have permission")
       
    }

    public async getUserWithID(req: Request, res: Response) {
        let response = await UserService.getUserById(req);
        return res.json(response);
    }

    public async updateUser(req: Request, res: Response) {
        let response = await UserService.updateUser(req);
        return res.json(response);
    }

    public async deleteUser(req: Request, res: Response) {
        let response = await UserService.deleteUser(req);
        return res.json(response);
    }
}

