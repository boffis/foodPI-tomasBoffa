const { Router } = require('express');
const RecipeRouter = require('./recipeRouter');
const getDiet = require (`../controllers/GetDiet.js`)
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const MainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

MainRouter.use (`/recipe`, RecipeRouter)

MainRouter.get (`/diets`, async (req, res)=>{
    try{
        let dietNames = []
        let diets = await getDiet()
        console.log (diets)
        
        diets.forEach(diet => {
            dietNames.push(diet.name)
        });

        res.status(200).send(dietNames)

    } catch (error) {
        console.log (error)
        res.status(409).send({error})
    }
})


module.exports = MainRouter;
