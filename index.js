import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port=process.env.PORT;

app.listen(port,()=>{console.log(`the server is runing on port ${port}`)});








console.log("you ave nice")