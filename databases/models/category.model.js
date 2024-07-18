import mongoose,{ Types } from "mongoose";

const categorySchema = ({
    categoryName: {
        type: String,
        required: true
    },

    ownedBy: {
        type: Types.ObjectId,
        ref: "User"
    },


},{ timestamps: true }

)

export const Category = mongoose.model("Category", categorySchema)