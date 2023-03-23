import express from "express";
import dotenv from 'dotenv';
import actions from './actions.js';
dotenv.config();
import database from './database.js';

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port=process.env.PORT;

//ROUTES
app.use('/api',actions);

database
.sync()
.then(results => {
    console.log(results)
    app.listen(port,()=>{console.log(`the server is running via port ${port}`)});

})
.catch(error => console.log(error.message))







