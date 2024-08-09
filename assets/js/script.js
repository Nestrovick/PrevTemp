const key = "5e6c470b92b75a17fa420b5679f247a8";

function insertdata(dados) {
    document.querySelector(".search-city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
    document.querySelector(".text-prev").innerHTML = dados.weather[0].description;
    document.querySelector(".moisture").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".ventoInfo").innerHTML = "Vento: " + Math.floor(dados.wind.speed) + " <span>km/h</span>";
    document.querySelector(".img-prev").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function searchcity(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
        }
        const dados = await response.json();
        insertdata(dados);
    } catch (error) {
        alert(error.message);
    }
}

function clickbutton() {
    const cidade = document.querySelector(".city").value.trim();
    if (cidade === "") {
        alert("Por favor, informe o nome de alguma cidade.");
        return;
    }
    searchcity(cidade);
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').innerText = currentTime;
}

setInterval(updateTime, 1000);
updateTime(); 

