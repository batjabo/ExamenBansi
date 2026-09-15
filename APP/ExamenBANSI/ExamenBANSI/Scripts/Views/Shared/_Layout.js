

$(document).ready(function () {

    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () { window.location.hash = ""; }



    //console.log('tiempo en sesión:' + tiempoValor);
    //console.log('tiempo en auxTiempoSesion:' + auxTiempoSesion);

    if (tiempoValor && !isNaN(tiempoValor)) {
        let tiempoSesionEnMinutos = parseInt(tiempoValor);
        auxTiempoSesion = (tiempoSesionEnMinutos - 2) * 60;
    }

    tiempoSesion = auxTiempoSesion;

    //console.log("tiempoSesion:" + tiempoSesion);

    $("#btnCerrarSesion").click(function () {
        modal.modal('hide');
        clearInterval(intervaloInactividad);
        clearInterval(intervaloAlerta);

        updateSession('expired');
        iniciarTemporizadorInactividad();

        FinSesion(true);
    });

    $("#linkCerrarSesion").click(function () {
        clearInterval(intervaloInactividad);
        clearInterval(intervaloAlerta);

        updateSession('expired');
        iniciarTemporizadorInactividad();

        FinSesion(false);
    });

    // Iniciar el temporizador al cargar la página
    //iniciarTemporizadorInactividad();

    // Inicializar la sesión al cargar la página
    initSession();
});

// Función para generar un ID de sesión único
function generateSessionId() {
    return '_' + Math.random().toString(36).slice(2, 9);
}

// Función para inicializar la sesión
function initSession() {
    //console.log('entra a initSession');
    // Obtener o crear la información de sesión en LocalStorage
    let sessionData = JSON.parse(localStorage.getItem(sessionStorageKey)) || {
        sessionId: generateSessionId(),
        startTime: Date.now(),
        status: 'active'
    };
    localStorage.setItem(sessionStorageKey, JSON.stringify(sessionData));

    // Iniciar el temporizador
    iniciarTemporizadorInactividad();
}

// Función para actualizar el estado de la sesión en LocalStorage y enviar un mensaje
function updateSession(newState) {
    const sessionData = JSON.parse(localStorage.getItem(sessionStorageKey));
    sessionData.status = newState;
    localStorage.setItem(sessionStorageKey, JSON.stringify(sessionData));

    // Enviar mensaje a otras pestañas
    window.postMessage({ type: 'sessionUpdate', data: sessionData }, '*');
}

// Escuchar mensajes de otras pestañas
window.addEventListener('message', (event) => {
    //console.log('escuchando eventos estatus otras pestañas:' + event.data.data.status);
    if (event.data.type === 'sessionUpdate') {
        localStorage.setItem(sessionStorageKey, JSON.stringify(event.data.data));

        //if (event.data.data.status === 'expired') {     
        //alert('Tu sesión ha expirado.');
        //}
    }
});


// Función para calcular el tiempo restante
function calcularTiempoRestante() {
    const sessionData = JSON.parse(localStorage.getItem(sessionStorageKey));
    const startTime = sessionData.startTime;
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // Tiempo transcurrido en segundos
    const remainingTime = tiempoSesion - elapsedTime;
    return remainingTime;
}



// Función para iniciar el temporizador de inactividad
function iniciarTemporizadorInactividad() {

    // Actualizar el startTime al iniciar el temporizador
    const sessionData = JSON.parse(localStorage.getItem(sessionStorageKey));
    sessionData.startTime = Date.now();
    localStorage.setItem(sessionStorageKey, JSON.stringify(sessionData));

    intervaloInactividad = setInterval(() => {
        tiempoInactividad++;

        //console.log('tiempo inactividad:' + tiempoInactividad);

        // Calcular el tiempo restante
        const tiempoRestante = calcularTiempoRestante();
        // console.log('tiempo restante:' + tiempoRestante);

        // Mostrar el tiempo restante en la interfaz (si es necesario)
        //$('#tiempo-restante').text(tiempoRestante + ' segundos restantes');

        //// Verificar si el tiempo restante es menor al tiempo de alerta
        //if (tiempoRestante <= tiempoAlerta) {
        //    // Mostrar el modal de alerta
        //    modal.modal('show');
        //}

        // Verificar si el tiempo restante es 0
        if (tiempoRestante <= 0) {
            updateSession('expired');
            iniciarTemporizadorInactividad();
            // Cerrar la sesión
            FinSesion(true);
        }
    }, 1000);
}

function FinSesion(isModal) {
    console.log('fin de sesión');    
    $.ajax({
        async: false,
        type: "POST",
        url: urlCerrarSession,
        data: { isModal: isModal },
        cache: false,
        async: false,
        success: function (data) {
            //console.log('---------------------FinSesion suceess data:' + data);
            //updateSession('expired'); 
            window.location.href = data;
            detenerTemporizadorInactividad();
        },
        error: function (jqXHR, textStatus) {
            //console.log("Error de fin sesión");
            /*updateSession('expired'); */
            window.location.href = urlError;
            detenerTemporizadorInactividad();
        }
    });

}

// Reiniciar el contador en eventos de usuario
$(document).on('mousemove keydown scroll', () => {
    reiniciarContadores(false);

    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(function () {
        //console.log('El mouse ha estado inactivo durante 5 segundos');
        iniciarTemporizadorInactividad();
    }, 5000);

});

// Eventos window.onfocus y window.onblur
window.onfocus = () => {
    reiniciarContadores(true);
};

window.onblur = () => {
    iniciarTemporizadorInactividad();
};

$(window).on('beforeunload', function () {
    //clearInterval(intervaloInactividad);
    //clearInterval(intervaloAlerta);  
    FinSesion(true);
});

$.ajaxSetup({
    beforeSend: BeforeSendAjax,
});

function BeforeSendAjax(xhr, opt) {

    var sucess = undefined;
    if (opt.success !== undefined) {
        sucess = opt.success;
        opt.success = null;
    }

    opt.beforeSend = null;

    opt.success = function (event, settings, request) {
        var ejecutasucess = true;
        if (request.responseJSON !== undefined) {

            var json = request.responseJSON;

            if (json.SessionActiva !== undefined) {

                window.location.href = json.URL;
                ejecutasucess = false;
            }
        }

        if (ejecutasucess && sucess !== undefined) {
            if (request.done !== undefined) {
                request.done(sucess);
            }
            else if (request.success !== undefined) {
                request.success(sucess);
            }

        }
    };


    if (!opt.async) {
        jQuery.ajax(opt);
        opt.global = false;
        return false;
    }
}


