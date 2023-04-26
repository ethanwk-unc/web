export async function displayGardenContent(gardenName) {
  const response = await fetch("/gardenContent");
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: "array" });

  const sheet = workbook.Sheets[gardenName];
  const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const gardenContentDiv = document.querySelector("#gardenContent .owl-carousel");
  const gardenTitleDiv = document.querySelector("#gardenContent .garden-title");
  gardenTitleDiv.innerHTML = `
  <h4>${gardenName} Plants</h4>
  <span class="draggable-hint">Drag the plants' images horizontally below to view more plants. All pictures used in this website are from unsplash.com and are free to use by its policy. Please share your thoughts in the comment area below the plant cards.</span>
  
  `;

  // Clear the previous content
  gardenContentDiv.innerHTML = "";

  sheetData.slice(1).forEach((row) => {
    const plantName = row[0];
    const plantImage = row[1];
    const harvestInfo = row[2];
    const recipe1 = row[3];
    const recipe1_formated = recipe1.replace(/\n/g, '<br>');
    const recipe2 = row[4];
    const recipe2_formated = recipe2.replace(/\n/g, '<br>');

    const plantInfo = `
    <div class="plant-card">
    
    <h2>${plantName}</h2>
    <img src="${plantImage}" alt="${plantName}">
    <h3>Harvest Info:</h3>
    <p>${harvestInfo}</p>
    <h2>Recipe 1:</h2> <p>${recipe1_formated}</p>
    <h2>Recipe 2:</h2> <p>${recipe2_formated}</p>
  </div>
    `;
    gardenContentDiv.innerHTML += plantInfo;
  });

  // Destroy the existing Owl Carousel instance
  if ($(".owl-carousel").data('owl.carousel')) {
    $(".owl-carousel").owlCarousel('destroy');
  }

  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  });
}

