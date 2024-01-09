const express=require("express");
const user=require("./data/user.json");
const app=express();
const port=8081;
app.use(express.json());

app.get("/user",(req,res)=>{
    res.status(201).json({
        success: true,
        data: user,
})
})


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server is runing shivam",
})
})



app.get("*",(req,res)=>{
    res.status(401).json({
        message:"page not found",
})
})
app.listen(port,()=>{
console.log('server is runing '+port);
})
