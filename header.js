const body = document.querySelector("body");
const header = document.querySelector(".header");

const content= document.querySelector(".content");

function addHeaderSection () {
const headerLogoArticle = document.createElement("article");
    headerLogoArticle.classList.add("headerLogo");
const logoBtn = document.createElement("img");
    logoBtn.classList.add("logoBtn");
    logoBtn.setAttribute("alt", "tfm2022LogoImage");
    logoBtn.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/tfm2022Logo.png`);
    logoBtn.addEventListener("click", linkMove);
    function linkMove () {
        window.location.href = "main.html"
    }
const headerMarginArticle = document.createElement("article");
    headerMarginArticle.classList.add("headerMargin");


    function logoutCheck(){

        const logout_info = {
            token: localStorage.getItem("HojinToken")
        };
        console.dir("토큰 확인 : " + logout_info);
        localStorage.clear();
        console.dir("토큰 삭제 : " + logout_info);
     
        //token 체크
        if(logout_info != "" || logout_info != null || logout_info != undefined){
    
            const url = "http://129.154.220.20:8080/api/logoutcheck";
    
            fetch(url, {
                method:"PATCH",
                body:JSON.stringify(logout_info),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response => {
               
                const msg = response.ok;
                // alert("로그아웃 메시지 : " + msg);
                window.location.href="login.html";            
            })//end ftech then
        }//end if
    }//end logoutCheck


const logoutBtn = document.createElement("div");
    logoutBtn.classList.add("logoutBtn");
    logoutBtn.innerText = "로그아웃";
    logoutBtn.addEventListener("click", logoutCheck);


    function selDayNightMode (e) {
        if(modeSelBtn.style.marginLeft === "") {
            modeSelBtn.style.marginLeft = "55%";
            selModeBtnName.innerHTML = "야간모드";
            selModeBtnName.style.color = "rgb(235,235,235)";
            content.style.color = "rgb(235,235,235)";
            body.style.backgroundColor = "#191919";
            selModeBtnName.style.backgroundColor = "black";
        } else {
            modeSelBtn.style.marginLeft = "";
            selModeBtnName.innerHTML = "주간모드";
            selModeBtnName.style.color = "black";
            content.style.color = "black";
            body.style.backgroundColor = "white";
            selModeBtnName.style.backgroundColor = "#EEEEEE";
        }
        
    }
    


const modeSelBtnBG = document.createElement("div");
modeSelBtnBG.classList.add("modeSelBtnBG");

const modeSelBtn = document.createElement("div");
modeSelBtn.classList.add("modeSelBtn");
modeSelBtn.addEventListener("click", selDayNightMode);

const selModeBtnName = document.createElement("div");
selModeBtnName.classList.add("selModeBtnName");
selModeBtnName.innerHTML = "주간모드";

modeSelBtnBG.appendChild(modeSelBtn);

    headerLogoArticle.appendChild(logoBtn);
    header.appendChild(headerLogoArticle);
    header.appendChild(headerMarginArticle);
    header.appendChild(selModeBtnName);
    header.appendChild(modeSelBtnBG);
    header.appendChild(logoutBtn);
}

document.addEventListener("DOMContentLoaded", addHeaderSection);