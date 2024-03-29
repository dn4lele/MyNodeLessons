import  express  from "express";
const router=express.Router();
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from './auth.js';
import Account from "./models/account.js";
import Products from './models/Products.js';


//find all products of the user
router.get('/getallproducts',Auth,(req,res)=>{
    const user =req.user;

    Products.findAll({where:{publisherId:user.id}})
    .then(Products=>{
        return res.status(200).json({
            data:Products
        })

    }).catch(error=>{
        return res.status(200).json({
            message:error.message
        })

    })
})


//find by id
router.get('/findbyid/:pid',(req,res)=>{
    const productid=req.params.pid
    Products.findByPk(productid)
    .then(Products=>{
        return res.status(200).json({
            data:Products
        })

    }).catch(error=>{
        return res.status(200).json({
            message:error.message
        })

    })
})



router.post('/shop' , Auth  , async(req,res)=>{


    const{name,price,image}=req.body;
    
    Products.create({
        name:name,
        price:price,
        image:image,
        publisherId:req.user.id,
    })
    .then(account_created =>
        {
        return res.status(200).json({
        message:account_created
    })})
    .catch(error =>{
        return res.status(500).json({
            message:error.message
        })
    })


})







router.get('/sayhello',(req,res)=>{
    return res.status(200).json({
        message:'hello from my api'
    })

})

router.get('/getParam/:number/:tax',(req,res)=>{

    const cost=req.params.number;
    const taxes=req.params.tax;

    return res.status(200).json({
        message:cost*taxes
    })

})


router.post('/calcSal',(req,res)=>{

    //option 1
    /*
    const workingHours=req.body.workingHours;
    const payPerHour=req.body.payPerHour;
    const payPerExtraHour=req.body.payPerExtraHour;
    const tax=req.body.tax;
   */

    //option 2
    const{workingHours,payPerHour,payPerExtraHour,tax}=req.body;
    let pay=0;


    let normalhours=workingHours-180;
    pay=normalhours*payPerHour;
    let extrahour=workingHours-180;
    pay+=extrahour*payPerExtraHour;

    let presenttax=(100-tax)/100;
    pay=pay*presenttax;
     
    return res.status(200).json({
        message:`your payment is: ${pay}`
        
    })

})

//MVC modle view controller





//lesson 4
let user=[]

router.post('/register',async(req,res)=>{

    const{firstname,lastname,email,password,avatar}=req.body;

    const hash_pawwword=await bcryptjs.hash(password,10);

    //chack if there is one username
    const account=await Account.findAll({where:{email:email}});

    if(account.length == 1){
        return res.status(200).json({
            message:"Email already in use"
        })
    }
    else{
        Account.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            pass:hash_pawwword,
            avatar:avatar,
            isApprove:false,
            code:generateRandomIntegerInRange(1000,9999)
        })
        .then(accoun_created =>
            {
            return res.status(200).json({
            message:accoun_created
        })})
        .catch(error =>{
            return res.status(500).json({
                message:error.message
            })
        })
    }



})


router.post('/login',async(req,res)=>{

    const{email,password}=req.body;
    try {
        const account=await Account.findAll({where:{email:email}});
        if(account.length == 1){
            const acc=account[0];
            const isMatch=await bcryptjs.compare(password,acc.pass);
            if(isMatch){
                const datatotoken={
                    id:acc.id,
                    email:acc.email,
                    firstname:acc.firstname,
                    lastname:acc.lastname,
                }

                const token = await Jwt.sign(datatotoken,process.env.JWT_KEY ,{expiresIn:'30d'});



                return res.status(200).json({
                    message:"OK",
                    token:token,
                    
                })
            }else{
                return res.status(401).json({
                    message:"not the right password"
                    
                })
            }
        }else{
            return res.status(200).json({
                message:"user not found"
                
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"ERROR FROM SERVER:"+error
            
        })
    }
   
    

})



//lesson 5


router.get('/getData' , Auth  , async(req,res)=>{

    const user =req.user;
    return res.status(200).json({
        message:user,
        
    })
})


function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;