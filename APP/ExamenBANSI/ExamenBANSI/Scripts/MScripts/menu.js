function obtenerMenu() {
    let counter = 1;
    $.ajax({
        url: '/Default/Index',
        type: 'GET',
        data: {
        },
        dataType: 'json',
        success: function (response) {
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar menu');
        },
        complete: function (jqXHR, status) {
        }
    });
}

function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
}
