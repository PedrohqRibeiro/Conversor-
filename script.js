const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".currency-select-from");
const currencySelectTo = document.querySelector(".currency-select-to");
const inputCurrency = document.querySelector(".input-currency");

const exchangeRates = {
    real: 1,
    dolar: 5.2,
    euro: 6.1,
    libra: 7.2,
    bitcoin: 135000,
};

function updateCurrencyImages() {
    const currencyFrom = currencySelectFrom.value;
    const currencyTo = currencySelectTo.value;

    const currencyFromImg = document.getElementById("currency-from-img");
    const currencyToImg = document.getElementById("currency-to-img");

    // Atualiza as imagens com base na moeda selecionada
    currencyFromImg.src = currencySelectFrom.options[currencySelectFrom.selectedIndex].dataset.image;
    currencyToImg.src = currencySelectTo.options[currencySelectTo.selectedIndex].dataset.image;
}

function convertValues() {
    const inputCurrencyValue = parseFloat(inputCurrency.value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");

    const fromCurrency = currencySelectFrom.value;
    const toCurrency = currencySelectTo.value;

    if (fromCurrency in exchangeRates && toCurrency in exchangeRates) {
        const rateFrom = exchangeRates[fromCurrency];
        const rateTo = exchangeRates[toCurrency];

        const valueInReais = inputCurrencyValue * rateFrom;
        const convertedValue = valueInReais / rateTo;

        let currencySymbol;
        switch (toCurrency) {
            case 'dolar':
                currencySymbol = 'USD';
                break;
            case 'euro':
                currencySymbol = 'EUR';
                break;
            case 'libra':
                currencySymbol = 'GBP';
                break;
            case 'bitcoin':
                currencySymbol = 'BTC';
                break;
            default:
                currencySymbol = '';
        }

        currencyValueConverted.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencySymbol,
            maximumFractionDigits: 8
        }).format(convertedValue);

        currencyValueToConvert.innerHTML = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(inputCurrencyValue * rateFrom);
    } else {
        alert("Selecione moedas válidas!");
    }
}

function changeCurrency() {
    const currencyFromName = document.getElementById("currency-from-name");
    const currencyToName = document.getElementById("currency-to-name");

    switch (currencySelectFrom.value) {
        case "dolar":
            currencyFromName.innerHTML = "Dólar Americano";
            break;
        case "euro":
            currencyFromName.innerHTML = "Euro";
            break;
        case "libra":
            currencyFromName.innerHTML = "Libra Esterlina";
            break;
        case "bitcoin":
            currencyFromName.innerHTML = "Bitcoin";
            break;
        default:
            currencyFromName.innerHTML = "Real";
    }

    switch (currencySelectTo.value) {
        case "dolar":
            currencyToName.innerHTML = "Dólar Americano";
            break;
        case "euro":
            currencyToName.innerHTML = "Euro";
            break;
        case "libra":
            currencyToName.innerHTML = "Libra Esterlina";
            break;
        case "bitcoin":
            currencyToName.innerHTML = "Bitcoin";
            break;
        default:
            currencyToName.innerHTML = "Dólar Americano";
    }

    updateCurrencyImages(); // Atualiza as imagens das moedas
}

// Adiciona eventos
inputCurrency.addEventListener("input", convertValues);
currencySelectFrom.addEventListener("change", () => {
    changeCurrency();
    convertValues(); // Atualiza a conversão quando a moeda de origem muda
});
currencySelectTo.addEventListener("change", () => {
    changeCurrency();
    convertValues(); // Atualiza a conversão quando a moeda de destino muda
});
