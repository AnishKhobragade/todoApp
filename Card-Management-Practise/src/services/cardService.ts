import { cardModel } from "./../models/cardModel"

export class CardService {

    public static async AddCard(req: any) {
        try {
            let newCard = new cardModel(req.body);
            await newCard.save();
            return newCard;
        } catch (err) {
            return err;
        }
    }

    public static async getAllCards() {
        try {
            //mention fields name to be populated instead of table names
            // let cards =  await cardModel.find()
            // .populate({path:"Cardbank",select:"name Active -_id"})
            // .populate({path:"Carduser",select:"Name email -_id"})
            // .select("-_id -__v");


            //deep population of fields
            let cards = await cardModel.find()
                .populate([
                    {
                        path: "Cardbank",
                        select: "name Active bankManager -_id",
                        populate: [
                            {
                                path: "bankManager",
                                select: "Name -_id"
                            }]
                    },
                    {
                        path: "Carduser",
                        select: "Name email -_id"
                    }])
                .select("-_id -__v");

            return cards;
        } catch (err) {
            return err;
        }
    }

    public static async getCardById(req: any) {
        try {
            let card = await cardModel.findById(req.params.cardId).exec();
            return card;
        } catch (err) {
            return err;
        }
    }

    public static async updateCard(req: any) {
        try {
            let card: any = await cardModel.findById(req.params.cardId);
            card.name = req.body.name;
            card.save();
            return card;
        } catch (err) {
            return err;
        }
    }

    public static async deleteCard(req: any) {
        try {
            await cardModel.findByIdAndRemove(req.params.cardId).exec();
            return { message: 'Successfully deleted card!' };
        } catch (err) {
            return err;
        }
    }
}

