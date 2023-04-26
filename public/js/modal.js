// Get the modal
const modal = document.getElementById("instructionsModal");

// Get the logo and the close button
const logo = document.querySelector("#navbar img");
const closeButton = document.querySelector(".close");

// Open the modal when the logo is clicked
logo.onclick = function () {
  modal.style.display = "block";
};

// Close the modal when the close button is clicked
closeButton.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
