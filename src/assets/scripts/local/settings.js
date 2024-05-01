checkCookie('sessionData').then(result => {
	if (result) {
		// авторизован, остаемся тут
		getUserName();
	} else {
		// не авторизован, выкинуть на форму авторизации
		window.location.href = "/";
	}
});

let cookieValue = getCookieValue('sessionData');
let cookieData = JSON.parse(cookieValue);

var goMainBtn = document.getElementById("goMainBtn");
goMainBtn.addEventListener("click", function () {
	window.location.href = "/src/templates/pages/main.html";
});

var goMeBtn = document.getElementById("goMeBtn");

goMeBtn.addEventListener("click", function () {
	window.location.href = "/src/templates/pages/me.html";
});

// document.querySelector('.btn').addEventListener('click', function(e) {
// 	e.preventDefault();
// 	updateUser();
// });

var changeLoginBtn = document.getElementById("changeLogin");
changeLoginBtn.addEventListener("click", function (e) {
	updateLogin();
});

function updateLogin() {
	let username = document.getElementById('username').value;

	if (!checkUsername(username)) {
	  return;
	}

	fetch(`/updLogin`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cookieData,
			username: username
		})

	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Ошибка сети');
			}
			// location.reload();
		})
		// .catch(error => { // почему-то всегда исключение кидает
		// 	console.error('Ошибка:', error.toString());
		// 	alert('Имя пользователя недоступно');
		// });


}



var changePassBtn = document.getElementById("changePass");
changePassBtn.addEventListener("click", function (e) {
	updatePass();
});

function updatePass() {
	let oldPass = document.getElementById('oldPass').value;
	let newPass = document.getElementById('newPass').value;
	let newPass2 = document.getElementById('newPass2').value;

	if (newPass !== newPass2) {
		alert('Пароли не совпадают');
		return;
	}

	if (!checkPass(password)) {
		return;
	}

	fetch(`/updPass`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			cookieData,
			oldPass: oldPass,
			newPass: newPass
		})

	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Ошибка сети');
			}
			alert('Изменения сохранены');
			// location.reload();
		})
		.catch(error => {
			console.error('Ошибка:', error);
		});


}



function getUserName() {
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
			document.getElementById('username').value = login.message;
		})
		.catch(error => {
			console.error('Ошибка:', error);
		});
}


