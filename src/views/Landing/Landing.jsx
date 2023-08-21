import React from "react";
import { Link } from "react-router-dom";        
import style from './Landing.module.css'

const Landing = () =>{
    return (
        <div className={style.containerLanding}>
            <div className={style.container}>
                <h1 className={style.title}>¡Welcome!</h1> 
                <Link to="/home">
                    <button className={style.button}>Get into</button>
                </Link>    
            </div>       
        </div>
    )
}

export default Landing