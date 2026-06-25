import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class Pocao extends Model{};

Pocao.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true  
        },
        nome: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING, 
        },
        preco:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING
        }
    },
    { 
        sequelize: sequelize, 
        timestamps: false 
    }
);

export default Pocao;