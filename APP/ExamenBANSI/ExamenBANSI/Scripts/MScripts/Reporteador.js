
function inicializar() {
    document.getElementById('DateIni').value = currentDate;
    document.getElementById('DateFin').value = currentDate;
}


function guardaReporte() {
    const selected = [];
    var select = document.getElementById('floatingSelect');
    var valorSeleccionado = select.value;
    var partes = valorSeleccionado.split("|");
    var nombreTabla = partes[0];
    var idTipoArchivo = partes[1];

    //verifico el campo seleccionado para el filtrado
    var selectFecha = document.getElementById('filtroFecha');
    var campoFecha = selectFecha.value;

    var checkSinfecha = document.getElementById("chkSinfecha").checked;

    const filtroNombre = $("#nombreReporte").val();
    var urlControl = controller + '/GuardaLstCampos';


    //verifico los campos seleccionado spara crear el reporte
    $("#selectedFields .draggable-field").each(function () {
        selected.push($(this).data("name"));
    });


    const nombreReporte = $("#nombreReporte").val();

    if (!nombreReporte) {
        showAlert('info', 'Por favor ingresa un nombre valido para el reporte.', 'info');
        return;
    }
    if (campoFecha == "0" && !checkSinfecha) {
        showAlert('info', 'Debe seleccionar un campo fecha Valido para el filtrado ó seleccionar que no hay un campo de tipo fecha para filtrar', 'info');
        return;
    }
    if (selected.length == 0) {
        showAlert('info', 'Debe seleccionar un campo para el reporte.', 'info');
        return;
    }

    showLoadingAlert("Espere... Guardando información.");
    $.ajax({
        url: urlControl, //
        method: "POST",
        data: {
            SelectedFields: selected,
            filtroFecha: campoFecha,
            fc_NombreReporte: filtroNombre,
            fn_idtipofile: idTipoArchivo,
            fc_nameFiltro: campoFecha
        },
        traditional: true,
        success: function (data) {
            var container = $('#availableFields .form-floating');
            var selFields = $('#selectedFields');
            Swal.close();
            showAlert('Exito', 'Archivo guadado con exito.', 'success');
            $("#nombreReporte").val("");
            let select = document.getElementById('filtroFecha');
            while (select.options.length > 1) {
                select.remove(1);
            }
            container.empty(); // Limpia los campos anteriores
            selFields.empty();
        },
        error: function (xhr) {
            Swal.close(); //cierro modal de espera..
            showAlert('', 'Ocurrio un error al cargar la información.', 'danger');
        },

    });
};

function obtenerNameCampos() {
    var partes=[];
    var select = document.getElementById('floatingSelect');
    var valorSeleccionado = select.value;
    var partes = valorSeleccionado.split("|");
    var nombreTabla = partes[0];
    var idTipoArchivo = partes[1];

    var urlControl = controller + "/CgaLstCampos";

    //inicializo
   

    $.ajax({
        url: urlControl,
        data: {
            "Tablename": nombreTabla
               },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            var container = $('#availableFields .form-floating');
            var selFields = $('#selectedFields');
            container.empty(); // Limpia los campos anteriores
            selFields.empty();
            //lleno los campos del reporte
            response.data.forEach(function (campo) {
                var campoHtml =`
                    <div class='draggable-field d-flex justify-content-between align-items-center mb-1 px-2 py-1' data-name='${campo.Nomcampos}' data-type='${campo.data_Type}'>${campo.Nomcampos}</div>`;
                container.append(campoHtml);
            });
            //aplico dragabkle a los nuevos elementos
            $(".draggable-field").draggable({
                helper: "clone",
                revert: "invalid"
            });
            // termino de inicializar

            //SE LLENA EL COMBO PARA EL FILTRO
            const cmb = $("#filtroFecha");
            cmb.empty().append(
                $("<option>").val("0").text("Seleccione un campo de tipo fecha")
            );
            const tiposFecha = ["date", "datetime", "timestamp"];
            response.data
            .filter(campo => tiposFecha.includes(campo.data_Type.toLowerCase()))
            .forEach(campo => {
                cmb.append(
                    $("<option>")
                        .val(campo.Nomcampos)
                        .text(campo.Nomcampos)
                );
            });
           
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });
};

function obtenerCamposreporte() {
    const tabla = new DataTable('#datatableCampos');
    var partes = [];
    var select = document.getElementById('floatingSelectRep');
    var valorSeleccionado = select.value;
    var urlControl = controller + "/CgaLstCamposReportes";

    //inicializo
    $.ajax({
        url: urlControl,
        data: {
            //hay que meter los campos del reporte
            "iArchivoid": valorSeleccionado
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            var container = $('#availableFields .form-floating');
            var selFields = $('#selectedFields');
            container.empty(); // Limpia los campos anteriores
            selFields.empty();

            //lleno los campos de la tabla
            response.data.ListaReportes.forEach(function (campo) {
                var $campoHtml = $(`
                <div class='draggable-field d-flex justify-content-between align-items-center mb-1 px-2 py-1' data-name='${campo.CampoTabla}' data-type='${campo.Data_type}'>
                    ${campo.CampoTabla}
                </div>`);
                container.append($campoHtml);
                // si la bandera es 1, lo ocultamos
                if (campo.fn_Bandera === 1) {
                    $campoHtml.css("visibility", "hidden"); // o usar $campo.addClass('d-none') si usas Bootstrap
                }
            });

            //lleno los campos del reporte de usuario
            response.data.ListaReporteUsuario
                .filter(function (campo) {
                    // filtrar campos que sean null 
                    return campo.CampoCfg !== null  || campo.CampoCfg !== '';
                })
                .forEach(function (campo){
                const $new = $(`
                    <div class="draggable-field d-flex justify-content-between align-items-center mb-1 px-2 py-1"
                         data-name="${campo.CampoCfg}" data-type="${campo.Data_type}"
                         style="background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px;">
                        <span>${campo.CampoCfg}</span>
                        <button class="btn btn-sm btn-danger btn-remove ms-2" title="Quitar campo">✕</button>
                    </div>
                `);
                $('#selectedFields').append($new);
            });

            activarDrag();
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });
};

//abrir vista parcial para crear los reportes
function getCreaReportes() {
    $("divReporteador").html("");
    var urlControl = controller + '/VistaCrea';
    $.ajax({
        type: "GET",
        url: urlControl,
        contentType: "application/json;charset=utf-8",
        success: function (resultado) {
            $("#divReporteador").html(resultado);
        },
        error: function (jqXHR, status, error) {
            muestraMensaje("Error al mostrar información.", 1);
            //alert('error')
        },
        cache: false
    });


}
//Abrir la vista parcial de editar y generar reportes

function getGeneraReporte() {
    $("divReporteador").html("");
    var urlControl = controller + '/VistaReporte';
    $.ajax({
        type: "GET",
        url: urlControl,
        contentType: "application/json;charset=utf-8",
        success: function (resultado) {
            $("#divReporteador").html(resultado);
        },
        error: function (jqXHR, status) {
            muestraMensaje("Error al mostrar información.", 1);
            //alert('error')
        },
        cache: false
    });

}

function editaCampos()
{
    let counter = 1;
    const selected = [];
    const tabla = new DataTable('#datatablecampos');
    var select = document.getElementById('floatingSelect');
    var valorSeleccionado = select.value;
    var partes = valorSeleccionado.split("|");
    var nombreTabla = partes[0];
    const idTipoArchivo = partes[1];
    var urlControl = controller + "/EditCampos";
    $.ajax({
        url: urlControl ,
        data: {
            "fn_idTipoFile": idTipoArchivo
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            tabla.clear().draw();
            response.data.forEach(function (campo) {
                tabla.row
                    .add([
                        `<div class 'editable' data-id='${campo.fn_idParam}' data-campo='fn_idParam' style='text-align:center' >${campo.fn_idParam}</div> `,
                        `<div class='editable' data-id='${campo.COLUMN_NAME}' data-campo='COLUMN_NAME'>${campo.COLUMN_NAME}</div>`,
                        `<div class='editable' data-id='fc_nameFieldUser' data-campo='fc_nameFieldUser' data-original='${campo.fc_nameFieldUser}'>${campo.fc_nameFieldUser}</div>`,

                        `<a href='#' class='info-blue btn-editar' title='Editar Campo'
                                           data-id='${campo.fn_idParam}
                                           data-nombre='${campo.fn_idParam}'
                                           data-descripcion='${campo.fn_idParam}'>
                                            <span class='material-symbols-outlined'>edit</span>
                          </a>

                          <a href='#' class='info-blue btn-guardar d-none' title='Guadar Cambio'
                                            data-id='${campo.fn_idParam}'
                                            data-nombre='${campo.fn_idParam}'
                                            onclick='GuadarCambios(${campo.fn_idParam})'>
                                            <span class='material-symbols-outlined'>save</span>
                          </a>
                          <a href='#' class='info-blue btn-cancelar d-none' title='Desaser cambio'
                                           data-id='${campo.fn_idParam}'
                                           data-nombre='${campo.fn_idParam}'>
                                            <span class='material-symbols-outlined'>delete</span>
                          </a>`

                    ])
                    .draw(false);
                counter++;
            })
        },
        error: function (jqXHR, status) {
            alert('Hay un error al cargar los datos');
        },
    });
}

//creao el repórte para su emisión
function EmitirReporte() {
    var valida = true;
    const selected = [];

    var ldFechaIni = cambiarFormatoFecha($('#DateIni').val());
    var ldFechaFin = cambiarFormatoFecha($('#DateFin').val());

    //se cambia formato para poder validar las fechas
    let fechaIni = convertirFecha(ldFechaIni);
    let fechaFin = convertirFecha(ldFechaFin);

    var selectReporte = document.getElementById('floatingSelectRep');
    var selectRep = selectReporte.value;
    var nomReporte = selectReporte.options[selectReporte.selectedIndex].text;
    var nameReporte = nomReporte + "_del_" + ldFechaIni.replace(/\//g, "") + "_al_" + ldFechaFin.replace(/\//g, "") + ".xlsx";

    //verifico los campos seleccionado spara crear el reporte
    $("#selectedFields .draggable-field").each(function () {
        selected.push($(this).data("name"));
    });

    if (selectRep == 0) { valida = false; showAlert('', 'Debe seleccionar un reporte Valido', 'info'); }
    if (fechaIni > fechaFin ) { valida = false; showAlert('', 'La fecha inicial debe ser menor o igual que la fecha final', 'info'); }
    if (valida) {

        parameters = {
            "SelectedFields": selected,
            "fn_idconfig": selectRep,
            "filtroFecha": 0,
            "fc_NombreReporte": nameReporte,
            "fn_idtipofile": 0,
            "fc_nameFiltro": '',
            "resultRepor.FechaInicial": ldFechaIni,
            "resultRepor.FechaFinal": ldFechaFin
        };

        showLoadingAlert("Espere... Generando información.");
        $.ajax({
            type: 'POST',
            url: controller + "/GuardaLstCampos",
            data: parameters,
            dataType: 'json',
            success: function (response) {
                var link = JSON.stringify(response);
                Swal.close();
                if (response.data.length == 0) {
                    showAlert('', 'No existe información con los criterios de busqueda', 'info');
                } else {
                    abrirFileDoc(nameReporte);
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
}

function GuadarCambios(param) {
    ///reemplazo este
    //const fila = $(`button[data-id='${param}']`).closest('tr');
    ////por este
    const fila = $(`[data-id='${param}']`).closest('tr');
    const campoDiv = fila.find("div[data-campo='fc_nameFieldUser']");
    const celda = fila.find("div[data-campo='fc_nameFieldUser']");
    const valorActual = campoDiv.text().trim();
    const valorOriginal = campoDiv.data("original"); // jQuery lo interpreta como string
    
    if (valorActual === valorOriginal) {
                    fila.find('[data-campo="fc_nameFieldUser"]')
                        .attr('contenteditable', false);

                    celda.addClass('error');
                    fila.find('.btn-editar').removeClass('d-none');
                    fila.find('.btn-guardar, .btn-cancelar').addClass('d-none');
                    // 🔒 Deshabilita todos los demás botones Editar
                    $('.btn-editar').not(this).prop('disabled', false);
                    return;
    } // No cambió nada

    parameters = {
        "fn_idParam": param,
        "fc_nameFieldUser": valorActual
    }
    $.ajax({
        url: controller + "/UpEditCampo",
        type: 'POST',
        data: parameters,
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                fila.find('[data-campo="fc_nameFieldUser"]')
                    .attr('contenteditable', false);

                celda.removeClass('error').addClass('guardado');
                fila.find('.btn-editar').removeClass('d-none');
                fila.find('.btn-guardar, .btn-cancelar').addClass('d-none');
                // 🔒 habilita todos los demás botones Editar
                $('.btn-editar').not(this).prop('disabled', false);
            } else {
                celda.addClass('error');
                alert("No se pudo guardar.");
            }
        },
        error: function (xhr, errorStatus) {
            // Aplica una clase de error
            celda.addClass('error');
            //alert("Error en la solicitud.");
        }
    });

}
function abrirFileDoc(name) {
    var Url = "";
    Url = controller + "/ExtraerFile?namefile=" + name;
    window.location.href = Url;
    //window.open(Url, '_blank');

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

function dismissModalRend() {
    $('#msgErr').hide();
    $('#modalErr').hide();
}

function activarDrag() {
    $(".draggable-field").draggable({
        helper: "clone",
        revert: "invalid"
    });
}

function convertirFecha(fecha) {
    let [dia, mes, anio] = fecha.split('/');
    return new Date(anio, mes - 1, dia); // Mes en JavaScript es 0-indexed
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