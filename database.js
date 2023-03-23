import  Sequelize  from "sequelize";
import dotenv from 'dotenv';
dotenv.config();



const sequelize =new Sequelize(
    process.env.DB_NAME, //database name
    process.env.DB_USERNAME, // uesr
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
    }
)





export default sequelize;