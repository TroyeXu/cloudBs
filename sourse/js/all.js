var dataweather;

new WOW().init();
function getweather() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.openweathermap.org/data/2.5/forecast?q=TaiChung,tw&APPID=508dc63241bf70a6ba0747bd62c64639&lang=zh_tw&units=metric', true);
    xhr.send(null);
    xhr.onload = function () {
        // 把json填入變數
        var reText = JSON.parse(this.responseText);
        var city = reText.city.name + "," + reText.city.country;
        var weatherTitle = reText.list[0].weather[0].main;
        var temp = reText.list[0].main.temp + "°";
        var locationLat = reText.city.coord.lat;
        var locationLon = reText.city.coord.lon;
        dataweather = city + "/" + weatherTitle + "/" + temp;
        initMap();
    };

}
getweather();


//驗證
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelector('.needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
        styles:
            [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "42"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#ff0000"
                        },
                        {
                            "saturation": "-100"
                        },
                        {
                            "gamma": "0.78"
                        },
                        {
                            "weight": "0.37"
                        },
                        {
                            "invert_lightness": true
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#3ec7c9"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent(dataweather);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}




//scroll


$(document).ready(function () {
    $('.scrollTop').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        //讀取href
        var targetPos = $(target).offset().top;
        //取處這些id的位置， offset有TOP與left
        $('html, body').animate({ scrollTop: targetPos - 60 }, 1000);
    });

});



$(window).scroll(function (e) {
    if ($(window).scrollTop() <= 0)
        $('.fb').hide();
    else
        $('.fb').show();
    if ($(window).scrollTop() <= 0)
        $('.navbar').addClass('at_top');

    else
        $('.navbar').removeClass('at_top');

});



//分析 hotjar
(function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
    h._hjSettings = { hjid: 774977, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

//ga分析
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-89388320-2');