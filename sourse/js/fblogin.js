var fbdate = document.getElementById('date');
var fbemail = document.getElementById('email');
var fbname = document.getElementById('username');
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        setElement(true);
        testAPI();
    } else {
        fbemail.value = "";
        fbdate.value = "";
        fbname.value = "";
        setElement(false);

    }
}


// 確認用戶是否已經使用「Facebook 登入」來登入您的應用程式需要兩段程式碼
//它會呼叫 FB.getLoginStatus() 來取得最新的登入狀態
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);

    });
}
//基本設定
window.fbAsyncInit = function () {
    FB.init({
        appId: '1653516004671630',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};
//這個函式會觸發對 Facebook 的呼叫來取得登入狀態，接著呼叫您的回呼函式來傳回結果。



(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



function setElement(isLoggedIn) {
    if (isLoggedIn) {
        console.log(isLoggedIn);
    } else {
        console.log(isLoggedIn);
    }
}


function testAPI() {
    FB.api('/me?fields=name,email,birthday,location', function (response) {
        if (response && !response.error) {
            buildUserData(response);
        }
    })
}

function buildUserData(user) {
    fbdate.value = user.birthday;
    fbemail.value = user.email;
    fbname.value = user.name;

}





