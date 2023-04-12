// Create the map and set its view to a location
var mymap = L.map('map').setView([51.505, -0.09], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
}).addTo(mymap);

// Add a marker to the map
var marker = L.marker([51.5, -0.09]).addTo(mymap);

// Add a popup to the marker
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// add Leaflet-Geoman controls with some options to the map  
map.pm.addControls({  
    position: 'topleft',  
    drawCircle: true,  
  });  


map.pm.enableDraw('Polygon',{ snappable: false }); 
map.pm.disableDraw();