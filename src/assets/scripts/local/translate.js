var goMainBtn = document.getElementById("goMainBtn");

goMainBtn.addEventListener("click", function() {
    window.location.href = "/src/templates/pages/main.html";
  });

  const countries = {
    "am-ET": "Амхарский",
    "ar-SA": "Арабский",
    "be-BY": "Белорусский",
    "bem-ZM": "Бемба",
    "bi-VU": "Бислама",
    "bjs-BB": "Баджан",
    "bn-IN": "Бенгальский",
    "bo-CN": "Тибетский",
    "br-FR": "Бретонский",
    "bs-BA": "Боснийский",
    "ca-ES": "Каталанский",
    "cop-EG": "Коптский",
    "cs-CZ": "Чешский",
    "cy-GB": "Уэльский",
    "da-DK": "Датский",
    "dz-BT": "Дзонг-кэ",
    "de-DE": "Немецкий",
    "dv-MV": "Мальдивский",
    "el-GR": "Греческий",
    "en-GB": "Английский",
    "es-ES": "Испанский",
    "et-EE": "Эстонский",
    "eu-ES": "Баскский",
    "fa-IR": "Персидский",
    "fi-FI": "Финский",
    "fn-FNG": "Фанагало",
    "fo-FO": "Фарерский",
    "fr-FR": "Французский",
    "gl-ES": "Галисийский",
    "gu-IN": "Гуджарати",
    "ha-NE": "Хауса",
    "he-IL": "Иврит",
    "hi-IN": "Хинди",
    "hr-HR": "Хорватский",
    "hu-HU": "Венгерский",
    "id-ID": "Индонезийский",
    "is-IS": "Исландский",
    "it-IT": "Итальянский",
    "ja-JP": "Японский",
    "kk-KZ": "Казахский",
    "km-KM": "Кхмерский",
    "kn-IN": "Каннада",
    "ko-KR": "Корейский",
    "ku-TR": "Курдский",
    "ky-KG": "Киргизский",
    "la-VA": "Латинский",
    "lo-LA": "Лаосский",
    "lv-LV": "Латышский",
    "men-SL": "Менде",
    "mg-MG": "Малагасийский",
    "mi-NZ": "Маори",
    "ms-MY": "Малайский",
    "mt-MT": "Мальтийский",
    "my-MM": "Бирманский",
    "ne-NP": "Непальский",
    "niu-NU": "Ниуэ",
    "nl-NL": "Голландский",
    "no-NO": "Норвежский",
    "ny-MW": "Ньянджа",
    "ur-PK": "Урду",
    "pau-PW": "Палауанский",
    "pa-IN": "Панджаби",
    "ps-PK": "Пашто",
    "pis-SB": "Пиджин",
    "pl-PL": "Польский",
    "pt-PT": "Португальский",
    "rn-BI": "Кирунди",
    "ro-RO": "Румынский",
    "ru-RU": "Русский",
    "sg-CF": "Санго",
    "si-LK": "Сингальский",
    "sk-SK": "Словацкий",
    "sm-WS": "Самоанский",
    "sn-ZW": "Шона",
    "so-SO": "Сомалийский",
    "sq-AL": "Албанский",
    "sr-RS": "Сербский",
    "sv-SE": "Шведский",
    "sw-SZ": "Суахили",
    "ta-LK": "Тамильский",
    "te-IN": "Телугу",
    "tet-TL": "Тетум",
    "tg-TJ": "Таджикский",
    "th-TH": "Тайский",
    "ti-TI": "Тигринья",
    "tk-TM": "Туркменский",
    "tl-PH": "Тагальский",
    "tn-BW": "Цвана",
    "to-TO": "Тонга",
    "tr-TR": "Турецкий",
    "uk-UA": "Украинский",
    "uz-UZ": "Узбекский",
    "vi-VN": "Вьетнамский",
    "wo-SN": "Волоф",
    "xh-ZA": "Коса",
    "yi-YD": "Идиш",
    "zu-ZA": "Зулу"
};
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector("#exchange");
const languageSelect = document.querySelector("#language-select");
const targetLanguageSelect = document.querySelector("#target-language-select");
const icons = document.querySelectorAll("ul.controls .icons i");
const translateBtn = document.querySelector("#translate-button");
// Populate language select options
const populateLanguageOptions = (selectElement, selectedLanguage) => {
    for (const country_code in countries) {
        const selected = selectedLanguage === country_code ? "selected" : "";
        const option = document.createElement("option");
        option.value = country_code;
        option.textContent = countries[country_code];
        option.selected = selected;
        selectElement.appendChild(option);
    }
};
populateLanguageOptions(languageSelect, "ru-RU"); // Default "From" language
populateLanguageOptions(targetLanguageSelect, "en-GB"); // Default "To" language
// Exchange "From" and "To" languages and texts
exchangeIcon.addEventListener("click", () => {
    const tempText = fromText.value;
    const tempLang = languageSelect.value;
    fromText.value = toText.value;
    toText.value = tempText;
    languageSelect.value = targetLanguageSelect.value;
    targetLanguageSelect.value = tempLang;
});
// Handle translation when the button is clicked
translateBtn.addEventListener("click", () => {
    const text = fromText.value.trim();
    const translateFrom = languageSelect.value;
    const translateTo = targetLanguageSelect.value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            toText.value = data.responseData.translatedText;
            data.matches.forEach((data) => {
                if (data.id === 0) {
                    toText.value = data.translation;
                }
            });
            toText.setAttribute("placeholder", "Translation");
        });
});
// Handle copy and speak functionality
icons.forEach((icon) => {
    icon.addEventListener("click", ({
        target
    }) => {
        if (!fromText.value || !toText.value) return;
        if (target.id === "from-copy") {
            navigator.clipboard.writeText(fromText.value);
        } else if (target.id === "to-copy") {
            navigator.clipboard.writeText(toText.value);
        } else if (target.id === "from-speak") {
            const utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = languageSelect.value;
            speechSynthesis.speak(utterance);
        } else if (target.id === "to-speak") {
            const utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = targetLanguageSelect.value;
            speechSynthesis.speak(utterance);
        }
    });
});