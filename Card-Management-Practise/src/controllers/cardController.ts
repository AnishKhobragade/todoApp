import { Request, Response } from 'express';
import { CardService } from './../services/cardService'
import { AuthorizationService } from './../middleware/authorizationService'
import { Permission } from './../dataTransferModel/permission';

export class CardController {

    public async addNewCard(req: Request, res: Response) {
        let response = await CardService.AddCard(req);
        return res.send(response);
    }

    public async getAllCards(req: any, res: Response) {
        let isPermission = AuthorizationService.hasPermission(req.user.role, Permission.GetAllCard);
        if (isPermission) {
            let data = await CardService.getAllCards();
            return res.json(data);
        }
        return res.status(401).json("Access denied, You dont have permission")


    }

    public async getCardWithID(req: Request, res: Response) {
        let response = await CardService.getCardById(req);
        return res.json(response);
    }

    public async updateCard(req: Request, res: Response) {
        let response = await CardService.updateCard(req);
        return res.json(response);
    }

    public async deleteCard(req: Request, res: Response) {
        let response = await CardService.deleteCard(req);
        return res.json(response);
    }
}

