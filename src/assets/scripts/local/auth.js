let logIsOpen = false;
let regIsOpen = false;

checkCookie('sessionData').then(result => {
  if (result) {
      // авторизован, заходим на главную
      window.location.href = "/src/templates/pages/main.html";
  } else {
      // не авторизован, остаемся тут
  }
});



function registerUser() {
  const username = document.getElementById('usernameReg').value;
  const password = document.getElementById('passwordReg').value;
  const confirmPassword = document.getElementById('confirmPasswordReg').value;

  // Проверка соответствия пароля и его подтверждения
  if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
  }

  const formData = {
      login: username,
      pass: password
  };

  fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
    console.log('Статус ответа:', response.status);
      if (!response.ok) {
          throw new Error('Ошибка сети');
      }
      alert('Регистрация успешна');

      // return response.json();
  })
  // .then(data => {
  //     // Обработка ответа от сервера
  //     console.log(data);
  //     alert('Регистрация успешна');
  // })
  .catch(error => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при регистрации: ' + error.message);
  });
}






function setCookie(name, value, minutes) {
  var expires = "";
  if (minutes) {
      var date = new Date();
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



function loginUser() {
  const username = document.getElementById('usernameLog').value;
  const password = document.getElementById('passwordLog').value;

  const formData = {
      login: username,
      pass: password
  };

  fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
    console.log('Статус ответа:', response.status);
      if (!response.ok) {
          throw new Error('Ошибка сети');
      }
      
      return response.text();

      
      // return response.json();
  })
  .then(responseData    => {
    alert('Авторизован');
    const cookieValue = JSON.stringify(responseData);
    setCookie('sessionData', cookieValue, 5);
    location.reload();
    // window.location.href = "/src/templates/pages/main.html";
  })
  .catch(error => {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при авторизации: ' + error.message);
  });
}



function showLogin() {
  if (!logIsOpen)
  {
    logIsOpen = true;
    regIsOpen = false;
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, 400);

    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.display = "none";
    }, 200);
  }
  else
  {
    loginUser();
  }
}



function showRegForm(at) {
  if (!regIsOpen)
  {
    regIsOpen = true;
    logIsOpen = false;
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";
    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.opacity = "1";
    }, 100);
    
    setTimeout(function () {
      document.querySelector('.cont_form_login').style.display = "none";
    }, 400);
  }
  else
  {
    registerUser();
  }

}



function hideRegForm() {
  logIsOpen = false;
  regIsOpen = false;
  document.querySelector('.cont_forms').className = "cont_forms";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
    document.querySelector('.cont_form_sign_up').style.display = "none";
    document.querySelector('.cont_form_login').style.display = "none";
  }, 500);
}




