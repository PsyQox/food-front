import React from "react";
import axios from 'axios'
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import style from './Detail.module.css'

const Detail =()=>{
    const regexUUID = RegExp(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/)
    const [detail, setDetail] = useState({})
    const {id} = useParams()

    useEffect( async ()=>{
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`) 
            setDetail(response.data)
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Ocurrió un error en la solicitud. Por favor, intenta nuevamente.");
            }
        }
    },[]) 

    if (regexUUID.test(id)) {
        return(<div className={style.containerAll}> 
            <h2>{detail.title}</h2>
            <div className={style.containerDetail}>
                <div>
                    <img className={style.img} src={detail.image} alt="" ></img>
                </div>
                <div className={style.containerData}>
                    <h2>Summary</h2>
                        <p>{detail.summary}</p>
                    <h2>Health Score</h2>
                        <p>{detail.healthScore}</p>
                    <h2>Step by step</h2>
                        {detail.steptostep}
                    <h2>Types of diet</h2>
                        {detail.tbl_diets?.map((diet)=>{
                            return <button className={style.buttonTag} key={diet.id}>{diet.name}</button>
                        })}
                </div>
            </div>
        </div>)
    }else{
        return(
            <div className={style.containerAll}>
                <h2>{detail.title}</h2>
                <div className={style.containerDetail}>
                    <div>
                        <img className={style.img} src={detail.image} alt=""></img>
                    </div>
                    <div className={style.containerData}>
                        <h2>Summary</h2>
                        <div dangerouslySetInnerHTML={{__html:detail.summary}}></div>
                        <h2>Health Score</h2>
                        <p>{detail.healthScore}</p>
                        <h2>Step by step</h2>
                        {detail.analyzedInstructions?.map((instruction)=>{
                            return instruction.steps?.map(step=>{
                                return <div><strong key={step.number}>{step.number}</strong> <p key={step.step}>{step.step}</p></div>
                            })
                        })}
                        <h2>Types of diet</h2>
                        {detail.diets?.map((diet)=>{
                            return <button className={style.buttonTag} key={diet}>{diet}</button>
                        })}
                    </div>
                </div>
                    
            </div>
        )
    }
    
}

export default Detail