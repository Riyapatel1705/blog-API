const express=require('express');
const dotenv= require('dotenv');
const cors=require("cors");
const bodyParser=require("body-parser");
const db=require('./models');
const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRoutes");


const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users",userRoutes);
app.use("/posts",postRoutes);

const PORT=process.env.PORT||5000;

db.sequelize.sync().then(()=>{
    console.log("Database connected");
    app.listen(PORT,()=>{
        console.log("server is running on port 5000");
    });
});