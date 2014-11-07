$(function(){
	$('#splash .content').css('margin-top', screen.height / 3);
	$('#portfolio .content').css('margin-top', screen.height / 4 + 42);
	$("header").sticky({
		topSpacing: 0,
		wrapperClassName: 'headerSticky'
	});

	cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
		$('.md-show').removeClass('md-show');
		$('#modal-stream').addClass('md-show');
		jwplayer("video").setup({
			file: "rtmp://charlescarnell.co.uk/live/flv:test",
			height: '100%',
			width: '100%',
			aspectratio: '16:9'
		});
	});

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
				}
			}
	  });

	$('#mapSearch').on('submit', function(ev){
		ev.preventDefault();
		getRoute($('#mapOrigin').val(), $('#mapDestination').val());
	});

	directionsDisplay.setMap(map);
});

var mapOptions = {
	center: { 
		lat: 33.678176,
		lng: -116.242568
	},
	zoom: 11
}
var map = new google.maps.Map(document.getElementById('mapObject'),mapOptions);
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService;
var placesService = new google.maps.places.PlacesService(map);
var infowindow = new google.maps.InfoWindow();
var routeBoxer = new RouteBoxer();
var distance = 2;
var boxes;


function getRoute(origin, destination){
	var origin = $('#mapOrigin').val();
	var destination = $('#mapDestination').val();
	directionsService.route({
		origin: origin,
		destination: destination,
		travelMode: google.maps.TravelMode.DRIVING

	}, function(response, status){
		if( status == google.maps.DirectionsStatus.OK ){

			directionsDisplay.setDirections(response);
			var path = response.routes[0].overview_path;
			boxes = routeBoxer.box(path, distance); 
			drawBoxes(boxes)
			var bounds = new google.maps.LatLngBounds
			for (var i = 0; i < boxes.length; i++) {
				placesService.nearbySearch({
					bounds: boxes[5], 
					radius: '5'
				}, function(results, status){
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						for (var i = 0; i < results.length; i++) {
							createMarker(results[i]);
						}
					} else {
						console.log('');
					}
				});

			}
		} else {
			// Directions request failed
			alert('Request failed!');
		}
	});
}

function createMarker(place){
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

// Draw the array of boxes as polylines on the map
function drawBoxes(boxes) {
  boxpolys = new Array(boxes.length);
  for (var i = 0; i < boxes.length; i++) {
    boxpolys[i] = new google.maps.Rectangle({
      bounds: boxes[i],
      fillOpacity: 0,
      strokeOpacity: 1.0,
      strokeColor: '#000000',
      strokeWeight: 1,
      map: map
    });
  }
}

// Clear boxes currently on the map
function clearBoxes() {
  if (boxpolys != null) {
    for (var i = 0; i < boxpolys.length; i++) {
      boxpolys[i].setMap(null);
    }
  }
  boxpolys = null;
}