import { Router } from "express";
import { BankController} from './../controllers/bankController'

const bankController: BankController = new BankController();

export const bankRoutes: Router = Router();
bankRoutes.post('/create',bankController.addNewBank);
bankRoutes.get('/',bankController.getAllBanks);
bankRoutes.get('/:bankId',bankController.getBankWithID);
bankRoutes.put('/:bankId',bankController.updateBank);
bankRoutes.delete('/:bankId',bankController.deleteBank);