// ===============================================
// Добавление карточки путешественника
// ===============================================
// ===============================================
// Управдение контролами
// ===============================================


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

// ===============================================
// Удаление карточки путешественника
// ===============================================
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
  var elementsDate = document.querySelectorAll(".fields-controls--date");

  for (var i = 0; i < elementsTraveler.length; i++) {
    initNumberField(elementsTraveler[i]);
    initDay(elementsDate[i]);
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
        if (input.value <= 0) {
          input.value = 0;
          return;
        }
        delTraveler();
        input.value = value - 1;
      }
    };
  }

  function initDay(parent) {
    var inputDate = parent.querySelector("input");
    var minusDate = parent.querySelector(".minus-date");
    var plusDate = parent.querySelector(".plus-date");

    minusDate.addEventListener("click", function() {
      changeDay(false);
    });
    plusDate.addEventListener("click", function() {
      changeDay(true);
    });


    inputDate.addEventListener("change", function() {
      function changeDay(operation) {
        var value = Number(inputDate.value);
        console.log(inputDate.value);
        if (isNaN(value)) {
          value = 0;
        }
        if (operation) {
          inputDate.value = value + 1;
        } else {
          inputDate.value = value - 1;
        }
      };

    });

    function changeDay(operation) {
      var value = Number(inputDate.value);
      if (isNaN(value)) {
        value = 0;
      }
      if (operation) {
        inputDate.value = value + 1;
      } else {
        inputDate.value = value - 1;
      }
    };
  }
})();
// ===============================================
// Добавление превью и отправка формы
// ===============================================
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
