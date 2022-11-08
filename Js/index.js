const form = document.getElementById("myform");
const holderName = document.getElementById("card-holder");
const holderNumber = document.getElementById("card-number");
const expMonth = document.getElementById("card-exp-month");
const expYear = document.getElementById("card-exp-year")
const cvc = document.getElementById("cvc");
// On card details
const oncardName = document.getElementById("oncard-name");
const oncardNumber = document.getElementById("oncard-number");
const oncardDate = document.getElementById("oncard-date");
const oncardCvc = document.getElementById("oncard-cvc");
const oncardbtn1 = document.getElementById("month-space");
const oncardbtn2 = document.getElementById("year-space");
const confirmBtn = document.getElementById("confirm");
const thankYou = document.querySelector(".thank-you");

const showError = (element , message) => {
    const theField = element.parentElement;
    theField.classList.add("error");
    theField.classList.remove("success");

    const theMessage = theField.querySelector("small");
    theMessage.innerHTML = message;
}
const showSuccess = (element) => {
    const theField = element.parentElement;
    theField.classList.remove("error");
    theField.classList.add("success");

    const theMessage = theField.querySelector("small");
    theMessage.innerHTML = '';
}

const isRequired = value => value === '' ? false : true;
const nameValidation = (holderNameValue) =>{
    const re = /[a-zA-Z]\b/g;
    return re.test(holderNameValue);
}
const numberValidation = (formattedNumber) => {
    const re = /[0-9]\b/g;
    return re.test(formattedNumber);
}
const checkName = () => {
    let valid = false;

    const holderNameValue = holderName.value;
    oncardName.value = holderName.value.toUpperCase();
    if(!isRequired(holderNameValue)){
        showError(holderName , "Card name is required");
    }else if(!nameValidation(holderNameValue)){
        showError(holderName , "Input letters only")
    }else{
        showSuccess(holderName);
        valid = true;
    }
    return valid; 
};
const checkNumber = () => {
    let valid = false;

    const cardNumberValue = holderNumber.value;
    formattedNumber = cardNumberValue.replace(/[^\d]/g ,'');
    formattedNumber = formattedNumber.substring(0,16);
    const grouping = formattedNumber.match(/\d{1,4}/g);
    oncardNumber.value = formattedNumber;
    if(!isRequired(cardNumberValue)){
        showError(holderNumber , "Enter your card number");
    }else if(holderNumber !== null){
        formattedNumber = grouping.join(' ');
        oncardNumber.value = grouping.join(' ');
        holderNumber.value = formattedNumber;
        
        showSuccess(holderNumber);
    }else if(!numberValidation(formattedNumber)){
        showError(holderNumber , "Wrong format , numbers only");
    }
    else{
        showSuccess(holderNumber);
        valid = true;
    }
    return valid;
}
const checkMonth = () =>{
    let valid= false;

    const monthValue = expMonth.value;
    oncardbtn1.innerHTML = monthValue;
    const alpha = (monthValue) => {
        const re = /[\d]\b/g;
        return re.test(monthValue)
    }
    if(!isRequired(monthValue)){
        showError(expMonth , "Can't be blank")
        oncardbtn1.innerHTML = "00"
    }else if(expMonth !== null && !alpha(monthValue)){
        showError(expMonth , "Numbers only")
    }else{
        showSuccess(expMonth);
        valid = true;
    }
    return valid;
}
const checkYear = () =>{
    let valid= false;

    const yearValue = expYear.value;
    oncardbtn2.innerHTML = yearValue;
    const alpha = (yearValue) => {
        const re = /[\d]\b/g;
        return re.test(yearValue)
    }
    if(!isRequired(yearValue)){
        showError(expYear , "Can't be blank")
        oncardbtn2.innerHTML = "00"
    }else if(expYear !== null && !alpha(yearValue)){
        showError(expYear , "Numbers only")
    }else{
        showSuccess(expYear);
        valid = true;
    }
    return valid;
};
const checkCvc = () =>{
    let valid = false;

    const cvcValue = cvc.value;
    oncardCvc.value = cvcValue;
    const alpha = (cvcValue) => {
        const re = /[\d]/g;
        return re.test(cvcValue)
    }
    if(!isRequired(cvcValue)){
        showError(cvc, "Can't be blank");
    }else if(cvcValue !== null && !alpha(cvcValue)){
        showError(cvc, "Numbers only");
    }else{
        showSuccess(cvc);
        valid = true;
    }
    return valid;
}
function submit(){
    form.style.display = "none";
    thankYou.style.display = "block";
    return submit;
}
form.addEventListener("submit" , e => {
    e.preventDefault();
    
    checkName(),
    checkNumber(),
    checkMonth(),
    checkYear(),
    checkCvc();

   let checKings = [];
   checKings[0] = checkName(),
   checKings[1] = checkNumber(),
   checKings[2] = checkMonth(),
   checKings[3] = checkYear(),
   checKings[4] = checkCvc();
   for (i = 0 ; i < checKings.length ; i++) {
       if(checKings[i] === true){
        form.style.display = "none";
        thankYou.style.display = "block";
       } 
   }
});