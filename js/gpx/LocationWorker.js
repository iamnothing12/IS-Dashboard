
function updateUserLocation(g) {
	console.log("yolo");
	marker = g[0];
	map = g[1];
	while(true) {
		console.log("running");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				marker.setMap(null)
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
}
