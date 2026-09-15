const currentDate = formatDate(new Date());
var tipoRendimiento = "";

$(document).ready(function () {
    inicializar();
});

function inicializar() {
    document.getElementById('DateIni').value = currentDate;
    document.getElementById('DateFin').value = currentDate;
}

function buscarValor(param) {

    const optionSel = document.querySelector('input[name="RadioRendimiento"]:checked');
    const optFilter = document.querySelector('input[name="flexSwitchfiltro"]:checked'); //verifico si se selecciono filtrar
    //si esta seleccionado el filtro, muestro el acordeon
    if (optionSel != null) {
        var tipoRendimiento = optionSel.value;
        if (optFilter != null) {
            $("#btnFiltro").click();
            ObtenCatalogoFiltro(param);
        }
        else {
            tabla.clear().draw();
            tablaMan.clear().draw();

        }
    }
}

function SelectDate(switchElement) {
    const optionSel = document.querySelector('input[name="RadioFecha"]:checked'); //verifico que tipo de reporte requiere el usuario
    var tipoRendimiento = optionSel.value;
    if (tipoRendimiento == '-1') {
        $("#DateIni").attr("disabled", false);
        $("#DateFin").attr("disabled", false);


    }
    if (tipoRendimiento != '-1') {
        $("#DateIni").attr("disabled", true);
        $("#DateFin").attr("disabled", true);
    }
}

function formatDate(param) {
    const anio = param.getFullYear(); // Año
    const mes = String(param.getMonth() + 1).padStart(2, '0'); // Mes (0-11, por eso sumamos 1)
    const dia = String(param.getDate()).padStart(2, '0'); // Día del mes

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;

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

function abrirFileDoc() {
    const optionSel = document.querySelector('input[name="RadioRendimiento"]:checked'); //verifico que tipo de reporte requiere el usuario
    var tipoRendimiento = optionSel.value;
    var Url = "";
    Url = controller + "/ExtraerFile?namefile=Rendimientos_" + tipoRendimiento + ".xlsx";
    window.open(Url, '_blank');
    //  locate.reload;
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

function convertirFecha(fecha) {
    let [dia, mes, anio] = fecha.split('/');
    return new Date(anio, mes - 1, dia); // Mes en JavaScript es 0-indexed
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
        $('#msg').show();
        $('#modalRend').show();
    }

}
function dismissModalRend() {
    $('#msg').hide();
    $('#modalRend').hide();
}
