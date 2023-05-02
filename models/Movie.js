const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const MoviesModel = sequelize.define('movies', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
},
  year: {
    type: DataTypes.INTEGER
  }
});

MoviesModel.sync();


module.exports = {
  list: async function () {
    const movies = await MoviesModel.findAll()
    return movies
  },
  insert: async function (name, year) {
    const movie = await MoviesModel.create({
      name: name,
      year: year
    })
    return movie
  },
  delete: async function (id) {
    const movie = await MoviesModel.findByPk(id);
    return movie.destroy()
  },
  update: async function(id, obj) {
        
    let movie = await MoviesModel.findByPk(id)
    if (!movie) {
        return false
    }
    
    Object.keys(obj).forEach(key => movie[key] = obj[key])
    await movie.insert()
    return movie
  },
  getById: async function(id) {
    return await MoviesModel.findByPk(id)
}
}