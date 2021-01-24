const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Concessionaire extends Model {}

Concessionaire.init(
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proprietaire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "concessionaire",
  }
);

module.exports = Concessionaire;