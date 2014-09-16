navigator.vibrate(2000);
var _ = function(param) {
    return document.getElementById(param);
};


window.addEventListener('load', function() {
    App.showHistorial();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(App.dondeEstoy);
    }

    window.addEventListener('online', function(){console.log("Estamos de vuelta")});
    window.addEventListener('offline', function(){console.log("Estamos desconectados")});
});

var App = {
    stream : "",
    saveHistorial : function(elem){
        localStorage.setItem(Number(new Date()), elem);
    },
    showHistorial: function(){
        _("historial").innerHTML = "";
        for(var timestamp in localStorage){
            var li = document.createElement("li");
            li.innerHTML = timestamp + " -> " + localStorage[timestamp];
            _("historial").appendChild(li);
        }
    },
    dondeEstoy: function(position){
        console.log(position);
        var latitud     =  position.coords.latitude,
            longitud    = position.coords.longitude,
            error       = position.coords.accuracy;

        _('latitud').value = latitud;
        _('longitud').value = longitud;
        _('error').value = error;
        _('buscar').addEventListener('click', App.buscarPosicion, false);
        _("full").addEventListener('click', function(){
            var i = _("contenido");

            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        });
    },
    refreshCanvas: function(){
        /* Primero se recupera el objeto canvas a modificar */
        var canvas = document.getElementById('elCanvas');

        // Luego se le indicar la forma de trabajar 2D o 3D
        var context = canvas.getContext('2d');

        // Se comienza a dibujar en el lienzo utilizando objetos
        // gráficos

        context.fillStyle = "rgb(0,255,0)";
        context.fillRect (25, 25, 100, 100);

        context.fillStyle = "rgba(255,0,0, 0.6)";
        context.beginPath();
        context.arc(125,100,50,0,Math.PI*2,true);
        context.fill();

        context.fillStyle = "rgba(0,0,255,0.6)";
        context.beginPath();
        context.moveTo(125,100);
        context.lineTo(175,50);
        context.lineTo(225,150);
        context.fill();
    },
    buscarPosicion: function(){
            var latitud = _('latitud').value,
                longitud = _('longitud').value,
                error = _('error').value,
                mapa = document.createElement('div');
            mapa.id = 'mapa';
            mapa.style.height = '400px';
            mapa.style.width = '560px';
            _("contenido").innerHTML = "";
            _("contenido").appendChild(mapa);

            var latlng = new google.maps.LatLng(latitud,longitud);

            var myOptions = {
                zoom: 15,
                center: latlng,
                mapTypeControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("mapa"), myOptions);

            var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              title:"Estas mas o menos aca (+-"+error+" metros)"
            });

            var tipoDeResumen = _('tipoDeResumen').value;

            var datos = {
                latitud : _('latitud').value,
                longitud : _('longitud').value,
                error : _('error').value,
            };

            switch (tipoDeResumen){
                case "Json":
                    _('texto').innerHTML = JSON.stringify(datos,null,'\n');
                    break;
                case "Humano":
                    _('texto').innerHTML = "Usted mas o menos en " + latitud + "," + longitud + "(+-" + error + " metros)" ;
                    break;
            }

            App.saveHistorial("Estabas en " + latitud + " / " + longitud);
            App.showHistorial();

            App.refreshCanvas();
      }
};



/*
navigator.geolocation.watchPosition(function(position) {
 _('currentLat').innerHTML = position.coords.latitude;
 _('currentLon').innerHTML = position.coords.longitude;
});
*/
