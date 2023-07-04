const axios = require ('axios');
const { Recipe } = require (`../db.js`)
const {
  API_URL, API_KEY
} = process.env;

const getRecipeByName = async (name) => {
 
    let recipeArray = []
    
    try {
    const recipeDB = await Recipe.findAll({
        where:{title : name}
    });
    recipeDB.forEach(recipe=>{
        recipeArray.push(recipe)
    })
    console.log(recipeDB)
            let finalRecipe={}
            await axios.get (`${API_URL}/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${name}`)
            .then(response=>{
                response.data.results.forEach(recipe=>{

                    //!console.log(recipe)
                    
                    //! console.log (recipe);
                    //! console.log (id) ;
                    
                    let finalSteps = []
                    
                    recipe.analyzedInstructions[0].steps.forEach(stepInfo => {
                        //! console.log(stepInfo.step);
                        finalSteps.push(stepInfo.step)
                    });
                    
                    //! console.log(finalSteps);
                    finalRecipe = {
                        id : recipe.id,
                        title : recipe.title,
                        image : recipe.image,
                        summary : recipe.summary, 
                        healthScore : recipe.healthScore,
                        steps : finalSteps,
                        diets : recipe.diets
                    }

                    console.log(finalRecipe);
                    
                    recipeArray.push(finalRecipe)
                })
            })

            return (recipeArray)
    }
        catch(error) {
            throw Error (`error Getting Recipe in API: ${error}`)
        }
}

module.exports = getRecipeByName