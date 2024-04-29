checkCookie('sessionData').then(result => {
  if (result) {
    // авторизован, остаемся тут
    getBadge();
  } else {
    // не авторизован, выкинуть на форму авторизации
    window.location.href = "/";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Массив с забавными фразами
  const funnyPhrases = [
      "POV Препод: Pull the ticket. Tell me the number POV Студент: Нам бы троечку",
      "Moscow.. Mos cow.. Мос корова",
      "Где отчеты??? а че ты?????",
      "Без даты"
  ];

  // Получаем элемент <p> по его классу
  const introParagraph = document.querySelector(".intro");

  // Выбираем случайную фразу из массива и вставляем её в элемент <p>
  introParagraph.textContent = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
});


window.addEventListener('resize', function () {
  var container = document.getElementById('container');
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  if (windowHeight > windowWidth) {
    // container.style.width = '50vh';
    // container.style.marginLeft = '5%';
  }
});

function getBadge() {
  let cookieValue = getCookieValue('sessionData');

  let cookieData;
  try {
    cookieData = JSON.parse(cookieValue);
  } catch (error) {
    return;
  }
  var tests = document.getElementById("tests");
  var manuals = document.getElementById("manuals");
  fetch(`/getNotPassedTests`, {
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
    .then(data => {
      tests.textContent = data.message[0].tests_not_passed;
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });



  fetch(`/getNotReadedManuals`, {
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
    .then(data => {
      manuals.textContent = data.message[0].manuals_not_readed;
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });

}

document.getElementById("menu").addEventListener("click", function () {
  document.getElementById("mainmenu").classList.toggle("showmenu");
  document.getElementById("mainscreen").classList.toggle("movemaincontainer");
});

document.getElementById("menu").addEventListener("click", function () {
  document.getElementById("mainmenu2").classList.toggle("showmenu2");
  document.getElementById("mainscreen").classList.toggle("movemaincontainer");
});

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("mainmenu").classList.toggle("showmenu");
});

var meBtn = document.getElementById("meBtn");
var settingsBtn = document.getElementById("settingsBtn");
var logoutBtn = document.getElementById("logoutBtn");
var examBtn = document.getElementById("examBtn");
var manualBtn = document.getElementById("manualBtn");
var messengerBtn = document.getElementById("messengerBtn");
var translateBtn = document.getElementById("translateBtn");
var aboutBtn = document.getElementById("aboutBtn");

meBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/me.html";
});

settingsBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/settings.html";
});

logoutBtn.addEventListener("click", function () {
  logoutFunction();
  window.location.href = "/";
});

function logoutFunction() {
  document.cookie = "sessionData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  alert("Выход выполнен");
}

examBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/exam.html";
});


manualBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/manual.html";
});

messengerBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/messenger.html";
});

translateBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/translate.html";
});

aboutBtn.addEventListener("click", function () {
  window.location.href = "/src/templates/pages/about.html";
});