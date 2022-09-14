const submitBtn = document.querySelector("#submitBtn");
const signUpBtn = document.querySelector("#signUpBtn");

const teamNameSubmit = document.querySelector("#teamNameSubmit");
const submitTeamName = document.querySelector(".marginTop");

const cdnNumb = document.querySelector("#cardinalNumb");
const numb = document.querySelector("#number");

const eMail = document.querySelector("#mail");
const mailValidTxt = document.querySelector("#mailValidTxt");


const validCheckTxt = document.querySelector("#validCheckPw");

const inputPw = document.querySelector("#inputPw");
const inputPwCheck = document.querySelector("#inputPwCheck");

function loginFn (e) {
    console.log(e);
    // db서버로 제출
}

function vaildCheckFnPwCheck () {
    if (inputPw.value === inputPwCheck.value) {
        validCheckTxt.innerHTML = "일치";
        validCheckTxt.style.color = "blue";
    } else {
        validCheckTxt.innerHTML = "불일치";
        validCheckTxt.style.color = "red";
    }
}

function vaildCheckFnPw () {
    if(inputPwCheck !== "") {
        if (inputPw.value === inputPwCheck.value) {
            validCheckTxt.innerHTML = "일치";
            validCheckTxt.style.color = "blue";
        } else {
            validCheckTxt.innerHTML = "불일치";
            validCheckTxt.style.color = "red";
        }
    }
}

function vaildCeckMail() {
    if (eMail.value.indexOf("@") !== -1 ) {
        mailValidTxt.innerHTML = "";
    } else {
        mailValidTxt.innerHTML = "올바르지 않은 형식";
        mailValidTxt.style.color = "red";
    }
}

function checkNumbAlert (e) {
    const inputValue = e.code;
    if(inputValue.indexOf("Digit") !== -1 || inputValue.indexOf("Tab") === 0 || inputValue.indexOf("Space") === 0 || inputValue.indexOf("Enter") === 0 || inputValue.indexOf("Backspace") === 0 || inputValue.indexOf("CapsLock") === 0)  {
    } else {
        alert("숫자를 입력하세요 !");
        numb.value = "";
        cdnNumb.value = "";
    }}

function signUpFn () {
    window.location = "http://127.0.0.1:5501/login.html";
}

function teamNameSend (e) {
    e.preventDefault();
    const submitValue = e.submitter.id;
    if(submitValue.indexOf("munchen") !== -1) {
        submitTeamName.innerText = "Selct Munchen !";
    } else if(submitValue.indexOf("liverpool") !== -1){
        submitTeamName.innerText = "Select Liverpool !";
    } else if(submitValue.indexOf("marseille") !== -1){
        submitTeamName.innerText = "Select Marseille !";
    } else if(submitValue.indexOf("acm") !== -1){
        submitTeamName.innerText = "Select AC Milan !";
    } else if(submitValue.indexOf("realmadrid") !== -1){
        submitTeamName.innerText = "Select Real Madrid !";
    }
}


// submitBtn.addEventListener("click", loginFn);
signUpBtn.addEventListener("click", signUpFn);

// teamNameSubmit.addEventListener("submit", teamNameSend);


cdnNumb.addEventListener("keyup", checkNumbAlert);
numb.addEventListener("keyup", checkNumbAlert);
inputPwCheck.addEventListener("keyup", vaildCheckFnPwCheck);
inputPw.addEventListener("keyup", vaildCheckFnPw);
eMail.addEventListener("keyup", vaildCeckMail);