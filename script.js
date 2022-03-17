const API_KEY = "7a92927b-3137-4cc5-9344-e559aaf91a0c"

const buttonRenderCountriesList = document.querySelector("#countries-list-btn");
buttonRenderCountriesList.addEventListener("click", () =>{
    console.log("handle click event");
});

const getCountries = async ()=>{
    try{
        const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data) //have a look the retrieved data
        return data
    } catch(err){
        console.log("err", err)
    }
}
getCountries();

const renderCountries = async()=>{
    try{
        const data = await getCountries()
        const countriesList = document.getElementById("countries-list")
        const ulCountriesList = countriesList.children[2]
        ulCountriesList.innerHTML=""
        data.countries.forEach((country, index)=>{
            const li = document.createElement("li")
            li.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;
            ulCountriesList.appendChild(li)
        })
    } catch(err){
        console.log("err", err)
    }
}
document.getElementById("countries-list-btn").addEventListener("click", () =>{
    renderCountries()
});


const getLanguage = async ()=>{
    try{
        const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`
        //here is how we add a dynamic value (API KEY) to the url
        const res = await fetch(url)
        const data = await res.json()
        console.log("data", data) //have a look the retrieved data
        return data
    } catch(err){
        console.log("err", err)
    }
}
getLanguage();
const renderLanguage = async()=>{
    try{
        const data = await getLanguage()
        const languagesList = document.getElementById("languages-list")
        const ulLanguagesList = languagesList.children[2]
        ulLanguagesList.innerHTML=""
        data.languages.forEach((languages, index)=>{
            const li = document.createElement("li")
            li.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${languages.name}</div>
                <div>Code: ${languages.code}</div>
            </div>`;
            ulLanguagesList.appendChild(li)
        })
    } catch(err){
        console.log("err", err)
    }
}
document.getElementById("languages-list-btn").addEventListener("click", () =>{
    renderLanguage()
});

document.getElementById("holidays-btn").addEventListener("click", () =>{
    renderHolidays()
})

const getHolidays = async ()=>{
    try{
        let Country_Key = document.getElementById("country-query").value;
        if (Country_Key === "") {
          Country_Key = "VN";
        }
        let Month = document.getElementById("month-query").value;
        let Day = document.getElementById("day-query").value;
        changeCountry(Country_Key);
        const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${Country_Key}&year=2021&month=${Month}&day=${Day}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("data", data); //have a look the retrieved data
        return data;
    } catch(err) {
        console.log("err", err);
    }
}

const renderHolidays = async()=>{
    try{
        const data = await getHolidays();
        const holidayList = document.getElementById("holidays-list");
        const ulHolidayList = holidayList.children[1];
        ulHolidayList.innerHTML="";
        data.holidays.forEach((holidays, index)=>{
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${holidays.name}</div>
                <div class="li-text">${holidays.weekday.date.name}, ${holidays.date}</div>
            </div>;`
            ulHolidayList.appendChild(x);
        })
    } catch(err){
        console.log("err", err);
    }
}

const changeCountry = async(countryCheck)=>{
  try {
    const data = await getCountries();
    const holidayList = document.getElementById("holidays-list");
    const ulHolidayList = holidayList.children[0];
    data.countries.forEach((countries, index)=>{
      if (countries.code===countryCheck) {
        ulHolidayList.innerText =`Holidays of ${countries.name}`;
      }
    })
  } catch(err){
      console.log("err", err)
  }
}