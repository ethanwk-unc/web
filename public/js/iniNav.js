
export function addNavigateButtonEventListener(gardenCoords) {
    document.getElementById("navigateButton").addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            initiateNavigation(userLatitude, userLongitude, gardenCoords);
          },
          (error) => {
            console.error("Error getting user location:", error);
            alert(
              "Unable to get your current location. Please check your device settings and try again."
            );
          }
        );
      } else {
        alert(
          "Geolocation is not supported by your browser. Please update or try a different browser."
        );
      }
    });
  }

function initiateNavigation(userLatitude, userLongitude, gardenCoords) {
    const latitude = gardenCoords[0];
    const longitude = gardenCoords[1];

    const googleMapsWebUrl = `https://maps.google.com/?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&dirflg=w`;
    const googleMapsAppUrl = `https://maps.google.com/maps?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&dirflg=w`;
    const appleMapsWebUrl = `http://maps.apple.com/?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&dirflg=w`;
    const appleMapsAppUrl = `maps://maps.apple.com/?saddr=${userLatitude},${userLongitude}&daddr=${latitude},${longitude}&dirflg=w&t=m`;

    if (/iPhone|iPod/i.test(navigator.userAgent)) {
        // If on iPhone or iPod, try to open Apple Maps app
        window.open(appleMapsAppUrl, "_blank");
        setTimeout(() => {
            // If the Apple Maps app is not installed or did not open, fallback to Google Maps app
            if (!document.hidden) {
                window.open(googleMapsAppUrl, "_blank");
                setTimeout(() => {
                    // If the Google Maps app is not installed or did not open, fallback to Google Maps in the browser
                    if (!document.hidden) {
                        window.open(googleMapsWebUrl, "_blank");
                    }
                }, 25);
            }
        }, 25);
    } else if (/iPad/i.test(navigator.userAgent)) {
        // If on iPad, open Apple Maps web URL
        window.open(appleMapsWebUrl, "_blank");
    } else if (/Android/i.test(navigator.userAgent)) {
        // If on Android, try to open Google Maps app
        window.open(googleMapsAppUrl, "_blank");
        setTimeout(() => {
            // If the Google Maps app is not installed or did not open, fallback to Google Maps in the browser
            if (!document.hidden) {
                window.open(googleMapsWebUrl, "_blank");
            }
        }, 25);
    } else {
        // If not on iOS or Android, open Google Maps in the browser
        window.open(googleMapsWebUrl, "_blank");
    }
}