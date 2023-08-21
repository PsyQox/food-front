import React,{useState} from "react";
import { connect } from "react-redux";
import { getRecipes } from "../../../redux/actions";
import {useNavigate} from 'react-router-dom' 
import style from './SearchBar.module.css'

const SearchBar = (props)=>{
    const[search, setSearch] = useState("")
    const navigation = useNavigate()

    const onhandleChange = (event)=>{
        setSearch(event.target.value) 
    }

    function onhandleClick(){
        try {
             navigation("/home/"+search)
            props.getRecipes(search)
            setSearch("")
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred in the request. Please try again.");
            }
        }
    }

    
    return (
        <div >
            <input className={style.searchbar} type="text" placeholder="Name..." id="" onChange={onhandleChange} value={search}/>
            <button className={style.button} onClick={onhandleClick}>Search</button>
            
        </div>  
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getRecipes: (search)=> {dispatch(getRecipes(search))}
    }
}

export default connect(null,mapDispatchToProps)(SearchBar);