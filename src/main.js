import "./css/index.css";
import IMask from 'imask';

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

const cvc = document.querySelector("#security-code");
const cvcPattern = {
    mask: "0000"
};
const cvcPatternMasked = IMask(cvc, cvcPattern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        }
    }
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default"
        }
    ],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundMask = dynamicMasked.compiledMasks.find(function(item) {
            return number.match(item.regex);
        });

        return foundMask;
    }
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);