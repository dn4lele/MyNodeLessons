import  express  from "express";
const router=express.Router();
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from './auth.js';


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


//lesson 4
let user=[]

router.post('/register',async(req,res)=>{

    const{firstname,lastname,email,password}=req.body;

    const hash_pawwword=await bcryptjs.hash(password,10);

    const _user={
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hash_pawwword
    }
     
    user.push(_user);
    
    return res.status(200).json({
        message:user
        
    })

})


router.post('/login',async(req,res)=>{

    const{email,password}=req.body;
    try {
        const account=user.find(x=> x.email == email)
        if(account){
            const isMatch=await bcryptjs.compare(password,account.password);
            if(isMatch){

                const datatotoken={
                    email:account.email,
                    firstname:account.firstname,
                    lastname:account.lastname,
                }

                const token = await Jwt.sign(datatotoken,process.env.JWT_KEY ,{expiresIn:'30d'});



                return res.status(200).json({
                    message:"OK",
                    token:token,
                    
                })
            }
            else{
                return res.status(401).json({
                    message:"not the right password"
                    
                })
            }
        }
    
        else{
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
    return res.status(200).json({
        message:"OK "+req.newdata,
        
    })
})


export default router;