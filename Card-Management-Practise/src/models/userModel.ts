import * as mongoose from 'mongoose';
import {Role} from './../dataTransferModel/permission'

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
    isActive: { type: Boolean, default: false },
    role: {type:String,enum:[Role.admin, Role.customer], default:Role.customer}

});

export const userModel = mongoose.model("user", UserSchema);