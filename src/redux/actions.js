import { RECIPES_GET,ORDER_RECIPES,FILTER_RECIPES,DIETS_GET,FILTER_DB_API,GET_ALL_RECIPES} from "./actions_type";
import axios from "axios";

export const getRecipes = (name)=>{
    const endpoint = 'http://localhost:3001/recipes/'
    if (!name) {
        return async (dispatch)=>{
            const {data} = await axios.get(`${endpoint}`)
            return dispatch({
                type: RECIPES_GET,
                payload:data
            })    
        }     
    }else{
        return async (dispatch) => {
            const {data} = await axios.get(`${endpoint}?name=${name}`)
            return dispatch({
                type: RECIPES_GET,
                payload:data
            })    
        } 
    }
}

export const getDiets =()=>{
    const endpoint = 'http://localhost:3001/diets/' 
    return async (dispatch)=>{
        const {data} = await axios.get(`${endpoint}`)
        return dispatch({
            type:DIETS_GET,
            payload:data
        })
    }
}
export const orderRecipes = (orden) =>{
    return{
        type:ORDER_RECIPES,
        payload: orden
    }
}

export const filterRecipes = (filterType)=>{
    return{
        type:FILTER_RECIPES,
        payload: filterType
    }
}

export const filterBdPi = (filterType)=>{
    return{
        type: FILTER_DB_API,
        payload: filterType
    }
}

export const getAllRecipes = ()=>{
    const endpoint = 'http://localhost:3001/recipes/'
    return async (dispatch)=>{
        const {data} = await axios.get(`${endpoint}`)
        return dispatch({
            type: GET_ALL_RECIPES,
            payload:data
        })    
    }
}