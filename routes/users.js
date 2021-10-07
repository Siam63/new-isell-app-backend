const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("This is the user routes.");
});

module.exports = router;