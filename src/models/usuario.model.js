import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Usuario extends Model{};

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true  
        },
        username: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        senha_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    { 
        sequelize: sequelize, 
        timestamps: false 
    }
);

export default Usuario;