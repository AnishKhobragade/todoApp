import { Request, Response } from 'express'
import { inventoryModel } from '../dbModels/inventoryModel'
import { MongoErrorHandler } from '../helpers/mongoErrorHander';

//https://docs.mongodb.com/manual/tutorial/remove-documents/
//Delete documents in inventory collection
export class DeleteService {

    public static async Delete(req: Request, res: Response){
        let item = await inventoryModel.deleteOne({ name: "canvas" });
        res.json(item)
    }

    public static async DeleteMany(req: Request, res: Response){
        let item = await inventoryModel.deleteMany({ status: "A" });
        res.json(item)
    }

    public static async FindByIdAndDelete(req: Request, res: Response){
        let item = await inventoryModel.findByIdAndDelete(req.params.itemId);
        res.json(item)
    }

    public static async FindOneAndDeelete(req: Request, res: Response){
        let item = await inventoryModel.findOneAndDelete({ name: "canvas" });
        res.json(item)
    }
}
