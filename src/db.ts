import mongoose from "mongoose"


export class DB
{
    constructor(){}

    public static connectionString : string = "mongodb://localhost:27017/myDB"

    public static ConnectMongoDB()
    {
        mongoose.connect(this.connectionString, (err)=>{
            if(err)
            {
             console.log("DB connction failed")
            }else
            {
             console.log("DB Connected");
            }
         })
    }
}