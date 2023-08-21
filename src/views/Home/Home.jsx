import React,{useState,useEffect} from "react";
import Cards from '../../components/Cards/Cards'
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, orderRecipes, getDiets, filterRecipes, filterBdPi, getAllRecipes} from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from './Home.module.css'

const Home = ()=>{  

    const [select, setSelect] = useState("def")
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(10);
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const diets = useSelector(state => state.diets)
    const {search} = useParams()

    useEffect(()=>{ 
        try {
            dispatch(getDiets()) 
            if (!search) {
                dispatch(getRecipes())            
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred in the request.");
            }
        }
    },[])

    const numberOfLastPosition = currentPage * recipesPerPage; //10
    const numberOfFirstPosition = numberOfLastPosition - recipesPerPage;//10 = 0
    const currentRecipes = recipes.slice(numberOfFirstPosition, numberOfLastPosition)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const onChangeOrder = (event) =>{
        dispatch(orderRecipes(event.target.value))
        setCurrentPage(1)
    }

    const onChangeFilter = (event)=>{
        dispatch(filterRecipes(event.target.value))
        setCurrentPage(1)
    } 

    const onChangeOrderDbApi = (event)=>{
        dispatch(filterBdPi(event.target.value))
        setCurrentPage(1)
    }

    const onClickAll = ()=>{
        try {
            dispatch(getAllRecipes())
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred in the request. Please try again.");
            }
        }
    }

    return(
        <div>
            <div className={style.selectsContainer}>
                <div className={style.selectContainer}>
                    <label htmlFor="">Type of diet</label>
                    <br />
                    <select value={select}  className={style.select} name="" id="" onChange={onChangeFilter}>
                        <option value="def">Select...</option>
                        {diets?.map((diet)=>{
                            return <option key={diet.id} value={diet.name}>{diet.name}</option>
                        })}
                    </select>    
                </div>
                <div className={style.selectContainer}>
                    <label htmlFor="">Order</label>
                    <br />
                    <select value={select} className={style.select} name="" id="" onChange={onChangeOrder}>
                        <option value="def">Select...</option>
                        <option value="A">Ascending Health Score</option>
                        <option value="D">Descending Health Score</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <div className={style.selectContainer}>
                    <label htmlFor="">Filter by DB or API</label>
                    <br />
                    <select value={select}  className={style.select} name="" id="" onChange={onChangeOrderDbApi}>
                        <option value="def">Select...</option>

                        <option value="api">API</option>
                        <option value="db">DB</option>
                    </select>
                </div>
                <button className={style.button} onClick={onClickAll}>All</button>
            </div>
            <div className={style.divTitle}>
                <h1 className={style.title}>Recipes</h1>
            </div>
            <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} page={currentPage}/>
            <Cards recipes={currentRecipes}/>
            <Pagination recipesPerPage={recipesPerPage} totalRecipes={recipes.length} paginate={paginate} page={currentPage}/>
        </div>
    )
}

export default Home