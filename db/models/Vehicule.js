const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Vehicule extends Model {}

Vehicule.init(
  {
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateFabrication: {
      type: DataTypes.DATE,
      allowNull:false,
      validate:{
        isAfter:"1850-01-01"
      }
    },
  },
  {
    sequelize: db,
    modelName: "vehicule",
  }
);

module.exports = Vehicule;