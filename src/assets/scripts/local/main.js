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

var translateBtn = document.getElementById("translateBtn");

meBtn.addEventListener("click", function() {
  logoutFunction();
  window.location.href = "/src/templates/pages/me.html";
});

settingsBtn.addEventListener("click", function() {
  logoutFunction();
  window.location.href = "/src/templates/pages/settings.html";
});

logoutBtn.addEventListener("click", function() {
  logoutFunction();
  window.location.href = "/";
});

function logoutFunction() {
  // alert("Выход выполнен");
}


translateBtn.addEventListener("click", function() {
  window.location.href = "/src/templates/pages/translate.html";
});