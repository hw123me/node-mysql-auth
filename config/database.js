const Sequelize = require('sequelize');
// const sequelize = new Sequelize('nodemysql', 'root', '1', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,
// });
const sequelize = new Sequelize('bwmpds7hqunzvd721fvj', 'u46k0ud69tz9xjuh', 'JxFj55gfw9CLmdinQYIf', {
  host: 'bwmpds7hqunzvd721fvj-mysql.services.clever-cloud.com',
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