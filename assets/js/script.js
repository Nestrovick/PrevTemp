const key = "5e6c470b92b75a17fa420b5679f247a8";

function insertdata(dados) {
    document.querySelector(".search-city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
    document.querySelector(".text-prev").innerHTML = dados.weather[0].description;
    document.querySelector(".moisture").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".ventoInfo").innerHTML = "Vento: " + Math.floor(dados.wind.speed) + " <span>km/h</span>";
    document.querySelector(".img-prev").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;

    // Exibir as informações
    document.querySelector(".medium-box").style.display = "block";
    document.querySelector(".moisture").style.display = "block";
    document.querySelector(".ventoInfo").style.display = "block";

    // Remover a mensagem de erro, se houver
    document.querySelectorAll(".error-message").forEach(el => el.remove());
}

function insertDefaultData() {
    const defaultData = {
        name: "Brasília",
        main: {
            temp: 21,
            humidity: 54
        },
        weather: [
            {
                description: "Nublado",
                icon: "04n"
            }
        ],
        wind: {
            speed: 2
        }
    };
    insertdata(defaultData);
}

function showError(message) {
    // Ocultar as informações se houver um erro
    document.querySelector(".medium-box").style.display = "none";
    document.querySelector(".moisture").style.display = "none";
    document.querySelector(".ventoInfo").style.display = "none";

    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.innerText = message;
    document.querySelector(".box").appendChild(errorMessage);
}

async function searchcity(cidade) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        if (!response.ok) {
            throw new Error('Não encontramos essa localização');
        }
        const dados = await response.json();

        if (dados && dados.name && dados.main && dados.main.temp) {
            insertdata(dados);
        } else {
            throw new Error('Não encontramos essa localização');
        }
    } catch (error) {
        document.querySelectorAll(".error-message").forEach(el => el.remove());
        showError(error.message);
    }
}

function clickbutton() {
    const cidade = document.querySelector(".city").value.trim();
    if (cidade === "") {
        insertDefaultData();  // Voltar para os dados padrão
        return;
    }
    searchcity(cidade);
}

function clearInput() {
    const cityInput = document.querySelector(".city");
    cityInput.value = "";
    toggleClearButton(cityInput);
    insertDefaultData();  // Voltar para os dados padrão
}

function toggleClearButton(input) {
    const clearButton = document.querySelector(".clear-button");
    if (input.value) {
        clearButton.style.display = "block";
    } else {
        clearButton.style.display = "none";
    }
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').innerText = currentTime;
}

document.querySelector(".city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        clickbutton();
    }
});

setInterval(updateTime, 1000);
updateTime();
