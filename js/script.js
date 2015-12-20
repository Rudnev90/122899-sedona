var mainMenu = document.getElementsByClassName('main-menu__list');
var mainMenuOpenBtn = document.getElementsByClassName('main-menu__open-link');
var mainMenuCloseBtn = document.getElementsByClassName('main-menu__close');

mainMenuOpenBtn.item('').addEventListener("click", function(event) {
  event.preventDefault();
  mainMenu.item('').classList.add("main-menu--show");
});

mainMenuCloseBtn.item('').addEventListener("click", function(event) {
  event.preventDefault();
  mainMenu.item('').classList.remove("main-menu--show");
});

// var incomingDate = document.querySelectorAll("#coming");
// var dates = document.querySelectorAll("#data");
// console.log(incomingDate[0].value);
// console.log(dates[0].value);
// incomingDate[0].addEventListener("change", function() {
//   console.log(incomingDate[0].value + dates[0].value);
// })

var dataTravelerInput = 0;
var card;
var areaTraveler = document.querySelector(".traveler-group");

function addTraveler() {
  var template = document.querySelector("#traveler-template").innerHTML;
  var html = Mustache.render(template);
  var div = document.createElement("div");
  div.classList.add("group-fields__card");
  div.innerHTML = html;
  areaTraveler.appendChild(div);
  dataTravelerInput++;
  dataTravelerInput = dataTravelerInput + "";
  div.querySelector(".group-fields-card__numeric").innerHTML = dataTravelerInput;
  card = areaTraveler;
};

function delTraveler() {
  if (!card.childNodes[1]) {
    return;
  }
  card.removeChild(card.lastChild);
  dataTravelerInput--;
  if (dataTravelerInput < 0) {
    i = 0;
  }
}


(function() {
  var elementsTraveler = document.querySelectorAll(".fields-controls--traveler");

  for (var i = 0; i < elementsTraveler.length; i++) {
    initNumberField(elementsTraveler[i]);
  }

  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".group-fields-controls__minus");
    var plus = parent.querySelector(".group-fields-controls__plus");

    minus.addEventListener("click", function() {
      changeNumber(false);
    });
    plus.addEventListener("click", function() {
      changeNumber(true);
    });

    input.addEventListener("change", function() {
      if (typeof(Number(input.value)) != 'number' || Number(input.value) > 50) {
        console.log(parseInt(input.value));
        input.value = dataTravelerInput;
        return;
      }
      if (input.value.indexOf('-') >= 0) {
        input.value = dataTravelerInput;
        return;
      }
      for (input.value; Number(input.value) > Number(dataTravelerInput);) {
        addTraveler();
      }
      if (Number(input.value) == Number(dataTravelerInput)) {
        return;
      }
      for (; parseInt(input.value) < parseInt(dataTravelerInput);) {
        delTraveler();
      }
      if (!Number(input.value)) {
        input.value = dataTravelerInput;
        return;
      }

      console.log(dataTravelerInput);
    })

    function changeNumber(operation) {
      var value = Number(input.value);

      if (isNaN(value)) {
        value = 0;
      }
      if (operation) {
        input.value = value + 1;
        addTraveler();
      } else {
        delTraveler();
        input.value = value - 1;
        if (input.value < 0) {
          input.value = 0;
        }
      }
    }
  }
})();

(function() {
  var form = document.querySelector(".form-review");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    queue.forEach(function(element) {
      data.append("images", element.file);
    });


    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        console.log(xhr.responseText);
        var input = document.querySelector("input");
        input.value = " ";
      }
    });
    xhr.send(data);
  });

  var queue = [];

  form.querySelector("#upload-img").addEventListener("change", function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
    this.value = "";
  });


  function preview(file) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();
      reader.addEventListener("load", function(event) {
        var area = document.querySelector(".upload-img__item-wrap");
        var template = document.querySelector("#image-template").innerHTML;

        var html = Mustache.render(template, {
          "image": event.target.result,
          "name": file.name
        });

        var div = document.createElement("div");
        div.classList.add("upload-img__item");
        div.innerHTML = html;

        area.appendChild(div);

        div.querySelector(".upload-img__item-del").addEventListener("click",
          function(event) {
            event.preventDefault();
            removePreview(div);
          });

        queue.push({
          "file": file,
          "div": div
        });

      });
      reader.readAsDataURL(file);

    }
  };

  function removePreview(div) {
    queue = queue.filter(function(element) {
      return element.div != div;
    });
    div.parentNode.removeChild(div);
  }

})();
