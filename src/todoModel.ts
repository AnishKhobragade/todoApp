import mongoose from "mongoose"


const todoSchema = new mongoose.Schema({

    name : { type:String, required:true, unique:true },
    description : String,
    isCompleted : { type:Boolean, default:false},
    createdDate : { type:Date, default:Date.now},
    assign : {type:String, required:true}
});


export const todoModel = mongoose.model("todo", todoSchema);
