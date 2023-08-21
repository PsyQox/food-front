import React from "react";
import style from './Pagination.module.css'

const Pagination = ({recipesPerPage,totalRecipes,paginate,page}) =>{
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i)
    }
    
    return(
        <div className={style.containerPagination}>
            {page !== 1 ? <button className={style.buttonNextPrev} onClick={()=>paginate(page-1)}>Previous</button>: null}
            
                {pageNumbers.map(number => {
                    if (number === page) {
                        return <button className={style.buttonNumberSelect} key={number} disabled>{number}</button>
                    }    
                    return <button className={style.buttonNumber} key={number} onClick={()=>paginate(number)}>{number}</button>    
                }
                )}
            {page !== pageNumbers.length ? <button className={style.buttonNextPrev} onClick={()=>paginate(page+1)}>Next</button>: null }
            
        </div>
    )
}

export default Pagination