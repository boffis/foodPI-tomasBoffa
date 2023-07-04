const { Sequelize } = require("sequelize");
const { Recipe } = require(`../db`)

const postRecipe = async (recipe) => {
   try {
      
      await Recipe.create(recipe);
      return recipe;

   } catch (error) {
      throw Error (`error posting recipe in DB: ${error}`)
   }
}

module.exports = postRecipe