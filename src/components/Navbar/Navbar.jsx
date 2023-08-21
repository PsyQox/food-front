import React from "react";  
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import style from './Navbar.module.css'

const Navbar = () =>{
    return(
        <div className={style.navbar}>
            <Link to="/home">
                <button className={style.button}>Home</button>
            </Link>  
            <Link to="/form" >
                    <button className={style.button}>New recipe</button>
            </Link>
            <SearchBar />
        </div>
    )
}

export default Navbar