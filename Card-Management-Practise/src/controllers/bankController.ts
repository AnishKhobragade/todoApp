import { Request, Response } from 'express';
import { BankService } from './../services/bankService'


export class BankController {

    public async addNewBank(req: Request, res: Response) {
        let response = await BankService.AddBank(req);
        return res.send(response);
    }

    public  async getAllBanks(req: Request, res: Response) {
        let data =   await BankService.getAllBanks();
        return res.json(data);
    }

    public async getBankWithID(req: Request, res: Response) {
        let response = await BankService.getBankById(req);
        return res.json(response);
    }

    public async updateBank(req: Request, res: Response) {
        let response = await BankService.updateBank(req);
        return res.json(response);
    }

    public async deleteBank(req: Request, res: Response) {
        let response = await BankService.deleteBank(req);
        return res.json(response);
    }
}

