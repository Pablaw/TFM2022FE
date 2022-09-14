//호진제작
//로그아웃
const logoutCheck_button = document.querySelector("#logoutCheck");

logoutCheck_button.addEventListener("click", logoutCheck);

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
            alert("로그아웃 메시지 : " + msg);
            window.location.href="login.html";            
        })//end ftech then
    }//end if
}//end logoutCheck
