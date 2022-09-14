const footer = document.querySelector(".footer");


function addFooterSection () {

const footerLogoImg = document.createElement("img");
    footerLogoImg.classList.add("footerLogoImg");
    footerLogoImg.setAttribute("alt", "footerLogoImage");
    footerLogoImg.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/ohleekimLogo.png`);

const footerCopyRightText = document.createElement("p");
    footerCopyRightText.classList.add("footerCopyRightText");
    footerCopyRightText.innerHTML = "© 오이김. All Rights Reserved.";
    
    footer.appendChild(footerLogoImg);
    footer.appendChild(footerCopyRightText);
}

document.addEventListener("DOMContentLoaded", addFooterSection);