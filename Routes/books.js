const express=require("express");

const {Books} = require("../data/books.json");
const {users} = require("../data/users.json");
const router=express.Router();
//will print all books
router.get("/",(req,res)=>{
       res.status("201").json({
        success:true,
        data: Books,
    })
});


//check book with issued

router.get("/issued",(req,res)=>{
    const userwithissuedbook=users.filter((each)=>{ 
    if(each.books_issued) return each;
});
console.log(userwithissuedbook)
const issuedbook=[];
userwithissuedbook.forEach((each)=>{
    const book=Books.find((Book)=> (Book.Book_no===each.books_issued));
    book.issuedby = each.FirstName;
    book.issueddate =each.issued_date;
    book.returndate =each.return_date;
    issuedbook.push(book);
})
if(issuedbook.length===0){
    return res.status(404).json({
        success:false,
        message:"No book has been issued",
    });
}
return res.status("201").json({
    success:true,
    message:"Book which are issued are",
    data:issuedbook,
});
})


//will print perticular book by bookno. that is given
router.get("/:Book_no",(req,res)=>{
    const {Book_no}=req.params;
    const book=Books.find((each)=>each.Book_no===Book_no);
    if(!book){
        return res.status(404).json({
            success: false,
            message:"book number not found",
        });
    }

    return res.status(201).json({
        success: true,
        message:"Book found",
        data: book,
    });
});











// // adding element
// router.post("/",(req,res)=>{
//     const {Book_no,Name,author,genre,price,publisher}=req.body;
//     const bookno=Books.find((each)=>each.Book_no===Book_no);
//     if(bookno){
//         return res.status(404).json({
//             success: false,
//             message:"book with this no is already exist",
//         });
//     }
//     Books.push({Book_no,
//         Name,
//         author,
//         genre,
//         price,
//         publisher});
//     return res.status(201).json({
//         success: true,
//         message:"Book added successfully",
//         data: Books,
//     });
// })




module.exports=router;