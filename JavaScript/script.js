const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData = data
})

filterByRegion.addEventListener('change', (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})


function renderCountries(data){
    countriesContainer.innerHTML = ''
    data.forEach(country => {

        // console.log(country.flags.svg)
        // console.log(country.name)
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `./country-detail.html?name=${country.name.common}`
        // countryCard.target = '_blank'
        const cardHtml =`
    <img src="${country.flags.svg}" alt="${country.flags.alt}">
       <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population :- </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region :- </b>${country.region}</p>
            <p><b>Capital :- </b>${country.capital?.[0]}</p>
       </div>
`
countryCard.innerHTML = cardHtml
countriesContainer.append(countryCard)
    });
}

searchInput.addEventListener('input',(e)=>{
     const filterCountries =   allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
     renderCountries(filterCountries)
})

themeChanger.addEventListener('click',()=>{
      document.body.classList.toggle('dark')
})





// const countriesContainer = document.querySelector('.countries-container')
// const countryCard = document.createElement('a')
// countryCard.classList.add('country-card')

// const cardImg = document.createElement('img')
// cardImg.src = 'https://flagcdn.com/is.svg'
// cardImg.alt = 'The flag of IceLand'
// countryCard.append(cardImg)

// const cardDiv = document.createElement('div')
// cardDiv.classList.add('card-text')
// countryCard.append(cardDiv)

// const cardTitle = document.createElement('h3')
// cardTitle.classList.add('card-title')
// cardDiv.append(cardTitle)
// cardTitle.textContent = 'Iceland'

// const boldValue = ['Population :- ','Region :- ','Capital :- ']
// const paraValue = ['3467899','Europe','Reykjavik']
// for(let i=0; i<=2; i++){
//     const para = document.createElement('p')
//     const boldTag = document.createElement('b')
//     cardDiv.appendChild(para)
//     para.textContent = paraValue[i]
//     boldTag.textContent = boldValue[i]
//     para.appendChild(boldTag)
// }

// const cardHtml =`
//     <img src="https://flagcdn.com/is.svg" alt="The flag of Iceland ">
//        <div class="card-text">
//             <h3 class="card-title">Iceland</h3>
//             <p><b>Population :- </b>366425</p>
//             <p><b>Region :- </b>Europe</p>
//             <p><b>Capital :- </b>Reykjavik</p>
//        </div>
// `
// countryCard.innerHTML = cardHtml
// countriesContainer.append(countryCard)

// console.log(countryCard) 