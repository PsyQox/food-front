import React,{ useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import validation from "./validation"; 
import style from './Form.module.css'

const Form = ()=>{
    const [diets, setDiets] = useState([])
    const [checked, setChecked] = useState({})
    const [errors, setErrors] = useState("")
    const [form, setForm] = useState({
        title:"",
        image:"",
        summary:"",
        healthscore:"",
        steptostep:"",
        diet:[]
    })

    useEffect( async ()=>{
        try {
            if (diets.length <= 0) {
                const response = await axios(`http://localhost:3001/diets/`)
                setDiets(response.data)    
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred in the request.");
            }
        }
        
    },[])

    const handleInput = (event)=>{
        setForm({...form,[event.target.name]:event.target.value})
       setErrors(validation({...form,[event.target.name]:event.target.value}))
    }

    const handleChecbox = (event)=>{
        if (!form.diet.includes(event.target.value)) {
            setForm({...form, diet:[...form.diet,event.target.value]})
            setErrors(validation({...form, diet:[...form.diet,event.target.value]}))
            setChecked({...checked,[event.target.name]:true})
        }else{
            setForm({...form, diet:[...form.diet.filter(diet=> diet !== event.target.value)]})
            setErrors(validation({...form, diet:[...form.diet.filter(diet=> diet !== event.target.value)]}))
            setChecked({...checked,[event.target.name]:false})
        }
    }

    const handleForm = async (event)=>{
        event.preventDefault()
        if(Object.keys(errors) <= 0){
            try {
                const response = await axios.post(`http://localhost:3001/recipes/`,form)
                if (!response.data[1]) {
                    alert("Cannot create duplicate records")
                }else{
                    alert(`The recipe ${response.data[0].title} has been created successfully`)
                    setForm({
                        title:"",
                        image:"",
                        summary:"",
                        healthscore:"",
                        steptostep:"",
                        diet:[]
                    })
                    setChecked({})
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data);
                } else {
                    alert("An error occurred in the request. Please try again.");
                }
            }
            
        }else{
            alert("First fix the mistakes")
        }
    }

  

    return(
        <div className={style.containerForm}>
            <h1 className={style.title}>Form</h1> 
            <form className={style.form} action="" onSubmit={handleForm}>
                <label className={style.label} htmlFor="">Name</label> 
                <input className={style.inputText} type="text" name="title" onChange={handleInput} value={form.title}/>
                {errors.title ? <span className={style.error}>{errors.title}</span>:null}
                <br />
                <label className={style.label} htmlFor="">Image</label>
                <input className={style.inputText} type="text" name="image" onChange={handleInput} value={form.image}/>
                {errors.image ? <span className={style.error}>{errors.image}</span>:null}
                <br />
                <label className={style.label} htmlFor="">Summary</label>
                <textarea className={style.inputTextArea} rows="8" name="summary" onChange={handleInput} value={form.summary}></textarea>
                {errors.summary ? <span className={style.error}>{errors.summary}</span>:null}
                <br />
                <label className={style.label} htmlFor="">Health score</label>
                <input className={style.inputText} type="number" name="healthscore" onChange={handleInput} value={form.healthscore}/>
                {errors.healthscore ? <span className={style.error}>{errors.healthscore}</span>:null}
                <br />
                <label className={style.label} htmlFor="">Step by step</label>
                <textarea className={style.inputTextArea} rows="8" type="text" name="steptostep" onChange={handleInput} value={form.steptostep}></textarea>
                {errors.steptostep ? <span className={style.error}>{errors.steptostep}</span>:null}
                <br />
                
                <label className={style.label} htmlFor="">Type of diet</label>
                <div className={style.divDietsTypes}>
                    {diets.map((diet)=>{    
                        return <div className={style.divDietType} key={diet.id}>
                            <label htmlFor={diet.name} key={diet.name}>
                            <input key={diet.id} type="checkbox" checked={checked[diet.name]} name={diet.name} id={diet.id} value={diet.id} onClick={handleChecbox}/>
                            {diet.name}
                        </label>
                        </div> 
                    })}
                </div>
                
                {errors.diet ? <span className={style.error}>{errors.diet}</span>:null}
                <br />
                <button className={style.button}>Create recipe</button>
            </form>
        </div>
    )
}

export default Form