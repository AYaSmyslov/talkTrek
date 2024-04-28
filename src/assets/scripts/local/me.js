
checkCookie('sessionData').then(result => {
	if (result) {
		// авторизован, остаемся тут
		getUserName();
	} else {
		// не авторизован, выкинуть на форму авторизации
		window.location.href = "/";
	}
});

var goMainBtn = document.getElementById("goMainBtn");

goMainBtn.addEventListener("click", function() {
    window.location.href = "/src/templates/pages/main.html";
});

var goSettingsBtn = document.getElementById("goSettingsBtn");

goSettingsBtn.addEventListener("click", function() {
    window.location.href = "/src/templates/pages/settings.html";
});



function getUserName() {
	let cookieValue = getCookieValue('sessionData');

    let cookieData;
    try {
        cookieData = JSON.parse(cookieValue);
    } catch (error) {
        return;
    }

	fetch(`/getUserName`, {
        method: 'POST',
		credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
		body: cookieData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Ошибка при получении имени пользователя');
        }
    })
    .then(login => {
        document.getElementById('username').innerText = login.message;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}