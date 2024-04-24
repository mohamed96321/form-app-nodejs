const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Person = sequelize.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nationalityId: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    unique: true
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

module.exports = Person;
