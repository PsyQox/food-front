const validation=(data)=>{
    let incorrect = {}
    let title = data.title.trim()
    let image = data.image.trim()
    let summary = data.summary.trim()
    let healthscore = data.healthscore
    let steptostep = data.steptostep.trim()
    let diet = data.diet

    const regexNumber = RegExp(/^[0-9]+$/)
    const regexURL =  RegExp(/^(ftp|http|https):\/\/[^ "]+$/)
    const regexLetters = RegExp(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    const regexStep = RegExp(/^[A-Za-z0-9\sñÑáéíóúÁÉÍÓÚ,.!¡¿?']+$/g)

    if (data.title) {
        if (!title){
            incorrect.title = "The name cannot be empty."
        }else if(!regexLetters.test(title)){
            incorrect.title = "Only letters"
        }
    }
    if (data.image) {
        if(!image){
            incorrect.image = "The image cannot be empty."
        }else if(!regexURL.test(image)) {
            incorrect.image = "It has to have URL format."
        }
    }
    if (data.summary) {
        if (!summary) incorrect.summary = "The summary cannot be empty."
           
    }
    
    if (data.steptostep) {
        if (!steptostep) {
            incorrect.steptostep = "The step by step cannot be empty."
        }else if (!regexStep.test(steptostep)) {
            incorrect.steptostep = "Only numbers and letters"
        }
     }
    
     if (data.healthscore) {
        if (!regexNumber.test(healthscore)) {
            incorrect.healthscore = "Can only be number" 
         }else if(healthscore < 0 || healthscore > 100){
             incorrect.healthscore = "Special characters are not allowed."
         }   
     }
     
    if (diet.length <= 0) {
        incorrect.diet = "You have to select at least 1."
    }
    return incorrect
}

export default validation