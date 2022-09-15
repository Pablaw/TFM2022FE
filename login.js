const body = document.querySelector("body");
const loadingImg = document.querySelector(".loadingImg");
const loginContent = document.querySelector(".loginContent");
const loginId = document.querySelector(".loginId");
const loginSuccessImg = document.querySelector(".loginSuccessImg");

const tfmImg = document.querySelector(".tfmImg");

tfmImg.addEventListener("click", () => { window.location.href = "login.html"});

//호진제작
    //1-1. 접근 유효 체크 - HojinToken 체크
    const sessionCheck = localStorage.getItem("HojinToken");

    //1-2. 접근 유효 체크 -만약 빈 껍데기라도 있다면 문제가 있다는 것
    if (sessionCheck != null) { 
        alert("허용되지 않은 동작입니다." + sessionCheck);
        localStorage.clear();
        window.history.go(-1); //이전 페이지로 보내기
    } 

    //1-3. 접근 유효 체크 - 정상 접근일 경우 정상적으로 아래 코드 사용 가능
        //로그인 버튼 찾기
        const loginCheck_button = document.querySelector("#loginCheck");

        //로그인 이벤트 감지
        loginCheck_button.addEventListener("click", delayCheck);
//3000, 2350

        function delayCheck () {
        setTimeout(successCheck, 3000);
        loginContent.style.display = "none";
        loadingImg.style.display = "flex";
        loginId.innerHTML = "로그인 토큰 검사중";
        loginId.style.display = "flex";
        }

        function successCheck () {
            setTimeout(loginCheck, 2350);
            loginId.innerHTML = "로그인 성공!";
            loginSuccessImg.style.display = "flex";
            loadingImg.style.display = "none";
        }

        //로그인 값 검사 및 체크 요청
        function loginCheck() {




            const login_info = {
                id: document.querySelector("#tfmid").value,
                pw: document.querySelector("#tfmpw").value
            };

            //console.dir("login_info.id : " + login_info.id
            //    + "login_info.pw : " + login_info.pw);

            //id & pw null 체크
            if (login_info.id != "" && login_info.pw != "") {

                const url = "http://129.154.220.20:8080/api/logincheck";

                fetch(url, {
                    method: "post",
                    body: JSON.stringify(login_info),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                        if (data.HojinToken == null) {
                            alert("로그인 정보에 문제가 발견되었습니다.");
                            console.log("null 옴" + data.HojinToken);
                        } else if (data.HojinToken != null) {
                            //response.ok안해도 되는 이유
                            //token을 잘 받았다면 정상처리 되었다는 것
                            console.log("로그인 성공 : " + data.HojinToken);
                            localStorage.setItem("HojinToken", data.HojinToken);
                            window.location.href="main.html";
                        } else {
                            alert(`로그인 정보에 문제가 있습니다. \n관리자에게 연락하세요`);
                        } 

                        ////undefined 일때 접근 못하게 추가]]]]]]]]]]]]]]]]]]
                    })
            }
        }
                //로그인 시간 변수 생성( YYYY-MM-DD HH:MM:SS mysql-type:datetime)
            // const today = new Date();
            // const year = String(today.getFullYear()).padStart(4,"0");
            // const month = String(today.getMonth()+1).padStart(2,"0");
            // const date = String(today.getDate()).padStart(2,"0");
            // const hours = String(today.getHours()).padStart(2,"0");
            // const minutes = String(today.getMinutes()).padStart(2,"0");
            // const seconds = String(today.getSeconds()).padStart(2,"0");
            //    const last_login = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
            //    console.log(last_login);