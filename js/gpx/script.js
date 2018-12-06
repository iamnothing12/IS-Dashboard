// base code for loadCoords
$(document).ready(function () {
  $("#file-input").change(function () {

    var reader = new FileReader();

    reader.onload = function (e) {
      var text = reader.result;
      var gpxDoc = $.parseXML(text);
      var $xml = $(gpxDoc);
      alert($xml.find('name').text());

      var alerted = false;

      $xml.find('trkpt').each(function () {
        var lat = $(this).attr('lat');
        var lon = $(this).attr('lon');
        var image = 'images/man.png';
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
        userCp = i - 1;
      });
      // ghost polyline
      ghostPath = new google.maps.Polyline({
        strokeColor: '#ff0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
      });
      // original polyline
      visitPath = new google.maps.Polyline({
        strokeColor: '#000ec9',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        path: allCoord
      });


      
      //put lines on map
      ghostPath.setMap(map);
      visitPath.setMap(map);
    };
    // map.setCenter(allMyMarkers[0].getPosition().lat(), allMyMarkers[0].getPosition().lng());
    reader.readAsText(this.files[0]);

  });
});
// global variables 
var i = 0;
var userCp = 0;
var marker, map;
var userLocationWorker;
var allMyMarkers = [];
var allCoord = [];
var visitPath, ghostPath;
var time, clicked = false,
  sec = 0;
var clock;

var autoLoad;

// load map on start
function initMap() {
  // get user current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        //disable map ui
        disableDefaultUI: true
      });
      // marker to simulate demo user
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        visible: true
      });
      loadFile("bedok.gpx");
	  allMyMarkers[i].setIcon("images/start.png");
      marker.addListener('click', toggleBounce);
      //var latLng = new google.maps.LatLng(lat,lng);
      google.maps.event.addListener(marker, 'drag', function () {
        //updateMarkerStatus('Dragging...');
        updateUserLocation2(marker.getPosition());
      });
    });
  }
}

// gpx reader and plot the points
function loadFile(filePath) {
  // user radius checker
  if (marker != undefined && map != undefined) {
    var options = {
      enableHighAccuracy: true,
      timeout: 10,
      maximumAge: 0
    };
    var watchLoc = navigator.geolocation.watchPosition(updateUserLocation2, navError, options);
  } else {
    console.log("marker or map undefined");
  }

  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    console.log("xml success");
    result = xmlhttp.responseText;
  } else {
    console.log("xml failed");
  }
  autoLoad = result;
  // gpx parsing
  var text = result;
  var gpxDoc = $.parseXML(text);
  var $xml = $(gpxDoc);
  alert($xml.find('name').text());

  var alerted = false;

  $xml.find('trkpt').each(function () {
    var lat = $(this).attr('lat');
    var lon = $(this).attr('lon');
    var image = 'images/man.png';
    var mrk = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: map,
      icon: image,
    });
    // push markers and coordinates into arrays
    allMyMarkers.push(mrk);
    allCoord.push(mrk.getPosition());
	allMyMarkers[0].setIcon("images/end.png");
    // visitPath.setPath(allCoord);
    console.log(allCoord[i++].toString());
    console.log(userCp);
    userCp = i - 1;
  });
	
  // ghost polyline
  ghostPath = new google.maps.Polyline({
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    path: allCoord
  });
  
  // original polyline
  visitPath = new google.maps.Polyline({
    strokeColor: '#000ec9',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    path: allCoord
  });
  // clicked = true;


  // visitPath.setPath(allCoord);
  // put lines on map
  ghostPath.setMap(map);
  visitPath.setMap(map);
}

function navError() {
  //console.warn(`ERROR(${err.code}): ${err.message}`);
}

// detect if user "hit" checkpoints
function updateUserLocation2(position) {
  //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //var latLng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
  var latLng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
  marker.setPosition(latLng);
  if (clicked) {
    var dist = google.maps.geometry.spherical.computeDistanceBetween(allMyMarkers[userCp].getPosition(), latLng);
    if (dist <= 20) {
      allMyMarkers[userCp].setIcon("images/flag.png");
      //allMyMarkers[userCp].setVisible = false;
      userCp--;
    }
    console.log("DISTANCE:");
    console.log(dist);
    //allMyMarkers[i--].setIcon("b.png");

    if(userCp == 0) { 
      window.location.replace("win.html");
    }
  }
}

// template for user detection
function updateUserLocation() {
  if (navigator.geolocation) {
    console.log("Getting location");
    console.log(marker.getPosition().lat());
    navigator.geolocation.getCurrentPosition(function (position) {
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



// ghost chaser, updates the icons
function deleteMarker() {
  if (i < -1) {
    alert("Please open a GPX file.");
    clearInterval(time);
    return;
  }

  allMyMarkers[i--].setIcon("images/f.png");
  if (i < userCp) {
    window.location.replace("lose.html");
  }
  //allMyMarkers[i--].
  // allMyMarkers[i--].setVisible(false);
  // var gPath;
  var vPath;
  // gPath = ghostPath.getPath();
  vPath = visitPath.getPath();
  vPath.pop();
  // gPath.push(vPath.pop());
  // if(vPath.getlength > 0)    
  //   gPath.push(vPath.push(v.getLength - 1));

}

// signal the start for the race
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

// function addMarker() {
//   if (i >= allMyMarkers.length) {
//     alert("You lazy fag never put gpx file in!");
//     return;
//   }

//   allMyMarkers[i++].setVisible(true);
// }
var min;
// time management for the run
function stopWatch() {
  sec++;
    
  document.getElementById("timer").innerHTML = sec;
}
// stop run
function stopClock() {
  window.clearInterval(clock);
  sec = 0;

  document.getElementById("timer").innerHTML=0;
  clicked = false;
}

// start run and the stopwatch
function startClock() {
  if (clicked === false) {
      clock = setInterval("stopWatch()", 1000);
      clicked = true;
  }
  else if (clicked === true) {
  }
}	
