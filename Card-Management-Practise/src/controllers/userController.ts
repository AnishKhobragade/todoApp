import { Request, Response } from 'express';
import { UserService } from './../services/userService'


export class UserController {

    public async register(req: Request, res: Response) {
        let response = await UserService.register(req);
        return res.send(response);
    }

    public async login(req: Request, res: Response) {
        let response = await UserService.login(req);
        return res.send(response);
    }

    public  async getAllUsers(req: Request, res: Response) {
        let data =   await UserService.getAllUsers();
        return res.json(data);
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

