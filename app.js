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

const languageSelect = document.getElementById("languageSelect");


/* ========================================
   2. Language Translations
======================================== */

const translations = {
    en: {
        "هوتل‌یاب": "Hotel Finder",
        "افغانستان": "Afghanistan",
        "صفحه اصلی": "Home",
        "شهرها": "Cities",
        "هوتل‌ها": "Hotels",
        "درباره ما": "About Us",
        "تماس با ما": "Contact Us",
        "پیدا کردن هوتل": "Find a Hotel",

        "به هوتل‌یاب افغانستان خوش آمدید":
            "Welcome to Afghanistan Hotel Finder",
        "هوتل مناسب خود را": "Find the right hotel",
        "به آسانی پیدا کنید": "easily",
        "هوتل‌های شهرهای افغانستان را مشاهده کنید، قیمت‌ها را مقایسه کنید و از طریق واتساپ مستقیماً با مسئول هوتل تماس بگیرید.":
            "Explore hotels across Afghanistan, compare prices, and contact hotel managers directly through WhatsApp.",

        "شهر مورد نظر": "Select a city",
        "تمام شهرها": "All cities",
        "کابل": "Kabul",
        "هرات": "Herat",
        "مزار شریف": "Mazar-e-Sharif",
        "قندهار": "Kandahar",
        "حداکثر قیمت هر شب": "Maximum price per night",
        "تمام قیمت‌ها": "All prices",
        "تا ۳۰ دالر": "Up to $30",
        "تا ۵۰ دالر": "Up to $50",
        "تا ۱۰۰ دالر": "Up to $100",
        "تا ۲۰۰ دالر": "Up to $200",
        "جستجوی هوتل": "Search Hotels",

        "مقصد خود را انتخاب کنید": "Choose Your Destination",
        "هوتل‌ها بر اساس شهر": "Hotels by City",
        "هوتل‌های شهر مورد نظر خود را پیدا کنید.":
            "Find hotels in your preferred city.",
        "مشاهده هوتل‌ها": "View Hotels",

        "انتخاب‌های پیشنهادی": "Recommended Choices",
        "هوتل‌های پیشنهادی": "Featured Hotels",
        "هوتل مورد نظر خود را انتخاب کنید و برای رزرو با مسئول هوتل تماس بگیرید.":
            "Choose a hotel and contact its manager to make a reservation.",

        "کابل، افغانستان": "Kabul, Afghanistan",
        "هرات، افغانستان": "Herat, Afghanistan",
        "مزار شریف، افغانستان": "Mazar-e-Sharif, Afghanistan",
        "قندهار، افغانستان": "Kandahar, Afghanistan",

        "هوتل نمونه کابل": "Sample Kabul Hotel",
        "هوتل نمونه هرات": "Sample Herat Hotel",
        "هوتل نمونه مزار شریف": "Sample Mazar-e-Sharif Hotel",
        "هوتل نمونه قندهار": "Sample Kandahar Hotel",

        "هوتل نمونه با اتاق‌های راحت و امکانات مناسب.":
            "A sample hotel with comfortable rooms and useful amenities.",
        "اتاق‌های پاک و محیط آرام برای مسافران.":
            "Clean rooms and a peaceful environment for travelers.",
        "اقامت راحت برای سفرهای کاری و تفریحی.":
            "Comfortable accommodation for business and leisure trips.",
        "اتاق‌های مجهز و خدمات مناسب برای مهمانان.":
            "Well-equipped rooms and suitable services for guests.",

        "پارکینگ": "Parking",
        "رستورانت": "Restaurant",
        "تهویه": "Air Conditioning",
        "صبحانه": "Breakfast",
        "وای‌فای": "Wi-Fi",
        "WiFi": "Wi-Fi",
        "وای فای": "Wi-Fi",

        "هر شب": "per night",
        "مشاهده جزئیات": "View Details",
        "جزئیات هوتل": "Hotel Details",
        "رزرو از طریق واتساپ": "Book via WhatsApp",
        "هوتلی با این مشخصات پیدا نشد.":
            "No hotels found matching your criteria.",

        "چرا هوتل‌یاب؟": "Why Hotel Finder?",
        "رزرو هوتل به روش آسان": "An Easy Way to Book Hotels",
        "جستجوی آسان": "Easy Search",
        "هوتل‌ها را بر اساس شهر و قیمت پیدا کنید.":
            "Find hotels by city and price.",
        "تماس مستقیم": "Direct Contact",
        "بدون نیاز به پرداخت آنلاین، از طریق واتساپ با مسئول هوتل تماس بگیرید.":
            "Contact hotel managers through WhatsApp without online payment.",
        "انتخاب بهتر": "Better Choices",
        "عکس‌ها، امکانات و قیمت‌های هوتل‌ها را پیش از تماس بررسی کنید.":
            "Review hotel photos, amenities, and prices before contacting them.",

        "راه آسان پیدا کردن هوتل در افغانستان.":
            "An easy way to find hotels in Afghanistan.",
        "لینک‌های مفید": "Useful Links",
        "ایمیل: info@example.com": "Email: info@example.com",
        "افغانستان": "Afghanistan",
        "تمام حقوق محفوظ است.": "All rights reserved.",

        "شماره واتساپ این هوتل هنوز تنظیم نشده است.":
            "The WhatsApp number for this hotel has not been configured yet."
    },

    ps: {
        "هوتل‌یاب": "هوټل موندونکی",
        "افغانستان": "افغانستان",
        "صفحه اصلی": "کور",
        "شهرها": "ښارونه",
        "هوتل‌ها": "هوټلونه",
        "درباره ما": "زموږ په اړه",
        "تماس با ما": "اړیکه",
        "پیدا کردن هوتل": "هوټل پیدا کړئ",

        "به هوتل‌یاب افغانستان خوش آمدید":
            "د افغانستان د هوټل موندونکي وېبپاڼې ته ښه راغلاست",
        "هوتل مناسب خود را": "خپل مناسب هوټل",
        "به آسانی پیدا کنید": "په اسانۍ پیدا کړئ",
        "هوتل‌های شهرهای افغانستان را مشاهده کنید، قیمت‌ها را مقایسه کنید و از طریق واتساپ مستقیماً با مسئول هوتل تماس بگیرید.":
            "د افغانستان د ښارونو هوټلونه وګورئ، بیې پرتله کړئ او د واټساپ له لارې مستقیم د هوټل له مسؤل سره اړیکه ونیسئ.",

        "شهر مورد نظر": "خپل ښار وټاکئ",
        "تمام شهرها": "ټول ښارونه",
        "کابل": "کابل",
        "هرات": "هرات",
        "مزار شریف": "مزار شریف",
        "قندهار": "کندهار",
        "حداکثر قیمت هر شب": "د یوې شپې اعظمي بیه",
        "تمام قیمت‌ها": "ټولې بیې",
        "تا ۳۰ دالر": "تر ۳۰ ډالرو پورې",
        "تا ۵۰ دالر": "تر ۵۰ ډالرو پورې",
        "تا ۱۰۰ دالر": "تر ۱۰۰ ډالرو پورې",
        "تا ۲۰۰ دالر": "تر ۲۰۰ ډالرو پورې",
        "جستجوی هوتل": "هوټل ولټوئ",

        "مقصد خود را انتخاب کنید": "خپل منزل وټاکئ",
        "هوتل‌ها بر اساس شهر": "د ښار له مخې هوټلونه",
        "هوتل‌های شهر مورد نظر خود را پیدا کنید.":
            "په خپل خوښ ښار کې هوټلونه پیدا کړئ.",
        "مشاهده هوتل‌ها": "هوټلونه وګورئ",

        "انتخاب‌های پیشنهادی": "وړاندیز شوي انتخابونه",
        "هوتل‌های پیشنهادی": "وړاندیز شوي هوټلونه",
        "هوتل مورد نظر خود را انتخاب کنید و برای رزرو با مسئول هوتل تماس بگیرید.":
            "خپل هوټل وټاکئ او د بک کولو لپاره د هوټل له مسؤل سره اړیکه ونیسئ.",

        "کابل، افغانستان": "کابل، افغانستان",
        "هرات، افغانستان": "هرات، افغانستان",
        "مزار شریف، افغانستان": "مزار شریف، افغانستان",
        "قندهار، افغانستان": "کندهار، افغانستان",

        "هوتل نمونه کابل": "د کابل نمونه هوټل",
        "هوتل نمونه هرات": "د هرات نمونه هوټل",
        "هوتل نمونه مزار شریف": "د مزار شریف نمونه هوټل",
        "هوتل نمونه قندهار": "د کندهار نمونه هوټل",

        "هوتل نمونه با اتاق‌های راحت و امکانات مناسب.":
            "نمونه هوټل چې ارامې خونې او مناسبې اسانتیاوې لري.",
        "اتاق‌های پاک و محیط آرام برای مسافران.":
            "د مسافرو لپاره پاکې خونې او ارام چاپېریال.",
        "اقامت راحت برای سفرهای کاری و تفریحی.":
            "د کاري او تفریحي سفرونو لپاره ارامه استوګنه.",
        "اتاق‌های مجهز و خدمات مناسب برای مهمانان.":
            "د مېلمنو لپاره مجهزې خونې او مناسب خدمات.",

        "پارکینگ": "پارکینګ",
        "رستورانت": "رستورانت",
        "تهویه": "هوا سړونکی",
        "صبحانه": "ناشتې",
        "وای‌فای": "وای فای",
        "WiFi": "وای فای",
        "وای فای": "وای فای",

        "هر شب": "هره شپه",
        "مشاهده جزئیات": "جزییات وګورئ",
        "جزئیات هوتل": "د هوټل جزییات",
        "رزرو از طریق واتساپ": "د واټساپ له لارې بک کول",
        "هوتلی با این مشخصات پیدا نشد.":
            "د دې ځانګړنو له مخې کوم هوټل پیدا نه شو.",

        "چرا هوتل‌یاب؟": "ولې د هوټل موندونکی؟",
        "رزرو هوتل به روش آسان": "په اسانه توګه د هوټل بک کول",
        "جستجوی آسان": "اسانه لټون",
        "هوتل‌ها را بر اساس شهر و قیمت پیدا کنید.":
            "هوټلونه د ښار او بیې له مخې پیدا کړئ.",
        "تماس مستقیم": "مستقیمه اړیکه",
        "بدون نیاز به پرداخت آنلاین، از طریق واتساپ با مسئول هوتل تماس بگیرید.":
            "د انلاین پیسو له ورکړې پرته د واټساپ له لارې د هوټل له مسؤل سره اړیکه ونیسئ.",
        "انتخاب بهتر": "غوره انتخاب",
        "عکس‌ها، امکانات و قیمت‌های هوتل‌ها را پیش از تماس بررسی کنید.":
            "له اړیکې مخکې د هوټلونو انځورونه، اسانتیاوې او بیې وګورئ.",

        "راه آسان پیدا کردن هوتل در افغانستان.":
            "په افغانستان کې د هوټل موندلو اسانه لاره.",
        "لینک‌های مفید": "ګټور لینکونه",
        "ایمیل: info@example.com": "برېښنالیک: info@example.com",
        "تمام حقوق محفوظ است.": "ټول حقوق خوندي دي.",

        "شماره واتساپ این هوتل هنوز تنظیم نشده است.":
            "د دې هوټل د واټساپ شمېره لا نه ده تنظیم شوې."
    }
};


/* ========================================
   3. Translate the Existing Page
======================================== */

const originalTexts = new WeakMap();

function translatePage(language) {
    const selectedLanguage = translations[language] ? language : "fa";

    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = selectedLanguage === "en" ? "ltr" : "rtl";
    document.body.style.direction =
        selectedLanguage === "en" ? "ltr" : "rtl";

    if (languageSelect) {
        languageSelect.value = selectedLanguage;
    }

    const dictionary = translations[selectedLanguage] || {};

    // Keep the original Dari text so users can switch back.
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.nodeValue.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }

                const parent = node.parentElement;

                if (!parent) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (
                    ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
                ) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let currentNode;

    while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
    }

    textNodes.forEach(function (node) {
        if (!originalTexts.has(node)) {
            originalTexts.set(node, node.nodeValue);
        }

        const original = originalTexts.get(node);
        const trimmed = original.trim();

        let translated = trimmed;

        if (selectedLanguage === "fa") {
            translated = trimmed;
        } else if (dictionary[trimmed]) {
            translated = dictionary[trimmed];
        }

        // Preserve spaces around the text node.
        const leadingSpaces = original.match(/^\s*/)[0];
        const trailingSpaces = original.match(/\s*$/)[0];

        node.nodeValue = leadingSpaces + translated + trailingSpaces;
    });

    // Translate image descriptions.
    document.querySelectorAll("img[alt]").forEach(function (img) {
        if (!img.dataset.originalAlt) {
            img.dataset.originalAlt = img.alt;
        }

        const originalAlt = img.dataset.originalAlt;

        if (selectedLanguage === "fa") {
            img.alt = originalAlt;
        } else {
            img.alt = dictionary[originalAlt] || originalAlt;
        }
    });

    // Translate the browser tab title and description.
    const pageTitles = {
        fa: "هوتل‌یاب افغانستان | رزرو هوتل",
        ps: "د افغانستان هوټل موندونکی | د هوټل بک کول",
        en: "Afghanistan Hotel Finder | Hotel Booking"
    };

    const descriptions = {
        fa: "بهترین هوتل‌های افغانستان را پیدا کنید و از طریق واتساپ رزرو نمایید.",
        ps: "د افغانستان غوره هوټلونه پیدا کړئ او د واټساپ له لارې یې بک کړئ.",
        en: "Find hotels across Afghanistan and make reservations through WhatsApp."
    };

    document.title = pageTitles[selectedLanguage];

    const metaDescription = document.querySelector(
        'meta[name="description"]'
    );

    if (metaDescription) {
        metaDescription.content = descriptions[selectedLanguage];
    }
}


/* ========================================
   4. Language Selection and Storage
======================================== */

if (languageSelect) {
    const savedLanguage = localStorage.getItem("hotelFinderLanguage") || "fa";

    translatePage(savedLanguage);

    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;

        localStorage.setItem("hotelFinderLanguage", selectedLanguage);
        translatePage(selectedLanguage);
    });
}


/* ========================================
   5. Search Hotels by City and Price
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
   6. Handle Search Form
======================================== */

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    searchHotels();

    document.getElementById("hotels").scrollIntoView({
        behavior: "smooth"
    });
});


/* ========================================
   7. Click on a City Card
======================================== */

cityCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const selectedCity = card.dataset.city;

        citySelect.value = selectedCity;

        searchHotels();
    });
});


/* ========================================
   8. Update Results When Filters Change
======================================== */

citySelect.addEventListener("change", searchHotels);
maxPriceSelect.addEventListener("change", searchHotels);


/* ========================================
   9. WhatsApp Booking Links
======================================== */

const whatsappButtons = document.querySelectorAll(".whatsapp-button");

whatsappButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const whatsappLink = button.getAttribute("href");

        if (!whatsappLink || whatsappLink.includes("XXXXXXXX")) {
            event.preventDefault();

            const selectedLanguage =
                localStorage.getItem("hotelFinderLanguage") || "fa";

            const messages = {
                fa: "شماره واتساپ این هوتل هنوز تنظیم نشده است.",
                ps: "د دې هوټل د واټساپ شمېره لا نه ده تنظیم شوې.",
                en: "The WhatsApp number for this hotel has not been configured yet."
            };

            alert(messages[selectedLanguage] || messages.fa);
        }
    });
});