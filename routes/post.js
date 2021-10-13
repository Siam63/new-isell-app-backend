const router = require("express").Router();
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Create post
router.post("/", async (req, res) => {
    const newPost = await new Post({
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        price: req.body.price
    });

    try{
        const post = await newPost.save();
        res.status(200).json(post);
    }catch(err){
        console.log(err);
    }
});

// Edit Post
router.put("/:id", async (req, res) => {
    if(req.body.postId === req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const post = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Post has been updated.");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only edit your posts!");
    }
});

// Delete Post
router.delete("/:id", async (req, res) => {
    if(req.body.postId === req.params.id){
        try{
            const post = await Post.deleteOne(req.params.id);
            res.status(200).json("Post has been deleted.");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your posts!");
    }
});

module.exports = router;