var IdDivMns = 'SegundoMnsCont';
$(document).ready(function () {
    AdjuntarDocumento(urlCargaKyC);      
});

function AdjuntarDocumento(urlCargarArchivo) {
    console.log(urlCargarArchivo);
    if ($().fileupload) {        
        console.log('entra al if');   
        $('#ErroresFid').hide();     
        $('#fileupload').fileupload('destroy');

        $('#fileAdjuntarArchivoKyC').fileupload({
            dataType: 'json',
            url: urlCargarArchivo,
            add: function (e, data) {                
                if (valTipoArchivo(data.files[0].name) === false) {                    
                    addAlertGral(IdDivMns, 'Solo se pueden cargar archivos .xlsx', 'cancel', 'danger');
                    data.files = [];
                    return;
                }
                data.submit();
                showLoadingAlert("Espere... validando información.");
            },
            done: function (e, data) {
                Swal.close();
                $('#divErrores').hide();
                $('#ErroresFid').hide();     
                if (Object.hasOwn(data.result, 'TipoLayout') && data.result.TipoLayout === 'Fideicomiso') {
                    console.log(data);
                    tipoLayout = data.result.TipoLayout;
                    if (data.result.Success) {
                        $('.alert').alert('close');
                        $('#ErroresFid').hide();
                        $('#nombreArchivo').empty().text(data.result.NameFile);                                        

                        $('#divCargaArchivo').hide();
                        $('#divArchivoCargado').show();    
                    }
                    else {
                        addAlertGral(IdDivMns, data.result.Message, 'cancel', 'danger');
                        filteredData = [...data.result.Errores];
                        errores = [...data.result.Errores];
                        renderTable(data.result.Errores, currentPage);
                        $('#ErroresFid').show();
                    }
                    return;
                }
                
                if (data.result.Success) {
                    $('.alert').alert('close');
                    $('#nombreArchivo').empty().text(data.result.NameFile);                                        

                    $('#divCargaArchivo').hide();
                    $('#divArchivoCargado').show();                        

                }
                else {
                    addAlertGral(IdDivMns, data.result.Message, 'cancel', 'danger');
                    if (data.result.IdAuxiliar == -1 && (data.result.NumErrores > 0 && data.result.NumErrores <= 100)) {                        
                        $('#divErrores').show();
                        AjaxAction(urlCargaErrores, 'divTablaErrores', IdDivMns);
                    }
                    else if (data.result.IdAuxiliar == 1 && (data.result.NumErrores > 0 && data.result.NumErrores <= 100)) {                        
                        $('#divErrores').show();
                        AjaxAction(urlCargaErrores, 'divTablaErrores', IdDivMns);
                    }
                    else if (data.result.NumErrores > 100) {                        
                        CallAjaxPost(urlExportar, { idOpcionArchivo : 2 }, ErroresExelExito, ErroresExelError);
                    }
                }                
            },
            fail: function (e, data) {
                Swal.close();
                addAlertGral(IdDivMns, 'Error al cargar el archivo', 'cancel', 'danger');
            }
        });
    }
}

function valTipoArchivo(archivo) {
    var splitNombre = archivo.split('.');
    var resp = false;
    if (splitNombre.length > 1) {
        var nombre = splitNombre[1].toUpperCase();

        if (nombre === 'XLSX' || nombre === 'CSV') {
            resp = true;
        }
    }
    return resp;
}

$(document).on('click', '#btn-cancelar', function () {
    $('#divArchivoCargado').hide();
    $('#fileAdjuntarArchivoKyC').empty();
    $('#divCargaArchivo').show();
});

$(document).on('click', '#btn-procesar', async function () {
    console.log(tipoLayout);
    if (tipoLayout === 'Fideicomiso') {
        try {
            showLoadingAlert("Espere... procesando información.");
            const response = await fetch(urlProcesaArc, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipoArchivo: 'Fideicomiso'
                }) // tu variable JS con los errores
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
                throw new Error("Error en la solicitud: " + response.statusText);
            }

            const data = await response.json();
            if (data.IsSuccess) {
                
                let operacion = "";
                let [a,b,c,d] = data.Errores[0].ErrorTxt.split('|')
                if (a === '1') {
                    operacion += "-Alta de Cliente<br />";
                }
                if (b === '1') {
                    operacion += "-Alta de Contrato<br />";
                }
                if (c === '1') {
                    operacion += "-Modificación de Cliente<br />";
                }
                if (d === '1') {
                    operacion += "-Modificación de Contrato<br />";
                }
                if (a === '0' && b === '0' && c === '0' && d === '0') {
                    operacion += "-No se encontró ningún cambio<br />";
                }
                $('#divArchivoCargado').hide();
                $('#divCargaArchivo').show();
                // $('#mnsDivModalSuccess').empty().append(`El archivo se procesó correctamente. Las operaciones realizadas fueron:<br />${operacion}`);
                // showAlert('Éxito', `El archivo se procesó correctamente. Las operaciones realizadas fueron:<br />${operacion}`, 'success');
                $('#mnsDivModalSuccess').empty().append(`El archivo se procesó correctamente. Ya puedes consultar el cliente en el catálogo de Grupos Comerciales.`);
                showAlert('Éxito', `El archivo se procesó correctamente. Ya puedes consultar el cliente en el catálogo de Grupos Comerciales.`, 'success');
            } else {
                $('#mnsDivModalError').empty().append(data.Mensaje);
                showAlert('Error', data.Mensaje, 'error');
            }
            console.log(data);
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = `ErroresKycFideicomisos.xlsx`;
            // a.click();
            // window.URL.revokeObjectURL(url);
            // Swal.close();
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        tipoLayout = '';
    }
    else{
        showLoadingAlert("Espere... procesando información.");
        CallAjaxPost(urlProcesaArc, { }, ExitoProcesarArchivo, ErrorProcesarArchivo);
    }
    
});

function ExitoProcesarArchivo(data) {
    Swal.close();
    $('#divArchivoCargado').hide();
    $('#divCargaArchivo').show();

    if (data.IsSuccess) {
        $('#mnsDivModalSuccess').empty().append('El archivo se procesó correctamente. Ya puedes consultar el cliente en el catálogo de Grupos Comerciales.');
        showAlert('Éxito', 'El archivo se procesó correctamente. Ya puedes consultar el cliente en el catálogo de Grupos Comerciales.', 'success');
    }
    else {
        $('#mnsDivModalError').empty().append(data.Mensaje);
        showAlert('Error', data.Mensaje, 'error');
    }
}

function ErrorProcesarArchivo(data) {
    validaSesionErrorJson(data, mnsDivModalError, 'Ocurrió un error al intentar procesar el archivo cargado.');
    //Swal.close();
    //$('#mnsDivModalError').empty().append('Ocurrió un error al intentar procesar el archivo cargado.');
    //showAlert('Error', 'Ocurrió un error al intentar procesar el archivo cargado.', 'error');
}

function ErroresExelExito(data) {
    window.parent.location = urlCargaA + "/DescargaArchivo?fName=" + data.NombreArchivo;
}

function ErroresExelError(data) {
    $('#mnsDivModalError').empty().append('Ocurrió un error al intentar descargar el archivo con los errores de la carga.');
    showAlert('Error', 'Ocurrió un error al intentar descargar el archivo con los errores de la carga.', 'error');
}




const rowsPerPage = 10;
let currentPage = 1;
let filteredData = [];
let errores = [];
let tipoLayout = '';

const tbody = document.querySelector("#tablaErrores tbody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInputF");

function renderTable(data, page = 1) {
    tbody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    tbody.innerHTML = pageData.map((error, index) => `
        <tr>
            <td>${start + index + 1}</td>
            <td>${highlight(error.Hoja)}</td>
            <td>${highlight(error.SeccionArchivo)}</td>
            <td>${highlight(error.ErrorTxt)}</td>
        </tr>
    `).join("");

    renderPagination(data.length, page);
}

function renderPagination(totalRows, currentPage) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    if (totalPages <= 1) return;

    pagination.appendChild(createPageItem("Anterior", currentPage - 1, currentPage === 1));

    for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createPageItem(i, i, false, currentPage === i));
    }

    pagination.appendChild(createPageItem("Siguiente", currentPage + 1, currentPage === totalPages));
}

function createPageItem(text, page, disabled, active = false) {
    const li = document.createElement("li");
    li.className = `page-item ${active ? "active" : ""} ${disabled ? "disabled" : ""}`;
    const a = document.createElement("a");
    a.className = "page-link";
    a.textContent = text;
    if (!disabled) {
        a.addEventListener("click", () => {
            currentPage = page;
            renderTable(filteredData, currentPage);
        });
    }
    li.appendChild(a);
    return li;
}

searchInput.addEventListener("keyup", () => {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
        filteredData = [...errores];
    } else {
        filteredData = errores.filter(e =>
            e.Hoja.toLowerCase().includes(term) ||
            e.SeccionArchivo.toLowerCase().includes(term) ||
            e.ErrorTxt.toLowerCase().includes(term)
        );
    }
    currentPage = 1;
    renderTable(filteredData, currentPage);
});

function highlight(text) {
    const term = searchInput.value.trim();
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

async function exportErrExcel() {
    try {
        const response = await fetch(`${urlCargaA}/ExportarExcelErrores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errores) // tu variable JS con los errores
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
        a.download = `ErroresKycFideicomisos.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        Swal.close();
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}
