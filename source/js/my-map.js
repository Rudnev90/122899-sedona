window.load = function() {
  ymaps.ready(init);
  var myMap,
    myPlacemark;

  function init() {
    myMap = new ymaps.Map("map", {
      center: [34.86, -111.80],
      zoom: 10
    });

    myPlacemark = new ymaps.Placemark([34.86, -111.80], {
      hintContent: "Седона"
    }, {
      iconLayout: "default#image",
      iconImageHref: "img/my-placemark-map.png",
      iconImageSize: [27, 27],
      iconImageOffset: [-15, -8]
    });

    myMap.geoObjects.add(myPlacemark);

    // Получение кооринат мыши по клику
    // myMap.events.add('click', function(e){
    //    var coords = e.get('coords');
    //    console.log(coords);
    //  });
  }
}
