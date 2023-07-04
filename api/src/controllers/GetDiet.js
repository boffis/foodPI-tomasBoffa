const { Diet } = require (`../db`)

 getDiet = async () => {
    try {

        const diets = await Diet.findAll()
        return diets

    } catch (error){

        throw new Error (`error getting diets: ${error}`)
        
    }
}

module.exports = getDiet