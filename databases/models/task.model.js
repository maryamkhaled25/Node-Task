import { text } from "express";
import mongoose,{ Types } from "mongoose";

const taskSchema = ({
    
    title: {
        type: String
    },

    taskType:{
        type:String,
        enum:['Text','List']
    },

    contentList:[{text:String,_id:false}],

    textBody:{
        type:String
    },

    CreatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },

    categoryID:{
        type: Types.ObjectId,
        ref: "Category"
    },
    isShared:{
        type:Boolean
    },



},{ timestamps: true }

)

export const Task = mongoose.model("Task", taskSchema)