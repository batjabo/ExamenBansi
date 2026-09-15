const IdDivMns = 'SegundoMns';
let dists = [];
let currentDists = [];
const TipoArchivoMovCtesDto = Object.freeze({
    Ninguno: 0,
    MovimientosCtes: 1,
    ErroresValidacion: 2,
});

let esReproceso = false;
let idRepartoEspecial = 0;
let divRepartoEspExist = false;
$(document).ready(function () {    

    $("#searchGC").on("input", function () {
        selectedDist = [];
        $('#checkAllDist').prop('checked', false);
        loadTable(1, $(this).val());

    });
    loadTable();
    obtenerDiasHabiles();
});

$(document).on('change', '#fechaInicio, #fechaFin', function () {    
    CancelaRepartoEspecial();
});

$(document).on('click', '#btn-procesar-posicion', function () {    

    const fechaInicio = $('#fechaInicio').val();
    const fechaFin = $('#fechaFin').val();

    $('#divErrores').hide();

    if (!fechaInicio || !fechaFin) {
        addAlertGral(IdDivMns, 'La fecha inicial y/o final no es valida, favor de colocar una fecha valida.', 'cancel', 'danger');
        return;
    }

    if (divRepartoEspExist) {
        idRepartoEspecial = $('input[name="repartoEspecial"]:checked').val();
        if (!idRepartoEspecial) {            
            addAlertGral(IdDivMns, 'Es necesario que seleccione una opción para el reparto especial del(os) fondo(s) nuevos.', 'cancel', 'danger');
            return;
        }         
    }

    if (idRepartoEspecial == 0) {
        esReproceso = false;
    }    

    console.log('idRepartoEsp--------------------------------' + idRepartoEspecial + ' es reproceso:' + esReproceso);

    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    if (fechaInicioObj > fechaFinObj) {
        addAlertGral(IdDivMns, 'La fecha inicial no puede ser posterior a la fecha final.', 'cancel', 'danger');
        return;
    }

    showLoadingAlert("Espere... procesando información.");
    CallAjaxPost(urlPosicion + '/validaPosicionCtes', { fechaInicio: fechaInicio, fechaFin: fechaFin, confirmaReproceso: esReproceso, repartoEspecial: idRepartoEspecial }, ExitoValidaPosicion, ErrorValidaPosicion);
});

$(document).on('click', '#btnConfirmaReproceso', function () {

    esReproceso = true;
    $('#modalReproceso').modal('hide');

    const fechaInicio = $('#fechaInicio').val();
    const fechaFin = $('#fechaFin').val();

    $('#divErrores').hide();

    if (!fechaInicio || !fechaFin) {
        addAlertGral(IdDivMns, 'La fecha inicial y/o final no es valida, favor de colocar una fecha valida.', 'cancel', 'danger');
        return;
    }

    if (divRepartoEspExist) {
        idRepartoEspecial = $('input[name="repartoEspecial"]:checked').val();
        if (!idRepartoEspecial) {
            addAlertGral(IdDivMns, 'Es necesario que seleccione una opción para el reparto especial del(os) fondo(s) nuevos.', 'cancel', 'danger');
            return;
        }
    }

    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);

    if (fechaInicioObj > fechaFinObj) {
        addAlertGral(IdDivMns, 'La fecha inicial no puede ser posterior a la fecha final.', 'cancel', 'danger');
        return;
    }

    showLoadingAlert("Espere... procesando información.");
    CallAjaxPost(urlPosicion + '/validaPosicionCtes', { fechaInicio: fechaInicio, fechaFin: fechaFin, confirmaReproceso: true, repartoEspecial: idRepartoEspecial }, ExitoValidaPosicion, ErrorValidaPosicion);
});

function ExitoValidaPosicion(data) {
    Swal.close();

    if (data.NumErroresSinReproceso == 0 && data.NumErroresReproceso > 0) {
        $('#mnsDivFechasReproceso').empty().html(data.MnsFechasReproceso);
        $('#modalReproceso').modal('show');
    }

    if (esReproceso) {
        $('#modalReproceso').modal('hide');
    }

    if (data.MostrarRepartoEsp) {
        divRepartoEspExist = true;
        $('#divRepartoEspecial, #divBtnCancelarRepEsp').show();
    }
    else {
        idRepartoEspecial = 0;
        divRepartoEspExist = false;
        $('#divRepartoEspecial, #divBtnCancelarRepEsp').hide();        
        $('input[name="repartoEspecial"]').prop('checked', false);
    }

    if (data.IsSuccess) {
        $('#mnsDivModalSuccess').empty().append('El proceso terminó correctamente, se descargará un archivo con los movimientos del rango de fechas que fueron procesados.');
        showAlert('Éxito', '', 'success');
    }
    else {
        //--------Condición para cuando solo son "errores" de reproceso
        if (data.ErrorCode === 0) {
            $('#' + IdDivMns).empty();
        }
        else if (data.ErrorCode > 0 && data.NumErroresSinReproceso > 0) {
            addAlertGral(IdDivMns, data.Message, 'cancel', 'danger');
        }
        else {
            $('#tituloMnsError').empty().append('Información');
            $('#mnsDivModalError').empty().append(data.Message);
            showAlert('Error', data.Message, 'error');
        }
    }

    if (data.IdAuxiliar > 0 || data.ErrorCode > 0) {

        if (data.ErrorCode > 0 && data.ErrorCode <= 100) {
            $('#divErrores').show();
            AjaxAction(urlPosicion + '/ObtenerErroresMovCtes', 'divTablaErrores', IdDivMns);
        }
        else if (data.ErrorCode > 100) {
            CallAjaxPost(urlPosicion + '/ExportarExcelArchivo', { tipoArchivo: TipoArchivoMovCtesDto.ErroresValidacion }, MovimientosExelExito, MovimientosExelError);
        }
        else if (data.IdAuxiliar > 0) {
            console.log('entra a IdAuxiliar:' + data.IdAuxiliar);
            CallAjaxPost(urlPosicion + '/ExportarExcelArchivo', { tipoArchivo: TipoArchivoMovCtesDto.MovimientosCtes }, MovimientosExelExito, MovimientosExelError);
        }

    }
}

function ErrorValidaPosicion(data) {
    $('#' + IdDivMns).empty();

    divRepartoEspExist = false;
    $('#divRepartoEspecial, #divBtnCancelarRepEsp').hide();    
    $('input[name="repartoEspecial"]').prop('checked', false);

    validaSesionErrorJson(data, mnsDivModalError, 'Ocurrió un error al intentar validar el poscicionamiento de los clientes de la fecha seleccionada.');
}


function MovimientosExelExito(data) {
    $('#' + IdDivMns).empty();
    window.parent.location = urlPosicion + "/DescargaArchivo?fName=" + data.NombreArchivo;
}

function MovimientosExelError(data) {
    $('#' + IdDivMns).empty();

    $('#tituloMnsError').empty().append('Información');
    $('#mnsDivModalError').empty().append('Ocurrió un error al intentar descargar el archivo con los movimientos del día seleccionado.');
    showAlert('Error', 'Ocurrió un error al intentar descargar el archivo con los movimientos del día seleccionado.', 'error');
}

function CancelaRepartoEspecial() {
    idRepartoEspecial = 0;
    divRepartoEspExist = false;
    $('input[name="repartoEspecial"]').prop('checked', false);
    $('#divRepartoEspecial, #divBtnCancelarRepEsp').hide();
    $('#divErrores').hide();
}


const loadTable = async (page = 1, search = "") => {
    const length = 10; // Cantidad de registros por página
    const start = (page - 1) * length;
    try {
        if (dists.length < 1) {

            const response = await fetch(`${urlPosicion}/CodistribuidoresGetPag`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pi_Start: start,
                    pi_Length: length,
                    pc_Search: search,
                }),
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.statusText);
            }

            const data = await response.json();
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
            const { records } = JSON.parse(data);

            dists = records;



        }
    } catch (error) {
        console.error("Error al cargar la tabla:", error);
    }

    // Limpiar la tabla
    const tbody = document.querySelector("#gcTable tbody");
    tbody.innerHTML = "";
    currentDists = search && search !== '' ?
        dists.filter(d => d.fc_CveDistribuidor
                                .split('~')[0]
                                .toUpperCase()
                                .includes(search.toUpperCase()))
        : dists;
    const totalRecords = currentDists.length;

    // Renderizar los datos
    currentDists.slice(start, start + length).forEach((record) => {
        let dataId = `${record.fc_CveDistribuidor}`;
        const row = `
                        <tr>
                            <td>
                                <input type="checkbox" class="form-check-input" 
                                    data-id="${dataId}" 
                                    onchange="selectDist(this)"
                                    ${/*Array.from(selectedClients).some(i => i === dataId) ? 'checked': ''*/''} >
                            </td>
                            <td>${record.fc_CveDistribuidor.split('~')[0]}</td>
                        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    const checkboxes = document.querySelectorAll(".form-check-input");

    selectedDist.forEach(d => {
        $(`[data-id='${d}']`).prop('checked', true);
    });
    checkboxes.forEach(c => {
        if (!(selectedDist.some(d => d === c.getAttribute('data-id')))) {
            if (c.getAttribute('id') !== 'wantSelectDist') {
                $(c).prop('checked', false);
            }

        }
    });
    const totalPages = Math.ceil(totalRecords / length);
    totalPagesG = totalPages;

    renderPagination(page, totalPages);

};

function renderPagination(current, totalPages) {
    pagination.innerHTML = ''; // Limpia la paginación actual

    // Botón "Previous"
    const prev = document.createElement('li');
    prev.className = `page-item ${current === 1 ? 'disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#" aria-label="Previous">Anterior</a>`;
    prev.addEventListener('click', () => {
        if (current > 1) setPage(current - 1);
    });
    pagination.appendChild(prev);

    // Primera página
    if (totalPages > 1) {
        appendPage(1, current === 1);
    }


    // Si la página actual está lejos del inicio
    if (current > 3) appendEllipsis();

    // Páginas cercanas a la actual
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
        appendPage(i, current === i);
    }

    // Si la página actual está lejos del final
    if (current < totalPages - 2) appendEllipsis();

    // Última página
    appendPage(totalPages, current === totalPages);

    // Botón "Next"
    const next = document.createElement('li');
    next.className = `page-item ${current === totalPages ? 'disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#" aria-label="Next">Siguiente</a>`;
    next.addEventListener('click', () => {
        if (current < totalPages) setPage(current + 1);
    });
    pagination.appendChild(next);

}

const pagination = document.getElementById('pagination');

function appendPage(number, isActive = false) {
    const page = document.createElement('li');
    page.className = `page-item ${isActive ? 'active' : ''}`;
    page.innerHTML = `<a class="page-link" href="#">${number}</a>`;
    if (!isActive) {
        page.addEventListener('click', () => setPage(number));
    }
    pagination.appendChild(page);
}

// Función para agregar puntos suspensivos
function appendEllipsis() {
    const ellipsis = document.createElement('li');
    ellipsis.className = 'page-item disabled';
    ellipsis.innerHTML = `<span class="page-link">...</span>`;
    pagination.appendChild(ellipsis);
}

// Función para establecer una nueva página
function setPage(page) {
    currentPage = page;
    // observedState.selectedGroupType = null;
    loadTable(page, $("#searchGC").val());
    $('#checkAllDist').prop('checked',
        selectedDist.length === currentDists.map(c => c.fc_CveDistribuidor).length);
    /*renderPagination(page, totalPagesG);*/
}

function selectDist(element) {
    let dataId = element.getAttribute("data-id");
    if (element.checked) {
        selectedDist.push(dataId);
    } else {
        selectedDist = selectedDist.filter(e => e !== dataId);
    }
    if (selectedDist.length === currentDists.map(c => c.fc_CveDistribuidor).length) {
        $('#checkAllDist').prop('checked', true);
    } else {
        $('#checkAllDist').prop('checked', false);
    }
}

async function descargarExcel() {
    try {
        if (!($('#fechaInicioB').val() && $('#fechaFinal').val())) {
            showAlert('Error', '', 'errorMissFields');
            return;
        }
        showLoadingAlert("Espere... cargando información.");
        const response = await fetch(`${urlPosicion}/DescargarExcelBase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pd_FechaInicio: $('#fechaInicioB').val(),
                pd_FechaFin: $('#fechaFinal').val(),
                pc_Distribuidores: document.getElementById('wantSelectDist').checked ? 
                    selectedDist.map(d => d.split('~')[1]).join(',') : 
                    'TODOS',
            }),
        });

        if (!response.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
            throw new Error("Error en la solicitud: " + response.statusText);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ReporteBase${$('#fechaInicioB').val()}_${$('#fechaFinal').val()}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        Swal.close();
    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        throw new Error("Error en la solicitud: " + response.statusText);
    }

}

async function obtenerDiasHabiles() {
    try {
        const response = await fetch(`${urlPosicion}/FechasHabiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
        });

        if (!response.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
            throw new Error("Error en la solicitud: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        $('#fechaInicioB').val(data[1]);
        $('#fechaFinal').val(data[1]);
    } catch (error) {
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        throw new Error("Error en la solicitud: " + response.statusText);
    }

}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // formato ISO
}

function toggleDistDivs(element) {
    if (element.checked) {
        $('#allDistText').attr('hidden', true);
        $('#divSelectDist').attr('hidden', false);
        // loadTable();
    } else {
        $('#allDistText').attr('hidden', false);
        $('#divSelectDist').attr('hidden', true);
        selectedDist = [];
        const checkboxes = document.querySelectorAll(".form-check-input");

        checkboxes.forEach(c => {
            if (c.getAttribute('id') !== 'wantSelectDist') {
                $(c).prop('checked', false);
            }
        });
    }
}

function selectAll(element) {
    if (element.checked) {
        selectedDist = currentDists.map(c => c.fc_CveDistribuidor);
        selectedDist.forEach(d => {
            $(`[data-id='${d}']`).prop('checked', true);
        });
    } else {
        selectedDist = [];
        const checkboxes = document.querySelectorAll(".form-check-input");
        checkboxes.forEach(c => {
            if (!(selectedDist.some(d => d === c.getAttribute('data-id')))) {
                if (c.getAttribute('id') !== 'wantSelectDist') {
                    $(c).prop('checked', false);
                }

            }
        });
    }
}