const currentDate = formatDate(new Date());
var tipoRendimiento = "";
var ComparaFecha = 0;
$(document).ready(function () {
    inicializar();
    cargaErrores();
});

document.getElementById('floatingSelectGrupo').addEventListener('change', function () {
    var grupoSeleccionado = this.value;
    var selectArchivo = document.getElementById('floatingSelect');

    // Limpiar opciones actuales, dejando solo "Todos"
    selectArchivo.innerHTML = '<option value="0">Todos</option>';

    // Filtrar archivos por grupo
    var archivosFiltrados = archivos.filter(function (archivo) {
        return grupoSeleccionado === "Todos" || archivo.Grupo === grupoSeleccionado;
    });



    // Agregar opciones nuevas
    archivosFiltrados.forEach(function (archivo) {
        var option = document.createElement('option');
        option.value = archivo.IDTipoArchivo;
        option.text = archivo.NombreFile;
        selectArchivo.appendChild(option);
    });
});
function cargaErrores() {
    const tabla = new DataTable('#datatableErrores');
    const optionSel = document.querySelector('input[name="RadioFecha"]:checked'); //verifico que tipo de fecha se va a consultar
    var SelectedFile = document.getElementById("floatingSelect");
    var selectedValue = SelectedFile.value || 0;
    var SelectedOrigen = document.getElementById("floatingSelectGrupo");
    var selectedValueOrigen = SelectedOrigen.value || '';

    var ldFechaIni = cambiarFormatoFecha($('#fechaActualizacionIni').val());
    var ldFechaFin = cambiarFormatoFecha($('#fechaActualizacionFin').val());
    var counter = 0;
    var iConsultaid = 1;

    if (optionSel.value == 'datCarga') { iConsultaid = 1 } else { iConsultaid = 3 }

    compareDates($('#fechaActualizacionIni').val(), $('#fechaActualizacionFin').val());
    if (ComparaFecha == 1) { showAlert('', 'La fecha inicial debe ser menor o igual que la fecha final', 'info'); tabla.clear().draw();  return; }

    parameters = {
        "iConsultaId": iConsultaid,
        "FechaInicial": ldFechaIni,
        "FechaFinal": ldFechaFin,
        "iArchivoid": selectedValue,
        "search": selectedValueOrigen
    }
    showLoadingAlert("Espere... Cargando información.");
    $.ajax({
        type: 'GET',
        url: controller + "/GetConsultaError",
        data: parameters,
        dataType: 'json',
        success: function (response) {
            tabla.clear().draw();
            Swal.close();
            for (var i = 0; i < response.data.ListaErrores.length; i++) {
                const fechaCarga = new Date(parseInt(response.data.ListaErrores[i].fd_fechaCarga.substr(6)));
                const fechaArchivo = new Date(parseInt(response.data.ListaErrores[i].fd_fechaArhivo.substr(6)));

                const fechaCargaFormateada = formatearFechaPersonalizada(fechaCarga);
                const fechaArchivoFormateada = formatearFechaPersonalizada(fechaArchivo);

                tabla.row
                    .add([
                        response.data.ListaErrores[i].idStatus == 1
                            ? "<span class='label-success'><span class= 'material-symbols-outlined' >task</span>Procesado</span>"
                            : "<span class='label-error'> <span class='material-symbols-outlined' >scan_delete</span>Con Error</span> ",
                        response.data.ListaErrores[i].fc_Origen ,
                        response.data.ListaErrores[i].fc_TipoArchivo,
                        response.data.ListaErrores[i].NOMFILE ,
                        fechaArchivoFormateada ,
                        fechaCargaFormateada,
                        response.data.ListaErrores[i].fc_descripcionErr 
                        
                    ])
                    .draw(false);
                counter++;
            }
        },
        error: function (xhr, errorStatus) {
            console.log(xhr);
            if (typeof xhr.responseText === 'string' && xhr.responseText.indexOf('<html>') >= 0 && (xhr.responseText.indexOf('Sesión') >= 0 || xhr.responseText.indexOf('sesión') >= 0)) {
                window.location.href = urlErrorSesion;
            }
            else {
                showAlert('info', 'Error: session inactiva.' + JSON.stringify(xhr), 'danger');
            }

        },
        complete: function (xhr, errorStatus) {
            Swal.close();
        },
        cache: false
    });
}
function inicializar() {
    document.getElementById('fechaActualizacionIni').value = currentDate;
    document.getElementById('fechaActualizacionFin').value = currentDate;
}
function exportaExcel() {

    const optionSel = document.querySelector('input[name="RadioFecha"]:checked'); //verifico que tipo de fecha se va a consultar
    var SelectedFile = document.getElementById("floatingSelect");
    var selectedValue = SelectedFile.value || 0;
    var SelectedOrigen = document.getElementById("floatingSelectGrupo");
    var selectedValueOrigen = SelectedOrigen.value || '';

    var ldFechaIni = cambiarFormatoFecha($('#fechaActualizacionIni').val());
    var ldFechaFin = cambiarFormatoFecha($('#fechaActualizacionFin').val());
    var counter = 0;

    var iConsultaid = 1;

    if (optionSel.value == 'datCarga') { iConsultaid = 1 } else { iConsultaid = 3 }

    compareDates($('#fechaActualizacionIni').val(), $('#fechaActualizacionFin').val());
    if (ComparaFecha == 1) { showAlert('', 'La fecha inicial debe ser menor o igual que la fecha final', 'info'); tabla.clear().draw(); return; }

    parameters = {
        "iConsultaId": iConsultaid,
        "FechaInicial": ldFechaIni,
        "FechaFinal": ldFechaFin,
        "iArchivoid": selectedValue,
        "search": selectedValueOrigen
    }
    showLoadingAlert("Espere... Generando información.");
    $.ajax({
        type: 'GET',
        url: controller + "/GetReporte",
        data: parameters,
        dataType: 'json',
        success: function (response) {
            var link = JSON.stringify(response);
            Swal.close();
            if (response.data.length == 0) {
                showAlert('', 'No existe información con los criterios de busqueda', 'info');
            } else {
                abrirFileDoc();
                showAlert('Exito', 'Reporte Generado con exito.', 'success');
            }

            
        },
        error: function (xhr, errorStatus) {
            console.log(xhr);
            if (typeof xhr.responseText === 'string' && xhr.responseText.indexOf('<html>') >= 0 && (xhr.responseText.indexOf('Sesión') >= 0 || xhr.responseText.indexOf('sesión') >= 0)) {
                window.location.href = urlErrorSesion;
            }
            else {
                showAlert('info', 'Error: session inactiva.' + JSON.stringify(xhr), 'danger');
            }

        },
        complete: function (xhr, errorStatus) {
            Swal.close();
        },
        cache: false
    });

}

function abrirFileDoc() {
    var Url = "";
    Url = controller + "/ExtraerFile?namefile=Reporte_Errores.xlsx";
    window.location.href = Url;
    //window.open(Url, '_blank');
  
}

function formatDate(param) {
    const anio = param.getFullYear(); // Año
    const mes = String(param.getMonth() + 1).padStart(2, '0'); // Mes (0-11, por eso sumamos 1)
    const dia = String(param.getDate()).padStart(2, '0'); // Día del mes

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;

}
function showAlert(title, text, icon) {
    Swal.close();
    if (icon === 'info') {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }
    else if (icon === 'errorArc') {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }

    else {
        $('#msgErr').show();
        $('#modalErr').show();
    }

}
function showAlertEstatus(Mensaje, tipo) {
    const alertPlaceholder = document.getElementById('alertBox')
    const appendAlert = (message, type, timeout = 5000) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} fixed w-90" role="alert">`,
            '<span class="material-symbols-outlined">',
            '           check_circle ',
            '            </span > ',
            `   ${message}`,
            //            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div><p></p>'
        ].join('')

        alertPlaceholder.append(wrapper)
        setTimeout(() => {
            wrapper.remove();
        }, timeout);
    }
    appendAlert(Mensaje, tipo)
}
function cambiarFormatoFecha(fecha) {
    // Convierte la fecha de tipo string a un objeto Date en formato UTC
    let date = new Date(fecha + 'T00:00:00Z'); // Agregar "T00:00:00Z" para tratar la fecha como UTC

    // Extrae el día, mes y año en UTC
    let dia = String(date.getUTCDate()).padStart(2, '0'); // Día en UTC
    let mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mes en UTC (0-indexado, así que sumamos 1)
    let año = date.getUTCFullYear(); // Año en UTC

    // Retorna la fecha en formato dd/mm/yyyy
    return `${dia}/${mes}/${año}`;
}
function dismissModalRend() {
    $('#msgErr').hide();
    $('#modalErr').hide();
}
const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
        ComparaFecha = 0;
    } else if (date1 > date2) {
        ComparaFecha = 1;
    } else {
        ComparaFecha = 0;
    }
};

function formatearFechaPersonalizada(fecha) {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return ` ${dia} ${mes} ${anio}`;
}