import { Router } from "express";
import { UserController} from './../controllers/userController'

const userController: UserController = new UserController();

export const userRoutes: Router = Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:userId',userController.getAllUsers);
userRoutes.put('/:userId',userController.updateUser);
userRoutes.delete('/:userId',userController.deleteUser);