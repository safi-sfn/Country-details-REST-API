//  new URLSearchParams(window.location.search).get('name') with the help of this we can use the data of search abr

const cn = new URLSearchParams(window.location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryName = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border-countries')
fetch(`https://restcountries.com/v3.1/name/${cn}?fullText=true`)
.then((res)=> res.json())
.then(([country])=>{
    console.log([country]);
    flagImage.src = country.flags.svg
    population.textContent = country.population.toLocaleString('en-IN')
    countryName.textContent = country.name.common
    region.textContent = country.region
    

    if(country.subregion){
        subRegion.textContent = country.subregion
    }
    if(country.capital){
        capital.textContent = country.capital?.[0]
    }
    if(country.languages){
    language.textContent = Object.values(country.languages).join(', ')
    }
    if(country.currencies){
        currency.textContent = `${Object.values(country.currencies)[0].name}, ${Object.values(country.currencies)[0].symbol}`
    }
    topLevelDomain.textContent = country.tld.join(', ')

    if(country.name.nativeName){
        nativeName.textContent =  Object.values(country.name.nativeName)[0].common
    }else{
        nativeName.textContent = country.name.common
    }

    if(country.borders){
        country.borders.forEach(border => {
          
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then(([borderCountry]) =>{
                const borderCountryTag = document.createElement('a')
                borderCountryTag.textContent = borderCountry.name.common
                borderCountryTag.href = `country-detail.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
                
            })
        });   
    }
 })