const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Profile has been updated.");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only edit your posts!");
    }
});

module.exports = router;