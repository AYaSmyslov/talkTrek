function getCookieValue(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length);
        }
    }
    return null;
}



function checkCookie(cookieName) {
    
    let cookieValue = getCookieValue(cookieName);

    let cookieData;
    try {

        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return Promise.resolve(false);
    }
    
    return fetch('/checkSession', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: cookieData // JSON.stringify(cookieData)
    })
    .then(response => { 
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        return false;
    });
    return Promise.resolve(false);
}
    