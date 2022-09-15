     /* 호진제작 */
    //1-1. 접근 유효 체크 - HojinToken 체크
    /*
    const tokenCheck = localStorage.getItem("HojinToken");
    */

    // function checkPopup () {
    //     const url = ""
    //     const name = "chcek id"
    //     const option = `width = ${window.screen.width}, height= ${window.screen.height}, top = 100, left = 200 location = no`;
    //     window.open(url, name, option);
    // }




    //1-2. 접근 유효 체크
    //null / undefiend / 빈값("")
    /* if(tokenCheck == null || tokenCheck == undefined || tokenCheck == ""){
        alert("비정상적인 접근입니다.");
        localStorage.clear(); //localStorage 초기화하고
        window.location.href="login.html"; //로그인 페이지로 보내기
    } else  */

    const tokenCheck = localStorage.getItem("HojinToken");
    if (tokenCheck != null) { 
        // alert("세션검사 ㄱㄱ");



        localStorage.clear(); //보안용
        setTimeout(authCheck, 700);
    } else {
        alert(`홈페이지에 문제가 발견되었습니다. \n관리자에게 연락하세요`);
        localStorage.clear(); //localStorage 초기화하고
        window.location.href="login.html"; //로그인 페이지로 보내기
    }

    //세션검사 함수
    function authCheck(){

        // alert("authCheck tokenCheck : " + tokenCheck);

        /* 토큰 확인 */
        // alert("토큰이 확인되었습니다.");

        const url = "http://129.154.220.20:8080/api/authcheck";

        //1-1. API서버로 접근 유효 체크
        fetch(url, {
            method: "post",
            body: JSON.stringify({"token":tokenCheck}),
            headers: {
                "Content-Type": "application/json"
            }})
            .then((response) => response.json())
            .then((data) => {

                //1-2. 접근 유효 체크
                //null / undefiend / 빈값("")
                if(data.hojinToken == null || data.hojinToken == undefined){
                    alert("비정상적인 접근입니다.22");
                    localStorage.clear(); //localStorage 초기화하고
                    window.location.href="login.html"; //로그인 페이지로 보내기
                } else if (data.hojinToken != null) { 
                            /* 토큰검사 완료 */
                    // alert("토큰검사 완료 왔다 : " + data.hojinToken);
                    localStorage.setItem("HojinToken", data.hojinToken);
                } else {
                    alert(`홈페이지에 문제가 발견되었습니다. \n관리자에게 연락하세요`);
                    localStorage.clear(); //localStorage 초기화하고
                    window.location.href="login.html"; //로그인 페이지로 보내기
                } //end if
            })//end fetch then
    }//end authCheck
    ////////////////////////////////////////////////////////////////////////////////////////////////