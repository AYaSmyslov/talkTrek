checkCookie('sessionData').then(result => {
  if (result) {
      // авторизован, остаемся тут
  } else {
    // не авторизован, выкинуть на форму авторизации
    window.location.href = "/";
  }
});



window.addEventListener('load', function() {
  var container = document.getElementById('container');
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  if (windowHeight > windowWidth) {
      container.style.width = '50vh';
      container.style.marginLeft = '5%'; 
  }
});


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
var manualBtn = document.getElementById("manualBtn");
var translateBtn = document.getElementById("translateBtn");

meBtn.addEventListener("click", function() {
  window.location.href = "/src/templates/pages/me.html";
});

settingsBtn.addEventListener("click", function() {
  window.location.href = "/src/templates/pages/settings.html";
});

logoutBtn.addEventListener("click", function() {
  logoutFunction();
  window.location.href = "/";
});

function logoutFunction() {
  document.cookie = "sessionData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  alert("Выход выполнен");
}

manualBtn.addEventListener("click", function() {
  window.location.href = "/src/templates/pages/manual.html";
});

translateBtn.addEventListener("click", function() {
  window.location.href = "/src/templates/pages/translate.html";
});