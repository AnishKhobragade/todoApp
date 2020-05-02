import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: { type: String, enum: ['credit', 'debit'] },
    Cardbank: { type: Schema.Types.ObjectId, required: true, ref: 'bank' },
    Carduser: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    created_date: {
        type: Date,
        default: Date.now
    },
    Active: { type: Boolean, default: true }
});

export const cardModel = mongoose.model("card", CardSchema);