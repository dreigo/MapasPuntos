// This example adds an animated symbol to a polyline.
//var urlBase = "http://localhost/MapasLinea/api/values";
//var urlBase = "https://coordenadasmapas.azurewebsites.net/api/values";
const urlBase = "https://webapicoordenadas.azurewebsites.net/api/values";
var map;
var lineSymbol;
var line;
var coordenadas;
var ruta = 0;
var rutasBlob;

// funcion principal
function initMap() {
    crearMap();
    //obtenerlistaUrl();
    obtenerDatosUrl();
    ruta = 0;

}

// funcion que obtiene las cordenadas y pinta la polinia
function obtenerDatosUrl(rutaNombre) {
    $.ajax({
        url: urlBase,
        data: {},
        success: function(result) {
            coordenadas = result;
            ruta = ruta + 1;
            crearMapV2(result[0].Lat, result[0].Lng);
            crarSimbolo();

            // Create the polyline and add the symbol to it via the 'icons' property.
            crearLinea();

            animateCircle(line);
        },
        error: function(error) {
            crearMap();
        }
    });
}

//crear Mapa
function crearMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.423653, lng: -99.17766 },
        zoom: 10,
        mapTypeId: 'roadmap'
    });
}

function crearMapV2(lat1, lng1) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat1, lng: lng1 },
        zoom: 17,
        mapTypeId: 'roadmap'
    });
}

function crarSimbolo() {
    lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // tipo de icono https://developers.google.com/maps/documentation/javascript/symbols#add_to_marker
        scale: 4, // tamaño del icono
        strokeColor: randomColor() //color del icono
    };
}

function crearLinea() {
    let coor = [];
    for (let index = 0; index < coordenadas.length; index++) {
        const e = coordenadas[index];
        coor.push({lat: parseFloat(e.Lat), lng:parseFloat(e.Lng) });
        
    }

    line = new google.maps.Polyline({
        name: 'nueva linea 1',
        path: coor,
        icons: [{
            icon: lineSymbol, //se agrega el icono a la linea 
            offset: '100%' // quien sabe para que sirve
        }],
        strokeColor: randomColor(),
        map: map
    });
}

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
        count = (count + 1) % 200; //tiene que ver con el recorrigo del poligono entre 
        //mayor es el numero mas tarda en aparecer entre menor es
        //se corta en la linea

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 150); //velocidad entre mayor es el numero mas despacio va
}

function randomColor() {
    var x = '#';
    for (let index = 0; index < 6; index++) {
        var aLetras = new Array('a', 'b', 'c', 'd', 'e', 'f');
        var aNumeros = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        var cLetra = aLetras[Math.floor(Math.random() * aLetras.length)];
        var cNumero = aNumeros[Math.floor(Math.random() * aNumeros.length)];
        var y = Math.random();
        if (y < 0.5) {
            x = x + cLetra;
        } else {
            x = x + cNumero;
        }

    }
    let a = x;
    return x;
}

function agregarInput(inputs) {

    var micapa = document.getElementById('floating-panel2');
    //    micapa.innerHTML = '<input onclick="nuevasRutas();" type="button" value="com_xxx" name="option" /><input type="button" value="introduce" name="task" />';
    micapa.innerHTML = inputs;
}

function nuevasRutas(params) {

    obtenerDatosUrl(params);
    //alert(rutasBlob[params].Url);

}


function obtenerlistaUrl() {
    $.ajax({
        url: urlBase,
        data: {},
        success: function(result) {
            //console.log(result);
            var InputsNuevos = "";

            for (let index = 0; index < result.length; index++) {
                InputsNuevos =
                    '<input class="button2" onclick="nuevasRutas(' + index + ');" type="button" value="Mi Viaje"/>';
                break;
            }

            // funciona bien solo que muestra todos los nombres
            // for (let index = 0; index < result.length; index++) {
            //     rutasBlob = result;
            //     console.log("elemnot", result[index]);

            //     InputsNuevos = InputsNuevos +
            //         '<input onclick="nuevasRutas(' + index + ');" type="button" value="' + result[index].Nombre + '"/>';

            // }
            //agregarInput(InputsNuevos);

        },
        error: function(error) {
            crearMap();
        }
    });
}