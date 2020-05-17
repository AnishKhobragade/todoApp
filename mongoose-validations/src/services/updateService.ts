import { Request, Response } from 'express'
import { inventoryModel } from '../dbModels/inventoryModel'
import { MongoErrorHandler } from '../helpers/mongoErrorHander';

//https://docs.mongodb.com/manual/tutorial/update-documents/
//Update documents in inventory collection
export class UpdateService {
    //update Document
    public static async Update(req: Request, res: Response) {
        try {

            //This option needs to provide to run validation against collection during update query
            //Updates documents in the database without returning them. 
            //All update values are cast to their appropriate SchemaTypes before being sent.
            let updateOptions = { runValidators: true }
            let result = await inventoryModel.update({ item: "mousepad" }, { qty: 5 }, updateOptions);
            console.log(result)
            res.json(result);
        }
        catch (err) {
            res.json(err);
        }
    }

    public static async UpdateMany(req: Request, res: Response) {
        try {
            //Multi option is to update multiple documents in case update query matches multiple documents
            let updateOptions = { runValidators: true };
            let result = await inventoryModel.updateMany({ qty: { $gte: 20 } }, { tags: ["item"] }, updateOptions);
            res.json(result);
        }
        catch (err) {
            res.json(err);
        }
    }

    public static async UpdateOptions(req: Request, res: Response) {
        let updateOptions = {
            runValidators: true, //to run validation during update query,
            multi: true, //to update multiple documents using Update method
            upsert: true, //to insert document in case no matching document found to update
            new: true //to return update document, by default return Old document
        }

        try {
            let result = await inventoryModel.update({ qty: { $gte: 20 } }, { tags: ["item"] },
                updateOptions);
            console.log(result)
            res.json(result);
        }
        catch (err) {
            res.json(err);
        }
    }

    public static async findOneAndUpdate(req: Request, res: Response) {
        
        let item = await inventoryModel.findOneAndUpdate({name:'canvas'},{qty:50},{new: true });
        res.json(item);
    }

    public static async findByIdAndUpdate(req: Request, res: Response) {
        let item = await inventoryModel.findByIdAndUpdate(req.params.itemId,{qty:50},{new: true });
        res.json(item);
    }

    public static async UpdateWithSave(req: Request, res: Response){
        let item : any = await inventoryModel.findOne({name:'canvas'});
        item.qty = 100;
        item.save();
    }

}