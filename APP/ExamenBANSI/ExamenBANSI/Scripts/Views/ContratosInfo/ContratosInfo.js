let inputs = [];
function paramComisionesEdit(paramId) {
    let editButton = $('.paramComisionesEdit');
    let saveButton = $('.paramComisionesSave');
    let editTextButton = $('.editTextPar');
    let saveTextButton = $('.saveTextPar');
    let editIcon = $('.editIconPar');
    let saveIcon = $('.saveIconPar');
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

    $('#tblHFee').removeAttr("disabled");
    $('#tblHFeeDiff').removeAttr("disabled");
    $('#tblHFee').css({ 'color': '#0948A5' });
    $('#tblHFeeDiff').css({ 'color': '#0948A5' });
    $('#textFee').css({ 'color': '#0948A5' });
    $('#textFeeDiff').css({ 'color': '#0948A5' });
    $('#hfeeDiffIcon').css({ 'color': '#0948A5' });
    $('#hfeeIcon').css({ 'color': '#0948A5' });

    changeStatusInputForm(saveButton, false);
   
}

function editAutCtoA(autorizadoId) {
    let editButton = $('.editAutCtoA' + autorizadoId)
    let saveButton = $('.saveAutCtoA' + autorizadoId)
    let editTextButton = $('.editTextAutCtoA' + autorizadoId)
    let saveTextButton = $('.saveTextAutCtoA' + autorizadoId)
    let editIcon = $('.iconAutCtoAEdit' + autorizadoId)
    let saveIcon = $('.iconAutCtoASave' + autorizadoId)
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

function editKyc() {
    let editButton = $('.editKyc')
    let saveButton = $('.saveKyc')
    let editTextButton = $('.editTextKyc')
    let saveTextButton = $('.saveTextKyc')
    let editIcon = $('.iconKycEdit')
    let saveIcon = $('.iconKycSave')
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

function editAutCto() {
    let editButton = $('.editAutCto');
    let saveButton = $('.saveAutCto');
    let editTextButton = $('.editTextAutCto');
    let saveTextButton = $('.saveTextAutCto');
    let editIcon = $('.iconAutCtoEdit');
    let saveIcon = $('.iconAutCtoSave');
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

function editCtoSam() {
    let editButton = $('.editCtoSam');
    let saveButton = $('.saveCtoSam');
    let editTextButton = $('.editTextCtoSam');
    let saveTextButton = $('.saveTextCtoSam');
    let editIcon = $('.iconCtoSamEdit');
    let saveIcon = $('.iconCtoSamSave');
    let fichaEsp = $('#fileEsp');
    let fichaEst = $('#fileEst');

    fichaEsp.removeClass('disabled-link');
    fichaEst.removeClass('disabled-link');

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
    $('#fileEsp').css({ 'color': '#EC0000' });
    $('#fileEst').css({ 'color': '#EC0000' });
    $('#fileEsp').removeAttr('disabled');
    $('#fileEst').removeAttr('disabled');

    changeStatusInputForm(saveButton, false);

}

function editCuentaOrg(autorizadoId) {
    console.log($('.editCuentaOrg' + autorizadoId));
    let editButton = $('.editCuentaOrg' + autorizadoId);
    let saveButton = $('.saveCuentaOrg' + autorizadoId);
    let editTextButton = $('.editTextCuentaOrg' + autorizadoId);
    let saveTextButton = $('.saveTextCuentaOrg' + autorizadoId);
    let editIcon = $('.iconCuentaOrgEdit' + autorizadoId);
    let saveIcon = $('.iconCuentaOrgSave' + autorizadoId);
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

function editCuentaIns(autorizadoId) {
    console.log($('.editCuentaIns' + autorizadoId));
    let editButton = $('.editCuentaIns' + autorizadoId);
    let saveButton = $('.saveCuentaIns' + autorizadoId);
    let editTextButton = $('.editTextCuentaIns' + autorizadoId);
    let saveTextButton = $('.saveTextCuentaIns' + autorizadoId);
    let editIcon = $('.iconCuentaInsEdit' + autorizadoId);
    let saveIcon = $('.iconCuentaInsSave' + autorizadoId);
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

function insLiqEdit() {
    let editButton = $('.insLiqEdit' );
    let saveButton = $('.insLiqSave' );
    let editTextButton = $('.editTextInsLiq' );
    let saveTextButton = $('.saveTextInsLiq' );
    let editIcon = $('.editIconInsLiq' );
    let saveIcon = $('.saveIconInsLiq' );
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

async function saveCtoSam() {
    
    $('.alert.alert-danger').remove();
    console.log($('#fichaEspecificaciones').val());

    

    try {
        var formData = new FormData($('#formCtoSam')[0]);
        showLoadingAlert("Espere... cargando información.");
        const response = await fetch(urlContratoInfo + "/UpContratoSam", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion: Información Contrato SAM.', 'error');
        }

        const data = await response.json();
        if (Object.hasOwn(data, 'SessionActiva')) {
            window.location.href = data.URL;
        }
        console.log(data);
        if (data > 0) {
            Swal.close();
            infoCtoSamRequest(true);
        } else {
            Swal.close();
            showAlert('Error', 'Error al editar seccion: Información Contrato SAM.', 'error');
        }


    } catch (error) {
        Swal.close();
        showAlert('Error', 'Error al editar seccion: Información Contrato SAM.', 'error');
        console.error("Error:", error.message);
    } finally {
        let editButton = $('.editCtoSam');
        let saveButton = $('.saveCtoSam');
        let editTextButton = $('.editTextCtoSam');
        let saveTextButton = $('.saveTextCtoSam');
        let editIcon = $('.iconCtoSamEdit');
        let saveIcon = $('.iconCtoSamSave');
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
        $('#fileEsp').css({ 'color': 'darkgray' });
        $('#fileEst').css({ 'color': 'darkgray' });
        $('#fileEsp').attr('disabled', true);
        $('#fileEst').attr('disabled', true);
        changeStatusInputForm(saveButton, true);
        
    }

    
    

}


async function paramComisionesSave() {

    let button = $('.paramComisionesSave');
    if (!validateForm(button)) {
        cleanInputValidation(button);

        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlContratoInfo + "/UpParamComisiones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    ContratosId: sessionStorage.getItem("ctoNum"),
                    ParamComisionesId: $('#paramComisionesId').val(),
                    TipoFeeId: $('input[name="feeType"]:checked').val(),
                    PorcentajeFee: $('#feePercentage').val(),
                    TipoActivoId: $('input[name="tipoActivo"]:checked').val(),
                    PorcentajeFeeDif: $('#feeDiferencial').val().replace(',', ''),
                    PorcentajeFeeBanco: $('#feeBanco').val(),
                    BanchOrigenId: $('input[name="branchOrigen"]:checked').val(),
                    SuccessFee: $('#successFeeToggle').is(":checked"),
                    CorretajeIncluidoPort: $('#corretajeToggle').is(":checked"),
                    KnowledgeTranAct: $('#knowledgeToggle').is(":checked"),
                    FijasAct: $('#fijasToggle').is(":checked"),
                    FeeSerieAct: $('#feeSerieToggle').is(":checked"),
                    FechaActualizacion: $('#fechaActualizacion').val(),
                    BanchOrigenCtoId: $('input[name="branchOrigen"]:checked').val(),
                    RepartoInicial: $('#porcentajeRepartoInicial').val(),
                    FechaRepartoIni: $('#fechaInicialReparto').val(),
                    ModificacionRepartoIni: $('#modificacionReparto').val(),
                    FechaRepartoMod: $('#fechaModificacionReparto').val(),
                    BancaColaboracionId: $('#bancaColaboracion').val(),
                    SuccessFeeId: 1,
                    TipoFrecuenciaId: $('input[name="frecuencia"]:checked').val(),
                    LimiteValAbsoluto: $('#limiteValor').val().replace(',', ''),
                    RendimientoBench: $('#rendimientoBenchmark').val(),
                    AsesoriaPenalizacionId: 1,
                    Asesoria: $('#asesoria').val(),
                    Penalizacion: $('#penalizaciones').val(),
                    FeeRk: $('#feeRk').val().replace(',', ''),
                    CostoCapitales: $('#costoCapitales').val().replace(',', ''),
                    EjercidoReal: $('#ejercidoReal').val().replace(',', ''),
                    MontoMaxKT: $('#maximoKt').val().replace(',', ''),
                    FijasMto: $('#fijasInput').val().replace(',', ''),
                }),
            });

            if (!response.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar seccion: Parametrización de Comisiones.', 'error');
            }

            const data = await response.json();
            if (Object.hasOwn(data, 'SessionActiva')) {
                window.location.href = data.URL;
            }
            console.log(data);
            if (data >= 8) {
                Swal.close();
                await loadParComRequest(true);
            } else if (data < 7 && data > 0) {
                showAlert('Error', 'Algunos datos no se guardaron, favor de validar.', 'warning');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion: Parametrización de Comisiones.', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion: Parametrización de Comisiones.', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.paramComisionesEdit');
            let saveButton = $('.paramComisionesSave');
            let editTextButton = $('.editTextPar');
            let saveTextButton = $('.saveTextPar');
            let editIcon = $('.editIconPar');
            let saveIcon = $('.saveIconPar');
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

            $('#tblHFee').attr("disabled", true);
            $('#tblHFeeDiff').attr("disabled", true);
            $('#tblHFee').css({ 'color': 'darkgray' });
            $('#tblHFeeDiff').css({ 'color': 'darkgray' });
            $('#textFee').css({ 'color': 'darkgray' });
            $('#textFeeDiff').css({ 'color': 'darkgray' });
            $('#hfeeDiffIcon').css({ 'color': 'darkgray' });
            $('#hfeeIcon').css({ 'color': 'darkgray' });

            changeStatusInputForm(saveButton, true);
        }
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
}

async function saveAutCto() {
    $('.alert.alert-danger').remove();
    let button = $('.saveAutCto');
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlContratoInfo + "/AutorizadosFirmaEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_AutorizadosFirmaId: $('#fi_AutorizadosFirmaId').val(),
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fc_AutorizadosFirma: $('#firmaMancomunada').val()
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editAutCto');
            let saveButton = $('.saveAutCto');
            let editTextButton = $('.editTextAutCto');
            let saveTextButton = $('.saveTextAutCto');
            let editIcon = $('.iconAutCtoEdit');
            let saveIcon = $('.iconAutCtoSave');
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

async function saveKyc() {
    $('.alert.alert-danger').remove();
    let button = $('.saveKyc');
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlContratoInfo + "/ContratoKycEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fc_PropositoInversion: $('#propositoInversion').val(),
                    fi_OrigenRecursosId: $('input[name="procedenciaRecursos"]:checked').val(),
                    fc_OrigenRecursosExp: $('#explicacionOrigen').val(),
                    fc_ProcedenciaRecursosEsp: $('#especificaCual').val(),
                    fn_MontoMaxMensual: $('#montoMaximo').val().replace(',',''),
                    fi_RetirosMensuales: $('#numeroRetiros').val(),
                    fn_MontoOpRetiro: $('#montoRetiros').val().replace(',', ''),
                    fi_DepositosMensuales: $('#numeroDepositos').val(),
                    fn_MontoOpDeposito: $('#montoDepositos').val().replace(',', ''),
                    fi_ContratoKycId: $('#fi_ContratoKycId').val(),
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editKyc');
            let saveButton = $('.saveKyc');
            let editTextButton = $('.editTextKyc');
            let saveTextButton = $('.saveTextKyc');
            let editIcon = $('.iconKycEdit');
            let saveIcon = $('.iconKycSave');
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
    else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
    
}

async function saveAutCtoA(autorizadoId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveAutCtoA' + autorizadoId);
    if (!validateForm(button)) {cleanInputValidation(button);
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
                    pi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fi_AutorizadosContratoId: autorizadoId,
                    fi_TipoAutorizacionId: s.tipo,
                    fb_TipoAutorizacionSelec: s.selected
                });
            });

            console.log(auttipo);

            const response = await fetch(urlContratoInfo + "/AutorizadosContratoEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_AutorizadosContratoId: autorizadoId,
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fc_NombreCompleto: $('#nombreCompleto' + autorizadoId).val(),
                    fc_TipoFirma: $('#tipoFirma' + autorizadoId).val(),
                    fc_Telefono: $('#telefono' + autorizadoId).val(),
                    fc_CorreoElectronico: $('#correoElectronico' + autorizadoId).val(),
                    fc_TipoIdentificacion: $('#tipoIdentificacion' + autorizadoId).val(),
                    fc_NumeroIdentificacion: $('#numeroIdentificacion' + autorizadoId).val(),
                    fc_Vigencia: $('#vigencia' + autorizadoId).val(),
                    autorizaCto_TipoAutEdits: auttipo,
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editAutCtoA' + autorizadoId)
            let saveButton = $('.saveAutCtoA' + autorizadoId)
            let editTextButton = $('.editTextAutCtoA' + autorizadoId)
            let saveTextButton = $('.saveTextAutCtoA' + autorizadoId)
            let editIcon = $('.iconAutCtoAEdit' + autorizadoId)
            let saveIcon = $('.iconAutCtoASave' + autorizadoId)
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
    else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
        
    
}

async function getContratosInfo() {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";

    const requestData = { id: sessionStorage.getItem("ctoNum") };

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

        console.log(dataCliente.HistoricoFee);
        var hfeeTable = dataCliente.HistoricoFee.map(h => `<tr>
                                                              <td>${formatDate(h.fd_Fecha)}</td >
                                                              <td>${h.fn_Fee}%</td>
                                                           </tr>`);
        $('#hFee').empty();
        $('#hFee').append(hfeeTable);
        Swal.close();
        showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }

}

async function saveCuentaOrg(autorizadoId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveCuentaOrg' + autorizadoId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlContratoInfo + "/CuentaOrgRecursosEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_CuentaOrgRecursosId: autorizadoId,
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fc_BeneficiarioCta: $('#beneficiarioCuenta' + autorizadoId).val(),
                    fc_NombreBanco: $('#nombreBanco' + autorizadoId).val(),
                    fc_NumeroCta: $('#numeroCuenta' + autorizadoId).val(),
                    fc_NumertoCtaClabe: $('#numeroClabe' + autorizadoId).val(),
                    fc_Divisa: $('#divisa' + autorizadoId).val()
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editCuentaOrg' + autorizadoId)
            let saveButton = $('.saveCuentaOrg' + autorizadoId)
            let editTextButton = $('.editTextCuentaOrg' + autorizadoId)
            let saveTextButton = $('.saveTextCuentaOrg' + autorizadoId)
            let editIcon = $('.iconCuentaOrgEdit' + autorizadoId)
            let saveIcon = $('.iconCuentaOrgSave' + autorizadoId)
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
    else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
    
}

async function saveCuentaIns(autorizadoId) {
    $('.alert.alert-danger').remove();
    let button = $('.saveCuentaIns' + autorizadoId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            const response = await fetch(urlContratoInfo + "/CuentaInsLiquidacionEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_CuentaInsLiquidacionId: autorizadoId,
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fc_BeneficiarioCta: $('#beneficiarioCuentaI' + autorizadoId).val(),
                    fc_NombreBanco: $('#nombreBancoI' + autorizadoId).val(),
                    fc_NumeroCta: $('#numeroCuentaI' + autorizadoId).val(),
                    fc_NumertoCtaClabe: $('#numeroClabeI' + autorizadoId).val(),
                    fc_Divisa: $('#divisaI' + autorizadoId).val()
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editCuentaIns' + autorizadoId)
            let saveButton = $('.saveCuentaIns' + autorizadoId)
            let editTextButton = $('.editTextCuentaIns' + autorizadoId)
            let saveTextButton = $('.saveTextCuentaIns' + autorizadoId)
            let editIcon = $('.iconCuentaInsEdit' + autorizadoId)
            let saveIcon = $('.iconCuentaInsSave' + autorizadoId)
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
    else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
    
}

async function insLiqSave() {
    let button = $('.insLiqSave');
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            console.log($('input[name="indevalOption"]:checked').val());
            const response = await fetch(urlContratoInfo + "/InsLiquidacionValEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    fi_InsLiquidacionValId: $('#fi_InsLiquidacionValId').val(),
                    fi_ContratosId: sessionStorage.getItem("ctoNum"),
                    fb_MedioIndeval: $('input[name="indevalOption"]:checked').val() === "si",
                    fc_MedioLiquidacion: $('input[name="indevalOption"]:checked').val() === "si" ?  $('#medioLiquidacion').val() : " ",
                    fc_NumeroCuenta: $('input[name="indevalOption"]:checked').val() === "si" ? $('#numeroCuentaLiquidacion').val() : " ",
                    fc_Custodio: $('input[name="indevalOption"]:checked').val() === "si" ? $('#custodioIntermediario').val() : " "
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
                showAlert('Exito', 'La sección se editó correctamente', 'success');
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar seccion', 'error');
            }
        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar seccion', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.insLiqEdit');
            let saveButton = $('.insLiqSave');
            let editTextButton = $('.editTextInsLiq');
            let saveTextButton = $('.saveTextInsLiq');
            let editIcon = $('.editIconInsLiq');
            let saveIcon = $('.saveIconInsLiq');

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
    else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
    
}

function formatDate(uDate) {
    const timestamp = parseInt(uDate.match(/\d+/)[0]); // Extraer el número de la cadena
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${date.toLocaleDateString("es-MX", { month: "short" }).replace('.', '').toLowerCase()
        }/${date.getFullYear()
        }`;
    return formattedDate;
}

async function loadCtoHeader() {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 11 };

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
        console.log(dataCliente.Table[0]);
        sessionStorage.setItem("ctoPath", `${dataCliente.Table[0].fi_ContratosId}-${dataCliente.Table[0].fc_NumeroContrato}`);
        $('.cteTxt').text(sessionStorage.getItem('clientePath').split('-')[1]);
        $('.ctoNumTxt').text(dataCliente.Table[0].fc_NumeroContrato);
        $('.ctoIdenTxt').text(dataCliente.Table[0].fc_NombreIdentificador);
        Swal.close();
        //showAlert('Éxito', 'La información se guardó correctamente.', 'success');

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
    }
}

function loadInfoCtoSam(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        infoCtoSamRequest();
    }
    
}

async function infoCtoSamRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 1 };

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
            $('#formCtoSam').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        let dataInfo = dataCliente.Table[0];
        console.log(sessionStorage.getItem("ctoPath"));
        $('#ctoPath').val(sessionStorage.getItem("ctoPath"));
        $('#clientePath').val(sessionStorage.getItem("clientePath"));
        $('#tipoManejoCuenta').val(dataInfo.fi_ManejoCtaId);
        $("input[name=tipoCliente][value=" + dataInfo.fi_TipoClienteId + "]").prop('checked', true);
        $("input[name=tipoServicio][value=" + dataInfo.fi_TipoServicioId + "]").prop('checked', true);
        $('#perfilCliente').val(dataInfo.fc_PerfilCliente);
        $("input[name=recordKeeping][value=" + (dataInfo.fb_RecordKeeping ? 'Si' : 'No') + "]").prop('checked', true);
        $("input[name=recordKeeping][value=" + (dataInfo.fb_RecordKeeping ? 'Si' : 'No') + "]").prop('checked', true);
        $("input[name=aplicaISR][value=" + (dataInfo.fb_AplicaISR ? 'Si' : 'No') + "]").prop('checked', true);
        $("input[name=dispersiones][value=" + (dataInfo.fb_RecordKeepingDisp ? 'Si' : 'No') + "]").prop('checked', true);
        $("input[name=tipoRFP][value=" + dataInfo.fi_TipoRFPId + "]").prop('checked', true);
        $('#rutaFichaEspPrev').val(dataInfo.fc_RutaFichaEsp);
        $('#rutaFichaEstPrev').val(dataInfo.fc_RutaFichaEst);
        $('#fi_InfoContratoSamId').val(dataInfo.fi_InfoContratoSamId);
        $("#fileEst").off("click");
        $("#fileEsp").off("click");
        $("#fileEst").on("click", function () { downloadFile(encodeURIComponent(dataInfo.fc_RutaFichaEst.replace("\\\\", "\\"))); });
        $("#fileEsp").on("click", function () { downloadFile(encodeURIComponent(dataInfo.fc_RutaFichaEsp.replace("\\\\", "\\"))); });
        $('#fileEspFilename').text(dataInfo.fc_RutaFichaEsp.replace(/^.*[\\/]/, ''));
        $('#fileEstFilename').text(dataInfo.fc_RutaFichaEst.replace(/^.*[\\/]/, ''));
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

function loadAutsCto(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        autsCtoRequest();
    }
}

async function autsCtoRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 2 };

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
            $('#autoCtoForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        let dataInfo = dataCliente.Table[0];
        $('#fi_AutorizadosFirmaId').val(dataInfo.fi_AutorizadosFirmaId);
        $('#firmaMancomunada').val(dataInfo.fc_AutorizadosFirma);
        console.log($('#fi_AutorizadosFirmaId').val())
        let autorizados = dataCliente.Table1.map(a => `
         <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseAut${a.fi_AutorizadosContratoId}"
                        aria-expanded="false"
                        aria-controls="collapseAut${a.fi_AutorizadosContratoId}"
                        onclick="loadAutCtoA(${a.fi_AutorizadosContratoId},this)">
                    <div class="d-flex align-items-center w-100">
                        <!-- Ícono -->
                        <div class="icon-wrapper me-3">

                        </div>
                        <!-- Texto -->
                        <div class="text-content">
                            <span class="acoEsta nombreAuto${a.fi_AutorizadosContratoId}">${a.fc_NombreCompleto}</span>
                        </div>
                    </div>
                </button>
            </h2>
            <div id="collapseAut${a.fi_AutorizadosContratoId}"
                    class="accordion-collapse collapse">
                <div class="accordion-body">
                    <div class="triangle">
                       <!--  <img src="~/dist/img/polygon.svg"> -->
                       <img src="${ urlImgPolygon }">
                    </div>

                    <form>
                        <!-- Primera fila de campos -->
                        <div class="row">
                            <!-- Nombre completo -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control"
                                            id="nombreCompleto${a.fi_AutorizadosContratoId}"
                                            placeholder="Nombre completo (sin abreviaturas)"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                                    <label class="pla"
                                            for="nombreCompleto${a.fi_AutorizadosContratoId}">
                                        Nombre completo
                                        (sin abreviaturas)
                                    </label>
                                </div>
                            </div>

                            <!-- Tipo de firma -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control"
                                            id="tipoFirma${a.fi_AutorizadosContratoId}"
                                            placeholder="Tipo de firma"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText" />
                                    <label class="pla" for="tipoFirma${a.fi_AutorizadosContratoId}">
                                        Tipo
                                        de firma
                                    </label>
                                </div>
                            </div>
                            <!-- Teléfono -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="tel" class="form-control"
                                            id="telefono${a.fi_AutorizadosContratoId}" placeholder="Teléfono"
                                            pattern="\d{10}" required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="telNumber" />
                                    <label class="pla"
                                            for="telefono${a.fi_AutorizadosContratoId}">Teléfono</label>
                                </div>
                            </div>
                        </div>

                        <!-- Segunda fila de campos -->
                        <div class="row">
                            <!-- Correo electrónico -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="email" class="form-control"
                                            id="correoElectronico${a.fi_AutorizadosContratoId}"
                                            placeholder="Correo electrónico"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="email" />
                                    <label class="pla"
                                            for="correoElectronico${a.fi_AutorizadosContratoId}">
                                        Correo
                                        electrónico
                                    </label>
                                </div>
                            </div>
                            <!-- Tipo de identificación -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control"
                                            id="tipoIdentificacion${a.fi_AutorizadosContratoId}"
                                            placeholder="Tipo de identificación"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText" />
                                    <label class="pla"
                                            for="tipoIdentificacion${a.fi_AutorizadosContratoId}">
                                        Tipo de
                                        identificación
                                    </label>
                                </div>
                            </div>
                            <!-- Numero de indetificación -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control"
                                            id="numeroIdentificacion${a.fi_AutorizadosContratoId}" placeholder="Número de identificación"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                                    <label class="pla"
                                            for="numeroIdentificacion${a.fi_AutorizadosContratoId}">Número de identificación</label>
                                </div>
                            </div>
                        </div>

                        <!-- Tercera fila de campos -->
                        <div class="row">
                            <!-- Vigencia -->
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control"
                                            id="vigencia${a.fi_AutorizadosContratoId}" placeholder="Vigencia"
                                            required value="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="gDate" />
                                    <label class="pla"
                                            for="vigencia${a.fi_AutorizadosContratoId}">Vigencia</label>
                                </div>
                            </div>
                        </div>

                        <!-- Checkboxes de tipo de autorización -->

                        <span class="text-wrapper-2">
                            Tipo de
                            autorización
                        </span>
                        <div class="row mt-4">

                            <div class="col-md-4">
                                <div class="form-check">
                                    <input class="form-check-input"
                                            type="checkbox"
                                            id="instruccionesOperacion${a.fi_AutorizadosContratoId}"
                                            value="1" disabled valueD="1-${a.fi_AutorizadosContratoId}"
                                            />
                                    <label class="form-check-label"
                                            for="instruccionesOperacion${a.fi_AutorizadosContratoId}">
                                        Girar
                                        instrucciones de operación en el
                                        contrato
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check">
                                    <input class="form-check-input"
                                            type="checkbox"
                                            id="recibirEstadosCuenta${a.fi_AutorizadosContratoId}"
                                            value="2" disabled valueD="2-${a.fi_AutorizadosContratoId}" />
                                    <label class="form-check-label"
                                            for="recibirEstadosCuenta${a.fi_AutorizadosContratoId}">
                                        Recibir
                                        estados de cuenta
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-check">
                                    <input class="form-check-input"
                                            type="checkbox"
                                            id="recordKeeping${a.fi_AutorizadosContratoId}"
                                            value="3" disabled valueD="3-${a.fi_AutorizadosContratoId}" />
                                    <label class="form-check-label"
                                            for="recordKeeping${a.fi_AutorizadosContratoId}">
                                        Contrato de
                                        Record Keeping
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div class="row justify-content-end mt-4">
                            <div class="col-auto">
                                <button type="button" class="disable-button saveAutCtoA${a.fi_AutorizadosContratoId}" onclick="saveAutCtoA(${a.fi_AutorizadosContratoId})" disabled>
                                    <div class="content-btn">
                                        <i class="mdi mdi-cloud-upload iconAutCtoASave${a.fi_AutorizadosContratoId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                        <div class="disable-text saveTextAutCtoA${a.fi_AutorizadosContratoId}">Guardar cambios</div>
                                    </div>
                                </button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="button editAutCtoA${a.fi_AutorizadosContratoId}" onclick="editAutCtoA(${a.fi_AutorizadosContratoId})">
                                    <div class="content-btn">
                                        <i class="mdi mdi-pencil iconAutCtoAEdit${a.fi_AutorizadosContratoId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                        <div class="label-text editTextAutCtoA${a.fi_AutorizadosContratoId}">Editar datos</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
                <!-- FIN: Contenido Tab -->


            </div>
        </div>

        `);
        $('#accordionRepresentantes').empty();
        $('#accordionRepresentantes').append(autorizados);
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


function loadAutCtoA(autorizadoId, button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        autCtoARequest(autorizadoId);
    }
}

async function autCtoARequest(autorizadoId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 3, pi_AutContrato: autorizadoId };

    try {
        // Obtener datos del cliente
        const responseCliente = await fetch(urlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        console.log(responseCliente);
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
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
        }

        let dataInfo = dataCliente.Table[0];
        console.log(dataInfo);
        $('#nombreCompleto' + autorizadoId).val(dataInfo.fc_NombreCompleto);
        $('#tipoFirma' + autorizadoId).val(dataInfo.fc_TipoFirma);
        $('#telefono' + autorizadoId).val(dataInfo.fc_Telefono);
        $('#correoElectronico' + autorizadoId).val(dataInfo.fc_CorreoElectronico);
        $('#tipoIdentificacion' + autorizadoId).val(dataInfo.fc_TipoIdentificacion);
        $('#numeroIdentificacion' + autorizadoId).val(dataInfo.fc_NumeroIdentificacion);
        $('#vigencia' + autorizadoId).val(dataInfo.fc_Vigencia);
        dataCliente.Table1.forEach(a => {
            if (a.fb_TipoAutorizacionSelec) {
                let checkbox = $(`input[type="checkbox"][valueD="${a.fi_TipoAutorizacionId}-${a.fi_AutorizadosContratoId}"]`);
                checkbox.prop("checked", true);
            }
            
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


function loadKyc(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        KycRequest();
    }
}

async function KycRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 4 };

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
            $('#kycForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        let dataInfo = dataCliente.Table[0];
        $('#propositoInversion').val(dataInfo.fc_PropositoInversion);
        $('#origenRecursos').val(dataInfo.fc_ProcedenciaRecursos);
        $('#explicacionOrigen').val(dataInfo.fc_OrigenRecursosExp);
        $('#especificaCual').val(dataInfo.fc_ProcedenciaRecursosEsp);
        $('#montoMaximo').val(setAmmountFormat(dataInfo.fn_MontoMaxMensual));
        $('#numeroRetiros').val(dataInfo.fi_RetirosMensuales);
        $('#montoRetiros').val(setAmmountFormat(dataInfo.fn_MontoOpRetiro));
        $('#numeroDepositos').val(dataInfo.fi_DepositosMensuales);
        $('#montoDepositos').val(setAmmountFormat(dataInfo.fn_MontoOpDeposito));
        $('#fi_ContratoKycId').val(dataInfo.fi_ContratoKycId);
        $("input[name=procedenciaRecursos][value=" + dataInfo.fi_OrigenRecursosId + "]").prop('checked', true);
        //$("input[name=tipoCliente][value=" + dataInfo.fi_TipoClienteId + "]").prop('checked', true);
        //$("input[name=tipoServicio][value=" + dataInfo.fi_TipoServicioId + "]").prop('checked', true);
        //$('#fi_InfoContratoSamId').val(dataInfo.fi_InfoContratoSamId);
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


function loadCtasOrg(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        ctasOrgRequest();
    }
}

async function ctasOrgRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 5 };

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

        $('#accordionGenerico').empty();

        let ctasorg = dataCliente.Table.map(cuentaOrG => `

             <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}" aria-expanded="false"
                            aria-controls="collapseCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}"
                            loadCuentaRecursos(${cuentaOrG.fi_CuentaOrgRecursosId}) onclick="loadCtaOrg(this,${cuentaOrG.fi_CuentaOrgRecursosId})">
                        <div class="d-flex align-items-center w-100">
                            <!-- Ícono -->
                            <div class="icon-wrapper me-3"></div>
                            <!-- Texto -->
                            <div class="text-content">
                                <span class="acoEsta">${cuentaOrG.fc_NombreBanco} ${cuentaOrG.fc_NumeroCta}</span>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="collapseCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="triangle">
                           <!--  <img src="~/dist/img/polygon.svg"> -->
                           <img src="${ urlImgPolygon }">
                        </div>
                        <form>
                            <!-- Primera fila -->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="beneficiarioCuenta${cuentaOrG.fi_CuentaOrgRecursosId}"
                                            placeholder="Beneficiario de la Cuenta"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"
                                            />
                                        <label class="pla"
                                            for="beneficiarioCuenta${cuentaOrG.fi_CuentaOrgRecursosId}">
                                            Beneficiario de
                                            la Cuenta
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="nombreBanco${cuentaOrG.fi_CuentaOrgRecursosId}"
                                            placeholder="Nombre del Banco"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText"
                                            />
                                        <label class="pla" for="nombreBanco${cuentaOrG.fi_CuentaOrgRecursosId}">
                                            Nombre
                                            del Banco
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="numeroCuenta${cuentaOrG.fi_CuentaOrgRecursosId}"
                                            placeholder="Número de cuenta"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="integer"
                                            />
                                        <label class="pla" for="numeroCuenta${cuentaOrG.fi_CuentaOrgRecursosId}">
                                            Número
                                            de cuenta
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Segunda fila -->
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="numeroClabe${cuentaOrG.fi_CuentaOrgRecursosId}"
                                            placeholder="Número de cuenta CLABE"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="integer"
                                            />
                                        <label class="pla" for="numeroClabe${cuentaOrG.fi_CuentaOrgRecursosId}">
                                            Número
                                            de cuenta CLABE
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="divisa${cuentaOrG.fi_CuentaOrgRecursosId}" placeholder="Divisa"
                                            readonly disabled />
                                        <label class="pla"
                                            for="divisa${cuentaOrG.fi_CuentaOrgRecursosId}">Divisa</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Botones -->
                            <div class="row justify-content-end mt-4">
                                <div class="col-auto">
                                    <button type="button" class="disable-button saveCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}" onclick="saveCuentaOrg(${cuentaOrG.fi_CuentaOrgRecursosId})" disabled>
                                        <div class="content-btn">
                                            <i class="mdi mdi-cloud-upload iconCuentaOrgSave${cuentaOrG.fi_CuentaOrgRecursosId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                            <div class="disable-text saveTextCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}">Guardar cambios</div>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="button editCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}" onclick="editCuentaOrg(${cuentaOrG.fi_CuentaOrgRecursosId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-pencil iconCuentaOrgEdit${cuentaOrG.fi_CuentaOrgRecursosId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                            <div class="label-text editTextCuentaOrg${cuentaOrG.fi_CuentaOrgRecursosId}">Editar datos</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        `);
        $('#accordionGenerico').append(ctasorg);
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

function loadCtaOrg(button,ctaOrgId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        ctaOrgRequest(ctaOrgId);
    }
}


async function ctaOrgRequest(ctaOrgId,recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 6, pi_CuentaOrgRecursos: ctaOrgId };

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
        $('#beneficiarioCuenta' + ctaOrgId).val(dataInfo.fc_BeneficiarioCta);
        $('#nombreBanco' + ctaOrgId).val(dataInfo.fc_NombreBanco);
        $('#numeroCuenta' + ctaOrgId).val(dataInfo.fc_NumeroCta);
        $('#numeroClabe' + ctaOrgId).val(dataInfo.fc_NumertoCtaClabe);
        $('#divisa' + ctaOrgId).val(dataInfo.fc_Divisa);

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



function loadCtasIns(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        ctasInsRequest();
    }
}

async function ctasInsRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 7 };

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
            $('#accordionGenericoDos').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        $('#accordionGenericoDos').empty();

        let ctasorg = dataCliente.Table.map(CuentaInS => `
             <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}" aria-expanded="false"
                            aria-controls="collapseCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}"
                            loadCuentaRecursos(${CuentaInS.fi_CuentaInsLiquidacionId}) onclick="loadCtaIns(this,${CuentaInS.fi_CuentaInsLiquidacionId})">
                        <div class="d-flex align-items-center w-100">
                            <!-- Ícono -->
                            <div class="icon-wrapper me-3"></div>
                            <!-- Texto -->
                            <div class="text-content">
                                <span class="acoEsta">${CuentaInS.fc_NombreBanco} ${CuentaInS.fc_NumeroCta}</span>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="collapseCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="triangle">
                           <!--  <img src="~/dist/img/polygon.svg"> -->
                           <img src="${ urlImgPolygon }">
                        </div>
                        <form>
                            <!-- Primera fila -->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="beneficiarioCuentaI${CuentaInS.fi_CuentaInsLiquidacionId}"
                                            placeholder="Beneficiario de la Cuenta"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name"
                                            />
                                        <label class="pla"
                                            for="beneficiarioCuentaI${CuentaInS.fi_CuentaInsLiquidacionId}">
                                            Beneficiario de
                                            la Cuenta
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="nombreBancoI${CuentaInS.fi_CuentaInsLiquidacionId}"
                                            placeholder="Nombre del Banco"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText"
                                            />
                                        <label class="pla" for="nombreBancoI${CuentaInS.fi_CuentaInsLiquidacionId}">
                                            Nombre
                                            del Banco
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="numeroCuentaI${CuentaInS.fi_CuentaInsLiquidacionId}"
                                            placeholder="Número de cuenta"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="integer"
                                            />
                                        <label class="pla" for="numeroCuentaI${CuentaInS.fi_CuentaInsLiquidacionId}">
                                            Número
                                            de cuenta
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Segunda fila -->
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="numeroClabeI${CuentaInS.fi_CuentaInsLiquidacionId}"
                                            placeholder="Número de cuenta CLABE"
                                            required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="integer"
                                            />
                                        <label class="pla" for="numeroClabeI${CuentaInS.fi_CuentaInsLiquidacionId}">
                                            Número
                                            de cuenta CLABE
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input type="text" class="form-control"
                                            id="divisaI${CuentaInS.fi_CuentaInsLiquidacionId}" placeholder="Divisa"
                                            readonly disabled />
                                        <label class="pla"
                                            for="divisa${CuentaInS.fi_CuentaInsLiquidacionId}">Divisa</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Botones -->
                            <div class="row justify-content-end mt-4">
                                <div class="col-auto">
                                    <button type="button" class="disable-button saveCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}" onclick="saveCuentaIns(${CuentaInS.fi_CuentaInsLiquidacionId})" disabled>
                                        <div class="content-btn">
                                            <i class="mdi mdi-cloud-upload iconCuentaInsSave${CuentaInS.fi_CuentaInsLiquidacionId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                            <div class="disable-text saveTextCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}">Guardar cambios</div>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="button editCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}" onclick="editCuentaIns(${CuentaInS.fi_CuentaInsLiquidacionId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-pencil iconCuentaInsEdit${CuentaInS.fi_CuentaInsLiquidacionId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                            <div class="label-text editTextCuentaIns${CuentaInS.fi_CuentaInsLiquidacionId}">Editar datos</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        `);
        $('#accordionGenericoDos').append(ctasorg);
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

function loadCtaIns(button, ctaOrgId) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        ctaInsRequest(ctaOrgId);
    }
}


async function ctaInsRequest(ctaOrgId, recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 8, pi_CuentaInsLiquidacion: ctaOrgId };

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
            $('#instForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        let dataInfo = dataCliente.Table[0];
        $('#beneficiarioCuentaI' + ctaOrgId).val(dataInfo.fc_BeneficiarioCta);
        $('#nombreBancoI' + ctaOrgId).val(dataInfo.fc_NombreBanco);
        $('#numeroCuentaI' + ctaOrgId).val(dataInfo.fc_NumeroCta);
        $('#numeroClabeI' + ctaOrgId).val(dataInfo.fc_NumertoCtaClabe);
        $('#divisaI' + ctaOrgId).val(dataInfo.fc_Divisa);

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


function loadInsLiq(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        insLiqRequest();
    }

}

async function insLiqRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 9 };

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
            $('#instForm').hide();
            showAlert('Error', 'No se encontró información de esta sección.', 'errorreg');
            return;
        }

        let dataInfo = dataCliente.Table[0];
        $('#fi_InsLiquidacionValId').val(dataInfo.fi_InsLiquidacionValId);
        $("input[name=indevalOption][value=" + (dataInfo.fb_MedioIndeval ? 'si' : 'no') + "]").prop('checked', true);
        if ($('input[type=radio][name=indevalOption]:checked').val() == 'no') {
            let inputs = $('#instForm').find(':input[data-nullable]');
            inputs.each(function () {
                $(this).attr("data-nullable", "true");
            });
            $(".hideIndeval").hide();
        } else {
            let inputs = $('#instForm').find(':input[data-nullable]');
            inputs.each(function () {
                $(this).attr("data-nullable", "false");
            });
        }
        $('#medioLiquidacion').val(dataInfo.fc_MedioLiquidacion);
        $('#numeroCuentaLiquidacion').val(dataInfo.fc_NumeroCuenta);
        $('#custodioIntermediario').val(dataInfo.fc_Custodio);

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

function loadParCom(button) {
    let classes = button.className;
    if (!classes.includes('collapsed')) {
        loadParComRequest();
    }

}

async function loadParComRequest(recharge) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/GetContratosInfo/";
    const requestData = { pi_contrato: sessionStorage.getItem("ctoNum"), pi_InfoNum: 10 };

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
            // $('#paramForm').hide();
            // showAlert('Error', 'No se encontró información de esta sección.', 'error');
            $('#asesoria').val('NA');
            $('#penalizaciones').val('NA');
            return;
        }
        let dataInfo = dataCliente.Table[0];
        $('#paramComisionesId').val(dataInfo.fi_ParamComisionesId);
        $("input[name=feeType][value=" + dataInfo.fi_TipoFeeId + "]").prop('checked', true);
        $('#feePercentage').val(dataInfo.fn_PorcentajeFee);
        $('#fechaActualizacion').val(dataInfo.fd_FechaActualizacion.substring(0, 10));
        $("input[name=tipoActivo][value=" + dataInfo.fi_TipoActivoId + "]").prop('checked', true);
        $('#feeDiferencial').val(setAmmountFormat(dataInfo.fn_PorcentajeFeeDif));
        $('#feeBanco').val(dataInfo.fn_PorcentajeFeeBanco);
        $("input[name=branchOrigen][value=" + dataInfo.fi_BanchOrigenId + "]").prop('checked', true);
        $('#successFeeToggle').prop('checked', dataInfo.fb_SuccessFee);
        $('#corretajeToggle').prop('checked', dataInfo.fb_CorretajeIncluidoPort);
        $('#knowledgeToggle').prop('checked', dataInfo.fb_KnowledgeTranAct);
        $('#fijasToggle').prop('checked', dataInfo.fb_FijasAct);
        $('#feeSerieToggle').prop('checked', dataInfo.fb_FeeSerieAct);


        dataInfo = dataCliente.Table4[0];
        $('#bancaColaboracion').val(dataInfo.fi_BancaColaboracionId);
        $('#porcentajeRepartoInicial').val(dataInfo.fn_RepartoInicial);
        $('#fechaInicialReparto').val(dataInfo.fd_FechaRepartoIni.substring(0, 10));
        $('#modificacionReparto').val(dataInfo.fn_ModificacionRepartoIni);
        $('#fechaModificacionReparto').val(dataInfo.fd_FechaRepartoMod.substring(0, 10));

        dataInfo = dataCliente.Table5[0];
        $("input[name=frecuencia][value=" + dataInfo.fi_TipoFrecuenciaId + "]").prop('checked', true);
        $('#activoBase').val(setAmmountFormat(dataInfo.fn_ActivoBase));
        $('#limiteValor').val(setAmmountFormat(dataInfo.fn_LimiteValAbsoluto));
        $('#rendimientoBenchmark').val(dataInfo.fn_RendimientoBench);
        $('#rendimientoPortafolio').val(dataInfo.fn_RendimientoPortafolio);
        $('#victoriaBenchmark').val(dataInfo.fn_VictoriaBench);
        $('#cobroPesos').val(setAmmountFormat(dataInfo.fn_CobradoEfecPesos));

        dataInfo = dataCliente.Table3[0];
        $('#feeRk').val(setAmmountFormat(dataInfo.fn_FeeRk));

        dataInfo = dataCliente.Table7[0];
        console.log(dataCliente.Table7[0]);
        console.log(setAmmountFormat(dataInfo.fn_ImpCorretajeMen));
        $('#importeCorretaje').val(setAmmountFormat(dataInfo.fn_ImpCorretajeMen));
        $('#costoCapitales').val(setAmmountFormat(dataInfo.fn_CostoCapitales));
        
        dataInfo = dataCliente.Table9[0];
        $('#maximoKt').val(setAmmountFormat(dataInfo.fn_MontoMaxKT));
        $('#ejercidoReal').val(setAmmountFormat(dataInfo.fn_EjercidoReal));

        dataInfo = dataCliente.Table10[0];
        $('#asesoria').val(dataInfo.fc_Asesoria);
        $('#penalizaciones').val(dataInfo.fc_Penalizacion);

        dataInfo = dataCliente.Table8[0];
        $('#fijasInput').val(setAmmountFormat(dataInfo.fn_FijasMto));

        dataInfo = dataCliente.Table6[0];
        $('#feeSerieInput').val(setAmmountFormat(dataInfo.fn_IngresosActivosMan));

        var hfeeTable = dataCliente.Table1.map(h => `<tr>
                                                              <td>${h.fd_Fecha.substring(0,10)}</td >
                                                              <td>${h.fn_Fee}%</td>
                                                           </tr>`);
        $('#hFee').empty();
        $('#hFee').append(hfeeTable);

        hfeeTable = dataCliente.Table2.map(h => `<tr>
                                                              <td>${h.fd_Fecha.substring(0, 10)}</td >
                                                              <td>${"$"+h.fn_Fee}</td>
                                                           </tr>`);
        $('#hFeeDif').empty();
        $('#hFeeDif').append(hfeeTable);
         


        if (!$('#successFeeToggle').is(":checked")) {
            $(".hideSuccessFee").hide();
        }

        if (!$('#corretajeToggle').is(":checked")) {
            $(".hideCorretaje").hide();
        }

        if ($('input[type=radio][name=feeType]:checked').val() == 1) {
            $(".hideFeeType").hide();
        } else {
            $(".hideFeeType").show();
        }

        if (!$('#knowledgeToggle').is(":checked")) {
            $(".hideKT").hide();
        }

        if (!$('#fijasToggle').is(":checked")) {
            $(".hideFijas").hide();
        }

        if ($('#feeSerieToggle').is(":checked")) {
            $(".hideFeeSerie").hide();
        }

        if ($('#bancaColaboracion').val() == 7) {
            $(".hideBancaColaboracion").hide();
        }




        if ($('#successFeeToggle').is(":checked")) {
            $(".hideSuccessFee").show();
        }

        if ($('#corretajeToggle').is(":checked")) {
            $(".hideCorretaje").show();
        }

        if (!$('input[type=radio][name=feeType]:checked').val() == 1) {
            $(".hideFeeType").show();
        }

        if ($('#knowledgeToggle').is(":checked")) {
            $(".hideKT").show();
        }

        if ($('#fijasToggle').is(":checked")) {
            $(".hideFijas").show();
        }

        if ($('#feeSerieToggle').is(":checked")) {
            $(".hideFeeSerie").show();
        }

        if (!$('#bancaColaboracion').val() == 7) {
            $(".hideBancaColaboracion").show();
        }

        

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

async function downloadFile(file) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlContratoInfo + "/FileExists/";
    const requestData = { filePath: file };
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
        if (dataCliente) {
            window.open(urlContratoInfo + '/Download/?filePath=' + file, '_blank');
            Swal.close();
        }
        else {
            Swal.close();
            showAlert('Error', 'No se encontró el archivo.', 'errorArc');
        }
    }
    catch(error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar el archivo.', 'error');
        console.error('Error en la solicitud:', error);
    }
}