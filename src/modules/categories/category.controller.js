import { Category } from "../../../databases/models/category.model.js"
import { User } from "../../../databases/models/user.model.js"
import { catchAsyncErr } from "../../utilies/catchError.js"





//1- create category
const createCategory = catchAsyncErr(async (req, res) => {
    const { categoryName } = req.body
    const ownedBy = req.user.user._id
    const category = await Category.insertMany({ categoryName, ownedBy })
    res.status(200).json({ message: "Category added successfully", category })

})


//2- update category
const updateCategory = catchAsyncErr(async (req, res) => {
    const { categoryID } = req.query;
    const { categoryName } = req.body

    const updatedCategory = await Category.findByIdAndUpdate(categoryID, { categoryName }, { new: true })



    if (!updatedCategory) {
        res.status(404).json({ message: "Category is not found..." })
    }
    res.status(200).json({ message: "Category updated successfully", updatedCategory })

})



//3-delete category 
const deleteCategory = catchAsyncErr(async (req, res) => {
    const { categoryID } = req.query
    const category = await Category.findByIdAndDelete({ categoryID }, { new: true })

    if (!category) {
        return res.status(404).json({ message: "Category is not found..." })
    }
    res.status(200).json({ message: "Category deleted", category })

})



//4-get all categories with their owner's information
const getAllCategories = catchAsyncErr(async (req, res) => {
    const ownedBy = req.user.user._id
    const categories = res.paginatedResults.results.filter(category => category.ownedBy.equals(ownedBy));
    if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "Categories are not found" })
    }


    res.status(200).json({
        message: "success",
        categories,
        pagination: res.paginatedResults.pagination
    })
})




//5-get category by id 
const getCategory = catchAsyncErr(async (req, res) => {
    const { categoryID } = req.query

    const category = await Category.findById(categoryID)
    if (!category) {
        res.status(404).json({ message: "Category is not found or inncorrect id" })
    }
    res.status(200).json({ message: "success", post })

})




export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
}