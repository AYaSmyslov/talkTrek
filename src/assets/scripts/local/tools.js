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



function checkPass(password) {
    if (password.length < 4) {
        alert('Пароль слишком короткий (не менее 4 символов)');
        return false;
    }

    if (!/\d/.test(password)) {
        alert('Пароль должен содержать хотя бы одну цифру');
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        alert('Пароль должен содержать хотя бы одну заглавную букву');
        return false;
    }

    if (!/[a-z]/.test(password)) {
        alert('Пароль должен содержать хотя бы одну строчную букву');
        return false; 
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        alert('Пароль может содержать только буквы и цифры');
        return false;
    }

    return true;
}

function checkUsername(username) {
    if (username.length == 0) {
        alert('Логин не может быть пустым'); 
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert('Логин может содержать только буквы и цифры');
        return false;
    }

    return true;
}