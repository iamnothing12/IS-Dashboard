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
        		  var image = 'images/a.png';
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          map: map,
          icon: image,
        });
    allMyMarkers.push(marker);
    allCoord.push(marker.getPosition())
    // visitPath.setPath(allCoord);
		console.log(allCoord[i++].toString());
		console.log(userCp);
		userCp = i-1;
      });

      ghostPath = new google.maps.Polyline({
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
    });
    
    visitPath = new google.maps.Polyline({
        strokeColor: '#000ec9',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
      });

   
    // visitPath.setPath(allCoord);
    
    ghostPath.setMap(map);
    visitPath.setMap(map);
    };
   // map.setCenter(allMyMarkers[0].getPosition().lat(), allMyMarkers[0].getPosition().lng());
    reader.readAsText(this.files[0]);
    
  });
});
var i = 0;
var userCp = 0;
var marker, map;
var userLocationWorker;
var allMyMarkers = [];
var allCoord = [];
var visitPath, ghostPath;
var time, clicked=false,sec=0;
var clock;

var autoLoad;

function initMap() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 15,
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        //disable map ui
        disableDefaultUI: true
			});
			
			marker = new google.maps.Marker({
        map: map,
			  draggable: true,
			  animation: google.maps.Animation.DROP,
			  position: {lat: position.coords.latitude, lng:position.coords.longitude},
			  visible: true
			});
      loadFile("bedok.gpx");
      marker.addListener('click', toggleBounce);
      //var latLng = new google.maps.LatLng(lat,lng);
		 google.maps.event.addListener(marker, 'drag', function() {
		//updateMarkerStatus('Dragging...');
		updateUserLocation2(marker.getPosition());
		});
	   });
    }
}

function loadFile(filePath) {

  if (marker !=undefined && map != undefined) {
      var options = {enableHighAccuracy: true,timeout: 10,maximumAge: 0};
      var watchLoc = navigator.geolocation.watchPosition(updateUserLocation2, navError, options);
    } else {
      console.log("poo");
    }

  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    console.log("Yeetster");
    result = xmlhttp.responseText;
  } else {
    console.log("No yeet :(");
  }
  autoLoad = result;

      var text = result;
      var gpxDoc = $.parseXML(text);
      var $xml = $(gpxDoc);
      alert($xml.find('name').text());
      
      var alerted = false;
      
      $xml.find('trkpt').each(function(){
          var lat = $(this).attr('lat');
        var lon = $(this).attr('lon');
              var image = 'images/a.png';
        var mrk = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          map: map,
          icon: image,
        });
    allMyMarkers.push(mrk);
    allCoord.push(mrk.getPosition())
    // visitPath.setPath(allCoord);
    console.log(allCoord[i++].toString());
    console.log(userCp);
    userCp = i-1;
      });

      ghostPath = new google.maps.Polyline({
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
    });
    
    visitPath = new google.maps.Polyline({
        strokeColor: '#000ec9',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
      });
    // clicked = true;

   
    // visitPath.setPath(allCoord);
    
    ghostPath.setMap(map);
    visitPath.setMap(map);
}

function navError(){
	  //console.warn(`ERROR(${err.code}): ${err.message}`);
}

function updateUserLocation2(position) {
	//var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //var latLng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
  var latLng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
	marker.setPosition(latLng);
	console.log("gogg");
	if (clicked) {
		var dist = google.maps.geometry.spherical.computeDistanceBetween(allMyMarkers[userCp].getPosition(), latLng);
		if (dist <= 20) {
			allMyMarkers[userCp].setIcon("images/spag.jpeg");
      //allMyMarkers[userCp].setVisible = false;
			userCp--;
		}
		console.log("DISTANCE:");
		console.log(dist);
		//allMyMarkers[i--].setIcon("b.png");
	}
}

function updateUserLocation() {
	if (navigator.geolocation) {
		console.log("Getting location");
		console.log(marker.getPosition().lat());
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("dddddd");
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			console.log("New Pos");
			console.log(latlng.lat());
			marker.setPosition(latlng);
		}, navError);
		console.log("Done");
		console.log(marker.getPosition().lat());
    }
}

 function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        document.getElementById("button1").setVisible = false;
      }
	

function startGame(){
	time = setInterval(deleteMarker, 5000);
	
	if (clicked == false) {
        clock = setInterval(stopWatch, 1000);
        clicked = true;
    }
    else if (clicked == true) {
		stopClock();
    }
    document.getElementById("button1").style.visibility = "hidden";
}	  
	  
function deleteMarker(){
	if(i<-1){
			alert("Please open a GPX file."); 
			clearInterval(time);
			return;
	}
	
  allMyMarkers[i--].setIcon("images/b.png");
  // allMyMarkers[i--].setVisible(false);
    var gPath;
    var vPath;
    gPath = ghostPath.getPath();
    vPath = visitPath.getPath();
    vPath.pop();
    // gPath.push(vPath.pop());
    // if(vPath.getlength > 0)    
    //   gPath.push(vPath.push(v.getLength - 1));
	
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
