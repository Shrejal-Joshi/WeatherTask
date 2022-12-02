const express = require("express");
const app = express();
const userRouter = require("./routes/users");

const mongoose = require("mongoose");

app.use("/users", userRouter);

app.get("/", (req,res) =>{
    res.send("Assignment API");
});

///mXKNMhdfmSqyri3x
mongoose.connect("mongodb+srv://useradmin:mXKNMhdfmSqyri3x@cluster0.ri5kic0.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    app.listen(5000, () =>{
        console.log("Server started on the port : 5000");
    })
})
.catch((error)=>{
   console.log(error);
})

