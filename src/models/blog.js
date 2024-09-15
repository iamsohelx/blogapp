import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:String,
    description: String
});


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;