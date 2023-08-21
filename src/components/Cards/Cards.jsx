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

