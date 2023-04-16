import { displayGardenContent } from './displayGardenContent.js';

document.addEventListener("DOMContentLoaded", function () {
  
  const menuButton = document.getElementById("menuButton");
  const dropdownContent = document.querySelector(".dropdown-content");

  menuButton.addEventListener("click", toggleDropdown);

  function toggleDropdown(event) {
    event.stopPropagation();
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }

  document.addEventListener("click", function (event) {
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    }
  });

  dropdownContent.addEventListener("click", async function (event) {
    const target = event.target;
    if (target.classList.contains("garden-button")) {
      const garden = target.getAttribute("data-garden");
      
      centerOnGarden(garden);
      await displayGardenContent(garden);
      dropdownContent.style.display = "none";
    }
  });

  function centerOnGarden(garden) {

    // let gardenCoords;
    // let gardenName;
    let gardenCoords, gardenElement, gardenName, gardenImageSrc, offset;
    gardenImageSrc = "./img/EC_Logo.jpg";
    offset = [0, 0];

    if (garden === "Main Garden") {
      gardenCoords = [35.911437, -79.047336];
      gardenElement = main_garden;
      gardenName = "Main Garden";
      gardenImageSrc = "./img/main_garden.jpg";
    } else if (garden === "Lenoir Garden") {
      gardenCoords = [35.910299, -79.048571];
      gardenElement = lenoir;
      gardenName = "Lenoir Garden";
      gardenImageSrc = "./img/Lenoir.jpeg";
      offset = [15, -10];
    } else if (garden === "Graham Garden") {
      gardenCoords = [35.913114, -79.047187];
      gardenElement = graham;
      gardenName = "Graham Garden";
      gardenImageSrc = "./img/graham.jpeg";
    } else if (garden === "Stacy Garden") {
      gardenCoords = [35.912904, -79.045814];
      gardenElement = stacy;
      gardenName = "Stacy Garden";
      gardenImageSrc = "./img/Stacy.jpeg";
    } else if (garden === "Davis Garden") {
      gardenCoords = [35.910711, -79.048374];
      gardenElement = davis;
      gardenName = "Davis Garden";
      gardenImageSrc = "./img/Davis.jpeg";
    } else if (garden === "Rams Head Plaza Garden") {
      gardenCoords = [35.905647, -79.045832];
      gardenElement = rams_head_plaza;
      gardenName = "Rams Head Plaza Garden";
      gardenImageSrc = "./img/RamsHeadPlaza.jpeg";
    } else if (garden === "SASB Plaza Garden") {
      gardenCoords = [35.904367, -79.044742];
      gardenElement = SASB_plaza;
      gardenName = "SASB Plaza Garden";
      gardenImageSrc = "./img/SASBPlaza.jpeg";
    } else if (garden === "Hardin Garden") {
      gardenCoords = [35.903815, -79.046311];
      gardenElement = hardin;
      gardenName = "Hardin Garden";
      gardenImageSrc = "./img/Hardin.webp";
    } else if (garden === "Fetzer Garden") {
      gardenCoords = [35.909124, -79.04647];
      gardenElement = fetzer;
      gardenName = "Fetzer Garden";
      gardenImageSrc = "./img/Fetzer.jpeg";
    }

    map.closePopup();
    const currentZoom = map.getZoom();
    const zoomOutLevel = currentZoom - 1;
    const zoomInLevel = 18;

    function flyToGarden() {
      // Fly out to a wider view before flying to the garden location
      map.flyTo(map.getCenter(), zoomOutLevel, { animate: true, duration: 0.5 })
        .once("moveend", flyToGardenCoords);
    }

    function flyToGardenCoords() {
      map.flyTo(gardenCoords, zoomInLevel, { animate: true, duration: 0.5 })
        .once("moveend", showGardenPopup);
    }

    function showGardenPopup() {
      gardenElement.bindPopup(
        `<img src="${gardenImageSrc}" alt="${gardenName}" class="popup-image">
        <p class="popup-text">${gardenName}</p>
        <button id="navigateButton" class="navigate-button"><i class="fas fa-map-marker-alt"></i> Navigate by Google Maps</button>`,
        { className: "custom-popup", offset: offset }
      );

      gardenElement.openPopup();

      // Add event listener for the navigate button
      document.getElementById("navigateButton").addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            initiateNavigation(userLatitude, userLongitude);
          }, (error) => {
            console.error("Error getting user location:", error);
            alert("Unable to get your current location. Please check your device settings and try again.");
          });
        } else {
          alert("Geolocation is not supported by your browser. Please update or try a different browser.");
        }
      });
    }

    // function initiateNavigation() {
    //   // Remove any existing routing control
    //   if (window.routingControl) {
    //     map.removeControl(window.routingControl);
    //   }

    //   // Get user's current location
    //   map.locate({ setView: true, maxZoom: 16 });

    //   // Add event listener for location found
    //   map.on("locationfound", onLocationFound);
    // }

    // open the navigation in google maps app or web browser
    function initiateNavigation(userLatitude, userLongitude) {
      const latitude = gardenCoords[0];
      const longitude = gardenCoords[1];
      const googleMapsAppUrl = `comgooglemaps://?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&directionsmode=walking`;
      const googleMapsWebUrl = `https://maps.google.com/?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&dirflg=w`;
    
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // If on iOS or Android, try to open Google Maps app
        window.open(googleMapsAppUrl, '_blank');
        setTimeout(() => {
          // If the Google Maps app is not installed or did not open, fallback to the browser
          if (!document.hidden) {
            window.open(googleMapsWebUrl, '_blank');
          }
        }, 25);
      } else {
        // If not on iOS or Android, open Google Maps in the browser
        window.open(googleMapsWebUrl, '_blank');
      }
    }

    // function initiateNavigation() {
    //   const latitude = gardenCoords[0];
    //   const longitude = gardenCoords[1];
    //   const url = `https://maps.google.com/?daddr=${latitude},${longitude}&dirflg=w`;
    //   window.open(url, '_blank');
    // }

    // function onLocationFound(e) {
      
    //   // Remove the event listener to prevent multiple routes
    //   map.off("locationfound", onLocationFound);

    //   // Add routing control with user's current location and garden location
    //   window.routingControl = L.Routing.control({
    //     waypoints: [e.latlng, L.latLng(gardenCoords)],
    //     // router: new L.Routing.osrmv1({
    //     //   serviceUrl: "https://router.project-osrm.org/route/v1",s
    //     // }),
    //     router: new L.Routing.mapbox(
    //       "pk.eyJ1IjoiaGd1bzUiLCJhIjoiY2xnYjJpYXJpMGEycDN0bnphNDR4bGMzNCJ9.7_xQzJQ2f3jt5TgMkRTI0A",
    //       {
    //         profile: "mapbox/walking",
    //       }
    //     ),
    //     show: false,
    //     lineOptions: {
    //       styles: [{ color: "blue", opacity: 0.8, weight: 5 }],
    //     },
    //     fitSelectedRoutes: true,
    //   }).addTo(map);
    // }

    // Start the process by flying to the garden
    flyToGarden();

  }
});