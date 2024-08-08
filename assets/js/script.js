

const key= "5e6c470b92b75a17fa420b5679f247a8"


function insertdata(dados){
    console.log(dados)
    document.querySelector(".search-city").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C"
    document.querySelector(".text-prev").innerHTML = dados.weather[0].description
    document.querySelector(".moisture").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".ventoInfo").innerHTML = "Vento: " + Math.floor(dados.wind.speed) + " <span>km/h</span>";
    document.querySelector(".img-prev").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

async function searchcity(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then (response => response.json())

    insertdata(dados)

    console.log(dados)

}

function clickbutton() {
    const cidade = document.querySelector(".city").value

    searchcity(cidade)

}