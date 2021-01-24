const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Owner extends Model {}

Owner.init(
  {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    LicenseType: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  },
  {
    sequelize: db,
    modelName: "owner",
  }
);

module.exports = Owner;