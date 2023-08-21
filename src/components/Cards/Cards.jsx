import React from "react";
import Card from './Card/Card'
import style from './Cards.module.css'

const Cards = (props)=>{
    const regexUUID = RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
        return(
            <div className={style.containerCards}>
                {props.recipes?.map((recipe)=>{
                    if (!regexUUID.test(recipe.id)) {
                        return <Card 
                        key={recipe.id} 
                        id={recipe.id} 
                        title={recipe.title} 
                        image={recipe.image} 
                        diets={recipe.diets}
                        healthScore={recipe.healthScore}
                        />
                    }else{
                        return <Card 
                        key={recipe.id} 
                        id={recipe.id} 
                        title={recipe.title} 
                        image={recipe.image} 
                        diets={recipe.tbl_diets}
                        healthScore={recipe.healthScore}
                        />
                    }
                })}
            </div>
        )   
    
}

export default Cards

// const regexUUID = RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)

//     if (regexUUID.test(id)) {
//         const recipe = await Tbl_recipe.findOne({where:{id:id}})
//         return recipe
//     }else{
//         const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
//         return recipe.data  
//     }