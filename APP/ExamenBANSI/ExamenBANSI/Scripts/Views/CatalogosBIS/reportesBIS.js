function EmiteReporte() {
    const select = document.getElementById("floatingSelectGrupo");
    const valorSeleccionado = select.value;
    // Leer el texto visible
    const textoSeleccionado = select.options[select.selectedIndex].text;
    if (valorSeleccionado != 0) {
        parameters = {
            fi_ReporteEntregaId: valorSeleccionado,
            fc_NombreReporte: textoSeleccionado
        }
        showLoadingAlert("Espere... Generando información.");
        $.ajax({
            type: 'POST',
            url: controller + "/GetReporte",
            data: parameters,
            success: function (response) {
                Swal.close();
                var link = JSON.stringify(response);
                if (response.data.result == 0) {
                    showAlert('', 'No existe información con los criterios de busqueda.', 'info');
                } else {
                    abrirFileDoc();
                    Swal.close();
                    showAlert('Exito', 'Reporte Generado con exito.', 'success');
                }

            },
            error: function (xhr) {
                Swal.close(); //cierro modal de espera..
                showAlert('', 'Ocurrio un error al cargar la información.', 'danger');
                console.log(xhr);
                if (typeof xhr.responseText === 'string' && xhr.responseText.indexOf('<html>') >= 0 && (xhr.responseText.indexOf('Sesión') >= 0 || xhr.responseText.indexOf('sesión') >= 0)) {
                    window.location.href = urlErrorSesion;
                }
                else {
                    showAlert('', 'Error: session inactiva.' + JSON.stringify(xhr), 'danger');
                }


            },
            complete: function () { Swal.close(); },
            cache: false

        });

    }
    else {
        showAlert('', 'debe seleccionar un reporte para emitir información', 'info');
    }

};

function abrirFileDoc() {
    const select = document.getElementById("floatingSelectGrupo");
    const valorSeleccionado = select.value;
    const textoSeleccionado = select.options[select.selectedIndex].text;

    var Url = "";
    Url = controller + "/ExtraerFile?namefile=Reporte_"+textoSeleccionado + ".xlsx";
    window.open(Url, '_blank');
    //  locate.reload;
}


