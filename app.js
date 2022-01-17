const express= require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/demo1").then(() =>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})
const app= express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

const productSchema= new mongoose.Schema({
    name:String,
    decription:String,
    price:Number
})

const Product = new mongoose.model("Product",productSchema)

app.post("/api/v1/product/new",async(req,res) =>{
    const product = await Product.create(req.body) ;
    res.status(201).json({
        success:true,
        product
    })
})
app.get("/api/v1/products",async(req,res)=>{
    const products =await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

app.put("/api/v1/product/:id",async(req,res)=>{
    let product= await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"produce not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    useFindAndModify:false,
    runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })

} )

app.delete("/api/v1/product/:id",async(req,res)=>{
  const product= await Product.findById(req.params.id)
    if(!product){
       return res.status(500).json({
           success:false,
           message:"produce not found"
       })
   }
    await product.remove();
    res.status(200).json({
        success:true,
        massage:"delete scuccesfully"
    })
})
app.listen(4500,()=>{
    console.log("web http://localhost:4500")
})

