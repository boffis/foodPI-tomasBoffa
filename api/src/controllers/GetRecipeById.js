const axios = require ('axios');
const { Recipe } = require (`../db.js`);
const { Sequelize } = require('sequelize');
const {
  API_URL, API_KEY
} = process.env;

/*
+hola
!title=data.title
!image=data.image
!summary=data.summary
!healthScore =data.healthScore
!steps=data.analyzedInstructions[array.steps[array.step]]
*/

const getRecipeById = async (id)=> {
    //! console.log ("ENTERED")

    try {
        if(isNaN(id)){
            const recipeDB = await Recipe.findAll({
                where:{id:id}
            });
        } else{
            let finalRecipe = null
            await axios.get (`${API_URL}${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
            .then(response=>{
                let apiRecipe = response.data
                
                //! console.log (apiRecipe)
                //! console.log (id)

                let finalSteps = []
    
                apiRecipe.analyzedInstructions[0].steps.forEach(stepInfo => {
                    //! console.log(stepInfo.step)
                    finalSteps.push(stepInfo.step)
                }); 
                
                //! console.log(finalSteps)
                finalRecipe = {
                    id : id,
                    title : apiRecipe.title,
                    image : apiRecipe.image,
                    summary : apiRecipe.summary,
                    healthScore : apiRecipe.healthScore,
                    steps : finalSteps,
                    diets:apiRecipe.diets
                }

                //! console.log(finalRecipe) 
                
            })

            return (finalRecipe)

        }
    }
        catch (error){
            throw Error (`error Getting Recipe by ID: ${error}`)
        }
}

module.exports = getRecipeById