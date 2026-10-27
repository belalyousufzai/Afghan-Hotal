/* ==========================================
   1. WHATSAPP CONFIGURATION
========================================== */
// شماره واتساپ با کد کشور، بدون + و بدون فاصله
// مثال: 937XXXXXXXX
const WHATSAPP_NUMBER = "93783777472";
/* ==========================================
   2. GET HTML ELEMENTS
========================================== */
const hotelCards = document.querySelectorAll(".hotel-card");
const cityCards = document.querySelectorAll(".city-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchForm = document.getElementById("searchForm");
const citySelect = document.getElementById("city");
const maxPriceSelect = document.getElementById("maxPrice");
const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");
const hotelsGrid = document.getElementById("hotelsGrid");
const noResults = document.getElementById("noResults");
const hotelDialog = document.getElementById("hotelDialog");
const closeDialog = document.getElementById("closeDialog");
const dialogHotelName = document.getElementById("dialogHotelName");
const dialogHotelInfo = document.getElementById("dialogHotelInfo");
const bookingForm = document.getElementById("bookingForm");
const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesCount = document.getElementById("favoritesCount");
const resetSearchBtn = document.getElementById("resetSearchBtn");
//const mobileMenuBtn = document.getElementById("mobileMenuBtn");
//const navLinks = document.getElementById("navLinks");
/* ==========================================
   3. CURRENT FILTERS
========================================== */
let selectedCategory = "all";
let selectedCity = "all";
let selectedMaxPrice = "all";
let selectedHotel = null;
/* ==========================================
   4. HELPER FUNCTIONS
========================================== */
function getHotelData(card) {
    return {
        name: card.dataset.name || card.querySelector("h3")?.textContent.trim() || "هوتل",
        city: card.dataset.city || "",
        price: Number(card.dataset.price || 0),
        category: card.dataset.category || "",
        location: card.querySelector(".hotel-location")?.textContent.trim() || "",
        image: card.querySelector("img")?.src || "",
        rating: card.querySelector(".hotel-rating span")?.textContent.trim() || "",
        amenities: Array.from(card.querySelectorAll(".hotel-amenities span"))
            .map(item => item.textContent.trim())
    };
}
function showMessage(message) {
    alert(message);
}
// function getSavedFavorites() {
//     try {
//         return JSON.parse(localStorage.getItem("hotelyabFavorites")) || [];
//     } catch (error) {
//         return [];
//     }
// }
// function saveFavorites(favorites) {
//     localStorage.setItem("hotelyabFavorites", JSON.stringify(favorites));
// }
/* ==========================================
   5. SEARCH AND FILTER HOTELS
========================================== */
function searchHotels() {
    let visibleHotels = 0;
    hotelCards.forEach(function (hotel) {
        const hotelCity = hotel.dataset.city;
        const hotelPrice = Number(hotel.dataset.price);
        const hotelCategory = hotel.dataset.category;
        const cityMatches =
            selectedCity === "all" ||
            hotelCity === selectedCity;
        const priceMatches =
            selectedMaxPrice === "all" ||
            hotelPrice <= Number(selectedMaxPrice);
        const categoryMatches =
            selectedCategory === "all" ||
            hotelCategory === selectedCategory;
        const shouldShow =
            cityMatches &&
            priceMatches &&
            categoryMatches;
        hotel.style.display = shouldShow ? "" : "none";
        if (shouldShow) {
            visibleHotels++;
        }
    });
    if (noResults) {
        noResults.hidden = visibleHotels !== 0;
    }
}
/* ==========================================
   6. SEARCH FORM
========================================== */
if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        selectedCity = citySelect?.value || "all";
        selectedMaxPrice = maxPriceSelect?.value || "all";
        searchHotels();
        const hotelsSection = document.getElementById("hotels");
        if (hotelsSection) {
            hotelsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}
/* ==========================================
   7. CATEGORY FILTER BUTTONS
========================================== */
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        button.classList.add("active");
        selectedCategory = button.dataset.category || "all";
        searchHotels();
    });
});
/* ==========================================
   8. CITY CARDS
========================================== */
cityCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const city = card.dataset.city;
        if (!city) {
            return;
        }
        selectedCity = city;
        if (citySelect) {
            citySelect.value = city;
        }
        searchHotels();
        const hotelsSection = document.getElementById("hotels");
        if (hotelsSection) {
            hotelsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
/* ==========================================
   9. RESET SEARCH
========================================== */
if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", function () {
        selectedCity = "all";
        selectedCategory = "all";
        selectedMaxPrice = "all";
        if (citySelect) {
            citySelect.value = "all";
        }
        if (maxPriceSelect) {
            maxPriceSelect.value = "all";
        }
        filterButtons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.category === "all"
            );
        });
        searchHotels();
    });
}
/* ==========================================
   10. FAVORITES - FIXED VERSION
========================================== */

function getSavedFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("hotelyabFavorites") || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(
            "hotelyabFavorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.error("ذخیره علاقه‌مندی‌ها انجام نشد:", error);
    }
}

function updateFavoriteButtons() {
    const favorites = getSavedFavorites();

    document.querySelectorAll(".hotel-card").forEach(function (card) {
        const button = card.querySelector(".favorite-btn");
        const hotelId = card.dataset.id;

        if (!button || !hotelId) return;

        const isFavorite = favorites.includes(hotelId);

        button.classList.toggle("is-favorite", isFavorite);
       button.textContent = isFavorite ? "♥" : "♡";
        button.setAttribute(
            "aria-label",
            isFavorite
                ? "حذف از علاقه‌مندی‌ها"
                : "افزودن به علاقه‌مندی‌ها"
        );
        button.setAttribute("aria-pressed", String(isFavorite));
    });
}

function renderFavorites() {
    if (!favoritesGrid) return;

    const favorites = getSavedFavorites();

    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }

    favoritesGrid.innerHTML = "";

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="favorites-empty">
                <span>♡</span>
                <h3>هنوز هوتلی را انتخاب نکرده‌اید</h3>
                <p>با کلیک روی علامت قلب، هوتل مورد علاقه‌تان را ذخیره کنید.</p>
            </div>
        `;
        return;
    }

    favorites.forEach(function (hotelId) {
        const originalCard = Array.from(
            document.querySelectorAll(".hotel-card")
        ).find(function (card) {
            return card.dataset.id === hotelId;
        });

        if (!originalCard) return;

        const clone = originalCard.cloneNode(true);

        clone.querySelectorAll(".favorite-btn").forEach(function (button) {
            button.classList.add("is-favorite");
            button.textContent = "♥";
            button.setAttribute("aria-label", "حذف از علاقه‌مندی‌ها");
            button.setAttribute("aria-pressed", "true");
        });

        favoritesGrid.appendChild(clone);
    });
}

document.addEventListener("click", function (event) {
    const favoriteButton = event.target.closest(".favorite-btn");

    if (!favoriteButton) return;

    event.preventDefault();
    event.stopPropagation();

    const card = favoriteButton.closest(".hotel-card");

    if (!card) return;

    const hotelId = card.dataset.id;

    if (!hotelId) {
        console.error(
            "برای این هوتل data-id در HTML تعریف نشده است."
        );
        return;
    }

    let favorites = getSavedFavorites();

    if (favorites.includes(hotelId)) {
        favorites = favorites.filter(function (id) {
            return id !== hotelId;
        });
    } else {
        favorites.push(hotelId);
    }

    saveFavorites(favorites);
    updateFavoriteButtons();
    renderFavorites();
});
/* ==========================================
   11. OPEN HOTEL DETAILS
========================================== */
function openHotelDialog(card) {
    selectedHotel = getHotelData(card);
    if (!hotelDialog || !dialogHotelName || !dialogHotelInfo) {
        showMessage("جزئیات هوتل آماده نیست. لطفاً ساختار HTML را بررسی کنید.");
        return;
    }
    dialogHotelName.textContent = selectedHotel.name;
    dialogHotelInfo.textContent =
        `${selectedHotel.location} | قیمت هر شب: $${selectedHotel.price}`;
    if (checkInInput) {
        checkInInput.min = getTodayDate();
    }
    if (checkOutInput) {
        checkOutInput.min = getTodayDate();
    }
    if (typeof hotelDialog.showModal === "function") {
        hotelDialog.showModal();
    } else {
        hotelDialog.setAttribute("open", "");
    }
}
document.addEventListener("click", function (event) {
    const detailsButton = event.target.closest(
        ".details-btn, .hotel-details-btn, [data-action='details']"
    );
    if (!detailsButton) return;
    const card = detailsButton.closest(".hotel-card");
    if (card) {
        openHotelDialog(card);
    } else {
        console.error("کارت هوتل پیدا نشد!");
    }
});
/* ==========================================
   12. CLOSE HOTEL DIALOG
========================================== */
if (closeDialog) {
    closeDialog.addEventListener("click", function () {
        if (hotelDialog?.open) {
            hotelDialog.close();
        } else {
            hotelDialog?.removeAttribute("open");
        }
    });
}
if (hotelDialog) {
    hotelDialog.addEventListener("click", function (event) {
        if (event.target === hotelDialog) {
            hotelDialog.close();
        }
    });
}
/* ==========================================
   13. DATE HELPERS
========================================== */
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
/* ==========================================
   14. WHATSAPP BOOKING
========================================== */
if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!selectedHotel) {
            showMessage("لطفاً اول هوتل مورد نظر خود را انتخاب کنید.");
            return;
        }
        const guestNameInput = document.getElementById("guestName");
        const guestPhoneInput = document.getElementById("guestPhone");
        const guestCountInput = document.getElementById("guestCount");
        const guestName = guestNameInput?.value.trim() || "";
        const guestPhone = guestPhoneInput?.value.trim() || "";
        const checkIn = checkInInput?.value || "";
        const checkOut = checkOutInput?.value || "";
        const guestCount = guestCountInput?.value || "1";
        if (!guestName || !guestPhone || !checkIn || !checkOut) {
            showMessage("لطفاً تمام معلومات لازم را وارد کنید.");
            return;
        }
        if (checkOut <= checkIn) {
            showMessage("تاریخ خروج باید بعد از تاریخ ورود باشد.");
            return;
        }
        if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
            showMessage(
                "شماره واتساپ هوتل در فایل script.js درست وارد نشده است."
            );
            return;
        }
        const message =
            "سلام، می‌خواهم برای این هوتل درخواست رزرو بفرستم.\n\n" +
            "نام هوتل: " + selectedHotel.name + "\n" +
            "موقعیت: " + selectedHotel.location + "\n" +
            "قیمت هر شب: $" + selectedHotel.price + "\n\n" +
            "نام مهمان: " + guestName + "\n" +
            "شماره تماس مهمان: " + guestPhone + "\n" +
            "تاریخ ورود: " + checkIn + "\n" +
            "تاریخ خروج: " + checkOut + "\n" +
            "تعداد مهمانان: " + guestCount + "\n\n" +
            "لطفاً موجود بودن اتاق و قیمت نهایی را تأیید کنید.";
        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
        if (hotelDialog?.open) {
            hotelDialog.close();
        }
    });
}
/* 15. MOBILE NAVIGATION */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function (event) {
        event.preventDefault();

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
        mobileMenuBtn.innerHTML = isOpen ? "&times;" : "&#9776;";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            mobileMenuBtn.setAttribute("aria-expanded", "false");
            mobileMenuBtn.innerHTML = "&#9776;";
        });
    });
} else {
    console.error("دکمه منو یا بخش لینک‌های منو در HTML پیدا نشد.");
}
/* ==========================================
   16. INITIAL PAGE SETUP
========================================== */
searchHotels();
updateFavoriteButtons();
renderFavorites();
console.log("هوتل‌یاب با موفقیت اجرا شد.");
// باز و بسته کردن منوی سه‌خطی هر هوتل
// document.addEventListener("click", function (event) {
//     const menuButton = event.target.closest(".hotel-menu-btn");

//     // بستن منوهای دیگر
//     document.querySelectorAll(".hotel-menu").forEach(function (menu) {
//         if (!menuButton || !menu.closest(".hotel-image").contains(menuButton)) {
//             menu.classList.remove("show");
//         }
//     });

    // باز یا بسته کردن منوی انتخاب‌شده
//     if (menuButton) {
//         event.stopPropagation();

//         const hotelImage = menuButton.closest(".hotel-image");
//         const menu = hotelImage.querySelector(".hotel-menu");

//         if (menu) {
//             menu.classList.toggle("show");
//         }
//     }
// });