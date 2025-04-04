const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodemysql', 'root', '1', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;