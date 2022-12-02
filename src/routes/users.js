const express = require("express");
const { singup, singin } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/singup", singup
);

userRouter.post("/singin", singin);

module.exports = userRouter;