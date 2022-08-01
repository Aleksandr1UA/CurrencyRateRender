let rates = [];

renderRates = (rates) => {
    const htmlStr = rates.map((rate) =>
        `<tr>
            <td>${rate.name}</td>
            <td>${rate.rate}</td>
            <td>${rate.cc}</td>
        </tr>`).join('');
    document.querySelector('.rates tbody').innerHTML = htmlStr || `<tr><td colspan="3" class="text-center">Not Found</td></tr>`;
}

document.querySelector('#search').onkeyup = (e) => {
    let value = e.currentTarget.value.toLowerCase().trim();
    let filteredRates = rates.filter(rate => rate.name.toLowerCase().includes(value));
    
    renderRates(filteredRates);
}

document.getElementById('date').onchange = (e) => {         
    let curDate = e.currentTarget.value.replaceAll('-', '');    
    newDate(curDate);
        
    document.getElementById('search').value = '';
}

newDate = (date) => {
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`)
    .then((data) => {
        return data.json();
    }).then((data) => {
        rates = data.map((rate) => {
            return {
                name: rate.txt,
                rate: rate.rate.toFixed(2),
                cc: rate.cc,
            }
        });
    renderRates(rates);
    });
}