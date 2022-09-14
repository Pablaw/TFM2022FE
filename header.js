
const header = document.querySelector(".header");


function addHeaderSection () {
const headerLogoArticle = document.createElement("article");
    headerLogoArticle.classList.add("headerLogo");
const logoBtn = document.createElement("img");
    logoBtn.classList.add("logoBtn");
    logoBtn.setAttribute("alt", "tfm2022LogoImage");
    logoBtn.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/tfm2022Logo.png`);
    logoBtn.addEventListener("click", linkMove);
    function linkMove () {
        location.href = "http://127.0.0.1:5500//login.html"
    }
const headerMarginArticle = document.createElement("article");
    headerMarginArticle.classList.add("headerMargin");
const headerLogOutArticle = document.createElement("article");
    headerLogOutArticle.setAttribute("class", "headerLogOutArticle");
const logoutBtn = document.createElement("button");
    logoutBtn.classList.add("logoutBtn");
    logoutBtn.innerText = "로그아웃";

    headerLogoArticle.appendChild(logoBtn);
    header.appendChild(headerLogoArticle);
    header.appendChild(headerMarginArticle);
    headerLogOutArticle.appendChild(logoutBtn);
    header.appendChild(headerLogOutArticle);
}

document.addEventListener("DOMContentLoaded", addHeaderSection);