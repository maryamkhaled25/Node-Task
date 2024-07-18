import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'name too short'],
        maxLength: [20, 'name too long'],
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        minLength: [3, 'password too short'],
        required: true
    },
    
    confirmedEmail:{
        type:Boolean,
        default:false    
    },
    
    code: {
        type: String,
        default: null
    },
      
}, { timestamps: true }

)

export const User = mongoose.model("User", userSchema)