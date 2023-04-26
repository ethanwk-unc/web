import { displayGardenContent } from "./displayGardenContent.js";
import { addNavigateButtonEventListener } from "./iniNav.js";

const gardens = {
  "Main Garden": {
    coords: [35.911437, -79.047336],
    element: main_garden,
    imageSrc: "./img/main_garden.png",
  },
  "Lenoir Garden": {
    coords: [35.910299, -79.048571],
    element: lenoir,
    imageSrc: "./img/Lenoir.png",
  },
  "Graham Garden": {
    coords: [35.913114, -79.047187],
    element: graham,
    imageSrc: "./img/graham.png",
  },
  "Stacy Garden": {
    coords: [35.912904, -79.045814],
    element: stacy,
    imageSrc: "./img/Stacy.png",
  },
  "Davis Garden": {
    coords: [35.910711, -79.048374],
    element: davis,
    imageSrc: "./img/Davis.png",
  },
  "Rams Head Plaza Garden": {
    coords: [35.905647, -79.045832],
    element: rams_head_plaza,
    imageSrc: "./img/RamsHeadPlaza.png",
  },
  "SASB Plaza Garden": {
    coords: [35.904367, -79.044742],
    element: SASB_plaza,
    imageSrc: "./img/SASBPlaza.png",
  },
  "Hardin Garden": {
    coords: [35.903815, -79.046311],
    element: hardin,
    imageSrc: "./img/Hardin.png",
  },
  "Fetzer Garden": {
    coords: [35.909124, -79.04647],
    element: fetzer,
    imageSrc: "./img/Fetzer.png",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const dropdownContent = document.querySelector(".dropdown-content");

  menuButton.addEventListener("click", toggleDropdown);

  function toggleDropdown(event) {
    event.stopPropagation();
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  }

  document.addEventListener("click", function (event) {
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    }
  });

  // Add event listeners to each garden element
  for (const gardenName in gardens) {
    const garden = gardens[gardenName];
    garden.element.on("click", async () => {
      centerOnGarden(gardenName);
      await displayGardenContent(gardenName);
    });
  }

  dropdownContent.addEventListener("click", async function (event) {
    const target = event.target;
    if (target.classList.contains("garden-button")) {
      const garden = target.getAttribute("data-garden");
      centerOnGarden(garden);
      await displayGardenContent(garden);
      dropdownContent.style.display = "none";
    }
  });

   // Add event listeners to each garden link element
   const gardenLinks = document.querySelectorAll('.garden-link');
   gardenLinks.forEach(link => {
     link.addEventListener('click', async event => {
       const gardenName = event.target.getAttribute('data-garden');
       centerOnGarden(gardenName);
       await displayGardenContent(gardenName);
     });
   });

  function centerOnGarden(garden) {
    const gardenInfo = gardens[garden];
    if (!gardenInfo) {
      console.error(`Garden ${garden} not found.`);
      return;
    }

    const {
      coords: gardenCoords,
      element: gardenElement,
      imageSrc: gardenImageSrc,
    } = gardenInfo;
    const gardenName = garden;

    map.closePopup();
    const currentZoom = map.getZoom();
    const zoomOutLevel = currentZoom - 1;
    const zoomInLevel = 18;

    function flyToGarden() {
      // Fly out to a wider view before flying to the garden location
      return map.flyTo(map.getCenter(), zoomOutLevel, {
        animate: true,
        duration: 0.5,
      });
    }

    function flyToGardenCoords() {
      map
        .flyTo(gardenCoords, zoomInLevel, { animate: true, duration: 0.5 })
        .once("moveend", () =>
          showGardenPopup(
            garden,
            gardenElement,
            gardenCoords,
            gardenName,
            gardenImageSrc
          )
        );
    }

    // Start the process by flying to the garden
    flyToGarden().once("moveend", flyToGardenCoords);
  }

  function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Object.fromEntries(urlParams.entries());
  }
  const queryParams = getQueryParams();
  const defaultGarden = "Main Garden";

  if (queryParams) {
    const selectedGarden = queryParams.garden
      ? decodeURIComponent(queryParams.garden)
      : defaultGarden;
    displayGardenContent(selectedGarden).then(() => {
      centerOnGarden(selectedGarden);
    });
  } else {
    displayGardenContent("Main Garden").then(() => {
      centerOnGarden("Main Garden");
    });
  }
});

function showGardenPopup(
  garden,
  gardenElement,
  gardenCoords,
  gardenName,
  gardenImageSrc
) {
  gardenElement.bindPopup(
    `<img src="${gardenImageSrc}" alt="${gardenName}" class="popup-image">
    <p class="popup-text">${gardenName}</p>
    <button id="navigateButton" class="navigate-button"><i class="fas fa-map-marker-alt"></i> Navigate by Google Maps</button>`,
    { className: "custom-popup" }
  );

  gardenElement.openPopup();

  // Update the URL with the selected garden
  history.pushState({}, "", `?garden=${encodeURIComponent(garden)}`);

  addNavigateButtonEventListener(gardenCoords);
}

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
