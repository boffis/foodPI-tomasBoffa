const  axios  = require("axios");
const { Diet } = require (`../db`)
const {API_URL, API_KEY} = process.env;


//const HardCodedDiets = ["Gluten-Free", "Keto","Vegetarian","Lacto-Vegetarian","OVO-Vegetarian","vegan","pescetarian","paleo"]
//await Diet.bulkCreate(HardCodedDiets)

const downloadDiet = async () =>{
    try {

        let dietsArray=[]
        let dietsincluded=[]

        await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        .then(res=> {
            const recipes = res.data.results
            const len = recipes.length
            
            for (i=0;i<len;i++) {
                //! console.log (recipes[i].diets)
                
                recipes[i].diets.forEach(diet => {

                    if (dietsincluded.includes( diet )){
                    } else{
                        dietsincluded.push (diet)
                        dietsArray.push({name : diet});
                        //! console.log(`${diet} included`)
                    }
                
                });

            }
            //! console.log(dietsArray)

        })
        await Diet.bulkCreate( dietsArray )

        
    } catch (error){
        console.log (error)
    }

}  

module.exports = downloadDiet