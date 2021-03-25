async function getContent(){
    try {
        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        addTemperaturaObjeto(data);
    } catch (erro) {
        console.log(erro);
    };
};


function addTemperaturaObjeto(data){
    var horaAtual = pegarHoraAtual();
    renderizaHtmtDescription(data);
    renderizaHtmlTemperaturas(data);
    estilizarRazaoHoraClima(horaAtual, data.weather[0].description)
};

function renderizaHtmlTemperaturas(temperatura, clima){
    var tempMin = temperatura.main.temp_min;
    var tempMax = temperatura.main.temp_max;

    var container = document.getElementById('tempo');
    var content = `<div class="content-temp">
                        <div class="temperatura"><span>Min</span><p> ${tempMin}°C</p></div>
                        <div class="temperatura"><span>Max</span><p> ${tempMax}°C</p></div>
                    </div>`;
    container.innerHTML = content;
};
function renderizaHtmtDescription(data){
    var descricao = document.getElementById('descricao');
    var tempAtual = data.main.temp
    var velocidadeVento = data.wind.speed;
    var nomeCidade = data.name;
    var clima = data.weather[0].description
    
    var contentDescription = `
                            <div class="temp">
                                <div class="temp-atual">${tempAtual}°C</div>
                                <div class="data-atual">25 Março 2021</div>
                            </div>
                            <div class="contentdescricao">
                                <div class="group-description">
                                    <div id="icon" class="icon"><div class="iconTempo"><img src="./icons/sol/nuvens-e-sol.png" alt="" srcset=""></div></div>                             
                                    <div class="group-decricao">
                                        <div class="nomecidade"> ${nomeCidade} </div>
                                        <div class="clima"> ${clima} </div>
                                    </div>
                                </div>
                                <div class="velocidade">
                                    <div class="velocidadeVento">${velocidadeVento}KM </div>
                                    <div class="iconvelocidade"><img src="./icons/nuvem/vento.png" alt="" srcset=""></div>
                                </div>
                            </div>`

    descricao.innerHTML = contentDescription;

}

function pegarHoraAtual(){
    var dataAtual = new Date();
    var hora = dataAtual.getHours();
    return hora;
}



var verificarHorario = {
    manha:function(clima){
        var climaAtual = clima;
        console.log(climaAtual)
        var container = document.getElementById('animation');
        var imgsol = '<img class="estrela" src="./icons/sol/sol.png" alt="" srcset="">';
        

        var climaTempo = verificarTempo(climaAtual);

        var content = `<div id="row-animation" class="row-animation">
                            ${climaTempo}
                            ${imgsol}
                        </div>`;

        container.innerHTML =  content;
        container.innerHTML =  content;
        var rowAnimation = document.getElementById('row-animation')
        var iconClima = document.getElementById('icon'); 
            rowAnimation.style.background = '#87CEEB'
            iconClima.style.background = '#87ceeb'
        
    },
    tarde:function(clima){
        var img = document.createElement('img');
        img.src = "./icons/sol/ensolarado.png";
        img.className = 'nuvem';
        return img;
        
    },
    noite:function(clima){
        console.log(clima)
        var climaAtual = 'tempestade'
        var container = document.getElementById('animation');
        var imgsol = '<img class="estrela" src="./icons/lua/meia-lua.png" alt="" srcset="">';
        
        var climaTempo = verificarTempo(climaAtual);

        var content = `<div id="row-animation" class="row-animation">
                            ${climaTempo}
                            ${imgsol}
                        </div>`;

        
        container.innerHTML =  content;
        var rowAnimation = document.getElementById('row-animation')
        var iconClima = document.getElementById('icon'); 
            rowAnimation.style.background = '#2D2D2D'
            iconClima.style.background = '#2D2D2D'
    }
};

var verificarDescricao = {
    ceuLimpo: function(){
    },
    nublado: function(){
        return '<img class="nuvem" src="./icons/nuvem/nuvens.png" alt="">'
    },
    tempestade: function(){
        return '<img class="nuvem" src="./icons/nuvem/tempestade.png" alt="">'
    },
    muitaChuva: function(){

    },
    chuvaModerada: function(){
        return '<img class="nuvem" src="./icons/nuvem/nuvemgaroa.png" alt="">'
    },
    trovoada: function(){

    }
};
function verificarTempo(clima){
    if(clima == 'nuvens dispersas'){
        return verificarDescricao.nublado();
    }if(clima == 'chuva fraca'){
        return verificarDescricao.chuvaModerada();
    }if(clima == 'tempestade'){
        return verificarDescricao.tempestade();
    }
}

function estilizarRazaoHoraClima(hora, clima){
    var horaAtual = 7;

    if(horaAtual >= 00 && horaAtual <= 05){
        return console.log('madrugada')
    }else if(horaAtual > 05 && horaAtual <= 12){
        verificarHorario.manha(clima)
    }else if(horaAtual > 12 && horaAtual <= 18){
        verificarHorario.tarde(clima)
    }else if(horaAtual > 18 && horaAtual <= 23){
        verificarHorario.noite(clima)
    }
};

getContent();