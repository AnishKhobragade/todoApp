import { Request, Response } from 'express'
import { inventoryModel } from '../dbModels/inventoryModel'
import { MongoErrorHandler } from '../helpers/mongoErrorHander';

//https://docs.mongodb.com/manual/tutorial/insert-documents/
//insert documents in inventory collection
export class InsertService {
    //insert single document in collection
    public static async InsertOne(req: Request, res: Response) {
        let data = {
            //item: "A",
            qty: 5,
            tags: ["cotton"],
            size: { h: 28, w: 35.5, uom: "cm" }
        };
        try {
            let item = new inventoryModel(data);
            await item.save();
            res.json(item);
        }
        catch (err) {
            res.json(MongoErrorHandler.handleError(err));
        }
    }

    //insert multiple document in collection
    public static async InsertMany(req: Request, res: Response) {
        let data = [
            { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
            { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
            { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
            { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
            { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
        ];

        try {
            let result = await inventoryModel.insertMany(data);
            return res.json(result);
        } catch (err) {
            res.json(err);
        }
    }

    public static async InsertWithSave(req: Request, res: Response){
        let data = {
            item: "sampleItem",
            qty: 15,
            tags: ["cotton"],
            size: { h: 9, w: 3, uom: "cm" }
        };
        
        let item = new inventoryModel(data);
        await item.save();

        res.json(item);
    }

    //Overload function to insert custom data
    public static async InsertData(data:any)
    {
        await inventoryModel.insertMany(data);
        return
    }
}