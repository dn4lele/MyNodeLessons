import  Sequelize  from "sequelize";
import database from '../database.js';


const Products = database.define('Products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false 
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false 
    },
    image:Sequelize.STRING,
    publisherId: Sequelize.INTEGER
    
    
});



export default Products;