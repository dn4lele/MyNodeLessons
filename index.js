import express from "express";
import dotenv from 'dotenv';
import actions from './actions.js';
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port=process.env.PORT;

//ROUTES
app.use('/api',actions);




app.listen(port,()=>{console.log(`the server is running via port ${port}`)});





