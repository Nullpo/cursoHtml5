var _ = function(param) {
        return document.getElementById(param);
};

window.addEventListener("DOMContentLoaded", function() {
    _('buscar').addEventListener('click', App.buscarPosicion, false);

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latitud = position.coords.latitude,
                longitud = position.coords.longitude,
                error = position.coords.accuracy;
            console.log(position);
            _("latitud").value = latitud;
            _("longitud").value = longitud;
            _("error").value = error;
            _("fullscreen").addEventListener('click',App.fullscreen);
        });
    }
});

var App = {
    fullscreen: function() {
        var i = _("mapa");

            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
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
            App.saveHistorial({
                latitud: latitud,
                longitud: longitud,
                error: error
            });
            App.showHistorial();
    },
    /**
     obj = {
      latitud:
      longitud:
      error:
     }
    */
    saveHistorial: function(obj){
        localStorage.setItem(Number(new Date), "lat: " + obj.latitud + " long:" + obj.longitud);
    },
    showHistorial : function(){
        _("historial").innerHTML = "";
        for(var timestamp in localStorage){
            var li = document.createElement("li");
            li.innerHTML = timestamp + " -> " + localStorage[timestamp];
            _("historial").appendChild(li);
        }
    }

}
