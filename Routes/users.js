const express=require("express");
const {users} = require("../data/users.json");
const router=express.Router();
//will print all user
router.get("/",(req,res)=>{
    res.status(201).json({
        success: true,
        data: users,
})
})

//will print perticular user by id that is given
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);

    if(!user){
       return res.status(404).json({
            success: false,
            message:"id not found",
        });
    }
    
    return res.status(201).json({
        success: true,
        message:"id found",
        data: user,
    });
    
});

// adding element
router.post("/",(req,res)=>{
    const {id,FirstName,SecondName,DOB,email,subscription_type,subscription_date}=req.body;

    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:"False",
            message:"Id is already exist",
        });
    }
    users.push({
        id,
        FirstName,
        SecondName,
        DOB,
        email,
        subscription_type,
        subscription_date,
    });
    return res.status(201).json({
        success:"True",
        message:"User added successfully",
        data:users,
    });
});

//updating data of user
router.put("/:id",(req,res)=>{
const {id}=req.params;
const {data}=req.body;

const user=users.find((each)=>each.id===id);

if(!user){
   return res.status(404).json({
        success: false,
        message:"id not found",
    });
}
const updateuserdetails=users.map((each)=>{
    if(each.id===id){
        return{
            ...each,
            ...data
        };
    }
    return each;
});
return res.status(200).json({
    success:true,
    message:"id updated successful",
    data:updateuserdetails
});
});

//deleting data
router.delete("/:id",(req,res)=>{
const {id}=req.params;
const user=users.find((each)=>each.id===id);
if(!user){
    return res.status(404).json({
         success: false,
         message:"id not found",
     });
 }
 const index=users.indexOf(user);
 users.splice(index,1);
 return res.status(200).json({
    success:"true",
    message:"id deleted successfully",
    data:users
 });
});
module.exports=router;