import  Jwt from "jsonwebtoken";
import asynchandler from 'express-async-handler';

const protect =asynchandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token= req.headers.authorization.split(' ')[1];
            const decoded= await Jwt.verify(token,process.env.JWT_KEY);
            //database next lesson

            req.newdata='hello i an new data'
            next();

        } catch (error) {
            return res.status(401).json({message:'Error:'+error});
        }

    }
    else{
        return res.status(401).json({message:'Token not exist'});
    }


}) 


export default protect