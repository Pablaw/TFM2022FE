

const teamNameList_ul = document.querySelector(".teamNameList_ul");
const hiddenContent = document.querySelector(".hiddenContent");
const teamNameSubmit_form = document.querySelector(".teamNameSubmit_form");
const sortAlphabetBtn = document.querySelector(".sortAlphabet");
const sortTrophyBtn = document.querySelector(".sortTrophy");


const teamFormation = document.querySelector(".teamFormation_article");
const playerFeature = document.querySelector(".playerFeature_article");
const playerStat = document.querySelector(".playerStat_article");




/* GET 팀호출 */
function pageLoad (e) {
fetch("http://129.154.220.20:8080/api/teamlist", {method: "GET"})
    .then((response) => {return response.json()})
    .then((result) => {
        let arr = [];
        for(let i=0; i < result.length; i++ ) {
                    arr.push(result[i]);
        }
        function teamListCreate () {
            for(let i=0; i < arr.length; i++ ) {
                const values = Object.values(arr[i])[1];
                const valuesMod = values.replace('(', '\n(');
                const teamNameBtn = document.createElement("button");
                teamNameBtn.classList.add("teamNameBtn_button");
                teamNameBtn.classList.add(`${result[i].trophy}`);
                teamNameBtn.innerText = valuesMod;
                teamNameBtn.setAttribute("id", `id${i}`);
                teamNameList_ul.appendChild(teamNameBtn);  
            }
        }
        teamListCreate ();

    }).then(()=> {
        const teamNameBtn = document.querySelectorAll(".teamNameBtn_button");
        const numbsOfBtn = teamNameBtn.length;

        for(let i=0; i < numbsOfBtn; i++) {
        const teamNameSelect = document.querySelector(`#id${i}`);
        teamNameSelect.addEventListener("click", btnForHiddenContent);
        }

        function sortAlphabet () {
            sortAlphabetBtn.style.color = "black";
            sortAlphabetBtn.style.fontWeight = "700";
            sortTrophyBtn.style.color = "grey";
            sortTrophyBtn.style.fontWeight = "500";

            for(let i=1; i < numbsOfBtn; i++) {
                for(let j=0; j < i; j++) {
                const selElementFirst = teamNameList_ul.childNodes[j];
                const strStartFirst = selElementFirst.innerText.indexOf('(') + 1;
                const strEndFirst = selElementFirst.innerText.indexOf(')') - strStartFirst;
                const substrFirst = selElementFirst.innerText.substr(strStartFirst, strEndFirst);
                
                const selElementSecond = teamNameList_ul.childNodes[i];
                const strStartSecond = selElementSecond.innerText.indexOf('(') + 1;
                const strEndSecond = selElementSecond.innerText.indexOf(')') - strStartSecond;
                const substrSecond = selElementSecond.innerText.substr(strStartSecond, strEndSecond);

                if(substrFirst > substrSecond) {
                    teamNameList_ul.insertBefore(selElementSecond, selElementFirst);
                }}
            }}

        function sortTrophy () { 
            sortAlphabetBtn.style.color = "grey";
            sortAlphabetBtn.style.fontWeight = "500";
            sortTrophyBtn.style.color = "black";
            sortTrophyBtn.style.fontWeight = "700";

            for(let i=1; i < numbsOfBtn; i++) {
                for(let j=0; j < i; j++) {
                const selElementFirst = teamNameList_ul.childNodes[j];
                const trophyCountFirst = Number(teamNameList_ul.childNodes[j].classList[1]);
                
                const selElementSecond = teamNameList_ul.childNodes[i];
                const trophyCountSecond = Number(teamNameList_ul.childNodes[i].classList[1]);

                if(trophyCountFirst < trophyCountSecond) {
                    teamNameList_ul.insertBefore(selElementSecond, selElementFirst);
                }}
            }
        }

        sortAlphabetBtn.addEventListener("click", sortAlphabet);
        sortTrophyBtn.addEventListener("click", sortTrophy);
    })
}


/* POST 호출 성공 */

    function btnForHiddenContent (e) {
    const tno = Number(e.path[0].id.substr(2)) + 1;
    fetch("http://129.154.220.20:8080/api/teamdetail", {
            method: "POST",
            body: JSON.stringify({tno}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    .then((response) => {return response.json()})
    .then((data) => {

            console.log(Object.values(data[2])[7]);

        function getDetailTemaInfo () {
            const value = Object.values(Object.values(data[0])[8]);

            /* result length: 7 
            0tno, 1tname, 2logo, 3history, 4alias, 5stadium, 6trophy
            */
            const teamDeatailInfoTop = document.createElement('section');
            teamDeatailInfoTop.classList.add("teamInfoTop_section");
            const teamDeatailInfoBottom = document.createElement('section');
            teamDeatailInfoBottom.classList.add("teamInfoBottom_section");

            const teamInfo = document.createElement("article");
            teamInfo.classList.add("teamInfo_article");
            const teamStadium = document.createElement("article");
            teamStadium.classList.add("temaStadium_article");
            const teamTrophy = document.createElement("article");
            teamTrophy.classList.add("teamTrophy_article")
            const margin = document.createElement("div");
            margin.classList.add("margin_div");

            for (let i=1; i < 6; i++) {
                    if(i === 1) { /* 팀 이름 */
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("teamName_div_tname");
                        newDiv.innerText = `${value[i]}`;
                        teamInfo.appendChild(newDiv);
                    } else if (i === 2) { /* 팀 로고 */
                        const newImg = document.createElement("img");
                        newImg.classList.add("teamLogo_img_logo");
                        newImg.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/${value[2]}`);
                        newImg.setAttribute("alt", `${value[i-1]}Image`);
                        teamInfo.appendChild(newImg);
                    } else if (i === 3) { /* 팀 역사 */
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("history_div");
                        newDiv.innerText = `${value[i]}`;
                        teamInfo.appendChild(newDiv);
                    } else if (i === 4) { /* 팀 별칭 */
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("nickName_div_alias");
                        newDiv.innerText = `${value[i]}`;
                        teamInfo.appendChild(newDiv);
                    } else if (i === 5) { /* 팀 경기장 */
                        const stadiumImg = document.createElement("img")
                        stadiumImg.classList.add("stadiumImg_img_Stadium");
                        stadiumImg.setAttribute("alt", "teamStadiumImage")
                        stadiumImg.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/${value[5]}`);
                        teamStadium.appendChild(stadiumImg);
                    }
            }
            


            // const trophyImg = document.createElement("img");
            // trophyImg.classList.add("trophyImg_img_trophy");
            // trophyImg.setAttribute("alt", "teamTrophyImage");
            // trophyImg.setAttribute("src", `https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/teamTrophy/b-1.bay.png`);
            // teamTrophy.appendChild(trophyImg);

            const trophyImg = document.createElement("div");
            trophyImg.classList.add("trophyImg_img_trophy");
            trophyImg.setAttribute("alt", "teamTrophyImage");
                if (value[6] !== '0') {
                    trophyImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/teamTrophy/teamTrophyImgEdit.png')";
                    trophyImg.innerText = `${value[6]}`;
                } else {
                    trophyImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/teamTrophy/dareDreamDo.png')";
                }
            teamTrophy.appendChild(trophyImg);

            /* data length = 9
            0pno, 1pname, 2feature, 3position, 4att, 5pas, 6def, 7total, 8tno */
            // teamFormation_article / 0 ~ 3: playerFeature_article / playerStat_article



            // const feildImg = document.createElement("div");
            // feildImg.classList.add("footballFieldImg_img");
            // feildImg.setAttribute("alt", "footballFieldImage");
            teamFormation.style.backgroundImage = "url('https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/field.png')";
            /* 포메이션 짜자;; */ 
                
            /* data length = 9
            0pno, 1pname, 2feature, 3position, 4att, 5pas, 6def, 7total, 8tno
            */


            const postionGK = document.createElement("article");
            postionGK.classList.add("postionGK");
            const postionDF = document.createElement("article");
            postionDF.classList.add("postionDF");
            const postionMF = document.createElement("article");
            postionMF.classList.add("postionMF");
            const postionFW = document.createElement("article");
            postionFW.classList.add("postionFW");

            teamFormation.appendChild(postionGK);
            teamFormation.appendChild(postionDF);
            teamFormation.appendChild(postionMF);
            teamFormation.appendChild(postionFW);

            for (let i=0; i < data.length; i++) {
                const player = document.createElement("div");
                player.classList.add(`player${i}`, `${data[i].pname.split(' ').join('')}`, `${data[i].feature.split(' ').join('')}`, `${data[i].position}`, `${data[i].att}`, `${data[i].pas}`,`${data[i].def}`, `${data[i].total}`);
                player.innerText = `${data[i].position}`;
                player.addEventListener("click", selectPlayer);

                if(`${data[i].position}` === "GK") {
                    postionGK.appendChild(player);
                } else if (`${data[i].position}` === "DF") {
                    postionDF.appendChild(player);
                } else if (`${data[i].position}` === "MF") {
                    postionMF.appendChild(player);
                } else if (`${data[i].position}` === "FW") {
                    postionFW.appendChild(player);
                }
            }


            // const player1 = document.createElement("div");
            // player1.classList.add("player1", `${data[0].pname.split(' ').join('')}`, `${data[0].feature.split(' ').join('')}`, `${data[0].position}`, 
            // `${data[0].att}`, `${data[0].pas}`,`${data[0].def}`, `${data[0].total}`);
            // player1.style.gridArea = `${data[0].position}`;
            // player1.innerText = `${data[0].position}`;
            // player1.addEventListener("click", selectPlayer);
            // feildImg.appendChild(player1);

            // console.log(player1.classList);

            // const player2 = document.createElement("div");
            // player2.classList.add("player2", `${data[1].pname}`, `${data[1].feature.split(' ').join('')}`, `${data[1].position}`, 
            // `${data[1].att}`, `${data[0].pas}`, `${data[1].def}`, `${data[1].total}`);
            // player2.style.gridArea = `${data[1].position}`;
            // player2.innerText = `${data[1].position}`;
            // player2.addEventListener("click", selectPlayer);
            // feildImg.appendChild(player2);

            // console.log(player2.classList);

            // const player3 = document.createElement("div");
            // player3.classList.add("player3", `${data[2].pname}`, `${data[2].feature.split(' ').join('')}`, `${data[2].position}`, 
            // `${data[2].att}`, `${data[0].pas}`, `${data[2].def}`, `${data[2].total}`);
            // player3.style.gridArea = `${data[2].position}`;
            // player3.innerText = `${data[2].position}`;
            // player3.addEventListener("click", selectPlayer);
            // feildImg.appendChild(player3);

            // const player4 = document.createElement("div");
            // player4.classList.add("player4", `${data[3].pname}`, `${data[3].feature.split(' ').join('')}`, `${data[3].position}`, 
            // `${data[3].att}`, `${data[0].pas}`, `${data[3].def}`, `${data[3].total}`);
            // player4.style.gridArea = `${data[3].position}`;
            // player4.innerText = `${data[3].position}`;
            // player4.addEventListener("click", selectPlayer);
            // feildImg.appendChild(player4);

            // const player5 = document.createElement("div");
            // player5.classList.add("player5", `${data[4].pname}`, `${data[4].feature.split(' ').join('')}`, `${data[4].position}`, 
            // `${data[4].att}`, `${data[0].pas}`, `${data[4].def}`, `${data[4].total}`);
            // player5.style.gridArea = `${data[4].position}`;
            // player5.innerText = `${data[4].position}`;
            // player5.addEventListener("click", selectPlayer);
            // feildImg.appendChild(player5);

            // let newArr = [];
            // for(let i=0; i < 5; i++) {
            //     newArr.push(data[i].position);
            // }
            // const fwCount = newArr.filter(e => e === "FW").length;
            // console.log(fwCount);
            
            // let fwArr = [];
            // if (fwCount === 3) {
            //     for(let i=0; i < data.length; i++) {
            //         if (data[i].postion === "FW") {
            //             fwArr.push(data[i]);
            //         } else if (data[i].postion === "DF") {
            //             data[i].style.gridArea = "centerDF";
            //         } else {
            //             data[i].style.gridArea = "GK";
            //         }
            //     }
            // }

            function selectPlayer (e) {
                if (playerFeature.innerHTML !== "" || playerStat.innerHTML !== "") {
                    while (playerFeature.lastElementChild) {
                        playerFeature.removeChild(playerFeature.lastElementChild);
                    }
                    while (playerStat.lastElementChild) {
                        playerStat.removeChild(playerStat.lastElementChild);
                    }
                }
                console.log(playerFeature.innerHTML === "");
                const SELETED_PLAYER = e.target;
 
                /* teamInfoBottom_playerFeatureArticle */
                const playerName = document.createElement("div");
                playerName.classList.add("playerName_div_pname");
                playerName.innerText = `${SELETED_PLAYER.classList[1]}`;
                playerFeature.appendChild(playerName);
    
                const alias = document.createElement("div");
                alias.classList.add("alias_div_feature");
                alias.innerText = `${SELETED_PLAYER.classList[2]}`;
                playerFeature.appendChild(alias);
    
                /*포지션 뱃지 구현*/
                const position = document.createElement("div");
                position.classList.add("position_div_position");
                position.innerText = `${SELETED_PLAYER.classList[3]}`;
                if(SELETED_PLAYER.classList[3] === 'GK') {
                    position.style.backgroundColor = "#FFCD4A";
                } else if (SELETED_PLAYER.classList[3] === 'DF') {
                    position.style.backgroundColor = "#0127D5";
                } else if (SELETED_PLAYER.classList[3] === 'MF') {
                    position.style.backgroundColor = "#01AD07";
                } else if (SELETED_PLAYER.classList[3] === 'FW') {
                    position.style.backgroundColor = "#BB291E";
                }
                playerFeature.appendChild(position);

                /* teamInfoBottom_playerFeatureArticle */

                const statAtt = document.createElement("div");
                statAtt.classList.add("statAtt_div_att");
                statAtt.innerText = `Att\n${SELETED_PLAYER.classList[4]}`;
                playerStat.appendChild(statAtt);

                const statPas = document.createElement("div");
                statPas.classList.add("statPas_div_pas");
                statPas.innerText = `Pas\n${SELETED_PLAYER.classList[5]}`;
                playerStat.appendChild(statPas);

                const statDef = document.createElement("div");
                statDef.classList.add("statDef_div_def");
                statDef.innerText = `Def\n${SELETED_PLAYER.classList[6]}`;
                playerStat.appendChild(statDef);

                const statTotal = document.createElement("div");
                statTotal.classList.add("statTotal_div_total");
                statTotal.innerText = `Total\n${SELETED_PLAYER.classList[7]}`;
                playerStat.appendChild(statTotal);
            }


            // if(playerFeature.innerHTML !== "" || playerStat.innerHTML !== "" ) {
            //     while (playerFeature.lastElementChild) {
            //         playerFeature.removeChild(playerFeature.lastElementChild);
            //     }
            //     while (playerStat.lastElementChild) {
            //         playerStat.removeChild(playerStat.lastElementChild);
            //     }
            //     selectPlayer ();
            // } 

            // teamFormation.appendChild(feildImg);


            // teamNameList_ul.insertBefore(selElementSecond, selElementFirst);


            /* att, pas, def, total */

            teamDeatailInfoTop.appendChild(teamInfo);
            teamDeatailInfoTop.appendChild(teamStadium);
            teamDeatailInfoTop.appendChild(teamTrophy);
            hiddenContent.appendChild(teamDeatailInfoTop);

            teamDeatailInfoBottom.appendChild(teamFormation);
            teamDeatailInfoBottom.appendChild(playerFeature);

            const teamLogo = document.createElement("img");

            const targetStr = Object.values(data[0])[8].logo;

            console.log(targetStr.substr(13, 2));
            if(targetStr[13] === "e") {
                teamLogo.classList.add("teamLogo", "teamLogoEPL");
                teamLogo.setAttribute("src", "https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/eplLogo.png");
            } else if (targetStr[13] === "b") {
                teamLogo.classList.add("teamLogo", "teamLogoBundesLiga");
                teamLogo.setAttribute("src", "https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/bundesligaLogo.png");
            } else if (targetStr[13]=== "s") {
                teamLogo.classList.add("teamLogo", "teamLogoBundesLiga");
                teamLogo.setAttribute("src", "https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/serieALogo.png");
            }  else if (targetStr.substr(13, 2) === "ll") {
                teamLogo.classList.add("teamLogo", "teamLogoLiga");
                teamLogo.setAttribute("src", "https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/laligaLogo.png");
            }  else if (targetStr.substr(13, 2) === "lg") {
                teamLogo.classList.add("teamLogo", "teamLogoLiga");
                teamLogo.setAttribute("src", "https://raw.githubusercontent.com/Pablaw/RemoteStorag/main/tfm2022/img/primary/legue1Logo.png");
            }

            teamDeatailInfoBottom.insertBefore(teamLogo, playerFeature);

  
            teamDeatailInfoBottom.appendChild(playerStat);
            hiddenContent.appendChild(teamDeatailInfoBottom);

        }

        if ( hiddenContent.innerHTML !== "" ) { 
        while (hiddenContent.lastElementChild) {
            hiddenContent.removeChild(hiddenContent.lastElementChild);
        }
        while (playerFeature.lastElementChild) {
            playerFeature.removeChild(playerFeature.lastElementChild);
        }
        while (playerStat.lastElementChild) {
            playerStat.removeChild(playerStat.lastElementChild);
        }
        while (teamFormation.lastElementChild) {
            teamFormation.removeChild(teamFormation.lastElementChild);
        }
        getDetailTemaInfo ();
        } else { 
        getDetailTemaInfo();
        }
        })
    };


    // 2nd url : http://192.168.5.156:8080/api/teamdetail

/* animationFrame / idleCallback / prop onload */

/* 페이지 로드 시 렌더 */
window.addEventListener("DOMContentLoaded", pageLoad);






    