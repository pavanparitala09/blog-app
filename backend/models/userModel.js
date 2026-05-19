import { Schema,model } from "mongoose";

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, "Password must be at least 6 characters, including a capital letter, a small letter, and a number"]
    },
    profileImageUrl:{
        type:String
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true," {Value} is an Invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    strict:"throw",
    timestamps:true,
    versionKey:false
});

export const UserTypeModel=model('User',userSchema);

