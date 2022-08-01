let rates = [];

currentDate = (date) => {
    return [date.getFullYear(), date.getMonth(), date.getDate()].join(0,''); 
}

renderRates = (rates) => {
    const htmlStr = rates.map((rate) =>
        `<tr>
            <td>${rate.r030}</td>
            <td>${rate.txt}</td>
            <td>${rate.rate}</td>
            <td>${rate.cc}</td>
            <td>${rate.exchangedate}</td>
        </tr>`).join('');
    document.querySelector('.rates tbody').innerHTML = htmlStr || `<tr><td colspan="5" class="text-center">Not Found</td></tr>`;
}

document.querySelector('#search').onkeyup = (e) => {
    let value = e.currentTarget.value.toLowerCase().trim();
    let filteredRates = rates.filter(rate => rate.txt.toLowerCase().includes(value));
    
    renderRates(filteredRates);
}

document.getElementById('date').onchange = (e) => {
    const selectDate = e.currentTarget.value.replaceAll('-', '');
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${selectDate}&json`)
    .then((data) => {
        return data.json();
    }).then((data) => {
        rates = data.map((rate) => {
            return {
                r030: rate.r030,
                txt: rate.txt,
                rate: rate.rate,
                cc: rate.cc,
                exchangedate: rate.exchangedate
            }
        });
    renderRates(rates);
    });
    document.getElementById('search').value = '';
}

fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${currentDate(new Date())}&json`)
.then((data) => {
    return data.json();
}).then((data) => {
    rates = data.map((rate) => {
        return {
            r030: rate.r030,
            txt: rate.txt,
            rate: rate.rate,
            cc: rate.cc,
            exchangedate: rate.exchangedate
        }
    });
    renderRates(rates);        
});

