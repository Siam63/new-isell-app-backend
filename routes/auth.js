const router = require("express").Router();
const User = require("../models/User");

router.get("/register", async (req, res) => {
    const user = await new User({
        username: "siamr",
        email: "siamr@gmail.com",
        password: "thispassword"
    });

    await user.save();
    res.send("User Complete.");
});

module.exports = router;