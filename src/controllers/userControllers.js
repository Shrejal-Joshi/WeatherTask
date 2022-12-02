const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "USER_API"

const singup = async ( (req, res) =>{
    const {username, email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email : email});
        if(existingUser)
        {
            return res.status(400).json({message : "user already exists"});

        }
        const hashedPassword = await bcrypt.has(password, 10); 
        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username:username
        });
        const token = jwt.sign({email : result.email, id:result._id}, SECRET_KEY );
        res.status(200).json({user:result, token:token});
    }
    catch(err){
        console.log(err);
        res.status(200).json({message: "Something went wrong !!"});

    }
})


const singin = async((req, res) =>{
    
})

module.exports = {singin,singup};