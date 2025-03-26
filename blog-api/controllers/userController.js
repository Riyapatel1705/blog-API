const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {User} = require("../models");
const {validateUsername,validateEmail,validatePassword}=require('../utils/validation');

exports.register=async(req,res)=>{
    try{
        const{name,last_name,email,password}=req.body;
        if(!validateUsername(name,last_name)){
            res.status(401).json({message:"invalid username format"});
        }
        if(!validatePassword(password)){
            res.staattus(401).json({message:"password must contain at least 6 characters and one special character "});
        }
        if(!validateEmail(email)){
            res.status(401).json({message:"email is invalid in format"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= await User.create({name,last_name,email,password:hashedPassword});
        res.status(201).json({message:"User created",user:newUser});

    }catch(error){
        const errorMessage = `Error: ${error.message} | Stack: ${error.stack}\n`;
    fs.appendFileSync("error.log", errorMessage);  // Writes error to error.log
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
    }
};

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({where:{email}});

        if(!user||!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error:'Invalid credentials'});
        }

        const token=jwt.sign({userId:user.id},"secret",{expiresIn:'1h'});
        res.json({message:"Login successfull",token});
    }catch(err){
        res.status(500).json({error:"Error logging in"});
    }
};