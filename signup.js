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




//호진제작/////////////////////////////////////////////////////////////////////////
//1-1. 접근 유효 체크 - HojinToken 체크
    const sessionCheck = localStorage.getItem("HojinToken");

    //1-2. 접근 유효 체크 - 만약 빈 껍데기라도 있다면 문제가 있다는 것
    if (sessionCheck != null) { 
        alert("비정상적인 접근입니다." + sessionCheck);
        window.history.go(-1); //이전 페이지로 보내기
    }

    //1-3. 접근 유효 체크 - 정상 접근일 경우 정상적으로 아래 코드 사용 가능
     

//회원가입 버튼 클릭 시
signUpBtn.addEventListener("click", signUpFn);

function signUpFn () {
    const signup = {
        id:document.querySelector("#inputId").value,
        pw:document.querySelector("#inputPwCheck").value,
        nick:document.querySelector("#nick").value,
        uname:document.querySelector("#uname").value,
        tamid:document.querySelector("#tamid").value,
        gisu:document.querySelector("#gisu").value,
        mail:document.querySelector("#mail").value
    };

    //console.log(signup);

    const url = "http://129.154.220.20:8080/api/signup";

    fetch(url, {
        method:"post",
        body:JSON.stringify(signup),
        headers: {
            "Content-Type" : "application/json"
        }})
        .then(response => {

            const msg = response.ok;  //성공하면 true, 실패하면 false response.status는 200과 400 반환
              if(msg == true) {alert("OK"); window.location.href="login.html";}
              else if(msg == false) {alert("Fail"); window.location.reload();}
              else{alert("Error"); window.location.reload();}
    });
}
/////////////////////////////////////////////////////////////////////////////




// teamNameSubmit.addEventListener("submit", teamNameSend);


//cdnNumb.addEventListener("keyup", checkNumbAlert);
//numb.addEventListener("keyup", checkNumbAlert);
inputPwCheck.addEventListener("keyup", vaildCheckFnPwCheck);
inputPw.addEventListener("keyup", vaildCheckFnPw);
eMail.addEventListener("keyup", vaildCeckMail);