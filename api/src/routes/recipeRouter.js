const { Router } = require('express');
const getRecipeById = require(`../controllers/GetRecipeById.js`);
const getRecipeByName = require('../controllers/GetRecipeByName.js');
const postRecipe = require('../controllers/PostRecipe.js');
const { json } = require('body-parser');

const RecipeRouter = Router();



RecipeRouter.get(`/name`,async (req, res)=>{
    let recipe ={}
    try{
        const {name} = req.query

        recipe = await getRecipeByName(name)
            console.log(recipe)
        
            res.status(200).send(recipe)
            console.log(`Recipe sent successfully`)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

RecipeRouter.get(`/:id`,async (req, res)=>{
    
    let recipe = {}
    try{
        const {id} = req.params;
        console.log (id);
        recipe = await getRecipeById(id);         
        //! console.log('we out');
        //! console.log(recipe);
        res.status(200).send(recipe)
         console.log(`Recipe sent successfully`)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

RecipeRouter.post(`/`, async (req,res)=>{
    console.log('enter')
    try {
        const data = req.body
        console.log(data)
        // const recipe = JSON.parse(data)
        // console.log(recipe)
        await postRecipe(data)
        res.status(200).send(`Recipe posted successfully`)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = RecipeRouter;