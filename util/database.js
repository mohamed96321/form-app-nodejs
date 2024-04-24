const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('citizens', 'postgres', 'your-password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
