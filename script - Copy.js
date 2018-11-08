$(document).ready(function() {
    $("#file-input").change(function(){
      var reader = new FileReader();
    
    reader.onload = function(e){
      var text = reader.result;
      var gpxDoc = $.parseXML(text);
      var $xml = $(gpxDoc);
      alert($xml.find('name').text());
      
      var alerted = false;
      
      $xml.find('trkpt').each(function(){
          var lat = $(this).attr('lat');
        var lon = $(this).attr('lon');
        		  var image = 'a.jpg';
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
          map: map,
          icon: image
        });
      });
    };
    
    reader.readAsText(this.files[0]);
  });
});

function getLocation(callback) {
     if (navigator.geolocation) {
       var lat_lng = navigator.geolocation.getCurrentPosition(function(position){
          var user_position = {};
          user_position.lat = position.coords.latitude; 
          user_position.lng = position.coords.longitude; 
          callback(user_position);
       });
     } else {
         alert("Geolocation is not supported by this browser.");
     }
}



var map, marker;
function initMap() {
    var latLng = new google.maps.LatLng(1.4304, 103.8354);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: latLng,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        zoomControl: false
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };

        marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Hello World!'
          });
  
        map.setCenter(pos);
    }, function() {
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
      infoWindow.open(map);
    }


