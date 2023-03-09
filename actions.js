import  express  from "express";
const router=express.Router();



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
    workingHours=parseInt(workingHours);
    payPerHour=parseInt(payPerHour);
    payPerExtraHour=parseInt(payPerExtraHour);
    tax=parseInt(tax);

    


    return res.status(200).json({
        message:`hello ${workingHours} ${payPerHour} ${payPerExtraHour} ${tax}  \n 180 must and more is extra`
        
    })

})


export default router;