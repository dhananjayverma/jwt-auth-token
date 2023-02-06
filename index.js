const express=require("express");
const jwt=require("jsonwebtoken");

const app=express();
const secret_key="djananjay1234"

app.get("/",(req,res)=>{
    res.json({
        message:"a simple api"
    })
})
app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"dhananjay",
        email:"dj@gmail.com"
    }
    jwt.sign({user},secret_key,{expiresIn:"300s"},(err,token)=>{
        res.json({
            token
        })
    })

})

app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secret_key,(err,autData)=>{
        if(err){
            res.send({
                res:"invalid token"})
            }else{
                res.json({
                    message:"profile accessed",
                    autData
                })
            }
        })
    })

function verifyToken(req,res,next){
    const breaerHeader=req.headers['authorization'];
    if(typeof breaerHeader!=="undefined"){
        const bearer=breaerHeader.split(" ");
        const token=bearer[1];
        req.token=token;
        next();
}else{
        res.send({
            res:"token is not valid"
        })
    }
}
app.listen(5000,()=>{
    console.log(" app is running on http://localhost:5000")
})
