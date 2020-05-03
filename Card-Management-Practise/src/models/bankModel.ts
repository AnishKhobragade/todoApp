import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    Active: { type: Boolean, default: false },
    bankManager: { type: Schema.Types.ObjectId, required: true, ref: 'user' },

});

export const bankModel = mongoose.model("bank", BankSchema);