// =================================================================
// Главное меню
// =================================================================
(function() {
  setTimeout(function() {
    var mainMenu = document.getElementsByClassName("main-menu__list");
    var mainMenuOpenBtn = document.getElementsByClassName("main-menu__open-link");
    var mainMenuCloseBtn = document.getElementsByClassName("main-menu__close");

    mainMenuOpenBtn.item("").addEventListener("click", function(event) {
      event.preventDefault();
        mainMenu.item("").classList.remove("main-menu--close");
    });

    mainMenuCloseBtn.item("").addEventListener("click", function(event) {
      event.preventDefault();
      mainMenu.item("").classList.add("main-menu--close");
    });
  }, 1000);


})();
