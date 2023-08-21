import React from "react";
import style from './Footer.module.css'
import {Link} from 'react-router-dom'

const Footer = () => {
    return(<footer className={style.footer}>
        <div className={style.group}>
            <div className={style.box}>
                <Link to="/home" className={style.link}>
                    <p className={style.p}>Home</p>
                </Link>
                <Link to="/form"  className={style.link}>
                    <p className={style.p}>New recipe</p>
                </Link>
            </div>
            <hr className={style.hr}/>
            <div className={style.box}>
                <h1>Created by Luis</h1>
            </div>
        </div>
    </footer>)
}

export default Footer