var goMainBtn = document.getElementById("goMainBtn");

goMainBtn.addEventListener("click", function() {
    window.location.href = "/src/templates/pages/main.html";
  });

document.querySelector('.btn').addEventListener('click', function(e) {
	e.preventDefault();
});

const changeUsername = () => {
	let _usernameInput = document.querySelector('#username');
	let _username = document.querySelector('#user');
	
	_usernameInput.addEventListener('input', function(e) {
		const user = () => {
				if (_usernameInput.value === '') {
				_username.innerHTML = 'picasso';
			} else {
				var user = _usernameInput.value || "";
				_username.innerHTML = user.toLowerCase();
			}
		}
		
		const userLength = () => {
			let _usernameLabel = document.querySelector('#userLabel');
			if (_username.textContent.length >= 13) {
				_usernameInput.className += ' error';
				_username.innerHTML += ' – max length reached';
			} else {
				_usernameInput.classList.remove('error');
			}
		}
		
		user();
		userLength();
		
	});
}


changeUsername();



