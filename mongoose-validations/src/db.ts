import mongoose from "mongoose";

export class Db {
    private static mongoUrl: string = 'mongodb://localhost:27017/testDb';

    public  static mongoSetup(){
        mongoose.connect(this.mongoUrl)
        .then(() => {
            console.log("connection successful");
        })
        .catch(error => {
            console.log(error);
            console.log("connection failed");
        });
    }

}