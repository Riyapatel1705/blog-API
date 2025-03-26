'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   const User=sequelize.define("User",{
    name: DataTypes.STRING,
    last_name:DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate=(models)=>{
    User.hasMany(models.Post,{foreginKey:"userId",as:'posts'});
  };

  return User;
};
  
