function CallAjaxPost(controlador, parametros, funcionExito, funcionError) {
    $.ajax({
        type: "POST",
        url: controlador,
        data: JSON.stringify(parametros),
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: funcionExito,
        error: funcionError,
        cache: false,
        timeout: 0
    });
}

function AjaxAction(url, idSegmentoActualizar, IdSegmentoError) {
    if (url == '') {
        $('#' + idSegmentoActualizar).html('');
    }
    else {

        $.ajax({
            type: "POST",
            url: url,
            success: function (data) {
                $('#' + idSegmentoActualizar).html(data);
            },
            error: function (jqXHR, textStatus) {
                console.log(jqXHR);
                console.log(textStatus);
                if (typeof textStatus.responseText === 'string' && textStatus.responseText.indexOf('<html>') >= 0 && (textStatus.responseText.indexOf('Sesión') >= 0 || textStatus.responseText.indexOf('sesión') >= 0)) {
                    window.location.href = urlErrorSesion;
                }
                else {
                    addAlertGral(IdDivMns, 'Ocurrio un error, intentelo mas tarde.', 'cancel', 'danger');
                }
            }
        });
    }
}

function validaSesionErrorJson(data, idDivMns, mnsMostrar) {
    if (typeof data.responseText === 'string' && data.responseText.indexOf('<html>') >= 0 && (data.responseText.indexOf('Sesión') >= 0 || data.responseText.indexOf('sesión') >= 0)) {
        window.location.href = urlErrorSesion;
    }
    else {
        Swal.close();
        $('#' + idDivMns).empty().append(mnsMostrar);
        showAlert('Error', 'Ocurrió un error al intentar procesar el archivo cargado.', 'error');
    }
}

function addAlertGral(idDivAlerta, msg, icon, type) {

    var alerta = '<div id="' + idDivAlerta + '" class="alert alert-' + type + ' alert-dismissible fade show" role="alert">';
    alerta = alerta + '<span class="material-symbols-outlined">'
        + icon
        + ' </span> '
        + msg
        + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
        + '</div>';

    $('#' + idDivAlerta).html(alerta);
}