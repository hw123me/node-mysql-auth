const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  img:{
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Category;