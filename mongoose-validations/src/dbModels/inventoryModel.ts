import mongoose from "mongoose"

const Address = new mongoose.Schema({
    city:String,
    code : Number
})

const inventorySchema = new mongoose.Schema({
    item : {
        type:String,
    },
    qty: {
        type:Number,
        validate: {
            isAsync : true,
            validator: function(value:any) {
                //databse quer
                //3rd API call to perform validation
            },
            message: props => `qty should be greater then 10, current value ${props.value}`
          },
    },
    size : {
        h: Number,
        w : Number,
        uom: String
    },
    status: String

})

export const inventoryModel = mongoose.model("inventory", inventorySchema)