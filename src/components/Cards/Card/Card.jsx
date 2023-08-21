import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css'

const Card =(props)=>{
    const regexUUID = RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
    return (
        <div className={style.containerCard}>
            <img src={props.image} alt="" width="380px" height="231"/>
            <h2 className={style.title}>{props.title}</h2>
            <h2 className={style.subtitle}>Health Score: {props.healthScore}</h2>
            <h2 className={style.subtitle}>Types of diet:</h2>
            <div className={style.containerDiets}>
                {props.diets.map((diet)=>{
                    if (!regexUUID.test(props.id)) {
                        return <button className={style.buttonTag} key={diet}> {diet}</button>   
                    }else{
                        return <button className={style.buttonTag} key={diet.name}>{diet.name}</button>
                    }
                })}
            </div>
            <Link to={`/detail/${props.id}`}>
                <button className={style.button} key='detalle'>Detail</button>
            </Link>
        </div>
    )
}
 
export default Card