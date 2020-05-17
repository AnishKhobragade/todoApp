import { Request, Response } from 'express'
import { inventoryModel } from '../dbModels/inventoryModel'
import { MongoErrorHandler } from '../helpers/mongoErrorHander';

//https://docs.mongodb.com/manual/tutorial/query-documents/
//query documents from inventory collection
export class QueryService {

    public static async FindOne(req: Request, res: Response)
    {
        let item = await inventoryModel.findOne();
        return res.json(item);
    }

    public static async FindAllItem(req: Request, res: Response)
    {
        let allItems = await inventoryModel.find();
        return res.json(allItems);
    }

    public static async findById(req: Request, res: Response)
    {
        let item = await inventoryModel.findById(req.params.itemId);
        res.json(item);
    }

    public static async FindQuery(req: Request, res: Response)
    {
        let allItems = await inventoryModel.find({item : 'canvas'});
        return res.json(allItems);
    }

    public static async QueryOnNestedDocument(req: Request, res: Response)
    {
        //Exact values should match for all fields - its AND query
        let items = await inventoryModel.find( { size: { h: 14, w: 21, uom: "cm" } } );
        console.log(items);

        //Query on nested field using dot operations
        //find all documents where UOM is cm        
        items = await inventoryModel.find( { "size.uom": "in" } );
        console.log(items);

        //Query selects all documents where the nested field h is less than 15,
        // the nested field uom equals "in", and the status field equals "D":
        items = await inventoryModel.find( { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } );
        console.log(items);

        res.json("OK");
        
    }

    //mongodb operators - https://docs.mongodb.com/manual/reference/operator/query/
    public static async QueryOperator(req: Request, res: Response)
    {
        //Syntax below
        //{ <field1>: { <operator1>: <value1> }, <field2>: { <operator2>: <value2> }, and more like this }

        //use of Operatior $lt (less then)
        let data = await inventoryModel.find( { "size.h": { $lt: 15 } } );
        console.log(data);

        //AND Condition
        data = await inventoryModel.find(  { $and:[{ "size.h": { $lt: 15 }, "size.uom": "in", status: "D" }]} );
        console.log(data);

        //OR Condition
        data = await inventoryModel.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } );
        console.log(data);

        //BOTH AND & OR Operators
        //query document selects all documents in the collection where the status equals "A" and 
        //either qty is less than ($lt) 30 or item starts with the character p:
        data = await inventoryModel.find( {
            status: "A",
            $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
       } );

       console.log(data);

        
        //in query Operator on Array
        data = await inventoryModel.find({status: { $in: ['A', 'D'] }});
        console.log(data);
                
        res.json("OK");
    }

    public static async QueryOnArray(req: Request, res: Response)
    {
        //first remove all documents
        await inventoryModel.deleteMany({});

        //insert documents
        await inventoryModel.insertMany([
            { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
            { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
            { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
            { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
            { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
         ]);

         //EXACT Match with ORDER
         //The following example queries for all documents where the field tags value is an array with exactly two elements, "red" and "blank", 
         //in the specified order:
        let items = await inventoryModel.find( { tags: ["red", "blank"] } );
        console.log(items);

        //Contains Elements along with other elements without Order
        //without regard to order or other elements in the array, use the $all operator:
        items = await inventoryModel.find( { tags: { $all: ["red", "blank"] } } );
        console.log(items);

        //For Single Item find in Array
        //all documents where tags is an array that contains the string "red" as one of its elements:
         items = await inventoryModel.find( { tags: "red" } );
         console.log(items);

         //queries for all documents where the array dim_cm contains at least one element whose value is greater than 25
         items = await inventoryModel.find( { dim_cm: { $gt: 25 } } );
         console.log(items);

         //one element can satisfy the greater than 15 condition and 
         //another element can satisfy the less than 20 condition, or a single element can satisfy both:
         items = await inventoryModel.find( { dim_cm: { $gt: 15, $lt: 20 } } );
         console.log(items);

         //Use $elemMatch operator to specify multiple criteria on the elements of an 
         //array such that at least one array element satisfies all the specified criteria.

         /* queries for documents where the dim_cm array contains at least one element that is both greater than ($gt) 22 and less than ($lt) 30:*/

         items = await inventoryModel.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } );
         console.log(items);

         //Query by Array Size
         items = await inventoryModel.find( { "tags": { $size: 3 } } );
         console.log(items);
         res.json("OK")

    }

    //Query on array of nested documents
    public static async NestedArray(req: Request, res: Response)
    {
        //Delete all documents
        await inventoryModel.deleteMany({});
        await inventoryModel.insertMany( [
            { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
            { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
            { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
            { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
            { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
         ]);

        //selects all documents where an element in the instock array matches the specified document:
        //Equality matches on the whole embedded/nested document require an exact match of the specified document, including the field order
         let items = await inventoryModel.find( { "instock": { warehouse: "A", qty: 5 } } );
         console.log(items);

        //field order is important in above query
         items = await inventoryModel.find( { "instock": { qty: 5, warehouse: "A" } } );
         console.log(items);

        //selects all documents where the instock array has at least one embedded document that contains the field qty whose value is less than or equal to 20:
         items = await inventoryModel.find( { 'instock.qty': { $lte: 20 } } );
         console.log(items);

        // query matches documents where any document nested in the instock array has 
        //the qty field greater than 10 and any document (but not necessarily the same 
        //embedded document) in the array has the qty field less than or equal to 20:
        items = await inventoryModel.find( { "instock.qty": { $gt: 10,  $lte: 20 } } );
        console.log(items);

        //single document in array must match both condition
        items = await inventoryModel.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } );
        console.log(items);

        res.json("OK")

    }

    //Projections of specific fields from collection
    public static async SelectFields(req: Request, res: Response)
    {
        await inventoryModel.deleteMany({});
        await inventoryModel.insertMany( [
            { item: "journal", status: "A", size: { h: 14, w: 21, uom: "cm" }, instock: [ { warehouse: "A", qty: 5 } ] },
            { item: "notebook", status: "A",  size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "C", qty: 5 } ] },
            { item: "paper", status: "D", size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "A", qty: 60 } ] },
            { item: "planner", status: "D", size: { h: 22.85, w: 30, uom: "cm" }, instock: [ { warehouse: "A", qty: 40 } ] },
            { item: "postcard", status: "A", size: { h: 10, w: 15.25, uom: "cm" }, instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
          ]);

        //Return all fields in documents
        let items = await inventoryModel.find( { status: "A" } );
        console.log(items);

        //Return sepecific fields and _id field only
        items = await inventoryModel.find( { status: "A" }, { item: 1, status: 1 } )
        console.log(items);

        //OR another way 
        items = await inventoryModel.find( { status: "A" }).select("item status");
        console.log(items);

        //Exclude some field and return all fields
        items = await inventoryModel.find( { status: "A" }, { item: 0, status: 0 } )
        console.log(items);

        //OR another way
        items = await inventoryModel.find( { status: "A" }).select("-item -status");
        console.log(items)

        res.json("OK");
    }


    public static async QueryNullMissingField(req: Request, res: Response)
    {
        await inventoryModel.deleteMany({});
        await inventoryModel.insertMany([
            { _id: 1, item: null },
            { _id: 2 }
         ]);

        //query matches documents that either contain the item field whose value is null or that do not contain the item field.
        let items = await inventoryModel.find( { item: undefined } );
        console.log(items);
        
        res.json("OK")

    }
    
}