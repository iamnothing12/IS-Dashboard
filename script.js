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
          //icon: image,
        });
		allMyMarkers.push(marker);
		console.log(allMyMarkers[i++].getPosition().toString());
      });
    };
   // map.setCenter(allMyMarkers[0].getPosition().lat(), allMyMarkers[0].getPosition().lng());
    reader.readAsText(this.files[0]);
  });
});
var i=0;
var marker, map;
var allMyMarkers =[];

function initMap() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 13,
			  center: {lat: position.coords.latitude, lng: position.coords.longitude}
			});

			marker = new google.maps.Marker({
			  map: map,
			  draggable: true,
			  animation: google.maps.Animation.DROP,
			  position: {lat: position.coords.latitude, lng:position.coords.longitude},
			  visible: true
			});
			marker.addListener('click', toggleBounce);
	});
	}
}

 function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
	
	var time, clicked=false,sec=0;
function startGame(){
	time = setInterval(deleteMarker, 5000);
	
	if (clicked == false) {
        clock = setInterval(stopWatch, 1000);
        clicked = true;
    }
    else if (clicked == true) {
		stopClock();
    }
}	  
	  
function deleteMarker(){
	if(i<-1){
			alert("You lazy fag never put gpx file in!");
			clearInterval(time);
			return;
	}
	
	allMyMarkers[i--].setVisible(false);
	
}

function addMarker(){
	if(i>= allMyMarkers.length){
			alert("You lazy fag never put gpx file in!");
			return;
	}
	
	allMyMarkers[i++].setVisible(true);	
}

function stopWatch() {
    sec++;
    document.getElementById("timer").innerHTML = sec;
}
function stopClock() {
    window.clearInterval(clock);
    sec = 0;
    document.getElementById("timer").innerHTML=0;
    clicked = false;
}

function startClock() {
    if (clicked === false) {
        clock = setInterval("stopWatch()", 1000);
        clicked = true;
    }
    else if (clicked === true) {
    }
}	
/*var map, marker;
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
    }*/