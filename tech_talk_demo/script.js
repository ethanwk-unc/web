// Here we use the L (leaflet) library to find a map() method to construct a map object
// from here we pass in the longitutde and latitutde coordinates of where we want the center of our map
// and specify a zoom level
var map = L.map('map', {
    center: [35.9115137, -79.0476156],
    zoom: 15
});


// Add the OpenStreetMap tile layer
/* 
https://leaflet-extras.github.io/leaflet-providers/preview/
    https://tile.openstreetmap.org/{z}/{x}/{y}.png
    https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}
    https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}

*/

// Here we are creating a tile layer for our map object
// zoom level, tile X-coordinate, tile Y-coordinate placeholders
// open streetmap will be our basemap, of which all other layers will be placed on top
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //credit OSM
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);



// add a marker
// here we create a marker and add it to the map at a given lat and lng
// we can also use a bindPopup method
// This binds a popup message to the given variable so it displays when clicked
var m1 = L.marker([35.9115137, -79.0476156]);
m1.addTo(map);
m1.bindPopup("<b>Hello world!</b><br>I am a popup.");


//polygon additions
var p1 = L.polygon([
    [35.907888, -79.049313],
    [35.906897706577446, -79.0463948249817],
    [35.90602176270296, -79.04831528663637]], 
    {
        color: 'red',
        fillColor: '#f03'
    }
);

p1.addTo(map)
//p1.bindPopup("<h1>I am a Circle <h1>");

//polygon with an event
const main_garden = L.polygon([
    [35.911357, -79.047555],
    [35.911437, -79.047336],
    [35.91163, -79.047447],
    [35.911545, -79.047662],
  ])
    .addTo(map)


// Events
main_garden.on('click', changeHeader);
map.doubleClickZoom.disable(); 
map.on('dblclick', resetHeader);


function changeHeader() {
    document.getElementById("header").style.backgroundColor = '#55aaFF';
    document.getElementById("header").textContent = 'garden selected';
    document.getElementById("footer").style.backgroundColor = '#55aaFF';
    document.getElementById("footer").textContent = 'info about the garden';
}

function resetHeader() {
    document.getElementById("header").style.backgroundColor = '#ffff';
    document.getElementById("header").textContent = 'Tech talk demo';
    document.getElementById("footer").style.backgroundColor = '#ffff';
    document.getElementById("footer").textContent = 'footer';
}

p1.on('click', p1Select);
function p1Select() {
    document.getElementById("header").style.backgroundColor = '#f03';
    document.getElementById("header").textContent = 'circle selected';
    document.getElementById("footer").style.backgroundColor = '#f03';
    document.getElementById("footer").textContent = 'info about the circle';
}


var pop = L.popup()
function onMapClick(e) {
    pop
        .setLatLng(e.latlng)
        .setContent(e.latlng.lat.toString() + ", " + e.latlng.lng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

