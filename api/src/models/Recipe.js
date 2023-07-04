const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue : DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.TEXT,
    },
    summary:{
      type:DataTypes.TEXT
    },
    healthScore:{
      type:DataTypes.INTEGER
    },
    steps:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    }
  });
};