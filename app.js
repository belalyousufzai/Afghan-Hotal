/* ========================================
   1. Get HTML Elements
======================================== */

const searchForm = document.getElementById("searchForm");
const citySelect = document.getElementById("city");
const maxPriceSelect = document.getElementById("maxPrice");

const hotelsGrid = document.getElementById("hotelsGrid");
const hotelCards = document.querySelectorAll(".hotel-card");
const noResults = document.getElementById("noResults");

const cityCards = document.querySelectorAll(".city-card");


/* ========================================
   2. Search Hotels by City and Price
======================================== */

function searchHotels() {
    const selectedCity = citySelect.value;
    const selectedPrice = maxPriceSelect.value;

    let visibleHotels = 0;

    hotelCards.forEach(function (hotel) {
        const hotelCity = hotel.dataset.city;
        const hotelPrice = Number(hotel.dataset.price);

        const matchesCity =
            selectedCity === "" || hotelCity === selectedCity;

        const matchesPrice =
            selectedPrice === "" ||
            hotelPrice <= Number(selectedPrice);

        if (matchesCity && matchesPrice) {
            hotel.style.display = "";
            visibleHotels++;
        } else {
            hotel.style.display = "none";
        }
    });

    noResults.hidden = visibleHotels !== 0;
}


/* ========================================
   3. Handle Search Form
======================================== */

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    searchHotels();

    document.getElementById("hotels").scrollIntoView({
        behavior: "smooth"
    });
});


/* ========================================
   4. Click on a City Card
======================================== */

cityCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const selectedCity = card.dataset.city;

        citySelect.value = selectedCity;

        searchHotels();
    });
});


/* ========================================
   5. Update Results When Filters Change
======================================== */

citySelect.addEventListener("change", searchHotels);
maxPriceSelect.addEventListener("change", searchHotels);


/* ========================================
   6. WhatsApp Booking Links
======================================== */

// Replace each sample WhatsApp number in index.html
// with the real phone number of the hotel manager.
// Use country code 93 without the plus sign.

const whatsappButtons = document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const whatsappLink = button.getAttribute("href");

        if (!whatsappLink || whatsappLink.includes("XXXXXXXX")) {
            event.preventDefault();

          ;
        }
    });
});