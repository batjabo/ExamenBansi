function validatePagination() {
    if (pagina.fi_TotalPaginas === pagina.fi_Pagina) {
        $('#cargarGrupos').hide();
    } else if (pagina.fi_TotalPaginas > pagina.fi_Pagina) {
        $('#cargarGrupos').show();
    }
}

validatePagination();

$('#cargarGrupos').click(async function () {
    if (pagina.fi_TotalPaginas > pagina.fi_Pagina) {
        await llamarGrupos();
    }
});

async function llamarGrupos() {
    try {
        showLoadingAlert("Espere... cargando información.");
        const response = await fetch(urlGposComerCte + '/GruposComercialesCtes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                pi_TamanoPagina: 5,
                pi_Pagina: pagina.fi_Pagina + 1,
                pc_Busqueda: null
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        const data = await response.json();
        console.log(data);
        if (Object.hasOwn(data, 'SessionActiva')) {
            window.location.href = data.URL;
        }
        // Actualizar paginación
        pagina.fi_Pagina = data[0].GruposComercialesPag.fi_Pagina;
        pagina.fi_TotalPaginas = data[0].GruposComercialesPag.fi_TotalPaginas;
        console.log(pagina);
        // Llamadas a las funciones existentes
        validatePagination();
        addGruposComerciales(data);
        Swal.close();
        

    } catch (error) {
        console.error(error);
        // Manejo de errores
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
}

function getDatosCte(element) {
    let id = element.id.replace('cliente', '')
    let classes = element.className;
    if (!classes.includes('collapsed')) {
        getCteData(id)
    }   
}

$("#searchInput").on("input", async function () {
    showLoadingAlert("Espere... cargando información.");
    let texto = $("#searchInput").val();
    const url = urlGposComerCte + '/GruposComercialesCtes';

    const requestData = {
        pi_TamanoPagina: 5,
        pi_Pagina: 1,
        pc_Busqueda: texto
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (Object.hasOwn(data, 'SessionActiva')) {
            window.location.href = data.URL;
        }
        if (!response.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
        $('#accordionGroup').empty();
        if (data.length > 0) {
            
            pagina.fi_Pagina = data[0].GruposComercialesPag.fi_Pagina;
            pagina.fi_TotalPaginas = data[0].GruposComercialesPag.fi_TotalPaginas;
            validatePagination();

            data.forEach(d => {
                if (!d.fc_GrupoComercial.toUpperCase().includes(texto.toUpperCase())) {
                    d.clienteGrupoComers = d.clienteGrupoComers.filter(c => c.fc_NombreCliente.toUpperCase().includes(texto.toUpperCase()));
                }
            });
            addGruposComerciales(data);
            Swal.close();
        }
        else {
            Swal.close();
            pagina.fi_Pagina = 0;
            pagina.fi_TotalPaginas = 0;
            validatePagination();
            /*showAlert('', 'No hay registros para este criterio de búsqueda', 'info');*/
        }

        
    } catch (error) {
        console.log(error)
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
});

async function getCteData(id) {
    showLoadingAlert("Espere... cargando información.");
    const urlCliente = urlGposComerCte + "/ClientesGet/";
    const urlDomicilio = urlGposComerCte + "/DomicilioCteGet/";

    const requestData = { pi_ClienteId: id };
    $('#profile-tab-pane' + id).hide();

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
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
        sessionStorage.setItem("clientePath", `${id}-${dataCliente.fc_NombreCliente}`);
        // Rellenar los campos con los datos del cliente
        $('#roleActual' + id).val(dataCliente.fc_RoleActual);
        $('#tipoPersona' + id).val(dataCliente.fi_TipoPersonalId).change();
        $('#nacionalidad' + id).val(dataCliente.fc_Nacionalidad);
        $('#rfc' + id).val(dataCliente.fc_RFC);
        $('#nombreContacto' + id).val(dataCliente.fc_NombreContacto);
        $('#telefonoPrincipal' + id).val(dataCliente.fc_NumeroTelP);
        $('#correoPrincipal' + id).val(dataCliente.fc_CorreoElectronico);
        $('#paginaInternet' + id).val(dataCliente.fc_PaginaWeb);
        $('#clasificacionNegocio' + id).val(dataCliente.fi_ClasifNegocioId).change();
        $('#aporFideicomitente' + id).val(dataCliente.fc_AportacionesFideicomitentes);
        $('#patFideicomitido' + id).val(dataCliente.fn_PatrimonioFideicomitido);
        $('#finFideicomiso' + id).val(dataCliente.fc_FinalidadFideicomiso);
        $('#noFideicomiso' + id).val(dataCliente.fc_NumeroFideicomiso);
        // Obtener datos de domicilio
        const responseDomicilio = await fetch(urlDomicilio, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const dataDomicilio = await responseDomicilio.json();
        if (Object.hasOwn(dataDomicilio, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }
        if (!responseDomicilio.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        // Rellenar los campos con los datos de domicilio
        const domicilioPrincipal = dataDomicilio.DomicilioClientePrincipal;
        const domicilioFiscal = dataDomicilio.DomicilioClienteFiscal;

        // Domicilio Principal
        $('#calle' + id).val(domicilioPrincipal.fc_Calle);
        $('#codigoPostal' + id).val(domicilioPrincipal.fc_CodigoPostal);
        $('#colonia' + id).val(domicilioPrincipal.fc_Colonia);
        $('#delegacion' + id).val(domicilioPrincipal.fc_Delegacion);
        $('#entidadFederativa' + id).val(domicilioPrincipal.fc_Estado);
        $('#numeroExterior' + id).val(domicilioPrincipal.fc_NumExterior);
        $('#numeroInterior' + id).val(domicilioPrincipal.fc_NumInterior);
        $('#pais' + id).val(domicilioPrincipal.fc_Pais);
        $('#ciudad' + id).val(domicilioPrincipal.fc_Poblacion);

        // Domicilio Fiscal
        $('#calleFiscal' + id).val(domicilioFiscal.fc_Calle);
        $('#codigoPostalFiscal' + id).val(domicilioFiscal.fc_CodigoPostal);
        $('#coloniaFiscal' + id).val(domicilioFiscal.fc_Colonia);
        $('#delegacionFiscal' + id).val(domicilioFiscal.fc_Delegacion);
        $('#entidadFederativaFiscal' + id).val(domicilioFiscal.fc_Estado);
        $('#numeroExteriorFiscal' + id).val(domicilioFiscal.fc_NumExterior);
        $('#numeroInteriorFiscal' + id).val(domicilioFiscal.fc_NumInterior);
        $('#paisFiscal' + id).val(domicilioFiscal.fc_Pais);
        $('#ciudadFiscal' + id).val(domicilioFiscal.fc_Poblacion);
        Swal.close();

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        console.error('Error en la solicitud:', error);
    }
}

async function getCtosData(id, nombreCliente) {
    console.log(nombreCliente);
    showLoadingAlert("Espere... cargando información.");
    const urlContratos = urlGposComerCte + "/ContratosCteGet/";

    const requestData = { pi_ClienteId: id };
    $('#profile-tab-pane' + id).show();

    try {
        const responseContratos = await fetch(urlContratos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        
        const dataContratos = await responseContratos.json();
        console.log(dataContratos);
        dataContratos[0].fc_NombreCliente = nombreCliente;
        
        if (Object.hasOwn(dataContratos, 'SessionActiva')) {
            window.location.href = dataContratos.URL;
        }
        if (dataContratos.length < 1) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'errorreg');
            return;
        }
        if (!responseContratos.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        // Llamada a la función para manejar los contratos recibidos
        addCtoDivs(dataContratos);
        Swal.close();

    } catch (error) {
        console.error('Error en la solicitud de contratos:', error);
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
    


}



function addCtoDivs(data) {
    console.log(data);
    $('#accordionClient' + data[0].fi_ClienteId).empty();
    let nombreCliente = data[0].fc_NombreCliente;
    data.forEach(data => {
        
        $('#accordionClient' + data.fi_ClienteId).append(`
            
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContrato${data.fi_ContratosId}" aria-expanded="false" aria-controls="collapseContrato${data.fi_ContratosId}">

                            <div class="d-flex align-items-center w-100">
                                <!-- Ícono rojo -->
                                <div class="icon-wrapper me-3">

                                </div>

                                <!-- Texto -->
                                <div class="text-content ">
                                    <span class="text-wrapper-2 acoEsta" id="numeroCto${data.fi_ContratosId}">${data.fc_NumeroContrato}</span>
                                    <span class="span" id="nombreCto${data.fi_ContratosId}">- ${data.fc_NombreIdentificador}</span>
                                </div>

                                <!-- Estado -->
                                <div class="status-wrapper-${data.fb_Estatus ? 'activo' : 'inactivo'} ms-3">
                                    <span class="status-indicator">
                                        <img src="dist/icon/${data.fb_Estatus ? 'activo' : 'inactivo'}.svg" alt="Ícono activo" class="icon-status">
                                        <span class="status-text-${data.fb_Estatus ? 'activo' : 'inactivo'}">${data.fb_Estatus ? 'Activo' : 'Inactivo'}</span>
                                    </span>
                                </div>

                            </div>
                        </button>
                    </h2>
                    <div id="collapseContrato${data.fi_ContratosId}" class="accordion-collapse collapse" style="">
                        <div class="accordion-body">
                            <div class="triangle">
                              <!--  <img src="~/dist/img/polygon.svg"> -->

                            </div>


                            <form class="container-Tab-form">
                                <!-- Botones de acción -->
                                <div class="row justify-content-end mb-3">
                                    <div class="col-auto">
                                        <!-- Botón deshabilitado para "Guardar cambios" -->
                                        <button type="button" onclick="loadInfoCto(${data.fi_ContratosId}, '${data.fc_NumeroContrato + '-' + data.fc_NombreIdentificador}')" class="button">
                                            <div class="content-btn">
                                                <img class="icon icon--blue" src="dist/icon/vista.svg" alt="Vista icono">
                                                <div class="label-text-blue">
                                                    Ver información adicional del contrato
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="row justify-content-end mb-3">
                                   <div class="col-auto">
                                        <!-- Botón deshabilitado para "Guardar cambios" -->
                                        <button type="button" class="disable-button saveCto${data.fi_ContratosId}" disabled onclick="saveCto(${data.fi_ContratosId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-cloud-upload saveIconCto${data.fi_ContratosId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                <div class="disable-text saveTextCto${data.fi_ContratosId}">Guardar cambios</div>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col-auto">
                                        <!-- Botón para "Editar Datos" -->
                                        <button type="button" class="button editCto${data.fi_ContratosId}" onclick="editCto(${data.fi_ContratosId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-pencil editIconCto${data.fi_ContratosId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                <div class="label-text editTextCto${data.fi_ContratosId}">Editar datos</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <hr>

                                <!-- Sección: Datos del contrato -->
                                <h5 class="text-wrapper-2">Datos del contrato</h5>

                                <div class="row">
                                    <!-- Número de contrato -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="numeroContrato${data.fi_ContratosId}" placeholder="Número de contrato" required="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI">
                                            <label class="pla" for="numeroContrato${data.fi_ContratosId}">Número de contrato</label>
                                        </div>
                                    </div>

                                    <!-- Nombre identificador de contrato -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="nombreContrato${data.fi_ContratosId}" placeholder="Nombre identificador de contrato" required="" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street">
                                            <label class="pla" for="nombreContrato${data.fi_ContratosId}">
                                                Nombre identificador de
                                                contrato
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Uso asociado a los recursos del contrato -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <select class="form-control" id="usoRecursos${data.fi_ContratosId}" required="" disabled>
                                                <option value="" disabled="" selected="">Seleccionar uso</option>
                                                ${catUsoAsRecursos.map(i => `<option value="${i.Id}">${i.Nombre}</option>`).join('')}
                                            </select>
                                            <label class="pla" for="usoRecursos${data.fi_ContratosId}">
                                                Uso asociado a los recursos del
                                                contrato
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <!-- Estatus -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="estatus${data.fi_ContratosId}" placeholder="Estatus" readonly="" value="Activo" disabled>
                                            <label class="pla" for="estatus${data.fi_ContratosId}">Estatus</label>
                                        </div>
                                    </div>

                                    <!-- Fecha de contrato -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="fechaContrato${data.fi_ContratosId}" placeholder="Fecha de contrato" required="" disabled>
                                            <label class="pla" for="fechaContrato${data.fi_ContratosId}">Fecha de contrato</label>
                                        </div>
                                    </div>

                                    <!-- Fecha de activación -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="fechaActivacion${data.fi_ContratosId}" placeholder="Fecha de activación" required="" disabled>
                                            <label class="pla" for="fechaActivacion${data.fi_ContratosId}">Fecha de activación</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <!-- Fecha de cancelación -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="fechaCancelacion${data.fi_ContratosId}" placeholder="Fecha de cancelación" disabled>
                                            <label class="pla" for="fechaCancelacion${data.fi_ContratosId}">Fecha de cancelación</label>
                                        </div>
                                    </div>

                                    <!-- Fecha de inactividad -->
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="fechaInactividad${data.fi_ContratosId}" placeholder="Fecha de inactividad" disabled>
                                            <label class="pla" for="fechaInactividad${data.fi_ContratosId}">Fecha de inactividad</label>
                                        </div>
                                    </div>
                                </div>

                            </form>


                            <!-- INICIO: Acordeo hijo  -->

                            <hr>
                            <h4 class="text-wrapper-2">
                                Identificación de representantes legales
                                intervinientes
                            </h4>
                            <div class="accordion simple" id="accordionRepresentantes${data.fi_ContratosId}">

                            </div>

                            <!-- FIN: Acordeo hijo  -->
                        </div>
                        <!-- FIN: Contenido Tab -->


                    </div>
                </div>

        `)
        addUpperCaseTr();
        $('#numeroContrato' + data.fi_ContratosId).val(data.fc_NumeroContrato);
        $('#nombreContrato' + data.fi_ContratosId).val(data.fc_NombreIdentificador);
        $('#usoRecursos' + data.fi_ContratosId).val(data.fi_UsoAsociadoRecursosId).change();
        $('#estatus' + data.fi_ContratosId).val(data.fb_Estatus ? 'Activo' : 'Inactivo');
        $('#fechaContrato' + data.fi_ContratosId).val(data.fd_FechaContrato);
        $('#fechaActivacion' + data.fi_ContratosId).val(data.fd_FechaActivacion);
        $('#fechaCancelacion' + data.fi_ContratosId).val(data.fd_FechaCancelacion);
        $('#fechaInactividad' + data.fi_ContratosId).val(data.fd_FechaInactividad);
        data.fc_NombreCliente = nombreCliente;
        addRepresentanteIntDivs(data);
    })
}


function addRepresentanteIntDivs(data) {
    let numeroContrato = data.fc_NumeroContrato,
    nombreContrato = data.fc_NombreIdentificador,
    nombreCliente = data.fc_NombreCliente
    console.log(data);
    $('#accordionRepresentantes' + data.fi_ContratosId).empty();
    data.RepresentantesIntCtos.forEach(data => {     
        $('#accordionRepresentantes' + data.fi_ContratosId).append(`
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#representanteInt${data.fi_RepresentantesLegalesIntId}" aria-expanded="false" aria-controls="representanteInt${data.fi_RepresentantesLegalesIntId}">
                        <div class="d-flex align-items-center w-100">
                            <!-- Ícono -->
                            <div class="icon-wrapper me-3">

                            </div>
                            <!-- Texto -->
                            <div class="text-content">
                                <span class="acoEsta" id="nombreRep${data.fi_RepresentantesLegalesIntId}">${data.fc_NombreRepresentante}</span>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="representanteInt${data.fi_RepresentantesLegalesIntId}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="triangle">
                            <!--  <img src="~/dist/img/polygon.svg"> -->

                        </div>


                        <form class="container-Tab-form">

                            <!-- Primera fila -->
                            <div class="row">
                                <!-- Nombre del representante -->
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="nombreRepresentante${data.fi_RepresentantesLegalesIntId}" placeholder="Nombre del representante" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name">
                                        <label class="pla" for="nombreRepresentante${data.fi_RepresentantesLegalesIntId}">
                                            Nombre del
                                            representante
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Segunda fila -->
                            <div class="row mt-3">
                                <!-- Teléfono Oficina -->
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="tel" class="form-control" id="telefonoOficina${data.fi_RepresentantesLegalesIntId}" placeholder="Teléfono Oficina" pattern="\d{10}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="telNumber">
                                        <label class="pla" for="telefonoOficina${data.fi_RepresentantesLegalesIntId}">
                                            Teléfono
                                            Oficina
                                        </label>
                                    </div>
                                </div>

                                <!-- Correo electrónico -->
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="correoElectronico${data.fi_RepresentantesLegalesIntId}" placeholder="Correo electrónico" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="email">
                                        <label class="pla" for="correoElectronico${data.fi_RepresentantesLegalesIntId}">
                                            Correo
                                            electrónico
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Botones de acción -->
                            <div class="row justify-content-end mb-3">
                                <div class="col-auto">
                                    <!-- Botón deshabilitado para "Guardar cambios" -->
                                    <button type="button" onclick="loadRepresentanteInt(${data.fi_RepresentantesLegalesIntId},'${numeroContrato}','${nombreContrato}','${nombreCliente}')" target="_blank" class="button">
                                        <div class="content-btn">
                                            <img class="icon icon--blue" src="dist/icon/vista.svg" alt="Vista icono">
                                            <div class="label-text-blue">
                                                Ver información adicional del
                                                representante legal
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <!-- Botón deshabilitado para "Guardar cambios" -->
                                    <button type="button" class="disable-button saveRep${data.fi_RepresentantesLegalesIntId}" disabled="" id="saveRep${data.fi_RepresentantesLegalesIntId}" onclick="saveRep(${data.fi_RepresentantesLegalesIntId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-cloud-upload saveIconRep${data.fi_RepresentantesLegalesIntId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                            <div class="disable-text saveTextRep${data.fi_RepresentantesLegalesIntId}" id="saveTextRep${data.fi_RepresentantesLegalesIntId}">Guardar cambios</div>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <!-- Botón para "Editar Datos" -->
                                    <button type="button" class="button editRep${data.fi_RepresentantesLegalesIntId}" id="editRep${data.fi_RepresentantesLegalesIntId}" onclick="editRep(${data.fi_RepresentantesLegalesIntId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-pencil editIconRep${data.fi_RepresentantesLegalesIntId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                            <div class="label-text editTextRep${data.fi_RepresentantesLegalesIntId}" id="editTextRep${data.fi_RepresentantesLegalesIntId}">Editar datos</div>
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
        addUpperCaseTr();
        $('#nombreRepresentante' + data.fi_RepresentantesLegalesIntId).val(data.fc_NombreRepresentante)
        $('#telefonoOficina' + data.fi_RepresentantesLegalesIntId).val(data.fc_TelefonoOficina)
        $('#correoElectronico' + data.fi_RepresentantesLegalesIntId).val(data.fc_CorreoElectronico)
    })

    

}





function addGruposComerciales(data) {
    let texto = $("#searchInput").val();
    let textoEscapado = texto.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Crear la expresión regular insensible a mayúsculas/minúsculas
    let regex = new RegExp(`(${textoEscapado})`, 'gi');

    
    data.forEach(grupoComercial => {
        var clientesText = grupoComercial.clienteGrupoComers.map(clienteGrupo => `
                                    <div class="accordion-item ">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" id="cliente${clienteGrupo.fi_ClienteId}"
                                                    data-bs-target="#cliente${clienteGrupo.fi_ClienteId}" aria-expanded="true" aria-controls="cliente${clienteGrupo.fi_ClienteId}"
                                                    onclick="getDatosCte(this)">
                                                <div class="label">
                                                    <p class="text-wrapper">${texto !== '' ? clienteGrupo.fc_NombreCliente.replace(regex, '<mark>$1</mark>') : clienteGrupo.fc_NombreCliente} ${clienteGrupo.fi_TipoPersonalId}</p>
                                                </div>
                                            </button>
                                        </h2>

                                        <div id="cliente${clienteGrupo.fi_ClienteId}" class="accordion-collapse collapse " data-bs-parent="#accordionClient">
                                            <div class="accordion-body">
                                               <!--  <img src="~/dist/img/polygon.svg"> -->


                                                <!-- INICIO: Menu tab -->
                                                <ul class="nav nav-tabs nav-justified nav-underline " id="myTab${clienteGrupo.fi_ClienteId}" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active " id="home-tab${clienteGrupo.fi_ClienteId}" data-bs-toggle="tab"
                                                                data-bs-target="#home-tab-pane${clienteGrupo.fi_ClienteId}" type="button" role="tab"
                                                                aria-controls="home-tab-pane${clienteGrupo.fi_ClienteId}" aria-selected="true"
                                                                onclick="getCteData(${clienteGrupo.fi_ClienteId})">
                                                            <div>

                                                                Datos del cliente
                                                            </div>
                                                        </button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="profile-tab${clienteGrupo.fi_ClienteId}" data-bs-toggle="tab"
                                                                data-bs-target="#profile-tab-pane${clienteGrupo.fi_ClienteId}" type="button" role="tab"
                                                                aria-controls="profile-tab-pane${clienteGrupo.fi_ClienteId}" aria-selected="false"
                                                                onclick="getCtosData(${clienteGrupo.fi_ClienteId}, '${clienteGrupo.fc_NombreCliente}')">
                                                            Contratos del
                                                            cliente
                                                        </button>
                                                    </li>
                                                </ul>
                                                <!-- FIN: Menu tab -->
                                                <!-- INICIO: Contenido Tab -->
                                                <div class="tab-content" id="myTabContent${clienteGrupo.fi_ClienteId}">

                                                    <!-- INICIO: Tab home -->
                                                    <div class="tab-pane fade  show active" id="home-tab-pane${clienteGrupo.fi_ClienteId}" role="tabpanel"
                                                            aria-labelledby="home-tab${clienteGrupo.fi_ClienteId}" tabindex="0">
                                                        <form class="container-Tab-form" >
                                                            <!-- Botones de acción -->
                                                            <div class="row justify-content-end mb-3">
                                                                <div class="col-auto">
                                                                    <!-- Botón deshabilitado para "Guardar cambios" -->
                                                                    <button type="button" class="disable-button saveCte${clienteGrupo.fi_ClienteId}" disabled onclick="saveCte(${clienteGrupo.fi_ClienteId})">
                                                                        <div class="content-btn">
                                                                            <i class="mdi mdi-cloud-upload saveIconCte${clienteGrupo.fi_ClienteId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                                            <div class="disable-text saveTextCte${clienteGrupo.fi_ClienteId}" >Guardar cambios</div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                                <div class="col-auto">
                                                                    <!-- Botón para "Editar Datos" -->
                                                                    <button type="button" class="button editCte${clienteGrupo.fi_ClienteId}"  onclick="editCte(${clienteGrupo.fi_ClienteId})">
                                                                        <div class="content-btn">
                                                                            <i class="mdi mdi-pencil editIconCte${clienteGrupo.fi_ClienteId}" style="color: red; font-size: 18px; font-weight: bold;" ></i>
                                                                            <div class="label-text editTextCte${clienteGrupo.fi_ClienteId}">Editar datos</div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            ${(formulariosPorTipo[clienteGrupo.fi_TipoPersonalId] || (() => `<p>Tipo de persona no soportado</p>`))(clienteGrupo)}
                                                            
                                                            <hr />
                                                        </form>
                                                        <!-- Enlace adicional -->
                                                        <div class="row mt-3">
                                                            <div class="col-12 text-end">
                                                                <button onclick="loadInfoCliente(${clienteGrupo.fi_ClienteId})" class="button">
                                                                    <div class="content-btn">
                                                                        <img class="icon icon--blue" src="dist/icon/vista.svg" alt="icono ojo" />
                                                                        <div class="label-text-blue">Ver información adicional del cliente</div>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- FIN: Tab home -->
                                                <!-- INICIO: Tab profile -->
                                                <div class="tab-pane fade " id="profile-tab-pane${clienteGrupo.fi_ClienteId}" role="tabpanel"
                                                        aria-labelledby="profile-tab${clienteGrupo.fi_ClienteId}" tabindex="0">
                                                    <!-- INICIO: Acordeon hijo -->
                                                    <div class="accordion simple " id="accordionClient${clienteGrupo.fi_ClienteId}">
                                                    </div>
                                                    <!-- FIN: Acordeon hijo -->




                                                </div>
                                                <!-- FIN: Tab profile -->
                                            </div>
                                            <!-- FIN: Contenido Tab -->
                                        </div>
                                    </div>
                                
                                    `).join('');
            $('#accordionGroup').append(`
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse"
                            data-bs-target="#grupo${grupoComercial.fi_GrupoComercialId}" aria-expanded="false" aria-controls="#grupo${grupoComercial.fi_GrupoComercialId}">
                        <div class="text-wrapper-6">${texto !== '' ? grupoComercial.fc_GrupoComercial.replace(regex, '<mark>$1</mark>')  : grupoComercial.fc_GrupoComercial}</div>
                    </button>
                </h2>
                <div id="grupo${grupoComercial.fi_GrupoComercialId}" class="accordion-collapse collapse" data-bs-parent="#accordionGroup">
                    <div class="accordion-body">
                        <div hidden>
                            <h4 class="text-wrapper-2">Descripción</h4>
                            <p class="span">
                                ${grupoComercial.fc_Descripcion}
                            </p>
                        </div>

                        <div id="container-client">
                            <h4 class="text-wrapper-2">Clientes</h4>
                            <!-- INICIO: Acordeon hijo -->
                            <div class="accordion simple " id="accordionClient">
                            

                                ${clientesText}
                            </div>
                            <!-- FIN: Acordeon hijo -->

                        </div>
                    </div>
                </div>
            </div>
    
        `);
        addUpperCaseTr();
        })
}

function editCte(clienteId) {
    let editButton = $('.editCte' + clienteId);
    let saveButton = $('.saveCte' + clienteId);
    let editTextButton = $('.editTextCte' + clienteId);
    let saveTextButton = $('.saveTextCte' + clienteId);
    let saveIcon = $('.saveIconCte' + clienteId);
    let editIcon = $('.editIconCte' + clienteId);
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

async function saveCte(clienteId) {
    let button = $('.saveCte' + clienteId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");

        const urlClienteEdit = urlGposComerCte + "/ClientesEdit/";
        const urlDomicilioEdit = urlGposComerCte + "/DomicilioClienteEdit/";

        const datosCliente = {
            fi_ClienteId: clienteId,
            fc_RoleActual: $('#roleActual' + clienteId).val(),
            fi_TipoPersonalId: $('#tipoPersona' + clienteId).val(),
            fc_Nacionalidad: $('#nacionalidad' + clienteId).val(),
            fc_RFC: $('#rfc' + clienteId).val(),
            fc_NombreContacto: $('#nombreContacto' + clienteId).val(),
            fc_NumeroTelP: $('#telefonoPrincipal' + clienteId).val(),
            fc_CorreoElectronico: $('#correoPrincipal' + clienteId).val(),
            fc_PaginaWeb: $('#paginaInternet' + clienteId).val(),
            fi_ClasifNegocioId: $('#clasificacionNegocio' + clienteId).val(),
            fc_NumeroFideicomiso: $('#noFideicomiso' + clienteId).val(),
            fc_FinalidadFideicomiso: $('#finFideicomiso' + clienteId).val(),
            fn_PatrimonioFideicomitido: $('#patFideicomitido' + clienteId).val(),
            fc_AportacionesFideicomitentes: $('#aporFideicomitente' + clienteId).val(),
        };

        const domicilioFiscal = {
            fi_DomicilioClienteId: clienteId,
            fc_TipoDomicilio: 'F',
            fc_Calle: $('#calleFiscal' + clienteId).val(),
            fc_NumExterior: $('#numeroExteriorFiscal' + clienteId).val(),
            fc_NumInterior: $('#numeroInteriorFiscal' + clienteId).val(),
            fc_Colonia: $('#coloniaFiscal' + clienteId).val(),
            fc_Delegacion: $('#delegacionFiscal' + clienteId).val(),
            fc_Municipio: $('#delegacionFiscal' + clienteId).val(),
            fc_Poblacion: $('#ciudadFiscal' + clienteId).val(),
            fc_Estado: $('#entidadFederativaFiscal' + clienteId).val(),
            fc_Pais: 'México',
            fc_CodigoPostal: $('#codigoPostalFiscal' + clienteId).val(),
        };

        const domicilioPrincipal = {
            fi_DomicilioClienteId: clienteId,
            fc_TipoDomicilio: 'P',
            fc_Calle: $('#calle' + clienteId).val(),
            fc_NumExterior: $('#numeroExterior' + clienteId).val(),
            fc_NumInterior: $('#numeroInterior' + clienteId).val(),
            fc_Colonia: $('#colonia' + clienteId).val(),
            fc_Delegacion: $('#delegacion' + clienteId).val(),
            fc_Municipio: $('#delegacion' + clienteId).val(),
            fc_Poblacion: $('#ciudad' + clienteId).val(),
            fc_Estado: $('#entidadFederativa' + clienteId).val(),
            fc_Pais: 'México',
            fc_CodigoPostal: $('#codigoPostal' + clienteId).val(),
        };

        try {
            // Enviar los datos del cliente
            const responseCliente = await fetch(urlClienteEdit, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(datosCliente)
            });

            const dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }

            // Enviar domicilio fiscal
            const responseDomicilioFiscal = await fetch(urlDomicilioEdit, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(domicilioFiscal)
            });

            const dataDomicilioFiscal = await responseDomicilioFiscal.json();
            if (Object.hasOwn(dataDomicilioFiscal, 'SessionActiva')) {
                window.location.href = dataDomicilioFiscal.URL;
            }
            if (!responseDomicilioFiscal.ok || dataDomicilioFiscal < 1) {
                Swal.close();
                showAlert('Error', 'Error al editar el domicilio fiscal.', 'error');
            }

            // Enviar domicilio principal
            const responseDomicilioPrincipal = await fetch(urlDomicilioEdit, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(domicilioPrincipal)
            });

            const dataDomicilioPrincipal = await responseDomicilioPrincipal.json();
            if (Object.hasOwn(dataDomicilioPrincipal, 'SessionActiva')) {
                window.location.href = dataDomicilioPrincipal.URL;
            }
            if (!responseDomicilioPrincipal.ok || dataDomicilioPrincipal < 1) {
                Swal.close();
                showAlert('Error', 'Error al editar el domicilio principal.', 'error');
            }
            console.log([dataCliente, dataDomicilioFiscal, dataDomicilioPrincipal])
            Swal.close();
            if (dataCliente > 0 && dataDomicilioFiscal > 0 && dataDomicilioPrincipal > 0) {
                Swal.close();
                showAlert('Éxito', 'La información se guardó correctamente.', 'success');
            }

        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar cliente y domicilios:', error);
        } finally {
            let editButton = $('.editCte' + clienteId);
            let saveButton = $('.saveCte' + clienteId);
            let editTextButton = $('.editTextCte' + clienteId);
            let saveTextButton = $('.saveTextCte' + clienteId);
            let saveIcon = $('.saveIconCte' + clienteId);
            let editIcon = $('.editIconCte' + clienteId);
            editButton.prop('disabled', false);
            saveButton.prop('disabled', true);

            editButton.removeClass('disable-button');
            editButton.addClass('button');

            saveButton.addClass('disable-button');
            saveButton.removeClass('button');

            saveButton.removeClass('label-text');
            saveButton.addClass('disable-text');

            editButton.removeClass('disable-text');
            editButton.addClass('label-text');


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

function editCto(ctoId) {
    let editButton = $('.editCto' + ctoId);
    let saveButton = $('.saveCto' + ctoId);
    let editTextButton = $('.editTextCto' + ctoId);
    let saveTextButton = $('.saveTextCto' + ctoId);
    let editIcon = $('.editIconCto' + ctoId);
    let saveIcon = $('.saveIconCto' + ctoId);
    editButton.prop('disabled', true);
    saveButton.prop('disabled', false);
    saveButton.removeClass('disable-button');
    saveButton.addClass('button');
    editButton.addClass('disable-button');
    editButton.removeClass('button');

    editTextButton.removeClass('label-text')
    editTextButton.addClass('disable-text')
    saveTextButton.removeClass('disable-text')
    saveTextButton.addClass('label-text')

    editIcon.css({ 'color': 'darkgray' });
    saveIcon.css({ 'color': 'red' });
    changeStatusInputForm(saveButton, false);
}

async function saveCto(ctoId) {
    let button = $('.saveCto' + ctoId);
    if (!validateForm(button)) {
        try {
            cleanInputValidation(button);
            showLoadingAlert("Espere... cargando información.");
            // 1. Actualizar contrato
            const updateResponse = await fetch(urlGposComerCte + "/ContratosEdit/", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    fi_ContratosId: ctoId,
                    fc_NumeroContrato: $('#numeroContrato' + ctoId).val(),
                    fc_NombreIdentificador: $('#nombreContrato' + ctoId).val(),
                    fi_UsoAsociadoRecursosId: $('#usoRecursos' + ctoId).val(),
                    fd_FechaContrato: $('#fechaContrato' + ctoId).val(),
                    fd_FechaActivacion: $('#fechaActivacion' + ctoId).val(),
                    fd_FechaInactividad: $('#fechaCancelacion' + ctoId).val(),
                    fd_FechaCancelacion: $('#fechaInactividad' + ctoId).val(),
                })
            });

            if (!updateResponse.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el contrato.', 'error');
            }

            const updateResult = await updateResponse.json();
            if (Object.hasOwn(updateResult, 'SessionActiva')) {
                window.location.href = updateResult.URL;
            }

            // 2. Evaluar el resultado de la primera petición
            if (updateResult === 1) {
                showAlert('Éxito', 'La información se guardó correctamente.', 'success');

                // 3. Obtener contrato actualizado
                const getResponse = await fetch(urlGposComerCte + "/ContratosGet/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    body: JSON.stringify({ pi_ContratosId: ctoId })
                });

                if (!getResponse.ok) {
                    Swal.close();
                    showAlert('Error', 'Error al obtener la información del contrato.', 'error');
                }

                try {
                    const getResult = await getResponse.json();
                    if (Object.hasOwn(getResult, 'SessionActiva')) {
                        window.location.href = getResult.URL;
                    }
                    $("#numeroCto" + ctoId).text(getResult.fc_NumeroContrato)
                    $("#nombreCto" + ctoId).text(getResult.fc_NombreIdentificador)

                } catch (e) {
                    Swal.close();
                    showAlert('Error', 'Error al obtener la información del contrato.', 'error');
                }
            } else {
                Swal.close();
                showAlert('Error', 'Error al editar el contrato.', 'error');
            }

        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar el contrato.', 'error');
            console.error("Error:", error.message);
        } finally {
            let editButton = $('.editCto' + ctoId);
            let saveButton = $('.saveCto' + ctoId);
            let editTextButton = $('.editTextCto' + ctoId);
            let saveTextButton = $('.saveTextCto' + ctoId);
            let editIcon = $('.editIconCto' + ctoId);
            let saveIcon = $('.saveIconCto' + ctoId);
            saveButton.prop("disabled", true);
            editButton.prop("disabled", false);

            editButton.removeClass("disable-button").addClass("button");
            saveButton.addClass("disable-button").removeClass("button");

            saveTextButton.removeClass("label-text").addClass("disable-text");
            editTextButton.removeClass("disable-text").addClass("label-text");

            saveIcon.css({ 'color': 'darkgray' });
            editIcon.css({ 'color': 'red' });


            changeStatusInputForm(saveButton, true);
        }
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }

}


async function saveRep(repId) {

    let button = $('.saveRep' + repId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        try {
            showLoadingAlert("Espere... cargando información.");
            // 1. Actualizar Representante Legal
            const updateResponse = await fetch(urlGposComerCte + "/RepresentantesLegalesIntEdit/", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    fi_RepresentantesLegalesIntId: repId,
                    fc_NombreRepresentante: $('#nombreRepresentante' + repId).val(),
                    fc_TelefonoOficina: $('#telefonoOficina' + repId).val(),
                    fc_CorreoElectronico: $('#correoElectronico' + repId).val(),
                }),
            });

            if (!updateResponse.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el Representante Legal.', 'error');
            }

            const updateData = await updateResponse.json();
            if (Object.hasOwn(updateData, 'SessionActiva')) {
                window.location.href = updateData.URL;
            }
            console.log(updateData);

            // 2. Evaluar el resultado
            if (updateData === 1) {
                Swal.close();
                showAlert('Éxito', 'La información se guardó correctamente.', 'success');
                // 3. Obtener Representante Actualizado
                const getResponse = await fetch(urlGposComerCte + "/RepresentantesLegalesIntGet/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    body: JSON.stringify({
                        representantesLegalesIntId: repId,
                    }),
                });

                if (!getResponse.ok) {
                    Swal.close();
                    showAlert('Error', 'Error al obtener la información del Representante Legal.', 'error');
                }
                try {
                    const data = await getResponse.json();
                    if (Object.hasOwn(data, 'SessionActiva')) {
                        window.location.href = data.URL;
                    }
                    // 4. Actualizar los campos en la interfaz
                    $('#nombreRepresentante' + data.fi_RepresentantesLegalesIntId).val(data.fc_NombreRepresentante);
                    $('#telefonoOficina' + data.fi_RepresentantesLegalesIntId).val(data.fc_TelefonoOficina);
                    $('#correoElectronico' + data.fi_RepresentantesLegalesIntId).val(data.fc_CorreoElectronico);
                    $('#nombreRep' + data.fi_RepresentantesLegalesIntId).text(data.fc_NombreRepresentante)


                } catch (e) {
                    Swal.close();
                    showAlert('Error', 'Error al obtener la información del Representante Legal.', 'error');
                }



            } else {
                Swal.close();
                showAlert('Error', 'Error al editar el Representante Legal.', 'error');
            }

        } catch (error) {
            Swal.close();
            showAlert('Error', 'Error al editar el Representante Legal.', 'error');
        } finally {
            // 5. Actualizar botones y estilos
            let editButton = $('.editRep' + repId);
            let saveButton = $('.saveRep' + repId);
            let editTextButton = $('.editTextRep' + repId);
            let saveTextButton = $('.saveTextRep' + repId);
            let editIcon = $('.editIconRep' + repId);
            let saveIcon = $('.saveIconRep' + repId);

            saveButton.prop("disabled", true);
            editButton.prop("disabled", false);

            editButton.removeClass("disable-button").addClass("button");
            saveButton.addClass("disable-button").removeClass("button");

            saveTextButton.removeClass("label-text").addClass("disable-text");
            editTextButton.removeClass("disable-text").addClass("label-text");

            saveIcon.css({ 'color': 'darkgray' });
            editIcon.css({ 'color': 'red' });


            changeStatusInputForm(saveButton, true);
        }
    } else {
        addAlert(button, 'Ocurrió un error al guardar, favor de validar la información ingresada.', 'cancel', 'error');
    }
}

function editRep(repId) {
    console.log('hola')
    let editButton = $('.editRep' + repId);
    let saveButton = $('.saveRep' + repId);
    let editTextButton = $('.editTextRep' + repId);
    let saveTextButton = $('.saveTextRep' + repId);
    let editIcon = $('.editIconRep' + repId);
    let saveIcon = $('.saveIconRep' + repId);
    editButton.prop('disabled', true);
    saveButton.prop('disabled', false);
    saveButton.removeClass('disable-button');
    saveButton.addClass('button');
    editButton.addClass('disable-button');
    editButton.removeClass('button');

    editTextButton.removeClass('label-text')
    editTextButton.addClass('disable-text')
    saveTextButton.removeClass('disable-text')
    saveTextButton.addClass('label-text')

    editIcon.css({ 'color': 'darkgray' });
    saveIcon.css({ 'color': 'red' });

    changeStatusInputForm(saveButton, false);
}

function loadInfoCto(contratosId, contratoData) {
    sessionStorage.setItem("ctoNum", contratosId);
    sessionStorage.setItem("ctoData", contratoData);
    window.open(urlContrato+"/Index", '_blank').focus()

}

function loadRepresentanteInt(representanteId, numeroContrato, nombreContrato,nombreCliente) {
    sessionStorage.setItem("representanteNum", representanteId);
    sessionStorage.setItem("representanteHeader", numeroContrato + '%' + nombreContrato + '%' + nombreCliente);
    window.open(urlRepresentante + "/Index", '_blank').focus()

}

function loadInfoCliente(clienteId) {
    sessionStorage.setItem("clienteId", clienteId);
    window.open(urlCliente, '_blank').focus()

}

const formulariosPorTipo = {
    1: renderFormMorales,
    2: renderFormFideicomisos,
};

function renderFormMorales(clienteGrupo) {
    return `<!-- Encabezado -->
    <h5 class="text-wrapper-2">Datos generales de la Persona Moral</h5>

    <!-- Primera fila de campos -->
    <div class="row">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="roleActual${clienteGrupo.fi_ClienteId}"
                        placeholder="Role Actual" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="roleActual${clienteGrupo.fi_ClienteId}">Role Actual</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <select class="form-control" id="tipoPersona${clienteGrupo.fi_ClienteId}" required disabled>
                    <option value="" disabled selected>Seleccionar tipo de persona</option>
                    ${catTipoPersona.map(i => `<option value="${i.Id}">${i.Nombre}</option>`).join('')}
                </select>
                <label class="pla" for="tipoPersona${clienteGrupo.fi_ClienteId}">
                    Tipo de Persona
                </label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="nacionalidad${clienteGrupo.fi_ClienteId}"
                        placeholder="Nacionalidad" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="nacionalidad${clienteGrupo.fi_ClienteId}">Nacionalidad</label>
            </div>
        </div>
    </div>

    <!-- Segunda fila de campos -->
    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="rfc${clienteGrupo.fi_ClienteId}" placeholder="RFC"
                        pattern="[A-Z0-9]{12,13}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="rfc" />
                <label class="pla" for="rfc${clienteGrupo.fi_ClienteId}">
                    Clave del Registro Federal de Contribuyentes
                    (RFC)
                </label>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="nombreContacto${clienteGrupo.fi_ClienteId}"
                        placeholder="Nombre completo del contacto principal" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" data-nullable="true" />
                <label class="pla" for="nombreContacto${clienteGrupo.fi_ClienteId}">
                    Nombre completo de contacto
                    principal
                </label>
            </div>
        </div>
    </div>

    <!-- Tercera fila de campos -->
    <div class="row mt-3">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="tel" class="form-control" id="telefonoPrincipal${clienteGrupo.fi_ClienteId}"
                        placeholder="Número de teléfono principal" pattern="\d{10}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="telNumber" />
                <label class="pla" for="telefonoPrincipal${clienteGrupo.fi_ClienteId}">
                    Número de teléfono
                    principal
                </label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="email" class="form-control" id="correoPrincipal${clienteGrupo.fi_ClienteId}"
                        placeholder="Correo electrónico principal" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="email" />
                <label class="pla" for="correoPrincipal${clienteGrupo.fi_ClienteId}">
                    Correo electrónico
                    principal
                </label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="url" class="form-control" id="paginaInternet${clienteGrupo.fi_ClienteId}"
                        placeholder="Página de internet" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="webPage" />
                <label class="pla" for="paginaInternet${clienteGrupo.fi_ClienteId}">Página de internet</label>
            </div>
        </div>
    </div>

    <!-- Última fila de campos -->
    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <select class="form-control" id="clasificacionNegocio${clienteGrupo.fi_ClienteId}" required disabled>
                    <option value="" disabled selected>Seleccionar clasificación</option>
                    ${catClasifNegocio.map(i => `<option value="${i.Id}">${i.Nombre}</option>`).join('')}
                </select>
                <label class="pla" for="clasificacionNegocio${clienteGrupo.fi_ClienteId}">
                    Clasificación de
                    negocio
                </label>
            </div>
        </div>
    </div>

    <hr />
    <!-- Domicilio principal -->
    <h5 class="text-wrapper-2">Domicilio principal</h5>
    <div class="row">
        <!-- Calle -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="calle${clienteGrupo.fi_ClienteId}" placeholder="Calle"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="calle${clienteGrupo.fi_ClienteId}">Calle</label>
            </div>
        </div>

        <!-- Número exterior -->
        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroExterior${clienteGrupo.fi_ClienteId}"
                        placeholder="Número exterior" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroExterior${clienteGrupo.fi_ClienteId}">Número exterior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>

        <!-- Número interior -->
        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroInterior${clienteGrupo.fi_ClienteId}"
                        placeholder="Número interior" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroInterior${clienteGrupo.fi_ClienteId}">Número interior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <!-- Colonia -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="colonia${clienteGrupo.fi_ClienteId}" placeholder="Colonia"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="colonia${clienteGrupo.fi_ClienteId}">Colonia</label>
            </div>
        </div>

        <!-- Delegación / Municipio -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="delegacion${clienteGrupo.fi_ClienteId}"
                        placeholder="Delegación / Municipio" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="delegacion${clienteGrupo.fi_ClienteId}">Delegación / Municipio</label>
            </div>
        </div>

        <!-- Ciudad / Población -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="ciudad${clienteGrupo.fi_ClienteId}"
                        placeholder="Ciudad / Población" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="ciudad${clienteGrupo.fi_ClienteId}">Ciudad / Población</label>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <!-- Entidad Federativa -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="entidadFederativa${clienteGrupo.fi_ClienteId}"
                        placeholder="Entidad Federativa" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="entidadFederativa${clienteGrupo.fi_ClienteId}">Entidad Federativa</label>
            </div>
        </div>

        <!-- Código Postal -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="number" class="form-control" id="codigoPostal${clienteGrupo.fi_ClienteId}"
                        placeholder="Código Postal" pattern="\d{5}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="postalCode" />
                <label class="pla" for="codigoPostal${clienteGrupo.fi_ClienteId}">Código Postal</label>
            </div>
        </div>

    </div>

    <hr>
    <!-- Domicilio Fiscal -->
    <h5 class="text-wrapper-2">Domicilio Fiscal</h5>
    <div class="row">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="calleFiscal${clienteGrupo.fi_ClienteId}" placeholder="Calle"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="calleFiscal${clienteGrupo.fi_ClienteId}">Calle</label>
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroExteriorFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Número exterior" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroExteriorFiscal${clienteGrupo.fi_ClienteId}">Número exterior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroInteriorFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Número interior" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroInteriorFiscal${clienteGrupo.fi_ClienteId}">Número interior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="coloniaFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Colonia" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="coloniaFiscal${clienteGrupo.fi_ClienteId}">Colonia</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="delegacionFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Delegación / Municipio" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="delegacionFiscal${clienteGrupo.fi_ClienteId}">Delegación / Municipio</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="ciudadFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Ciudad / Población" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="ciudadFiscal${clienteGrupo.fi_ClienteId}">Ciudad / Población</label>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="entidadFederativaFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Entidad Federativa" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="entidadFederativaFiscal${clienteGrupo.fi_ClienteId}">Entidad Federativa</label>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-floating">
                <input type="number" class="form-control" id="codigoPostalFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Código Postal" pattern="\d{5}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="postalCode" />
                <label class="pla" for="codigoPostalFiscal${clienteGrupo.fi_ClienteId}">Código Postal</label>
            </div>
        </div>
    </div>

    <div class="row justify-content-end mb-3">
        <div class="col-auto">
            <!-- Botón deshabilitado para "Guardar cambios" -->
            <button type="button" class="disable-button saveCte${clienteGrupo.fi_ClienteId}" disabled onclick="saveCte(${clienteGrupo.fi_ClienteId})">
                <div class="content-btn">
                    <i class="mdi mdi-cloud-upload saveIconCte${clienteGrupo.fi_ClienteId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                    <div class="disable-text saveTextCte${clienteGrupo.fi_ClienteId}" >Guardar cambios</div>
                </div>
            </button>
        </div>
        <div class="col-auto">
            <!-- Botón para "Editar Datos" -->
            <button type="button" class="button editCte${clienteGrupo.fi_ClienteId}"  onclick="editCte(${clienteGrupo.fi_ClienteId})">
                <div class="content-btn">
                    <i class="mdi mdi-pencil editIconCte${clienteGrupo.fi_ClienteId}" style="color: red; font-size: 18px; font-weight: bold;" ></i>
                    <div class="label-text editTextCte${clienteGrupo.fi_ClienteId}">Editar datos</div>
                </div>
            </button>
        </div>
    </div>`;
}

function renderFormFideicomisos(clienteGrupo) {
    return `<!-- Encabezado -->
    <h5 class="text-wrapper-2">Datos generales del Fideicomiso</h5>

    <!-- Primera fila de campos -->
    <div class="row">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="roleActual${clienteGrupo.fi_ClienteId}"
                        placeholder="Role Actual" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="roleActual${clienteGrupo.fi_ClienteId}">Role Actual</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <select class="form-control" id="tipoPersona${clienteGrupo.fi_ClienteId}" required disabled>
                    <option value="" disabled selected>Seleccionar tipo de persona</option>
                    ${catTipoPersona.map(i => `<option value="${i.Id}">${i.Nombre}</option>`).join('')}
                </select>
                <label class="pla" for="tipoPersona${clienteGrupo.fi_ClienteId}">
                    Tipo de Persona
                </label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="nacionalidad${clienteGrupo.fi_ClienteId}"
                        placeholder="Nacionalidad" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="nacionalidad${clienteGrupo.fi_ClienteId}">Nacionalidad</label>
            </div>
        </div>
    </div>

    <!-- Segunda fila de campos -->
    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="rfc${clienteGrupo.fi_ClienteId}" placeholder="RFC"
                        pattern="[A-Z0-9]{12,13}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="rfc" />
                <label class="pla" for="rfc${clienteGrupo.fi_ClienteId}">
                    Clave del Registro Federal de Contribuyentes
                    (RFC)
                </label>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-floating">
                <input type="email" class="form-control" id="aporFideicomitente${clienteGrupo.fi_ClienteId}"
                        placeholder="Aportaciones de los fideicomitentes" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="generalText" />
                <label class="pla" for="aporFideicomitente${clienteGrupo.fi_ClienteId}">
                    Aportaciones de los fideicomitentes
                </label>
            </div>
        </div>

        
    </div>

    <!-- Tercera fila de campos -->
    <div class="row mt-3">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="tel" class="form-control" id="patFideicomitido${clienteGrupo.fi_ClienteId}"
                        placeholder="Patrimonio Fideicomitido" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="ammount" />
                <label class="pla" for="patFideicomitido${clienteGrupo.fi_ClienteId}">
                    Patrimonio Fideicomitido
                </label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-floating">
                <select class="form-control" id="clasificacionNegocio${clienteGrupo.fi_ClienteId}" required disabled>
                    <option value="" disabled selected>Seleccionar clasificación</option>
                    ${catClasifNegocio.map(i => `<option value="${i.Id}">${i.Nombre}</option>`).join('')}
                </select>
                <label class="pla" for="clasificacionNegocio${clienteGrupo.fi_ClienteId}">
                    Clasificación de
                    negocio
                </label>
            </div>
        </div>

        

        <div class="col-md-4">
            <div class="form-floating">
                <input type="email" class="form-control" id="noFideicomiso${clienteGrupo.fi_ClienteId}"
                        placeholder="Número del Fideicomiso" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                <label class="pla" for="noFideicomiso${clienteGrupo.fi_ClienteId}">
                    Número del Fideicomiso
                </label>
            </div>
        </div>

        
    </div>

    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="email" class="form-control" id="finFideicomiso${clienteGrupo.fi_ClienteId}"
                        placeholder="Finalidad del Fideicomiso" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="name" />
                <label class="pla" for="finFideicomiso${clienteGrupo.fi_ClienteId}">
                    Finalidad del Fideicomiso
                </label>
            </div>
        </div>
    </div>


    <hr />
    <!-- Domicilio principal -->
    <h5 class="text-wrapper-2">Domicilio principal</h5>
    <div class="row">
        <!-- Calle -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="calle${clienteGrupo.fi_ClienteId}" placeholder="Calle"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="calle${clienteGrupo.fi_ClienteId}">Calle</label>
            </div>
        </div>

        <!-- Número exterior -->
        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroExterior${clienteGrupo.fi_ClienteId}"
                        placeholder="Número exterior" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroExterior${clienteGrupo.fi_ClienteId}">Número exterior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>

        <!-- Número interior -->
        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroInterior${clienteGrupo.fi_ClienteId}"
                        placeholder="Número interior" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroInterior${clienteGrupo.fi_ClienteId}">Número interior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <!-- Colonia -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="colonia${clienteGrupo.fi_ClienteId}" placeholder="Colonia"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="colonia${clienteGrupo.fi_ClienteId}">Colonia</label>
            </div>
        </div>

        <!-- Delegación / Municipio -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="delegacion${clienteGrupo.fi_ClienteId}"
                        placeholder="Delegación / Municipio" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="delegacion${clienteGrupo.fi_ClienteId}">Delegación / Municipio</label>
            </div>
        </div>

        <!-- Ciudad / Población -->
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="ciudad${clienteGrupo.fi_ClienteId}"
                        placeholder="Ciudad / Población" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="ciudad${clienteGrupo.fi_ClienteId}">Ciudad / Población</label>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <!-- Entidad Federativa -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="entidadFederativa${clienteGrupo.fi_ClienteId}"
                        placeholder="Entidad Federativa" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="entidadFederativa${clienteGrupo.fi_ClienteId}">Entidad Federativa</label>
            </div>
        </div>

        <!-- Código Postal -->
        <div class="col-md-6">
            <div class="form-floating">
                <input type="number" class="form-control" id="codigoPostal${clienteGrupo.fi_ClienteId}"
                        placeholder="Código Postal" pattern="\d{5}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="postalCode" />
                <label class="pla" for="codigoPostal${clienteGrupo.fi_ClienteId}">Código Postal</label>
            </div>
        </div>

    </div>

    <hr>
    <!-- Domicilio Fiscal -->
    <h5 class="text-wrapper-2">Domicilio Fiscal</h5>
    <div class="row">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="calleFiscal${clienteGrupo.fi_ClienteId}" placeholder="Calle"
                        required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="street" />
                <label class="pla" for="calleFiscal${clienteGrupo.fi_ClienteId}">Calle</label>
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroExteriorFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Número exterior" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroExteriorFiscal${clienteGrupo.fi_ClienteId}">Número exterior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="form-floating">
                <input type="text" class="form-control" id="numeroInteriorFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Número interior" disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="numberOI" />
                <label class="pla" for="numeroInteriorFiscal${clienteGrupo.fi_ClienteId}">Número interior</label>
                <div class="form-text">
                    En caso de no contar con este dato, escribir "S/N"
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="coloniaFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Colonia" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="coloniaFiscal${clienteGrupo.fi_ClienteId}">Colonia</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="delegacionFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Delegación / Municipio" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="delegacionFiscal${clienteGrupo.fi_ClienteId}">Delegación / Municipio</label>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-floating">
                <input type="text" class="form-control" id="ciudadFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Ciudad / Población" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="ciudadFiscal${clienteGrupo.fi_ClienteId}">Ciudad / Población</label>
            </div>
        </div>
    </div>

    <div class="row mt-3">
        <div class="col-md-6">
            <div class="form-floating">
                <input type="text" class="form-control" id="entidadFederativaFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Entidad Federativa" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="city" />
                <label class="pla" for="entidadFederativaFiscal${clienteGrupo.fi_ClienteId}">Entidad Federativa</label>
            </div>
        </div>

        <div class="col-md-6">
            <div class="form-floating">
                <input type="number" class="form-control" id="codigoPostalFiscal${clienteGrupo.fi_ClienteId}"
                        placeholder="Código Postal" pattern="\d{5}" required disabled onblur="validateInput(this)" onchange="validateInput(this)" data-validations="postalCode" />
                <label class="pla" for="codigoPostalFiscal${clienteGrupo.fi_ClienteId}">Código Postal</label>
            </div>
        </div>
    </div>

    <div class="row justify-content-end mb-3">
        <div class="col-auto">
            <!-- Botón deshabilitado para "Guardar cambios" -->
            <button type="button" class="disable-button saveCte${clienteGrupo.fi_ClienteId}" disabled onclick="saveCte(${clienteGrupo.fi_ClienteId})">
                <div class="content-btn">
                    <i class="mdi mdi-cloud-upload saveIconCte${clienteGrupo.fi_ClienteId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                    <div class="disable-text saveTextCte${clienteGrupo.fi_ClienteId}" >Guardar cambios</div>
                </div>
            </button>
        </div>
        <div class="col-auto">
            <!-- Botón para "Editar Datos" -->
            <button type="button" class="button editCte${clienteGrupo.fi_ClienteId}"  onclick="editCte(${clienteGrupo.fi_ClienteId})">
                <div class="content-btn">
                    <i class="mdi mdi-pencil editIconCte${clienteGrupo.fi_ClienteId}" style="color: red; font-size: 18px; font-weight: bold;" ></i>
                    <div class="label-text editTextCte${clienteGrupo.fi_ClienteId}">Editar datos</div>
                </div>
            </button>
        </div>
    </div>`;
}
