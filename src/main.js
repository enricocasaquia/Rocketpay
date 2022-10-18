import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccIcon = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
    const ccColors = {
        "visa":["#436D99","#2D57F2"],
        "mastercard":["#DF6F29","#C69347"],
        "default":["#000000","#808080"]
    };
    const ccLogos = {
        "visa":"cc-visa.svg",
        "mastercard":"cc-mastercard.svg",
        "default":"cc-default.svg"
    };

    ccBgColor01.setAttribute("fill", ccColors[type][0]);
    ccBgColor02.setAttribute("fill", ccColors[type][1]);
    ccIcon.setAttribute("src", ccLogos[type]);
};

globalThis.setCardType;