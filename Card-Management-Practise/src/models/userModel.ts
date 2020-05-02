import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    Name: String,
    password: {
        type: String,
        required: true
    },
    mobile:
    {
        type: String,
        required: true,
        unique: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    isActive: { type: Boolean, default: false }
});

export const userModel = mongoose.model("user", UserSchema);