import  Sequelize  from "sequelize";
import database from '../database.js';

const account = database.define('account',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false 
    },
    pass:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    avatar:Sequelize.STRING,
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    isApprove:Sequelize.BOOLEAN,
    code:Sequelize.INTEGER,
    
});



export default account;