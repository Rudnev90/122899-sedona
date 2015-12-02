var mainMenu = document.getElementsByClassName('main-menu');
var mainMenuBtn = document.getElementsByClassName('main-menu-bar__link');
var mainMenuCloseBtn = document.getElementsByClassName('main-menu__close');


mainMenuBtn.item('').addEventListener("click", function(event){
	event.preventDefault();
	mainMenu.item('').classList.add("main-menu--show");
});

mainMenuCloseBtn.item('').addEventListener("click", function(event){
	event.preventDefault();
	mainMenu.item('').classList.remove("main-menu--show");
});
