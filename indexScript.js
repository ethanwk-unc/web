// Map options, og location and zoom level
let mapOptions = {
    center: [35.9079,-79.0484],
    zoom: 15
}

// Creating a map object
let map = new L.map('map', mapOptions);

// var for layer object, and add to map
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

function onMapdbClick(e) {
    var name = prompt("placed marker at: " + e.latlng);
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    marker.bindPopup(name).openPopup();
}

map.on('dblclick', onMapdbClick);