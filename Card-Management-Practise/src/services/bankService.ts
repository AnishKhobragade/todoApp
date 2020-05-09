import { bankModel } from "./../models/bankModel"

export class BankService{

    public static async AddBank(req:any) {
        try {
            let newBank = new bankModel(req.body);
            await newBank.save();
            return newBank;
        } catch(err) {
            return err;
        }
    }

     public static async getAllBanks(req:any){
        try {
            let banks =  await bankModel.find().exec();
            return banks;
        } catch(err) {
            return err;
        }
    }

    public static async getBankById(req:any){
        try {
            let bank = await bankModel.findById(req.params.bankId).exec();
            return bank;
        } catch(err) {
            return err;
        }
    }

    public static async updateBank(req:any){
        try {
            let bank : any = await bankModel.findById(req.params.bankId);
            bank.name = req.body.name;
            bank.save();            
            return bank;
        } catch(err) {
            return err;
        }
    }

    public static async deleteBank(req:any){
        try {
            await bankModel.findByIdAndRemove(req.params.bankId).exec();
            return { message: 'Successfully deleted bank!'};
        } catch(err) {
            return err;
        }
    }
}

