checkCookie('sessionData').then(result => {
	if (result) {
		// авторизован, остаемся тут
	} else {
		// не авторизован, выкинуть на форму авторизации
		window.location.href = "/";
	}
});

let cookieValue = getCookieValue('sessionData');
let cookieData = JSON.parse(cookieValue);

var markReadedBtn = document.getElementById("markReadedBtn");
markReadedBtn.addEventListener("click", function(e) {
	markReaded();
});

function markReaded() {
    fetch(`/markReaded`, {
		method: 'POST',
		credentials: 'same-origin',
        headers: {
			'Content-Type': 'application/json'
        },
		body: JSON.stringify({
			cookieData,
			link: 'news-events'
		})

    })
    .then(response => {
		if (!response.ok) {
			throw new Error('Ошибка сети');
		}
        window.location.href = "/src/templates/pages/manual.html";
    })
    .catch(error => {
		console.error('Ошибка:', error);
    });
}