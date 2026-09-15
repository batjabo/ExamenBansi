async function loadRepresentanteHeader() {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlRepresentante + "/GetRepresentantesLegalesIntInfo/";
    const requestData = { pi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"), pi_Seccion: 4 };

    try {
        // Obtener datos del cliente
        const responseCliente = await fetch(urlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        }
        console.log(dataCliente.Table.length);
        let dataHeader = sessionStorage.getItem('representanteHeader');
        $('#representantenomtxt').text(dataCliente.Table[0].fc_NombreRepresentante);
        $('#numctotxt').text(dataHeader.split('%')[0]);
        $('#ctotxt').text(dataHeader.split('%')[1]);
        $('#clientetxt').text(dataHeader.split('%')[2]);
        Swal.close();
        //showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }

}

function loadIdentificacion(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        IdentificacionRequest();
    }
}

async function IdentificacionRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlRepresentante + "/GetRepresentantesLegalesIntInfo/";
    const requestData = { pi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"), pi_Seccion: 1 };

    try {
        // Obtener datos del cliente
        const responseCliente = await fetch(urlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        }
        console.log(dataCliente);
        if (dataCliente.Table === null || dataCliente.Table === undefined || dataCliente.Table.length < 1) {
            Swal.close();
            $('#idenForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }
        $("input[name=categoriaFirma][value=" + dataCliente.Table[0].fi_TipoRepresentanteId + "]").prop('checked', true);
        $('#nacionalidad').val(dataCliente.Table[0].fc_Nacionalidad);
        $('#rfc').val(dataCliente.Table[0].fc_RFC);
        $('#rfc').attr('data-nacionalidad', dataCliente.Table[0].fc_Nacionalidad);
        $('#tipoIdentificacion').val(dataCliente.Table[0].fc_TipoIdentificacion);
        $('#fechaVencimientoIdentificacion').val(dataCliente.Table[0].fc_FechaVencimiento);
        $('#numeroIdentificacion').val(dataCliente.Table[0].fc_NumeroIdentificacion);
        Swal.close();
        if (recharge) {
            showAlert('Éxito', 'La información se guardó correctamente.', 'success');
        }
      
    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }
}


function loadDomicilio(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        DomicilioRequest();
    }
}

async function DomicilioRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlRepresentante + "/GetRepresentantesLegalesIntInfo/";
    const requestData = { pi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"), pi_Seccion: 2 };

    try {
        // Obtener datos del cliente
        const responseCliente = await fetch(urlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        }
        console.log(dataCliente);
        if (dataCliente.Table === null || dataCliente.Table === undefined || dataCliente.Table.length < 1) {
            Swal.close();
            $('#domForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }
        $('#calle').val(dataCliente.Table[0].fc_Calle);
        $('#nExterior').val(dataCliente.Table[0].fc_NumExterior);
        $('#nInterior').val(dataCliente.Table[0].fc_NumInterior);
        $('#colonia').val(dataCliente.Table[0].fc_Colonia);
        $('#delegacion').val(dataCliente.Table[0].fc_Delegacion);
        $('#ciudad').val(dataCliente.Table[0].fc_Poblacion);
        $('#entidad').val(dataCliente.Table[0].fc_Estado);
        $('#pais').val(dataCliente.Table[0].fc_Pais);
        $('#cPostal').val(dataCliente.Table[0].fc_CodigoPostal);
        Swal.close();
        if (recharge) {
            showAlert('Éxito', 'La información se guardó correctamente.', 'success');
        }
        //showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }
}


function loadPoderes(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        PoderesRequest();
    }
}

async function PoderesRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlRepresentante + "/GetRepresentantesLegalesIntInfo/";
    const requestData = { pi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"), pi_Seccion: 3 };

    try {
        // Obtener datos del cliente
        const responseCliente = await fetch(urlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        }
        console.log(dataCliente);
        if (dataCliente.Table === null || dataCliente.Table === undefined || dataCliente.Table.length < 1) {
            Swal.close();
            $('#poderesForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }
        let dataInfo = dataCliente.Table[0];
        
        
        $('#tipoRepresentante').val(dataInfo.fi_CategoriaFirmaId);
        $('#nombreNotario').val(dataInfo.fc_NombreNotario);
        $('#numeroEscritura').val(dataInfo.fc_NumeroEscritura);
        $('#fechaEscritura').val(dataInfo.fd_FechaEscritura.substring(0,10));
        $('#nombreCompletoNotario').val(dataInfo.fc_NombreNotarioCom);
        $('#numeroNotaria').val(dataInfo.fc_NumeroNotaria);
        $('#numeroRegistroPublico').val(dataInfo.fc_NumeroRegistroPubCom);
        $('#fechaRegistroPublico').val(dataInfo.fd_FechaRegistroPubCom.substring(0, 10));
        $('#plazaRegistroPublico').val(dataInfo.fc_PlazaRegistroPubCom);
        Swal.close();
        if (recharge) {
            showAlert('Éxito', 'La información se guardó correctamente.', 'success');
        }
        //showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }
}



async function saveIdentificacion() {
    $('.alert.alert-danger').remove();
    let button = $('.saveIdentificacion');
    console.log($('input[name="categoriaFirma"]:checked').val());

    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            // console.log(JSON.stringify({
            //     fi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"),
            //     fc_Nacionalidad: $('#nacionalidad').val(),
            //     fi_TipoRepresentanteId: $('input[name="categoriaFirma"]:checked').val(),
            //     fc_RFC: $('#rfc').val(),
            //     fc_TipoIdentificacion: $('#tipoIdentificacion').val(),
            //     fc_FechaVencimiento: $('#fechaVencimientoIdentificacion').val(),
            //     fc_NumeroIdentificacion: $('#numeroIdentificacion').val()
            // }));
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlRepresentante + "/RepLegalesIntIdentificacionEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_RepLegalesIntIdIdentificacionId: 0,
                    fi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"),
                    fc_Nacionalidad: $('#nacionalidad').val(),
                    fi_TipoRepresentanteId: $('input[name="categoriaFirma"]:checked').val(),
                    fc_RFC: $('#rfc').val(),
                    fc_TipoIdentificacion: $('#tipoIdentificacion').val(),
                    fc_FechaVencimiento: $('#fechaVencimientoIdentificacion').val(),
                    fc_NumeroIdentificacion: $('#numeroIdentificacion').val()
                }),
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }

            const data = await response.json();
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
    
            console.log(data);
            if (data > 0) {
                Swal.close();
                IdentificacionRequest(true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }


        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editIdentificacion');
            let saveButton = $('.saveIdentificacion');
            let editTextButton = $('.editTextIdentificacion');
            let saveTextButton = $('.saveTextIdentificacion');
            let editIcon = $('.iconIdentificacionEdit');
            let saveIcon = $('.iconIdentificacionSave');
            let fichaEsp = $('#fileEsp');
            let fichaEst = $('#fileEst');

            fichaEsp.addClass('disabled-link');
            fichaEst.addClass('disabled-link');
            saveButton.prop('disabled', true);
            editButton.prop('disabled', false);

            editButton.removeClass('disable-button');
            editButton.addClass('button');

            saveButton.addClass('disable-button');
            saveButton.removeClass('button');

            saveTextButton.removeClass('label-text');
            saveTextButton.addClass('disable-text');

            editTextButton.removeClass('disable-text');
            editTextButton.addClass('label-text');
            saveIcon.css({ 'color': 'darkgray' });
            editIcon.css({ 'color': 'red' });
            changeStatusInputForm(saveButton, true);

        }
    }




}

function editIdentificacion() {
    let editButton = $('.editIdentificacion');
    let saveButton = $('.saveIdentificacion');
    let editTextButton = $('.editTextIdentificacion');
    let saveTextButton = $('.saveTextIdentificacion');
    let editIcon = $('.iconIdentificacionEdit');
    let saveIcon = $('.iconIdentificacionSave');

    editButton.prop('disabled', true);
    saveButton.prop('disabled', false);
    saveButton.removeClass('disable-button');
    saveButton.addClass('button');
    editButton.addClass('disable-button');
    editButton.removeClass('button');

    editTextButton.removeClass('label-text');
    editTextButton.addClass('disable-text');
    saveTextButton.removeClass('disable-text');
    saveTextButton.addClass('label-text');
    editIcon.css({ 'color': 'darkgray' });
    saveIcon.css({ 'color': 'red' });

    changeStatusInputForm(saveButton, false);

}

async function saveDomicilio() {

    $('.alert.alert-danger').remove();
    let button = $('.saveDomicilio');


    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlRepresentante + "/RepLegalesIntDomicilioEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_RepLegalesIntIdDomicilioId: 0,
                    fi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"),
                    fc_Colonia: $('#colonia').val(),
                    fc_Poblacion: $('#ciudad').val(),
                    fc_Estado: $('#entidad').val(),
                    fc_Pais: $('#pais').val(),
                    fc_CodigoPostal: $('#cPostal').val(),
                }),
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }

            const data = await response.json();
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
            console.log(data);
            if (data > 0) {
                Swal.close();
                DomicilioRequest(true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }


        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editDomicilio');
            let saveButton = $('.saveDomicilio');
            let editTextButton = $('.editTextDomicilio');
            let saveTextButton = $('.saveTextDomicilio');
            let editIcon = $('.iconDomicilioEdit');
            let saveIcon = $('.iconDomicilioSave');
            saveButton.prop('disabled', true);
            editButton.prop('disabled', false);

            editButton.removeClass('disable-button');
            editButton.addClass('button');

            saveButton.addClass('disable-button');
            saveButton.removeClass('button');

            saveTextButton.removeClass('label-text');
            saveTextButton.addClass('disable-text');

            editTextButton.removeClass('disable-text');
            editTextButton.addClass('label-text');
            saveIcon.css({ 'color': 'darkgray' });
            editIcon.css({ 'color': 'red' });
            changeStatusInputForm(saveButton, true);

        }
    }




}

function editDomicilio() {
    let editButton = $('.editDomicilio');
    let saveButton = $('.saveDomicilio');
    let editTextButton = $('.editTextDomicilio');
    let saveTextButton = $('.saveTextDomicilio');
    let editIcon = $('.iconDomicilioEdit');
    let saveIcon = $('.iconDomicilioSave');

    editButton.prop('disabled', true);
    saveButton.prop('disabled', false);
    saveButton.removeClass('disable-button');
    saveButton.addClass('button');
    editButton.addClass('disable-button');
    editButton.removeClass('button');

    editTextButton.removeClass('label-text');
    editTextButton.addClass('disable-text');
    saveTextButton.removeClass('disable-text');
    saveTextButton.addClass('label-text');
    editIcon.css({ 'color': 'darkgray' });
    saveIcon.css({ 'color': 'red' });

    changeStatusInputForm(saveButton, false);

}

async function savePoderes() {
    $('.alert.alert-danger').remove();
    let button = $('.savePoderes');


    if (!validateForm(button)) {
        cleanInputValidation(button);

        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlRepresentante + "/RepLegalesIntPoderesEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_RepLegalesIntPoderesId: 0,
                    fi_RepresentantesLegalesIntId: sessionStorage.getItem("representanteNum"),
                    fi_CategoriaFirmaId: $('#tipoRepresentante').val(),
                    fc_NombreNotario: $('#nombreNotario').val(),
                    fc_NumeroEscritura: $('#numeroEscritura').val(),
                    fd_FechaEscritura: $('#fechaEscritura').val(),
                    fc_NombreNotarioCom: $('#nombreCompletoNotario').val(),
                    fc_NumeroNotaria: $('#numeroNotaria').val(),
                    fc_NumeroRegistroPubCom: $('#numeroRegistroPublico').val(),
                    fd_FechaRegistroPubCom: $('#fechaRegistroPublico').val(),
                    fc_PlazaRegistroPubCom: $('#plazaRegistroPublico').val(),
                }),
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }

            const data = await response.json();
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
            console.log(data);
            if (data > 0) {
                Swal.close();
                PoderesRequest(true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }


        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editPoderes');
            let saveButton = $('.savePoderes');
            let editTextButton = $('.editTextPoderes');
            let saveTextButton = $('.saveTextPoderes');
            let editIcon = $('.iconPoderesEdit');
            let saveIcon = $('.iconPoderesSave');
            saveButton.prop('disabled', true);
            editButton.prop('disabled', false);

            editButton.removeClass('disable-button');
            editButton.addClass('button');

            saveButton.addClass('disable-button');
            saveButton.removeClass('button');

            saveTextButton.removeClass('label-text');
            saveTextButton.addClass('disable-text');

            editTextButton.removeClass('disable-text');
            editTextButton.addClass('label-text');
            saveIcon.css({ 'color': 'darkgray' });
            editIcon.css({ 'color': 'red' });
            changeStatusInputForm(saveButton, true);

        }
    }




}

function editPoderes() {
    let editButton = $('.editPoderes');
    let saveButton = $('.savePoderes');
    let editTextButton = $('.editTextPoderes');
    let saveTextButton = $('.saveTextPoderes');
    let editIcon = $('.iconPoderesEdit');
    let saveIcon = $('.iconPoderesSave');

    editButton.prop('disabled', true);
    saveButton.prop('disabled', false);
    saveButton.removeClass('disable-button');
    saveButton.addClass('button');
    editButton.addClass('disable-button');
    editButton.removeClass('button');

    editTextButton.removeClass('label-text');
    editTextButton.addClass('disable-text');
    saveTextButton.removeClass('disable-text');
    saveTextButton.addClass('label-text');
    editIcon.css({ 'color': 'darkgray' });
    saveIcon.css({ 'color': 'red' });

    changeStatusInputForm(saveButton, false);

}
