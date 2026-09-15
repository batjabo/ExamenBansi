let tipoCliente = 1;
async function loadCteHeader() {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 11 };

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
        
        $('#cteTxt').text(dataCliente.Table[0].fc_NombreCliente);
        tipoCliente = dataCliente.Table[0].fi_TipoPersonalId;
        if (tipoCliente === 2) {
            $('#RepTxt').text('Fideicomisarios');
            $('#DirTxt').text('Representantes del Fideicomitente');
            $('#ConTxt').text('Comité Técnico u Órgano equivalente');
            $('#ActTxt').text('Delegados Fiduciarios');
            $('#txtHeader').text($('#txtHeader').text().replace('de la persona moral', 'del fideicomiso'));
            $('#divCoberMoral').hide();
            $('#divNumEmp').hide();
        }
        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        }
        Swal.close();
        //showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }
}

function loadAltaConstitutiva(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        altaConstitutivaRequest();
    }

}

async function altaConstitutivaRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 1 };

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
        console.log(dataCliente);
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
            $('#altaForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }
        $('#fi_ActaConstitutivaId').val(dataCliente.Table[0].fi_ActaConstitutivaId);
        $('#giroMercantil').val(dataCliente.Table[0].fc_Giro);
        $('#numeroFirmaElectronica').val(dataCliente.Table[0].fc_SerieFirmaElectronica);
        $('#numeroEscritura').val(dataCliente.Table[0].fc_NumeroEscritura);
        $('#fechaEscritura').val(dataCliente.Table[0].fd_FechaConstitucion.substring(0,10));
        $('#nombreNotario').val(dataCliente.Table[0].fc_NombreNotario);
        $('#numeroNotaria').val(dataCliente.Table[0].fc_NumeroNotaria);
        $('#numeroRegistroPublico').val(dataCliente.Table[0].fc_NumeroPublicoComercio);
        $('#fechaRegistroPublico').val(dataCliente.Table[0].fd_RegPublicoComercio.substring(0, 10));
        $('#plazaRegistroPublico').val(dataCliente.Table[0].fc_PlazaRegPublicoComercio);
        
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

function loadDatosKyc(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        datosKycRequest();
    }

}

async function datosKycRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 2 };

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
            $('#dkycForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }
        dataCliente.Table.forEach(kyc => {
            $(`input[type="checkbox"][value="${kyc.fi_ActividadesKycId}"]`).prop('checked', kyc.fb_ActividadSelec);
        });
        $('#fi_DatosKycId').val(dataCliente.Table1[0].fi_DatosKycId);
        $('#antiguedadDomicilio').val(dataCliente.Table1[0].fi_Antiguedad);
        $('#coberturaPersonaMoral').val(dataCliente.Table1[0].fi_CoberturaPeMoralId);
        $('#numeroEmpleados').val(dataCliente.Table1[0].fi_NumeroEmpleadosId);

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


function editActaCon() {
    let editButton = $('.editActaCon');
    let saveButton = $('.saveActaCon');
    let editTextButton = $('.editTextActaCon');
    let saveTextButton = $('.saveTextActaCon');
    let editIcon = $('.iconActaConEdit');
    let saveIcon = $('.iconActaConSave');


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


async function saveActaCon() {
    $('.alert.alert-danger').remove();
    let button = $('.saveActaCon');
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlClienteInfo + "/ActaConstitutivaEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_ActaConstitutivaId: $('#fi_ActaConstitutivaId').val(),
                    fc_Giro: $('#giroMercantil').val(),
                    fc_SerieFirmaElectronica: $('#numeroFirmaElectronica').val(),
                    fc_NumeroEscritura: $('#numeroEscritura').val(),
                    fd_FechaConstitucion: $('#fechaEscritura').val(),
                    fc_NombreNotario: $('#nombreNotario').val(),
                    fc_NumeroNotaria: $('#numeroNotaria').val(),
                    fc_NumeroPublicoComercio: $('#numeroRegistroPublico').val(),
                    fd_RegPublicoComercio: $('#fechaRegistroPublico').val(),
                    fc_PlazaRegPublicoComercio: $('#plazaRegistroPublico').val(),
                    fi_ClienteId: sessionStorage.getItem("clienteId")
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
                await altaConstitutivaRequest(true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editActaCon');
            let saveButton = $('.saveActaCon');
            let editTextButton = $('.editTextActaCon');
            let saveTextButton = $('.saveTextActaCon');
            let editIcon = $('.iconActaConEdit');
            let saveIcon = $('.iconActaConSave');
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}


function editdatosKyc() {
    let editButton = $('.editdatosKyc');
    let saveButton = $('.savedatosKyc');
    let editTextButton = $('.editTextdatosKyc');
    let saveTextButton = $('.saveTextdatosKyc');
    let editIcon = $('.icondatosKycEdit');
    let saveIcon = $('.icondatosKycSave');


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


async function savedatosKyc() {
    $('.alert.alert-danger').remove();
    let button = $('.savedatosKyc');

    
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {

            showLoadingAlert("Espere... cargando información.");
            let form = button.parents('form:first');
            let inputs = form.find(':checkbox');
            let selectedValues = inputs.map(function () {
                return {
                    tipo: $(this).val(),
                    selected: $(this).prop('checked')
                }; // Obtenemos el valor de cada checkbox seleccionado
            }).get();

            let auttipo = [];

            selectedValues.forEach(s => {
                auttipo.push({
                    fi_DatosKycId: $('#fi_DatosKycId').val(),
                    fi_ActividadesKycId: s.tipo,
                    fb_ActividadSelec: s.selected
                });
            });

            console.log(auttipo);
            const response = await fetch(urlClienteInfo + "/DatosKycEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_DatosKycId: $('#fi_DatosKycId').val(),
                    fi_Antiguedad: $('#antiguedadDomicilio').val(),
                    fi_CoberturaPeMoralId: $('#coberturaPersonaMoral').val(),
                    fi_NumeroEmpleadosId: $('#numeroEmpleados').val(),
                    DatosActividadesKycEdits: auttipo
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
                await datosKycRequest(true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editdatosKyc');
            let saveButton = $('.savedatosKyc');
            let editTextButton = $('.editTextdatosKyc');
            let saveTextButton = $('.saveTextdatosKyc');
            let editIcon = $('.icondatosKycEdit');
            let saveIcon = $('.icondatosKycSave');
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}


function loadInfoAdicional(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        $('#reprecentantes-tab').click();
    }

}


function loadRepresentantes(button) {
   representantesRequest();
}

async function representantesRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 3 };

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
            $('#accordionGenerico').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        $('#container-rep').empty();

        let items = dataCliente.Table.map(i => `

        <!-- INICIO: Acordeon hijo -->
        <div class="accordion simple " id="accordionRep">
            <div class="accordion-item ">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed "
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseRep${i.fi_RepresentantesLegalesId}"
                            aria-expanded="true"
                            aria-controls="collapseRep${i.fi_RepresentantesLegalesId}"
                            onclick="loadRepresentante(this, ${i.fi_RepresentantesLegalesId})">
                        <div class="label">
                            <p class="text-wrapper">
                                ${i.fc_NombreCompleto}
                            </p>
                        </div>
                    </button>
                </h2>

                <div id="collapseRep${i.fi_RepresentantesLegalesId}"
                        class="accordion-collapse collapse "
                        data-bs-parent="#accordionRep">
                    <div class="accordion-body">
                        <div class="triangle">
                            <!--  <img src="~/dist/img/polygon.svg"> -->
                            <img src="${ urlImgPolygon }"> 
                        </div>


                        <form class="container-Tab-form">
                            <!-- Encabezado: Datos generales -->
                            <h5 class="text-wrapper-2">
                                Datos
                                generales
                            </h5>
                            <div class="row">
                                <!-- Nombre completo -->
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text"
                                                class="form-control"
                                                id="nombreCompleto${i.fi_RepresentantesLegalesId}"
                                                placeholder="Nombre completo sin abreviaturas"
                                                required
                                                disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                        <label class="pla"
                                                for="nombreCompleto${i.fi_RepresentantesLegalesId}">
                                            Nombre
                                            completo sin
                                            abreviaturas
                                        </label>
                                    </div>
                                </div>


                                <!-- Nacionalidad -->
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text"
                                                class="form-control"
                                                id="nacionalidad${i.fi_RepresentantesLegalesId}"
                                                placeholder="Nacionalidad"
                                                required
                                                disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                                        <label class="pla"
                                                for="nacionalidad${i.fi_RepresentantesLegalesId}">Nacionalidad</label>
                                    </div>
                                </div>

                                <!-- RFC -->
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text"
                                                class="form-control"
                                                id="rfc${i.fi_RepresentantesLegalesId}"
                                                placeholder="RFC (Extranjeros fecha de nacimiento)"
                                                required
                                                disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="rfc"/>
                                        <label class="pla"
                                                for="rfc${i.fi_RepresentantesLegalesId}">
                                            RFC
                                            (Extranjeros fecha de
                                            nacimiento)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <!-- Encabezado: Domicilio -->
                            <h5 class="text-wrapper-2">
                                Domicilio
                            </h5>
                            <div class="row">
                                <!-- País -->
                                <div class="col-md-7">
                                    <div class="form-floating">
                                        <input type="text"
                                                class="form-control"
                                                id="domicilioResidencia${i.fi_RepresentantesLegalesId}"
                                                placeholder="Domicilio Residencia"
                                                required
                                                disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street"/>
                                        <label class="pla"
                                                for="domicilioResidencia${i.fi_RepresentantesLegalesId}">Domicilio Residencia</label>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <!-- Botones de acción -->
                            <div class="row justify-content-end mt-4">
                                <div class="col-auto">
                                    <button type="button" class="disable-button saveRepLegal${i.fi_RepresentantesLegalesId}" onclick="saveRepLegal(${i.fi_RepresentantesLegalesId})" disabled>
                                        <div class="content-btn">
                                            <i class="mdi mdi-cloud-upload iconRepLegalSave${i.fi_RepresentantesLegalesId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                            <div class="disable-text saveTextRepLegal${i.fi_RepresentantesLegalesId}">Guardar cambios</div>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="button editRepLegal${i.fi_RepresentantesLegalesId}" onclick="editRepLegal(${i.fi_RepresentantesLegalesId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-pencil iconRepLegalEdit${i.fi_RepresentantesLegalesId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                            <div class="label-text editTextRepLegal${i.fi_RepresentantesLegalesId}">Editar datos</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>




                    </div>
                    <!-- FIN: Contenido Tab -->
                </div>
            </div>
        </div>
        <!-- FIN: Acordeon hijo -->
        `);

        $('#container-rep').append(items);
        addUpperCaseTr();
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


function loadRepresentante(button, representanteId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        representanteRequest(representanteId);
    }
}


async function representanteRequest(representanteId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 4, pi_Representante : representanteId };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
        }

        let dataInfo = dataCliente.Table[0];
        $('#nombreCompleto' + representanteId).val(dataInfo.fc_NombreCompleto);
        $('#cargo' + representanteId).val(dataInfo.fc_Cargo);
        $('#nacionalidad' + representanteId).val(dataInfo.fc_Nacionalidad);
        $('#rfc' + representanteId).val(dataInfo.fc_RFC);
        $('#domicilioResidencia' + representanteId).val(dataInfo.fc_Domicilio);


        $('#rfc' + representanteId).attr('data-nacionalidad', dataInfo.fc_Nacionalidad);
        $('#nacionalidad' + representanteId).on('input', function () {
            $('#rfc' + representanteId).attr('data-nacionalidad', $(this).val());
        });
        //$('#beneficiarioCuenta' + RepresentanteId).val(dataInfo.fc_BeneficiarioCta);
        //$('#nombreBanco' + RepresentanteId).val(dataInfo.fc_NombreBanco);
        //$('#numeroCuenta' + RepresentanteId).val(dataInfo.fc_NumeroCta);
        //$('#numeroClabe' + RepresentanteId).val(dataInfo.fc_NumertoCtaClabe);
        //$('#divisa' + RepresentanteId).val(dataInfo.fc_Divisa);

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


function editRepLegal(fi_RepresentantesLegalesId) {
    let editButton = $('.editRepLegal' + fi_RepresentantesLegalesId);
    let saveButton = $('.saveRepLegal' + fi_RepresentantesLegalesId);
    let editTextButton = $('.editTextRepLegal' + fi_RepresentantesLegalesId);
    let saveTextButton = $('.saveTextRepLegal' + fi_RepresentantesLegalesId);
    let editIcon = $('.iconRepLegalEdit' + fi_RepresentantesLegalesId);
    let saveIcon = $('.iconRepLegalSave' + fi_RepresentantesLegalesId);


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


async function saveRepLegal(fi_RepresentantesLegalesId) {
    $('.alert.alert-danger').remove();
    console.log(fi_RepresentantesLegalesId);
    let button = $('.saveRepLegal' + fi_RepresentantesLegalesId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlClienteInfo + "/RepresentantesLegalesEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_RepresentantesLegalesId: fi_RepresentantesLegalesId,
                    fc_NombreCompleto: $('#nombreCompleto' + fi_RepresentantesLegalesId).val(),
                    fc_Cargo: $('#cargo' + fi_RepresentantesLegalesId).val(),
                    fc_Nacionalidad: $('#nacionalidad' + fi_RepresentantesLegalesId).val(),
                    fc_RFC: $('#rfc' + fi_RepresentantesLegalesId).val(),
                    fc_Domicilio: $('#domicilioResidencia' + fi_RepresentantesLegalesId).val()
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
                await representanteRequest(fi_RepresentantesLegalesId, true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editRepLegal' + fi_RepresentantesLegalesId);
            let saveButton = $('.saveRepLegal' + fi_RepresentantesLegalesId);
            let editTextButton = $('.editTextRepLegal' + fi_RepresentantesLegalesId);
            let saveTextButton = $('.saveTextRepLegal' + fi_RepresentantesLegalesId);
            let editIcon = $('.iconRepLegalEdit' + fi_RepresentantesLegalesId);
            let saveIcon = $('.iconRepLegalSave' + fi_RepresentantesLegalesId);
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}


function loadDirectores(button) {
    let classes = button.className;
    if (classes.includes('active')) {
        directoresRequest();
    }
}

async function directoresRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 5 };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        $('#container-dir').empty();

        let items = dataCliente.Table.map(i => `
            <!-- INICIO: Acordeon hijo -->
            <div class="accordion simple " id="accordionDir${i.fi_DirectoresId}">
                <div class="accordion-item ">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed "
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseDir${i.fi_DirectoresId}"
                                aria-expanded="true"
                                aria-controls="collapseDir${i.fi_DirectoresId}"
                                onclick="loadDirector(this,${i.fi_DirectoresId})">
                            <div class="label">
                                <p class="text-wrapper">
                                    ${i.fc_NombreCompleto}
                                </p>
                            </div>
                        </button>
                    </h2>

                    <div id="collapseDir${i.fi_DirectoresId}"
                            class="accordion-collapse collapse "
                            data-bs-parent="#accordionClient">
                        <div class="accordion-body">
                            <div class="triangle">
                                <!--  <img src="~/dist/img/polygon.svg"> -->
                               <img src="${ urlImgPolygon }">
                            </div>


                            <form class="container-Tab-form">
                                <!-- Encabezado: Datos generales -->
                                <h5 class="text-wrapper-2">
                                    Datos
                                    generales
                                </h5>
                                <div class="row">
                                    <!-- Nombre completo -->
                                    <div class="col-md-3">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="nombreCompletoD${i.fi_DirectoresId}"
                                                    placeholder="Nombre completo sin abreviaturas"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                            <label class="pla"
                                                    for="nombreCompletoD${i.fi_DirectoresId}">
                                                Nombre
                                                completo sin
                                                abreviaturas
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Cargo -->
                                    <div class="col-md-3">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="cargoD${i.fi_DirectoresId}"
                                                    placeholder="Cargo"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText"/>
                                            <label class="pla"
                                                    for="cargoD${i.fi_DirectoresId}">Cargo</label>
                                        </div>
                                    </div>

                                    <!-- Nacionalidad -->
                                    <div class="col-md-3">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="nacionalidadD${i.fi_DirectoresId}"
                                                    placeholder="Nacionalidad"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                                            <label class="pla"
                                                    for="nacionalidadD${i.fi_DirectoresId}">Nacionalidad</label>
                                        </div>
                                    </div>

                                    <!-- RFC -->
                                    <div class="col-md-3">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="rfcD${i.fi_DirectoresId}"
                                                    placeholder="RFC (Extranjeros fecha de nacimiento)"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="rfc"/>
                                            <label class="pla"
                                                    for="rfcD${i.fi_DirectoresId}">
                                                RFC
                                                (Extranjeros fecha de
                                                nacimiento)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <!-- Encabezado: Domicilio -->
                                <h5 class="text-wrapper-2">
                                    Domicilio
                                </h5>
                                <div class="row">
                                    <!-- País -->
                                    <div class="col-md-7">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="domicilioResidenciaD${i.fi_DirectoresId}"
                                                    placeholder="Domicilio Residencia"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street"/>
                                            <label class="pla"
                                                    for="domicilioResidenciaD${i.fi_DirectoresId}">Domicilio Residencia</label>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <!-- Botones de acción -->
                                <div class="row justify-content-end mt-4">
                                    <div class="col-auto">
                                        <button type="button" class="disable-button saveDirector${i.fi_DirectoresId}" onclick="saveDirector(${i.fi_DirectoresId})" disabled>
                                            <div class="content-btn">
                                                <i class="mdi mdi-cloud-upload iconDirectorSave${i.fi_DirectoresId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                <div class="disable-text saveTextDirector${i.fi_DirectoresId}">Guardar cambios</div>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="button editDirector${i.fi_DirectoresId}" onclick="editDirector(${i.fi_DirectoresId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-pencil iconDirectorEdit${i.fi_DirectoresId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                <div class="label-text editTextDirector${i.fi_DirectoresId}">Editar datos</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>




                        </div>
                        <!-- FIN: Contenido Tab -->
                    </div>
                </div>
            </div>
            <!-- FIN: Acordeon hijo -->

        `);

        $('#container-dir').append(items);
        addUpperCaseTr();
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

function loadDirector(button, DirectorId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        directorRequest(DirectorId);
    }
}


async function directorRequest(DirectorId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 6, pi_Director: DirectorId };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
        }

        let dataInfo = dataCliente.Table[0];
        $('#nombreCompletoD' + DirectorId).val(dataInfo.fc_NombreCompleto);
        $('#cargoD' + DirectorId).val(dataInfo.fc_Cargo);
        $('#nacionalidadD' + DirectorId).val(dataInfo.fc_Nacionalidad);
        $('#rfcD' + DirectorId).val(dataInfo.fc_RFC);
        $('#domicilioResidenciaD' + DirectorId).val(dataInfo.fc_Domicilio);
        //$('#beneficiarioCuenta' + DirectorId).val(dataInfo.fc_BeneficiarioCta);
        //$('#nombreBanco' + DirectorId).val(dataInfo.fc_NombreBanco);
        //$('#numeroCuenta' + DirectorId).val(dataInfo.fc_NumeroCta);
        //$('#numeroClabe' + DirectorId).val(dataInfo.fc_NumertoCtaClabe);
        //$('#divisa' + DirectorId).val(dataInfo.fc_Divisa);

        $('#rfcD' + DirectorId).attr('data-nacionalidad', dataInfo.fc_Nacionalidad);
        $('#nacionalidadD' + DirectorId).on('input', function () {
            $('#rfcD' + DirectorId).attr('data-nacionalidad', $(this).val());
        });

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

function editDirector(fi_RepresentantesLegalesId) {
    console.log(fi_RepresentantesLegalesId)
    let editButton = $('.editDirector' + fi_RepresentantesLegalesId);
    let saveButton = $('.saveDirector' + fi_RepresentantesLegalesId);
    let editTextButton = $('.editTextDirector' + fi_RepresentantesLegalesId);
    let saveTextButton = $('.saveTextDirector' + fi_RepresentantesLegalesId);
    let editIcon = $('.iconDirectorEdit' + fi_RepresentantesLegalesId);
    let saveIcon = $('.iconDirectorSave' + fi_RepresentantesLegalesId);


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

async function saveDirector(fi_RepresentantesLegalesId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveDirector' + fi_RepresentantesLegalesId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlClienteInfo + "/DirectoresEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_DirectoresId: fi_RepresentantesLegalesId,
                    fc_NombreCompleto: $('#nombreCompletoD' + fi_RepresentantesLegalesId).val(),
                    fc_Cargo: $('#cargoD' + fi_RepresentantesLegalesId).val(),
                    fc_Nacionalidad: $('#nacionalidadD' + fi_RepresentantesLegalesId).val(),
                    fc_RFC: $('#rfcD' + fi_RepresentantesLegalesId).val(),
                    fc_Domicilio: $('#domicilioResidenciaD' + fi_RepresentantesLegalesId).val()
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
                await directorRequest(fi_RepresentantesLegalesId, true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editDirector' + fi_RepresentantesLegalesId);
            let saveButton = $('.saveDirector' + fi_RepresentantesLegalesId);
            let editTextButton = $('.editTextDirector' + fi_RepresentantesLegalesId);
            let saveTextButton = $('.saveTextDirector' + fi_RepresentantesLegalesId);
            let editIcon = $('.iconDirectorEdit' + fi_RepresentantesLegalesId);
            let saveIcon = $('.iconDirectorSave' + fi_RepresentantesLegalesId);
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}

function loadConsejeros(button) {
    let classes = button.className;
    if (classes.includes('active')) {
        consejerosRequest();
    }
}

async function consejerosRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 7 };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        $('#container-consejo').empty();
        let items = dataCliente.Table.map(i => `
            <!-- INICIO: Acordeon hijo -->
            <div class="accordion simple " id="accordionConsejo${i.fi_ConsejerosId}">
                <div class="accordion-item ">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed "
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseCon${i.fi_ConsejerosId}"
                                aria-expanded="true"
                                aria-controls="collapseCon${i.fi_ConsejerosId}"
                                onclick="loadConsejero(this, ${i.fi_ConsejerosId})">
                            <div class="label">
                                <p class="text-wrapper">
                                    ${i.fc_NombreCompleto}
                                </p>
                            </div>
                        </button>
                    </h2>

                    <div id="collapseCon${i.fi_ConsejerosId}"
                            class="accordion-collapse collapse "
                            data-bs-parent="#accordionClient">
                        <div class="accordion-body">
                            <div class="triangle">
                                <!--  <img src="~/dist/img/polygon.svg"> -->
                                <img src="${ urlImgPolygon }">
                            </div>


                            <form class="container-Tab-form">
                                <!-- Encabezado: Datos generales -->
                                <h5 class="text-wrapper-2">
                                    Datos
                                    generales
                                </h5>
                                <div class="row">
                                    <!-- Nombre completo -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="nombreCompletoC${i.fi_ConsejerosId}"
                                                    placeholder="Nombre completo sin abreviaturas"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                            <label class="pla"
                                                    for="nombreCompletoC${i.fi_ConsejerosId}">
                                                Nombre
                                                completo sin
                                                abreviaturas
                                            </label>
                                        </div>
                                    </div>


                                    <!-- Nacionalidad -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="nacionalidadC${i.fi_ConsejerosId}"
                                                    placeholder="Nacionalidad"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                            <label class="pla"
                                                    for="nacionalidadC${i.fi_ConsejerosId}">Nacionalidad</label>
                                        </div>
                                    </div>

                                    <!-- RFC -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="rfcC${i.fi_ConsejerosId}"
                                                    placeholder="RFC (Extranjeros fecha de nacimiento)"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="rfc"/>
                                            <label class="pla"
                                                    for="rfcC${i.fi_ConsejerosId}">
                                                RFC
                                                (Extranjeros fecha de
                                                nacimiento)
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <!-- Encabezado: Domicilio -->
                                <h5 class="text-wrapper-2">
                                    Domicilio
                                </h5>
                                <div class="row">
                                    <!-- País -->
                                    <div class="col-md-7">
                                        <div class="form-floating">
                                            <input type="text"
                                                    class="form-control"
                                                    id="domicilioResidenciaC${i.fi_ConsejerosId}"
                                                    placeholder="Domicilio Residencia"
                                                    required
                                                    disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street"/>
                                            <label class="pla"
                                                    for="domicilioResidenciaC${i.fi_ConsejerosId}">Domicilio Residencia</label>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <!-- Botones de acción -->
                                <div class="row justify-content-end mt-4">
                                    <div class="col-auto">
                                        <button type="button" class="disable-button saveConsejero${i.fi_ConsejerosId}" onclick="saveConsejero(${i.fi_ConsejerosId})" disabled>
                                            <div class="content-btn">
                                                <i class="mdi mdi-cloud-upload iconConsejeroSave${i.fi_ConsejerosId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                <div class="disable-text saveTextConsejero${i.fi_ConsejerosId}">Guardar cambios</div>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" class="button editConsejero${i.fi_ConsejerosId}" onclick="editConsejero(${i.fi_ConsejerosId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-pencil iconConsejeroEdit${i.fi_ConsejerosId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                <div class="label-text editTextConsejero${i.fi_ConsejerosId}">Editar datos</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>




                        </div>
                        <!-- FIN: Contenido Tab -->
                    </div>
                </div>
            </div>
            <!-- FIN: Acordeon hijo -->
        `);
        $('#container-consejo').append(items);
        addUpperCaseTr();
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

function loadConsejero(button, ConsejeroId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        ConsejeroRequest(ConsejeroId);
    }
}


async function ConsejeroRequest(ConsejeroId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 8, pi_Consejero: ConsejeroId };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
        }

        let dataInfo = dataCliente.Table[0];
        $('#nombreCompletoC' + ConsejeroId).val(dataInfo.fc_NombreCompleto);
        $('#cargoC' + ConsejeroId).val(dataInfo.fc_Cargo);
        $('#nacionalidadC' + ConsejeroId).val(dataInfo.fc_Nacionalidad);
        $('#rfcC' + ConsejeroId).val(dataInfo.fc_RFC);
        $('#domicilioResidenciaC' + ConsejeroId).val(dataInfo.fc_Domicilio);
        //$('#beneficiarioCuenta' + ConsejeroId).val(dataInfo.fc_BeneficiarioCta);
        //$('#nombreBanco' + ConsejeroId).val(dataInfo.fc_NombreBanco);
        //$('#numeroCuenta' + ConsejeroId).val(dataInfo.fc_NumeroCta);
        //$('#numeroClabe' + ConsejeroId).val(dataInfo.fc_NumertoCtaClabe);
        //$('#divisa' + ConsejeroId).val(dataInfo.fc_Divisa);

        $('#rfcC' + ConsejeroId).attr('data-nacionalidad', dataInfo.fc_Nacionalidad);
        $('#nacionalidadC' + ConsejeroId).on('input', function () {
            $('#rfcC' + ConsejeroId).attr('data-nacionalidad', $(this).val());
        });

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

function editConsejero(fi_RepresentantesLegalesId) {
    console.log(fi_RepresentantesLegalesId)
    let editButton = $('.editConsejero' + fi_RepresentantesLegalesId);
    let saveButton = $('.saveConsejero' + fi_RepresentantesLegalesId);
    let editTextButton = $('.editTextConsejero' + fi_RepresentantesLegalesId);
    let saveTextButton = $('.saveTextConsejero' + fi_RepresentantesLegalesId);
    let editIcon = $('.iconConsejeroEdit' + fi_RepresentantesLegalesId);
    let saveIcon = $('.iconConsejeroSave' + fi_RepresentantesLegalesId);


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

async function saveConsejero(fi_RepresentantesLegalesId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveConsejero' + fi_RepresentantesLegalesId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlClienteInfo + "/ConsejerosEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_ConsejerosId: fi_RepresentantesLegalesId,
                    fc_NombreCompleto: $('#nombreCompletoC' + fi_RepresentantesLegalesId).val(),
                    fc_Cargo: $('#cargoC' + fi_RepresentantesLegalesId).val(),
                    fc_Nacionalidad: $('#nacionalidadC' + fi_RepresentantesLegalesId).val(),
                    fc_RFC: $('#rfcC' + fi_RepresentantesLegalesId).val(),
                    fc_Domicilio: $('#domicilioResidenciaC' + fi_RepresentantesLegalesId).val(),
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
                await ConsejeroRequest(fi_RepresentantesLegalesId, true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editConsejero' + fi_RepresentantesLegalesId);
            let saveButton = $('.saveConsejero' + fi_RepresentantesLegalesId);
            let editTextButton = $('.editTextConsejero' + fi_RepresentantesLegalesId);
            let saveTextButton = $('.saveTextConsejero' + fi_RepresentantesLegalesId);
            let editIcon = $('.iconConsejeroEdit' + fi_RepresentantesLegalesId);
            let saveIcon = $('.iconConsejeroSave' + fi_RepresentantesLegalesId);
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}

function loadAccionarios(button) {
    let classes = button.className;
    if (classes.includes('active')) {
        accionariosRequest();
    }
}

async function accionariosRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 9 };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        $('#container-accion').empty();
        console.log(dataCliente.Table)
        let items = dataCliente.Table.map(i => `
                <!-- INICIO: Acordeon hijo -->
                <div class="accordion simple " id="accordionAccionario${i.fi_AccionariosId}">
                    <div class="accordion-item ">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed "
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseAcc${i.fi_AccionariosId}"
                                    aria-expanded="true"
                                    aria-controls="collapseAcc${i.fi_AccionariosId}"
                                    onclick="loadAccionario(this, ${i.fi_AccionariosId})">
                                <div class="label">
                                    <p class="text-wrapper">
                                        ${i.fc_NombreCompleto}
                                    </p>
                                </div>
                            </button>
                        </h2>

                        <div id="collapseAcc${i.fi_AccionariosId}"
                                class="accordion-collapse collapse "
                                data-bs-parent="#accordionClient">
                            <div class="accordion-body">
                                <div class="triangle">
                                    <!--  <img src="~/dist/img/polygon.svg"> -->
                                    <img src="${ urlImgPolygon }">
                                </div>


                                <form class="container-Tab-form">
                                    <!-- Encabezado: Datos generales -->
                                    <h5 class="text-wrapper-2">
                                        Datos
                                        generales
                                    </h5>
                                    <div class="row">
                                        <!-- Nombre completo -->
                                        <div class="col-md-${tipoCliente === 1? '6' : 5}">
                                            <div class="form-floating">
                                                <input type="text"
                                                        class="form-control"
                                                        id="nombreCompletoE${i.fi_AccionariosId}"
                                                        placeholder="Nombre completo sin abreviaturas"
                                                        required
                                                        disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                                                <label class="pla"
                                                        for="nombreCompletoE${i.fi_AccionariosId}">
                                                    Nombre
                                                    completo sin
                                                    abreviaturas
                                                </label>
                                            </div>
                                        </div>

                                        <!-- Cargo -->
                                        ${tipoCliente === 1 ? 
                                            `
                                            <div class="col-md-3"  style="margin-top: -23px;">
                                                <label class="text-wrapper-4" for="participacion${i.fi_AccionariosId}">
                                                    % de Participación
                                                </label>
                                                <div class="input-group">
                                                    <span class="input-group-text">%</span>
                                                    <input type="text"
                                                            class="form-control"
                                                            id="participacion${i.fi_AccionariosId}"
                                                            placeholder="Cargo"
                                                            required
                                                            disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="percentage"/>
                                                </div>
                                            </div>
                                            ` :
                                            `
                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input type="text"
                                                            class="form-control"
                                                            id="cargo${i.fi_AccionariosId}"
                                                            placeholder="Participación"
                                                            required
                                                            disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                                    <label class="pla" for="cargo${i.fi_AccionariosId}">
                                                        Cargo
                                                    </label>
                                                </div>
                                            </div>

                                            `
                                        }
                                        

                                        <!-- Nacionalidad -->
                                        <div class="col-md-3">
                                            <div class="form-floating">
                                                <input type="text"
                                                        class="form-control"
                                                        id="nacionalidadE${i.fi_AccionariosId}"
                                                        placeholder="Nacionalidad"
                                                        required
                                                        disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"/>
                                                <label class="pla"
                                                        for="nacionalidadE${i.fi_AccionariosId}">Nacionalidad</label>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <!-- Encabezado: Domicilio -->
                                    <h5 class="text-wrapper-2">
                                        Domicilio
                                    </h5>
                                    <div class="row">
                                        <!-- País -->
                                        <div class="col-md-7">
                                            <div class="form-floating">
                                                <input type="text"
                                                        class="form-control"
                                                        id="domicilioResidenciaE${i.fi_AccionariosId}"
                                                        placeholder="Domicilio Residencia"
                                                        required
                                                        disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street"/>
                                                <label class="pla"
                                                        for="domicilioResidenciaE${i.fi_AccionariosId}">Domicilio Residencia</label>
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-floating">
                                                <input type="text"
                                                        class="form-control"
                                                        id="idenFiscal${i.fi_AccionariosId}"
                                                        placeholder="Identificación fiscal"
                                                        required
                                                        disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street"/>
                                                <label class="pla"
                                                        for="idenFiscal${i.fi_AccionariosId}">Identificación fiscal</label>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <!-- Botones de acción -->
                                    <div class="row justify-content-end mt-4">
                                        <div class="col-auto">
                                            <button type="button" class="disable-button saveAccionario${i.fi_AccionariosId}" onclick="saveAccionario(${i.fi_AccionariosId})" disabled>
                                                <div class="content-btn">
                                                    <i class="mdi mdi-cloud-upload iconAccionarioSave${i.fi_AccionariosId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="disable-text saveTextAccionario${i.fi_AccionariosId}">Guardar cambios</div>
                                                </div>
                                            </button>
                                        </div>
                                        <div class="col-auto">
                                            <button type="button" class="button editAccionario${i.fi_AccionariosId}" onclick="editAccionario(${i.fi_AccionariosId})">
                                                <div class="content-btn">
                                                    <i class="mdi mdi-pencil iconAccionarioEdit${i.fi_AccionariosId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="label-text editTextAccionario${i.fi_AccionariosId}">Editar datos</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </form>




                            </div>
                            <!-- FIN: Contenido Tab -->
                        </div>
                    </div>
                </div>
                <!-- FIN: Acordeon hijo -->

        `);

        $('#container-accion').append(items);
        addUpperCaseTr();
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


function loadAccionario(button, AccionarioId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        AccionarioRequest(AccionarioId);
    }
}


async function AccionarioRequest(AccionarioId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlClienteInfo + "/GetClientesInfo/";
    const requestData = { pi_ClienteId: sessionStorage.getItem("clienteId"), pi_Seccion: 10, pi_Accionario: AccionarioId };

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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
        }

        let dataInfo = dataCliente.Table[0];
        $('#nombreCompletoE' + AccionarioId).val(dataInfo.fc_NombreCompleto);
        $('#participacion' + AccionarioId).val(dataInfo.fi_PorcentajePar);
        $('#nacionalidadE' + AccionarioId).val(dataInfo.fc_Nacionalidad);
        $('#domicilioResidenciaE' + AccionarioId).val(dataInfo.fc_Domicilio);
        $('#idenFiscal' + AccionarioId).val(dataInfo.fc_NumeroIdenFiscal);
        $('#cargo' + AccionarioId).val(dataInfo.fc_Cargo);
        //$('#beneficiarioCuenta' + AccionarioId).val(dataInfo.fc_BeneficiarioCta);
        //$('#nombreBanco' + AccionarioId).val(dataInfo.fc_NombreBanco);
        //$('#numeroCuenta' + AccionarioId).val(dataInfo.fc_NumeroCta);
        //$('#numeroClabe' + AccionarioId).val(dataInfo.fc_NumertoCtaClabe);
        //$('#divisa' + AccionarioId).val(dataInfo.fc_Divisa);

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

function editAccionario(fi_RepresentantesLegalesId) {
    console.log(fi_RepresentantesLegalesId)
    let editButton = $('.editAccionario' + fi_RepresentantesLegalesId);
    let saveButton = $('.saveAccionario' + fi_RepresentantesLegalesId);
    let editTextButton = $('.editTextAccionario' + fi_RepresentantesLegalesId);
    let saveTextButton = $('.saveTextAccionario' + fi_RepresentantesLegalesId);
    let editIcon = $('.iconAccionarioEdit' + fi_RepresentantesLegalesId);
    let saveIcon = $('.iconAccionarioSave' + fi_RepresentantesLegalesId);


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

async function saveAccionario(fi_RepresentantesLegalesId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveAccionario' + fi_RepresentantesLegalesId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlClienteInfo + "/AccionariosEdit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_AccionariosId: fi_RepresentantesLegalesId,
                    fc_NombreCompleto: $('#nombreCompletoE' + fi_RepresentantesLegalesId).val(),
                    fi_PorcentajePar: $('#participacion' + fi_RepresentantesLegalesId).val(),
                    fc_Nacionalidad: $('#nacionalidadE' + fi_RepresentantesLegalesId).val(),
                    fc_Domicilio: $('#domicilioResidenciaE' + fi_RepresentantesLegalesId).val(),
                    fc_NumeroIdenFiscal: $('#idenFiscal' + fi_RepresentantesLegalesId).val(),
                    fc_Cargo: $('#cargo' + fi_RepresentantesLegalesId).val(),
                }),
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }

            const data = await response.json();
            console.log(data);
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
            if (data > 0) {
                Swal.close();
                await AccionarioRequest(fi_RepresentantesLegalesId, true);
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editAccionario' + fi_RepresentantesLegalesId);
            let saveButton = $('.saveAccionario' + fi_RepresentantesLegalesId);
            let editTextButton = $('.editTextAccionario' + fi_RepresentantesLegalesId);
            let saveTextButton = $('.saveTextAccionario' + fi_RepresentantesLegalesId);
            let editIcon = $('.iconAccionarioEdit' + fi_RepresentantesLegalesId);
            let saveIcon = $('.iconAccionarioSave' + fi_RepresentantesLegalesId);
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
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}