$('#example-search-input').on('input', async function () {
    $('#accordionGroup').empty();
    pagina.fi_Pagina = 0;
    fillAcFondo();
});

$('#fondoPag').on('click', async function () {
    fillAcFondo();
})

async function consultaCat(claveCat) {
    if (catalogos[claveCat].length === 0) {
        const response = await fetch(urlProducto + '/CatProducto', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                claveCat: claveCat
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        const data = await response.json();
        catalogos[claveCat] = data.Table;
    }
    sessionStorage.setItem("prodCat", JSON.stringify(catalogos));
    console.log(catalogos);
  /*  Swal.close()*/

}


async function fillAcFondo() {

    try {
        showLoadingAlert("Espere... cargando información.");
        const response = await fetch(urlProducto + '/FondoGeneralesPag', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                pi_Start: pagina.fi_Pagina + 1,
                pi_Length: 5,
                pc_Search: $('#example-search-input').val().toUpperCase()
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        const data = await response.json();

        console.log(data);

        let s = data.Table.map(i => `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" onclick="loadFondo(this, ${i.fi_FondoId})"
                                data-bs-target="#collapseOne${i.fi_FondoId}" aria-expanded="false" aria-controls="collapseOne${i.fi_FondoId}">
                            <div class="text-wrapper-6">${i.fc_ClavePizarra}</div>
                            <span onclick="bajaFondo(${i.fi_FondoId})" class="material-symbols-outlined m-3">
                                delete
                            </span>
                        </button>
                    </h2>
                    <div id="collapseOne${i.fi_FondoId}" class="accordion-collapse collapse" data-bs-parent="#accordionGroup">
                        <div class="accordion-body">

                            <!--TABS PRINCIPALES-->
                            <ul class="nav nav-tabs nav-justified nav-underline" id="myTab${i.fi_FondoId}" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab${i.fi_FondoId}" data-bs-toggle="tab" data-bs-target="#home-tab-pane${i.fi_FondoId}" type="button" role="tab" aria-controls="home-tab-pane${i.fi_FondoId}" aria-selected="true"><span class="material-symbols-outlined">
                                        savings
                                        </span>
                                        Datos del fondo</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="regenerar_user-tab${i.fi_FondoId}" data-bs-toggle="tab" data-bs-target="#regenerar-usuarios-tab-pane${i.fi_FondoId}" 
                                    type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" tabindex="-1" onclick="cargarFS(${i.fi_FondoId})">
                                        <span class="material-symbols-outlined">
                                            list_alt
                                        </span>Series</button>
                                </li>
                            </ul>

                            <div class="tab-content" id="myTabContent${i.fi_FondoId}">

                                <!--DATOS DEL FONDO-->
                                <div class="tab-pane fade show active" id="home-tab-pane${i.fi_FondoId}" role="tabpanel" aria-labelledby="home-tab${i.fi_FondoId}" tabindex="0">
                                    <div class="container-Tab-form">

                                    <!-- INICIO: SECCIONES FONDOS-->
                                    <div id="container-pills-action">
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active pill-action-select" id="generales_fondo-tab${i.fi_FondoId}" data-bs-toggle="pill" data-bs-target="#generales_fondo${i.fi_FondoId}" 
                                                type="button" role="tab" aria-controls="generales_fondo${i.fi_FondoId}" aria-selected="true" onclick="loadFondo(this, ${i.fi_FondoId})">
                                                <span class="material-symbols-outlined">
                                                    folder_info
                                                 </span> 
                                                 Generales fondo
                                                 </button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link pill-action" id="regimen_limites-tab${i.fi_FondoId}" data-bs-toggle="pill" 
                                                data-bs-target="#regimen_limites${i.fi_FondoId}" type="button" role="tab" aria-controls="regimen_limites${i.fi_FondoId}" 
                                                aria-selected="false" tabindex="-1" onclick="loadFondoReg(this, ${i.fi_FondoId})">
                                                <span class="material-symbols-outlined">balance</span> Régimen y límites
                                                </button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link pill-action" id="comerciales-tab${i.fi_FondoId}" data-bs-toggle="pill" 
                                                data-bs-target="#comerciales${i.fi_FondoId}" type="button" role="tab" aria-controls="comerciales${i.fi_FondoId}" 
                                                aria-selected="false" tabindex="-1" onclick="loadFondoCom(this, ${i.fi_FondoId})">
                                                    <span class="material-symbols-outlined">account_balance</span> Comerciales
                                                    </button>
                                                </li>
                                        </ul>
                                    </div>

                                    <div class="row justify-content-end">
                                        <div class="col-auto">
                                            <button type="button" class="btn-primary-sm"> <span class="material-symbols-outlined">
                                                visibility
                                                </span> Ver histórico del fondo
                                            </button>
                                        </div>
                                    </div>

                                    <!--CONTENIDO PILLS-->
                                    <div class="tab-content" id="pills-tabContent${i.fi_FondoId}">

                                            <!--GENERALES FONDO-->
                                        <div class="tab-pane fade show active" id="generales_fondo${i.fi_FondoId}" role="tabpanel" aria-labelledby="generales_fondo-tab${i.fi_FondoId}" tabindex="0">
                                            <form class="container-Tab-form">

                                                <!-- Primera fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="pizarra${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGen">
                                                            <label class="pla" for="pizarra${i.fi_FondoId}">Clave de pizarra</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="demSocial${i.fi_FondoId}" placeholder="Persona" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGen">
                                                        <label class="pla" for="demSocial${i.fi_FondoId}">Denominación social</label>
                                                    </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="tipo${i.fi_FondoId}" required="" >
                                                            <option value=""  selected="">Seleccionar</option>
                                                            ${catalogos.Tipo.map(i => `<option value="${i.fi_TipoId}">${i.fc_TipoAcotado}</option>`).join(" ")}
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Tipo</label>
                                                        </div>
                                                    </div>
                                            </div>
                                            <!--/// Primera fila de campos -->

                                            <!-- Segunda fila de campos -->
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="date" class="form-control" id="fAutProy${i.fi_FondoId}" placeholder="Role Actual" required="">
                                                        <label class="pla" for="roleActual">Fecha autorización proyecto</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="clasifPro${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.ClasifProspecto.map(i => `<option value="${i.fi_ClasifProspectoId}">${i.fc_ClasifProspecto}</option>`).join(" ")}
                                                        
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Clasificación proyecto</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="sufijoIPIN${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.SufijoIPIN.map(i => `<option value="${i.fi_SubfijoIPINId}">${i.fc_SubfijoIpin}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Sufijo IP-IN</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Segunda fila de campos -->


                                            <!-- Tercera fila de campos -->
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="clasif${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                        <label class="pla" for="clasif${i.fi_FondoId}">Calificación</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="plantDici${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.Plantilla.map(i => `<option value="${i.fi_PlantillaId}">${i.fc_Plantilla}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Plantilla DICI</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="clveReg${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                        <label class="pla" for="clveReg${i.fi_FondoId}">Clave reglamentación</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Tercera fila de campos -->

                                            <!-- Cuarta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="tipoAcr${i.fi_FondoId}" placeholder="Role Actual" required="" readonly>
                                                        <label class="pla" for="tipoAcr${i.fi_FondoId}">Tipo (acrónimo)</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="clasifCred${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.CalifCrediticia.map(i => `<option value="${i.fi_CalifCrediticiaId}">${i.fc_CalifCrediticia}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Calificación crediticia</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="sensMercado${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.SensibilidadMdo.map(i => `<option value="${i.fi_SensibilidadMdoId}">${i.fc_SencibilidadMdo}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Sensibilidad mercado</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Cuarta fila de campos -->

                                            <!-- Quinta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                    
                                                        <select disabled class="form-control" id="horProsp${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.HorizonteProspecto.map(i => `<option value="${i.fi_HorizonteProspectoId}">${i.fc_HorizonteProspecto}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Horizonte del prospecto</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="bench${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                        <label class="pla" for="bench${i.fi_FondoId}">Benchmark</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="volatilidad${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.Volatilidad.map(i => `<option value="${i.fi_VolatilidadId}">${i.fc_Volatilidad}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Volatilidad</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Quinta fila de campos -->

                                            <!-- Sexta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="perfilFondo${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.PerfilFondo.map(i => `<option value="${i.fi_PerfilFondoId}">${i.fc_PerfilFondo}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Perfil del fondo</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                    
                                                        <select disabled class="form-control" id="clasifColorEsp${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.ColorEspana.map(i => `<option value="${i.fi_ColorEspanaId}">${i.fc_ColorEspana}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Clasificación color España</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Sexta fila de campos -->

                                            <!-- Septima fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="clasifEsp${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.ClasifEspana.map(i => `<option value="${i.fi_ClasifEspanaId}">${i.fc_ClasifEspana}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Clasificación España (Control de gestión comercial)</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="califHom${i.fi_FondoId}" required="">
                                                        <option value=""  selected="">Seleccionar</option>
                                                        ${catalogos.CalifHomogenea.map(i => `<option value="${i.fi_CalifHomogeneaId}">${i.fc_CalifHomogenea}</option>`).join(" ")}
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio">Calificación homogénea</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Septima fila de campos -->
                                            <hr class="margin-t-24">
                                            <!-- CTAS-->
                                            <div class="producto-ctas margin-32 ">
                                                <button type="button" class="disable-button saveGenF${i.fi_FondoId}" onclick="saveGenF(${i.fi_FondoId})">
                                                    <div class="content-btn">
                                                        <i class="mdi mdi-cloud-upload saveGenFIcon${i.fi_FondoId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                        <div class="disable-text saveGenFText${i.fi_FondoId}">Guardar cambios</div>
                                                    </div>
                                                </button>
                                                <button type="button" class="disable-button editGenF${i.fi_FondoId}" onclick="editGenF(${i.fi_FondoId})">
                                                    <div class="content-btn">
                                                        <i class="mdi mdi-pencil editGenFIcon${i.fi_FondoId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                        <div class="label-text editGenFText${i.fi_FondoId}">Editar datos</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </form>    

                                            
                                            <!-- CTAS-->
                                        </div>
                                        <!--//GENERALES FONDO-->



                                        <!--REGIMEN Y LIMITES-->
                                        <div class="tab-pane fade" id="regimen_limites${i.fi_FondoId}" role="tabpanel" aria-labelledby="regimen_limites-tab${i.fi_FondoId}" tabindex="0">
                            
                                            <form class="container-Tab-form">

                                                <!-- Primera fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="objInver${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                            <label class="pla" for="objInver${i.fi_FondoId}">Objetivo de inversión</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                    <div class="form-floating">
                                                        <input disabled type="text" class="form-control" id="infRev${i.fi_FondoId}" placeholder="Persona" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                        <label class="pla" for="infRev${i.fi_FondoId}">Información relevante</label>
                                                    </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="indRef${i.fi_FondoId}" required="" >
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Índice referencia</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="protCap${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                            <label class="pla" for="protCap${i.fi_FondoId}">Protección de capital</label>
                                                        </div>
                                                    </div>
                                            </div>
                                            <!--/// Primera fila de campos -->

                                            <!-- Segunda fila de campos -->
                                            <div class="row">
                            

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvA${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvA${i.fi_FondoId}">Régimen y política de inversión a</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvB${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvB${i.fi_FondoId}">Régimen y política de inversión b</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Segunda fila de campos -->


                                            <!-- Tercera fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvC${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvC${i.fi_FondoId}">Régimen y política de inversión c</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvD${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvD${i.fi_FondoId}">Régimen y política de inversión d</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Tercera fila de campos -->

                                            <!-- Cuarta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvE${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvE${i.fi_FondoId}">Régimen y política de inversión e</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <textarea disabled  class="form-control text-area-md" placeholder="Régimen y política de inversión a" id="regPolInvFG${i.fi_FondoId}" style="height: 100px" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp"></textarea>
                                                        <label for="regPolInvFG${i.fi_FondoId}">Régimen y política de inversión f y g</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Cuarta fila de campos -->

                                            <!-- Quinta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="pais${i.fi_FondoId}" required="">
                                                        </select>
                                                        <label class="pla" for="roleActual${i.fi_FondoId}">País</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="vehiType${i.fi_FondoId}" required="">
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio${i.fi_FondoId}">VehicleType</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Quinta fila de campos -->


                                            <!-- Sexta fila de campos -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="assetType${i.fi_FondoId}" required="">
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio${i.fi_FondoId}">AssetType</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <select disabled class="form-control" id="subtipo${i.fi_FondoId}" required="">
                                                        </select>
                                                        <label class="pla" for="clasificacionNegocio${i.fi_FondoId}">Subtipo</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--/// Sexta fila de campos -->
                                            <hr class="margin-t-24">
                                            <!-- CTAS-->
                                            <div class="producto-ctas margin-32 ">
                                                <button type="button" class="disable-button saveRegLF${i.fi_FondoId}" onclick="saveRegLF(${i.fi_FondoId})">
                                                    <div class="content-btn">
                                                        <i class="mdi mdi-cloud-upload saveRegLFIcon${i.fi_FondoId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                        <div class="disable-text saveRegLFText${i.fi_FondoId}">Guardar cambios</div>
                                                    </div>
                                                </button>
                                                <button type="button" class="disable-button editRegLF${i.fi_FondoId}" onclick="editRegLF(${i.fi_FondoId})">
                                                    <div class="content-btn">
                                                        <i class="mdi mdi-pencil editRegLFIcon${i.fi_FondoId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                        <div class="label-text editRegLFText${i.fi_FondoId}">Editar datos</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </form> 
                                            
                                            <!-- CTAS-->
                                        </div>
                                        <!--//REGIMEN Y LIMITES-->



                                        <!--COMERCIALES-->
                                        <div class="tab-pane fade" id="comerciales${i.fi_FondoId}" role="tabpanel" aria-labelledby="comerciales-tab${i.fi_FondoId}" tabindex="0">
                            
                                            <form class="container-Tab-form">

                                                <!-- Primera fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="gesCome${i.fi_FondoId}" required="" >
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Gestor comercial fondo</label>
                                                        </div>
                                                    </div>
                                
                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="gesAcotado${i.fi_FondoId}" required="" disabled readonly />
                                                            <label class="pla" for="clasificacionNegocio">Gestor acotado</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="nomCom${i.fi_FondoId}" required="" >
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Nombre comercial fondo</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--/// Primera fila de campos -->

                                                <!-- Segunda fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="familia${i.fi_FondoId}" required="">
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Familia</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="estInversion${i.fi_FondoId}" required="">
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Estrategia de inversión</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="tipAcotado${i.fi_FondoId}" required="">
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Tipo acotado</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--/// Segunda fila de campos -->


                                                <!-- Tercera fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="regInve${i.fi_FondoId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                            <label class="pla" for="regInve${i.fi_FondoId}">Régimen de inversión</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <input disabled type="text" class="form-control" id="codGestor${i.fi_FondoId}" required="" disabled readonly>
                                                            
                                                            <label class="pla" for="clasificacionNegocio">COD gestor</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="divisa${i.fi_FondoId}" required="">
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Divisa</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--/// Tercera fila de campos -->

                                                <!-- Cuarta fila de campos -->
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="areaInv${i.fi_FondoId}" required="">
                                                            
                                                            </select>
                                                            <label class="pla" for="clasificacionNegocio">Área de inversión</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-floating">
                                                            <select disabled class="form-control" id="horAnios${i.fi_FondoId}" required="">
                                                           </select>
                                                            <label class="pla" for="clasificacionNegocio">Horizonte años</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--/// Cuarta fila de campos -->
                                                <hr class="margin-t-24">
                                                <!-- CTAS-->
                                                <div class="producto-ctas margin-32 ">
                                                    <button type="button" class="disable-button saveComF${i.fi_FondoId}" onclick="saveComF(${i.fi_FondoId})">
                                                        <div class="content-btn">
                                                            <i class="mdi mdi-cloud-upload saveComFIcon${i.fi_FondoId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                            <div class="disable-text saveComFText${i.fi_FondoId}">Guardar cambios</div>
                                                        </div>
                                                    </button>
                                                    <button type="button" class="disable-button editComF${i.fi_FondoId}" onclick="editComF(${i.fi_FondoId})">
                                                        <div class="content-btn">
                                                            <i class="mdi mdi-pencil editComFIcon${i.fi_FondoId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                            <div class="label-text editComFText${i.fi_FondoId}">Editar datos</div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </form>

                                            
                                            <!-- CTAS-->
                                        </div>
                                        <!--//COMERCIALES-->

                                    </div>
                                        <!--////CONTENIDO PILLS-->
                                    <!--FIN: SECCIONES FONDOS-->
                                    
                                
                                    </div>
                                
                                </div>
                                <!--//DATOS DEL FONDO-->





                                <!-- SERIES-->
                                <div class="tab-pane fade" id="regenerar-usuarios-tab-pane${i.fi_FondoId}" role="tabpanel" aria-labelledby="profile-tab${i.fi_FondoId}" tabindex="0">

                                    <div id="container-client${i.fi_FondoId}">
                                        
                                        <!-- INICIO: ACORDEON SERIE-->
                                        <div class="accordion_simple" id="accordionClient${i.fi_FondoId}">
                                        </div>
                                    </div>
                                </div>

                            </div>
                    <!-- ////TABS PRINCIPALES-->   
                        </div>
                    </div>
                </div>

            `).join(" ");
        $('#accordionGroup').append(s);
        console.log(data.Table1[0]);

        pagina.fi_TotalRegistros = data.Table1[0].fi_TotalRegistros;
        pagina.fi_TotalPaginas = data.Table1[0].fi_TotalPaginas;
        pagina.fi_Pagina = pagina.fi_Pagina + 1;

        console.log(pagina.fi_Pagina);
        console.log(pagina.fi_TotalPaginas);
        console.log(pagina.fi_Pagina >= pagina.fi_TotalPaginas);
        if (pagina.fi_Pagina >= pagina.fi_TotalPaginas) {
            $('#fondoPag').prop('disabled', true);
            $('#fondoPag').attr('style', 'display: none !important');
        }
        Swal.close();




    } catch (error) {
        console.error(error)
        // Manejo de errores
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }


}


async function loadFondo(element, fondoId) {
    if (!$(element).hasClass('collapsed')) {
        try {
            showLoadingAlert("Espere... cargando información.");
            let response = await fetch(urlProducto + '/FondoGeneralesDtl', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    fondoId: fondoId
                })
            });

            if (!response.ok) {
                // Si hay un error en el status HTTP
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
            }

            let data = await response.json();

            console.log(data);
            /*    console.log(data);*/
            $('#pizarra' + fondoId).val(data.Table[0].fc_ClavePizarra);
            $('#demSocial' + fondoId).val(data.Table[0].fc_DenominacionSocial);
            $('#demSocial' + fondoId).val(data.Table[0].fc_DenominacionSocial);
            $('#fAutProy' + fondoId).val(data.Table[0].fd_fechaAutorizacion.replace('T00:00:00', ''));
            $('#clasif' + fondoId).val(data.Table[0].fc_Calificacion);
            $('#clveReg' + fondoId).val(data.Table[0].fc_ClaveReglamentacion);
            $('#bench' + fondoId).val(data.Table[0].fc_BenchMark);
            

            response = await fetch(urlProducto + '/FdAdicionGrales', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    fondoId: fondoId
                })
            });


            if (!response.ok) {
                // Si hay un error en el status HTTP
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
            }

            data = await response.json();
            $('#tipo' + fondoId).val(data.Table[0].fi_TipoId !== null ? data.Table[0].fi_TipoId : '');
            $('#clasifPro' + fondoId).val(data.Table[0].fi_ClasifProspectoId !== null ? data.Table[0].fi_ClasifProspectoId : '');
            $('#sufijoIPIN' + fondoId).val(data.Table[0].fi_SubfijoIPINId !== null ? data.Table[0].fi_SubfijoIPINId : '');
            $('#plantDici' + fondoId).val(data.Table[0].fi_PlantillaId !== null ? data.Table[0].fi_PlantillaId : '');
            $('#clasifCred' + fondoId).val(data.Table[0].fi_CalifCrediticiaId !== null ? data.Table[0].fi_CalifCrediticiaId : '');
            $('#sensMercado' + fondoId).val(data.Table[0].fi_SensibilidadMdoId !== null ? data.Table[0].fi_SensibilidadMdoId : '');
            $('#horProsp' + fondoId).val(data.Table[0].fi_HorizonteProspectoId !== null ? data.Table[0].fi_HorizonteProspectoId : '');
            $('#volatilidad' + fondoId).val(data.Table[0].fi_VolatilidadId !== null ? data.Table[0].fi_VolatilidadId : '');
            $('#perfilFondo' + fondoId).val(data.Table[0].fi_PerfilFondoId !== null ? data.Table[0].fi_PerfilFondoId : '');
            $('#clasifColorEsp' + fondoId).val(data.Table[0].fi_ColorEspanaId !== null ? data.Table[0].fi_ColorEspanaId : '');
            $('#clasifEsp' + fondoId).val(data.Table[0].fi_ClasifEspanaId !== null ? data.Table[0].fi_ClasifEspanaId : '');
            $('#califHom' + fondoId).val(data.Table[0].fi_CalifHomogeneaId !== null ? data.Table[0].fi_CalifHomogeneaId : '');
            $('#tipoAcr' + fondoId).val(data.Table[0].fi_TipoId !== null ? catalogos.Tipo.find(i => i.fi_TipoId === data.Table[0].fi_TipoId).fc_ClaveTipo : '');
            $('#clasifCred' + fondoId).val(data.Table[0].fi_CalifCrediticiaId !== null ? data.Table[0].fi_CalifCrediticiaId : '');
            console.log(data);
            Swal.close()
        } catch (error) {
            console.error(error)
            // Manejo de errores
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
    }
    
}

function addOptions(idE, options, id) {
    $(`select[id="${idE}${id}"]`).each(function () {
        // Vaciar las opciones actuales
        $(this).empty();

        // Agregar nuevas opciones (ejemplo)
        $(this).append($('<option>', {
            value: '',
            text: 'Seleccionar'
        }));
        
        $(this).append(options);
    });
}

async function loadFondoReg(element, fondoId) {
   try {
        showLoadingAlert("Espere... cargando información.");
        await consultaCat("IndiceReferencia");
        await consultaCat("VehicleType");
        await consultaCat("AssetType");
        await consultaCat("Subtipo");
        await consultaCat("Pais");

        let options = catalogos.IndiceReferencia.map(i => `<option value="${i.fi_IndiceReferenciaId}">${i.fc_IndiceReferencia}</option>`).join(" ");
        addOptions('indRef', options, fondoId);
        options = catalogos.VehicleType.map(i => `<option value="${i.fi_VehicleTypeId}">${i.fc_VehicleType}</option>`).join(" ");
        addOptions('vehiType', options, fondoId);
        options = catalogos.AssetType.map(i => `<option value="${i.fi_AssetTypeId}">${i.fc_AssetType}</option>`).join(" ");
        addOptions('assetType', options, fondoId);
        options = catalogos.Subtipo.map(i => `<option value="${i.fi_SubtipoId}">${i.fc_Subtipo}</option>`).join(" ");
        addOptions('subtipo', options, fondoId);
        options = catalogos.Pais.map(i => `<option value="${i.fi_PaisId}">${i.fc_Pais}</option>`).join(" ");
        addOptions('pais', options, fondoId);
        

       
        let response = await fetch(urlProducto + '/FdRegimenLimitesDICI', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                fondoId: fondoId
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        let data = await response.json();
        $('#infRev'+ fondoId).val(data.Table[0].fc_InfRelevante);
        $('#objInver'+ fondoId).val(data.Table[0].fc_ObjetivoInversion);
        $('#pais'+ fondoId).val(data.Table[0].fi_PaisId ?? '');
        $('#protCap'+ fondoId).val(data.Table[0].fc_ProteccionCapital);
        $('#regPolInvA'+ fondoId).val(data.Table[0].fc_RegimenPolitInvA);
        $('#regPolInvB'+ fondoId).val(data.Table[0].fc_RegimenPolitInvB);
        $('#regPolInvC'+ fondoId).val(data.Table[0].fc_RegimenPolitInvC);
        $('#regPolInvD'+ fondoId).val(data.Table[0].fc_RegimenPolitInvD);
        $('#regPolInvE'+ fondoId).val(data.Table[0].fc_RegimenPolitInvE);
        $('#regPolInvFG'+ fondoId).val(data.Table[0].fc_RegimenPolitInvF);
        //$('#'+ fondoId).val(data.Table[0].fc_RegimenPolitInvG);
        $('#assetType'+ fondoId).val(data.Table[0].fi_AssetTypeId ?? '');
        $('#indRef'+ fondoId).val(data.Table[0].fi_IndiceReferenciaId ?? '');
        $('#subtipo'+ fondoId).val(data.Table[0].fi_SubtipoId ?? '');
        $('#vehiType'+ fondoId).val(data.Table[0].fi_VehicleTypeId ?? '');

        console.log(data);
        Swal.close()
    } catch (error) {
        console.error(error)
        // Manejo de errores
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
}

async function loadFondoCom(element, fondoId) {
   try {
        showLoadingAlert("Espere... cargando información.");
        await consultaCat("ComGestor");
        await consultaCat("NombreComercial");
        await consultaCat("ComFamilia");
        await consultaCat("EstrategiaInversion");
        await consultaCat("Divisa");
        await consultaCat("AreaInversion");


        let options = catalogos.ComGestor.map(i => `<option value="${i.fi_GestorId}">${i.fc_NombreCompletoGestor}</option>`).join(" ");
        addOptions('gesCome', options, fondoId);
        options = catalogos.NombreComercial.map(i => `<option value="${i.fi_NombreComercialId}">${i.fc_NombreComercial}</option>`).join(" ");
        addOptions('nomCom', options, fondoId);
        options = catalogos.ComFamilia.map(i => `<option value="${i.fi_ComFamiliaId}">${i.fc_Familia}</option>`).join(" ");
        addOptions('familia', options, fondoId);
        options = catalogos.EstrategiaInversion.map(i => `<option value="${i.fi_EstrategiaInvId}">${i.fc_EstrategiaInv}</option>`).join(" ");
        addOptions('estInversion', options, fondoId);
        options = catalogos.Tipo.map(i => `<option value="${i.fi_TipoId}">${i.fc_TipoAcotado}</option>`).join(" ");
        addOptions('tipAcotado', options, fondoId);
        options = catalogos.Divisa.map(i => `<option value="${i.fi_DivisaId}">${i.fc_Divisa}</option>`).join(" ");
        addOptions('divisa', options, fondoId);
        options = catalogos.HorizonteProspecto.map(i => `<option value="${i.fi_HorizonteProspectoId}">${i.fc_HorizonteAnios}</option>`).join(" ");
        addOptions('horAnios', options, fondoId);
        options = catalogos.AreaInversion.map(i => `<option value="${i.fi_AreaInvId}">${i.fc_AreaInv}</option>`).join(" ");
        addOptions('areaInv', options, fondoId);
                                                           


        let response = await fetch(urlProducto + '/FdComerciales', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                fondoId: fondoId
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }

        let data = await response.json();
        const gestor = catalogos.ComGestor.find(e => e.fi_GestorId == data.Table[0].fi_GestorId);
        $('#gesAcotado'+ fondoId).val(gestor?.fc_GestorAcotado ?? '');
        $('#gesCome'+ fondoId).val(data.Table[0].fi_GestorId ?? '');
        $('#nomCom'+ fondoId).val(data.Table[0].fi_NombreComercialId ?? '');
        $('#familia'+ fondoId).val(data.Table[0].fi_ComFamiliaId ?? '');
        $('#estInversion'+ fondoId).val(data.Table[0].fi_EstrategiaInvId ?? '');
        $('#tipAcotado'+ fondoId).val(data.Table[0].fi_TipoId ?? '');
        $('#regInve'+ fondoId).val(data.Table[0].fc_RegimenInv);
        $('#codGestor'+ fondoId).val(gestor?.fc_CodigoGestor ?? '');
        $('#divisa'+ fondoId).val(data.Table[0].fi_DivisaId ?? '');
        $('#areaInv'+ fondoId).val(data.Table[0].fi_AreaInvId ?? '');
        $('#horAnios'+ fondoId).val(data.Table[0].fi_HorizonteProspectoId ?? '');

        console.log(data);
        Swal.close()
    } catch (error) {
        console.error(error)
        // Manejo de errores
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
}

async function cargarFS(fondoId) {
    try {
        showLoadingAlert("Espere... cargando información.");
       console.log(catalogos);
        let response = await fetch(urlProducto + '/FdsrGenerales', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                fondoId: fondoId
            })
        });

        if (!response.ok) {
            // Si hay un error en el status HTTP
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }


        let data = await response.json();
        let divs = data.Table.map(i => `
                <div class="accordion-item ">
                    <h2 class="accordion-simple-header">
                    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapse3${i.fi_FondoSerieGralId}" 
                        aria-expanded="true" aria-controls="collapse3${i.fi_FondoSerieGralId}" onclick="loadFSGral(this, ${i.fi_FondoSerieGralId})">
                        <span onclick="bajaSerie(${i.fi_FondoSerieGralId}, ${i.fi_FondoId})" class="material-symbols-outlined m-3">
                                delete
                            </span>
                        <div class="label">
                        
                        <p class="text-wrapper">${i.fc_ClaseSerie}</p>
                        </div>
                        
                    </button>
                    </h2>

                    <div id="collapse3${i.fi_FondoSerieGralId}" class="accordion-collapse collapse " data-bs-parent="#accordionClient${i.fi_FondoId}">
                        <div class="accordion-body">
                        <div class="triangle"><img src="../dist/img/polygon.svg"></div>
                                                    
                        <div id="container-pills-action${i.fi_FondoSerieGralId}">
                            <ul class="nav nav-pills mb-3" id="pills-tab${i.fi_FondoSerieGralId}" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active pill-action-select" id="generales_series-tab${i.fi_FondoSerieGralId}" data-bs-toggle="pill" 
                                    data-bs-target="#general_series${i.fi_FondoSerieGralId}" type="button" role="tab" 
                                    aria-controls="general_series${i.fi_FondoSerieGralId}" aria-selected="true" onclick="loadFSGral(this, ${i.fi_FondoSerieGralId})">
                                    <span class="material-symbols-outlined">
                                        folder_info
                                        </span> General series</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link pill-action" id="operativa-tab${i.fi_FondoSerieGralId}" data-bs-toggle="pill" 
                                    data-bs-target="#operativa${i.fi_FondoSerieGralId}" type="button" role="tab" aria-controls="operativa${i.fi_FondoSerieGralId}" 
                                    aria-selected="false" tabindex="-1" onclick="loadFSOperativa(this, ${i.fi_FondoSerieGralId})">
                                    <span class="material-symbols-outlined">manufacturing</span> Operativa
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link pill-action" id="comerciales-series-tab${i.fi_FondoSerieGralId}" data-bs-toggle="pill" 
                                    data-bs-target="#comerciales-series${i.fi_FondoSerieGralId}" type="button" role="tab" aria-controls="comerciales-series${i.fi_FondoSerieGralId}" aria-selected="false" 
                                    tabindex="-1" onclick="loadFSComercial(this,${i.fi_FondoSerieGralId})">
                                        <span class="material-symbols-outlined">account_balance</span> Comerciales
                                        </button>
                                    </li>
                            </ul>
                        </div>

                        <div class="row justify-content-end">
                            <div class="col-auto">
                                <button type="button" class="btn-primary-sm" onclick="sessionStorage.setItem('fondoId',${i.fi_FondoId});window.open('${urlProducto + '/crearSerie'}', '_blank')"> 
                                    <span class="material-symbols-outlined" >
                                        add
                                    </span> Crear serie
                                </button>
                            </div>
                        </div>



                        <div class="tab-content" id="pills-tabContent${fondoId}">

                            <!--GENERALES SERIES-->
                            <div class="tab-pane fade show active" id="general_series${i.fi_FondoSerieGralId}" role="tabpanel" aria-labelledby="generales_series-tab${i.fi_FondoSerieGralId}" tabindex="0">
                                <form class="container-Tab-form">

                                    <!-- Primera fila de campos -->
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <input readonly disabled type="text" class="form-control" id="pizarraS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" >
                                                <label class="pla" for="roleActual">Clave de pizarra</label>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="tipoAccionS${i.fi_FondoSerieGralId}" required="" >
                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Tipo de acciones</label>
                                            </div>
                                        </div>

                        
                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <input disabled type="text" class="form-control" id="claseSerieS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGen">
                                                <label class="pla" for="claseSerieS${i.fi_FondoSerieGralId}">Clase y serie</label>
                                            </div>
                                        </div>
                        
                                </div>
                                <!--/// Primera fila de campos -->

                                <!-- Segunda fila de campos -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="fondoSerieS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGen">
                                            <label class="pla" for="fondoSerieS${i.fi_FondoSerieGralId}">Fondo serie</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <select disabled class="form-control" id="posAdquiS${i.fi_FondoSerieGralId}" required="">
                                            </select>
                                            <label class="pla" for="clasificacionNegocio">Posibles adquirientes</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="mMinimoS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodNumOp"> 
                                            <label class="pla" for="mMinimoS${i.fi_FondoSerieGralId}">Monto mínimo de inversión ($)</label>
                                        </div>
                                    </div>
                                </div>
                                <!--/// Segunda fila de campos -->


                                <!-- Tercera fila de campos -->
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="form-floating">
                                        <input disabled type="text" class="form-control" id="pMinimoPerS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                        <label class="pla" for="pMinimoPerS${i.fi_FondoSerieGralId}">Plazo mínimo de permanencia</label>
                                    </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <select disabled class="form-control" id="comCliS${i.fi_FondoSerieGralId}" required="">
                                            <option value=""  selected="">Seleccionar</option>
                                            ${catalogos.ComisionCliente.map(i => `<option value="${i.fi_ComisionCteId}">${i.fc_ComisionCliente}</option>`).join(" ")}
                                            </select>
                                            <label class="pla" for="clasificacionNegocio">Comisiones cliente</label>
                                        </div>
                                    </div>
                                </div>
                                <!--/// Tercera fila de campos -->



                            <!--DISTRUBUIDORAS -->

                            <!-- Opciones múltiples (checkboxes) -->
                                <div id="container-check-options">
                                    <h6 class="margin-b-16">Distribuidoras</h6>
                                    <div class="row" id="DistCh${i.fi_FondoSerieGralId}">
                                        
                                    </div>

                                </div>
            
                            <!-- ////Opciones múltiples (checkboxes) -->

                            <!--/// DISTRUBUIDORAS -->



                                <!-- Cuarta fila de campos -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="serieActivosS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="">
                                            <label class="pla" for="roleActual">Serie con activos</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="feeS${i.fi_FondoSerieGralId}" placeholder="Fee" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodNum">
                                            <label class="pla" for="feeS${i.fi_FondoSerieGralId}">Fee</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="platOpS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                            <label class="pla" for="platOpS${i.fi_FondoSerieGralId}">Plataforma operación</label>
                                        </div>
                                    </div>
                                </div>
                                <!--/// Cuarta fila de campos -->

                                <!-- Quinta fila de campos -->
                                <div class="row">
                                    <div class="col-md-4">
                                    <div class="form-floating">
                                        <input disabled type="date" class="form-control" id="inicioOpsS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="">
                                        <label class="pla" for="roleActual">Inicio Ops.</label>
                                    </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-floating">
                                            <input disabled type="date" class="form-control" id="iniSerieS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="">
                                            <label class="pla" for="roleActual">Inicio serie (producto/serie con precio)</label>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                    <div class="form-floating">
                                        <input disabled type="text" class="form-control" id="isinS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                        <label class="pla" for="isinS${i.fi_FondoSerieGralId}">ISIN</label>
                                    </div>
                                    </div>
                                </div>
                                <!--/// Quinta fila de campos -->

                                <!-- Sexta fila de campos -->
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="form-floating">
                                        <input readonly disabled type="text" class="form-control" id="adqAcotS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="">
                                        <label class="pla" for="roleActual">Adquiriente acotado</label>
                                    </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input disabled type="text" class="form-control" id="tickerBloomS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                            <label class="pla" for="tickerBloomS${i.fi_FondoSerieGralId}">Ticker bloomberg</label>
                                        </div>
                                    </div>
                                </div>
                                <!--/// Sexta fila de campos -->
                                <hr class="margin-t-24">
                                <!-- CTAS-->
                                <div class="producto-ctas margin-32 ">
                                    <button type="button" class="disable-button saveGenFS${i.fi_FondoSerieGralId}" onclick="saveGenFS(${i.fi_FondoSerieGralId}, ${i.fi_FondoId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-cloud-upload saveGenFSIcon${i.fi_FondoSerieGralId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                            <div class="disable-text saveGenFSText${i.fi_FondoSerieGralId}">Guardar cambios</div>
                                        </div>
                                    </button>
                                    <button type="button" class="disable-button editGenFS${i.fi_FondoSerieGralId}" onclick="editGenFS(${i.fi_FondoSerieGralId})">
                                        <div class="content-btn">
                                            <i class="mdi mdi-pencil editGenFSIcon${i.fi_FondoSerieGralId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                            <div class="label-text editGenFSText${i.fi_FondoSerieGralId}">Editar datos</div>
                                        </div>
                                    </button>
                                </div>

                            </form>    

                            
                                <!-- CTAS-->
                            </div>
                            <!--//GENERALES SERIES-->



                            <!--OPERATIVA-->
                            <div class="tab-pane fade" id="operativa${i.fi_FondoSerieGralId}" role="tabpanel" aria-labelledby="operativa-tab${i.fi_FondoSerieGralId}" tabindex="0">
                                <div class="row mb-4">
                                    <div class="col-md-4">
                                        <label class="text-wrapper-2">Tipo Operación</label>
                                        <div class="d-flex align-items-center">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="tipoActivoS${i.fi_FondoSerieGralId}" id="activoPuntual${i.fi_FondoSerieGralId}" value="1"  checked>
                                                <label class="form-check-label" for="activoPuntual${i.fi_FondoSerieGralId}">CyV</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="tipoActivoS${i.fi_FondoSerieGralId}" id="activoMedio${i.fi_FondoSerieGralId}" value="2">
                                                <label class="form-check-label" for="activoMedio${i.fi_FondoSerieGralId}">
                                                    PPC
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="compra${i.fi_FondoSerieGralId}">
                                    <form class="container-Tab-form">

                                        <!-- Primera fila de campos -->
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="recepOrdS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>
                                                    
                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Recepción de órdenes</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="ejecOpS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>

                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Ejecución de operaciones</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="liqOpS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>

                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Liquidación de operaciones</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Primera fila de campos -->

                                        <!-- Segunda fila de campos -->
                                        <div class="row">
                                            <div class="col-md-4">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="liquiS${i.fi_FondoSerieGralId}" required="">
                                                <option value=""  selected="">Seleccionar</option>
                                                
                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Liquidez</label>
                                            </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="horarioS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="time">
                                                    <label class="pla" for="horarioS${i.fi_FondoSerieGralId}">Horario</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="limRecS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="limRecS${i.fi_FondoSerieGralId}">Límites de recompra</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Segunda fila de campos -->


                                        <!-- Tercera fila de campos -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="diferencialS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="diferencialS${i.fi_FondoSerieGralId}">Diferencial</label>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="txtGaraS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required=""  onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="txtGaraS${i.fi_FondoSerieGralId}">Texto para garantizados</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Tercera fila de campos -->
                                        <hr class="margin-t-24">
                                        <!-- CTAS-->
                                        <div class="producto-ctas margin-12 ">
                                            <button type="button" class="disable-button saveOpeFS${i.fi_FondoSerieGralId}" onclick="saveOpeFS(${i.fi_FondoSerieGralId}, ${i.fi_FondoId})">
                                                <div class="content-btn">
                                                    <i class="mdi mdi-cloud-upload saveOpeFSIcon${i.fi_FondoSerieGralId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="disable-text saveOpeFSText${i.fi_FondoSerieGralId}">Guardar cambios</div>
                                                </div>
                                            </button>
                                            <button type="button" class="disable-button editOpeFS${i.fi_FondoSerieGralId}" onclick="editOpeFS(${i.fi_FondoSerieGralId})">
                                                <div class="content-btn">
                                                    <i class="mdi mdi-pencil editOpeFSIcon${i.fi_FondoSerieGralId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="label-text editOpeFSText${i.fi_FondoSerieGralId}">Editar datos</div>
                                                </div>
                                            </button>
                                        </div>

                                    </form> 
                                    
                                </div>

                                <div id="venta${i.fi_FondoSerieGralId}" style="display: none;">
                                    <form class="container-Tab-form">

                                        <!-- Primera fila de campos -->
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="recepOrdVS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>
                                                    
                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Recepción de órdenes</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="ejecOpVS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>

                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Ejecución de operaciones</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <select disabled class="form-control" id="liqOpVS${i.fi_FondoSerieGralId}" required="">
                                                    <option value=""  selected="">Seleccionar</option>

                                                    </select>
                                                    <label class="pla" for="clasificacionNegocio">Liquidación de operaciones</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Primera fila de campos -->

                                        <!-- Segunda fila de campos -->
                                        <div class="row">
                                            <div class="col-md-4">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="liquiVS${i.fi_FondoSerieGralId}" required="">
                                                <option value=""  selected="">Seleccionar</option>

                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Liquidez</label>
                                            </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="horarioVS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="time">
                                                    <label class="pla" for="horarioVS${i.fi_FondoSerieGralId}">Horario</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="limRecVS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="limRecVS${i.fi_FondoSerieGralId}">Límites de recompra</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Segunda fila de campos -->


                                        <!-- Tercera fila de campos -->
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="diferencialVS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="diferencialVS${i.fi_FondoSerieGralId}">Diferencial</label>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-floating">
                                                    <input disabled type="text" class="form-control" id="txtGaraVS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                    <label class="pla" for="txtGaraVS${i.fi_FondoSerieGralId}">Texto para garantizados</label>
                                                </div>
                                            </div>
                                        </div>
                                        <!--/// Tercera fila de campos -->
                                        <hr class="margin-t-12">
                                        <!-- CTAS-->
                                         <div class="producto-ctas margin-12 ">
                                            <button type="button" class="disable-button saveOpeVFS${i.fi_FondoSerieGralId}" onclick="saveOpeVFS(${i.fi_FondoSerieGralId}, ${i.fi_FondoId})">
                                                <div class="content-btn">
                                                    <i class="mdi mdi-cloud-upload saveOpeVFSIcon${i.fi_FondoSerieGralId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="disable-text saveOpeVFSText${i.fi_FondoSerieGralId}">Guardar cambios</div>
                                                </div>
                                            </button>
                                            <button type="button" class="disable-button editOpeVFS${i.fi_FondoSerieGralId}" onclick="editOpeVFS(${i.fi_FondoSerieGralId})">
                                                <div class="content-btn">
                                                    <i class="mdi mdi-pencil editOpeVFSIcon${i.fi_FondoSerieGralId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                    <div class="label-text editOpeVFSText${i.fi_FondoSerieGralId}">Editar datos</div>
                                                </div>
                                            </button>
                                        </div>

                                    </form> 
                                    
                                </div>
                                <!-- CTAS-->
                            </div>
                            <!--//OPERATIVA-->



                            <!--COMERCIALES SERIES-->
                            <div class="tab-pane fade" id="comerciales-series${i.fi_FondoSerieGralId}" role="tabpanel" aria-labelledby="comerciales-series-tab${i.fi_FondoSerieGralId}" tabindex="0">
                
                                <form class="container-Tab-form">


                                <!--RED DISTRUBUCION -->

                                <!-- Opciones múltiples (checkboxes) -->
                                <div id="container-check-options${i.fi_FondoSerieGralId}">
                                    <h6 class="margin-b-16">Red de distribución</h6>
                                    <div class="row" id="RDistCh${i.fi_FondoSerieGralId}">
                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="bei">
                                                <label class="form-check-label" for="bei">BEI</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="bmg">
                                                <label class="form-check-label" for="bmg">BMG</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="bpp">
                                                <label class="form-check-label" for="bpp">BPP</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="fideicomiso">
                                                <label class="form-check-label" for="fideicomiso">Fideicomiso</label>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="gestora">
                                                <label class="form-check-label" for="gestora">Gestora</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="gestoraNegocioInstitucional">
                                                <label class="form-check-label" for="gestoraNegocioInstitucional">Gestora (Negocio Institucional)</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="gestoraPensiones">
                                                <label class="form-check-label" for="gestoraPensiones">Gestora (Pensiones)</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="institucionesSegurosFianzas">
                                                <label class="form-check-label" for="institucionesSegurosFianzas">Instituciones de Seguros y Fianzas</label>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="internaGrupoFinancieroSantander">
                                                <label class="form-check-label" for="internaGrupoFinancieroSantander">Interna Grupo Financiero Santander</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="privada">
                                                <label class="form-check-label" for="privada">Privada</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="privadaCarterasManejadas">
                                                <label class="form-check-label" for="privadaCarterasManejadas">Privada (Carteras Manejadas)</label>
                                            </div>
                                            <div class="form-check">
                                                <input disabled class="form-check-input" type="checkbox" id="select">
                                                <label class="form-check-label" for="select">Select</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                
                                <!-- ////Opciones múltiples (checkboxes) -->

                                <!--/// RED DISTRUBUCION -->



                                    <!-- Primera fila de campos -->
                                    <div class="row">       
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="distTerS${i.fi_FondoSerieGralId}" required="" >
                                                <option value=""  selected="">Seleccionar</option>

                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Distribución terceros (previa validación de contrato)</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="nomComS${i.fi_FondoSerieGralId}" required="" >
                                                </select>
                                                <label class="pla" for="roleActual">Nombre comercial</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--/// Primera fila de campos -->

                                    <!-- Segunda fila de campos -->
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input readonly disabled type="text" class="form-control" id="nomComSeS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="">
                                                <label class="pla" for="roleActual">Nombre com + serie</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="adqAcS${i.fi_FondoSerieGralId}" required="">
                                                <option value=""  selected="">Seleccionar</option>
                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Adquiriente acotado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--/// Segunda fila de campos -->



                                    <!--BANCA ACOTADA-->

                                    <!-- Opciones múltiples (checkboxes) -->
                                    <div id="container-check-options">
                                        <h6 class="margin-b-16">Banca acotada oferta valor</h6>
                                        <div class="row" id="bancAcS${i.fi_FondoSerieGralId}">
                                            <div class="col-md-4">
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="bei">
                                                    <label class="form-check-label" for="bei">BEI</label>
                                                </div>
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="cib">
                                                    <label class="form-check-label" for="cib">CIB</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="empleados">
                                                    <label class="form-check-label" for="empleados">Empleados</label>
                                                </div>
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="privada2">
                                                    <label class="form-check-label" for="privada2">Privada</label>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="pymes">
                                                    <label class="form-check-label" for="pymes">PyMes</label>
                                                </div>
                                
                                                <div class="form-check">
                                                    <input disabled class="form-check-input" type="checkbox" id="select2">
                                                    <label class="form-check-label" for="select2">Select</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                    
                                    <!-- ////Opciones múltiples (checkboxes) -->

                                    <!--/// BANCA ACOTADA -->


                                    <!-- Tercera fila de campos -->
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input disabled type="text" class="form-control" id="prdType${i.fi_FondoSerieGralId}" placeholder="Role Actual" required="" onblur="validateInput(this)" onchange="validateInput(this)" data-validations="prodGenOp">
                                                <label class="pla" for="prdType${i.fi_FondoSerieGralId}">Product type</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="solCpaVta${i.fi_FondoSerieGralId}" required="">
                                                <option value=""  selected="">Seleccionar</option>

                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Solicitudes cpa - vta</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--/// Tercera fila de campos -->

                                    <!-- Cuarta fila de campos -->
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <select disabled class="form-control" id="liquS${i.fi_FondoSerieGralId}" required="">
                                                <option value=""  selected="">Seleccionar</option>
                                        
                                                </select>
                                                <label class="pla" for="clasificacionNegocio">Líquidez</label>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input disabled type="text" class="form-control" id="horCieS${i.fi_FondoSerieGralId}" placeholder="Role Actual" required=""  onblur="validateInput(this)" onchange="validateInput(this)" data-validations="time">
                                                <label class="pla" for="horCieS${i.fi_FondoSerieGralId}">Horario de cierre</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--/// Cuarta fila de campos -->
                                    <hr class="margin-t-24">
                                    <!-- CTAS-->
                                    <div class="producto-ctas margin-32 ">
                                        <button type="button" class="disable-button saveComFS${i.fi_FondoSerieGralId}" onclick="saveComFS(${i.fi_FondoSerieGralId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-cloud-upload saveComFSIcon${i.fi_FondoSerieGralId}" style="color: darkgray; font-size: 18px; font-weight: bold;"></i>
                                                <div class="disable-text saveComFSText${i.fi_FondoSerieGralId}">Guardar cambios</div>
                                            </div>
                                        </button>
                                        <button type="button" class="disable-button editComFS${i.fi_FondoSerieGralId}" onclick="editComFS(${i.fi_FondoSerieGralId})">
                                            <div class="content-btn">
                                                <i class="mdi mdi-pencil editComFSIcon${i.fi_FondoSerieGralId}" style="color: red; font-size: 18px; font-weight: bold;"></i>
                                                <div class="label-text editComFSText${i.fi_FondoSerieGralId}">Editar datos</div>
                                            </div>
                                        </button>
                                    </div>
                                </form>

                                
                                <!-- CTAS-->
                            </div>
                            <!--//COMERCIALES SERIES-->

                        </div>
                        <!--////CONTENIDO PILLS-->
                        
                        </div>
                    </div>
                </div>
            
            `).join(" ");
        $('#accordionClient' + fondoId).empty();
        $('#accordionClient' + fondoId).append(divs);
        
        console.log(data);
        Swal.close()
    } catch (error) {
        console.error(error)
        // Manejo de errores
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
    }
}
$(document).on('change', 'input[type="radio"][name^="tipoActivoS"]', function () {
    const valorSeleccionado = $(this).val();
    const nombreGrupo = $(this).attr('name');
    console.log('Seleccionado:', valorSeleccionado, 'en', nombreGrupo);
    const idFS = nombreGrupo.replace('tipoActivoS', '');
    console.log('#venta' + idFS);
    if (parseInt(valorSeleccionado) == 1) {
        $('#venta' + idFS).hide();
        $('#compra' + idFS).show();
    }
    if (parseInt(valorSeleccionado) == 2) {
        $('#compra' + idFS).hide();
        $('#venta' + idFS).show();
    }

});

async function loadCatFondoReg() {

    await consultaCat("IndiceReferencia");
    await consultaCat("VehicleType");
    await consultaCat("AssetType");
    await consultaCat("Subtipo");
    
}

async function loadFSGral(element,FondoSerieGralId) {
    currentFdsr = FondoSerieGralId;
    if (!$(element).hasClass('collapsed')) {
        try {
            showLoadingAlert("Espere... cargando información.");
            await consultaCat("TipoAccion");
            await consultaCat("PosibleAdquiriente");
            await consultaCat("Distribuidora");
            await consultaCat("ComisionCliente");

            let options = catalogos.TipoAccion.map(i => `<option value="${i.fi_TipoAccionId}">${i.fc_TipoAccion}</option>`).join(" ");
            addOptions('tipoAccionS', options, FondoSerieGralId);
            options = catalogos.PosibleAdquiriente.map(i => `<option value="${i.fi_PosibleAdqId}">${i.fc_PosibleAdquieriente}</option>`).join(" ");
            addOptions('posAdquiS', options, FondoSerieGralId);
            options = catalogos.ComisionCliente.map(i => `<option value="${i.fi_ComisionCteId}">${i.fc_ComisionCliente}</option>`).join(" ");
            addOptions('comCliS', options, FondoSerieGralId);

    
    

            

            $('#DistCh'+FondoSerieGralId).empty();
            let checks = '';
            dividirEnBloques(catalogos.Distribuidora, 3).forEach(i => {
                let div = `<div class="col-md-4">`;
                i.forEach(e => {
                    div+= `
                        <div class="form-check">
                            <input disabled class="form-check-input" type="checkbox" id="distri${FondoSerieGralId}_${e.fi_DistribuidoraId}">
                            <label class="form-check-label" for="casaBolsaSantander">${e.fc_Distribuidora}</label>
                        </div>
                    `;
                });
                div += '</div>';
                checks += div;
            });
            $('#DistCh'+FondoSerieGralId).append(checks);
            let response = await fetch(urlProducto + '/FdsrGeneralesDtl', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    fondoId: FondoSerieGralId
                })
            });

            if (!response.ok) {
                // Si hay un error en el status HTTP
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
            }

            let data = await response.json();
            $('#tipoAccionS' + FondoSerieGralId).val(data.Table[0].fi_TipoAccionId);
            $('#pizarraS' + FondoSerieGralId).val(data.Table[0].fc_ClavePizarra);
            $('#claseSerieS' + FondoSerieGralId).val(data.Table[0].fc_ClaseSerie);
            $('#fondoSerieS' + FondoSerieGralId).val(data.Table[0].fc_FondoSerie);
            $('#posAdquiS' + FondoSerieGralId).val(data.Table[0].fi_PosiblesAdqId);
            $('#mMinimoS' + FondoSerieGralId).val(data.Table[0].fn_MontoMinInv);
            $('#pMinimoPerS' + FondoSerieGralId).val(data.Table[0].fn_PlazoMinPerman);
            $('#comCliS' + FondoSerieGralId).val(data.Table[0].fi_ComisionCteId);
            $('#serieActivosS' + FondoSerieGralId).val(data.Table[0].fb_SerieConActivo);
            $('#feeS' + FondoSerieGralId).val(data.Table[0].fn_Fee);
            $('#platOpS' + FondoSerieGralId).val(data.Table[0].fc_PlataformaOpera);
            $('#inicioOpsS' + FondoSerieGralId).val(data.Table[0].fd_InicioOps?.substring(0, 10)??'');
            $('#iniSerieS' + FondoSerieGralId).val(data.Table[0].fd_InicioSerie?.substring(0, 10)??'');
            $('#isinS' + FondoSerieGralId).val(data.Table[0].fc_ISIN);
            $('#adqAcotS' + FondoSerieGralId).val(catalogos.PosibleAdquiriente.find(i => i.fi_PosibleAdqId === data.Table[0].fi_PosiblesAdqId)?.fc_PosibAdqAcotado??'');
            $('#tickerBloomS' + FondoSerieGralId).val(data.Table[0].fc_TickerBloomberg);
            



            data.Table1.forEach(i => {
                console.log(`distri${FondoSerieGralId}_${i.fi_DistribuidoraId}`);
                $(`#distri${FondoSerieGralId}_${i.fi_DistribuidoraId}`).attr('checked', true);
            });
            console.log(data);
            Swal.close()
        } catch (error) {
            console.error(error)
            // Manejo de errores
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
    }
}


function dividirEnBloques(lista, num) {
  const bloques = [];
  for (let i = 0; i < lista.length; i += num) {
    bloques.push(lista.slice(i, i + num));
  }
  return bloques;
}



async function loadFSOperativa(element,FondoSerieGralId) {
    currentFdsr = FondoSerieGralId;
    if (!$(element).hasClass('collapsed')) {
        try {
            showLoadingAlert("Espere... cargando información.");
            await consultaCat("RecepOrdenes");
            await consultaCat("EjecucionOpera");
            await consultaCat("LiquidaOpera");
            await consultaCat("LiquidezOpT");
            let options = catalogos.RecepOrdenes.filter(i => i.fi_OperaPoliticaId === 2)
                .map(i => `<option value="${i.fi_RecpOrdenId}">${i.fc_RecepcionOrden}</option>`).join(" ");
            addOptions('recepOrdVS', options, FondoSerieGralId);
            
            options = catalogos.RecepOrdenes.filter(i => i.fi_OperaPoliticaId === 1)
                .map(i => `<option value="${i.fi_RecpOrdenId}">${i.fc_RecepcionOrden}</option>`).join(" ");
            addOptions('recepOrdS', options, FondoSerieGralId);
            
            
            options = catalogos.EjecucionOpera.filter(i => i.fi_OperaPoliticaId === 2)
                .map(i => `<option value="${i.fi_EjecOperaId}">${i.fc_EjecucionOpera}</option>`).join(" ");
            addOptions('ejecOpVS', options, FondoSerieGralId);
            options = catalogos.EjecucionOpera.filter(i => i.fi_OperaPoliticaId === 1)
                .map(i => `<option value="${i.fi_EjecOperaId}">${i.fc_EjecucionOpera}</option>`).join(" ");
            addOptions('ejecOpS', options, FondoSerieGralId);
            

            options = catalogos.LiquidaOpera.filter(i => i.fi_OperaPoliticaId === 2)
                .map(i => `<option value="${i.fi_LiquidaOperaId}">${i.fc_LiquidaOpera}</option>`).join(" ");
            addOptions('liqOpVS', options, FondoSerieGralId);
            options = catalogos.LiquidaOpera.filter(i => i.fi_OperaPoliticaId === 1)
                .map(i => `<option value="${i.fi_LiquidaOperaId}">${i.fc_LiquidaOpera}</option>`).join(" ");
            addOptions('liqOpS', options, FondoSerieGralId);
            
            options = catalogos.LiquidezOpT.filter(i => i.fi_OperaPoliticaId === 2)
                .map(i => `<option value="${i.fi_LiquidezTId}">${i.fc_LiquidezT}</option>`).join(" ");
            addOptions('liquiVS', options, FondoSerieGralId);
            options = catalogos.LiquidezOpT.filter(i => i.fi_OperaPoliticaId === 1)
                .map(i => `<option value="${i.fi_LiquidezTId}">${i.fc_LiquidezT}</option>`).join(" ");
            addOptions('liquiS', options, FondoSerieGralId);
            
            

            let response = await fetch(urlProducto + '/FdsrOperativa', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    fondoId: FondoSerieGralId
                })
            });

            if (!response.ok) {
                // Si hay un error en el status HTTP
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
            }

            let data = await response.json();
            const compra = data.Table.find(i => i.fi_OperaPoliticaId === 1);
            const venta = data.Table.find(i => i.fi_OperaPoliticaId === 2);


            $('#recepOrdS'+ FondoSerieGralId).val(compra?.fi_RecpOrdenId?? '');
            $('#ejecOpS'+ FondoSerieGralId).val(compra?.fi_EjecOperaId??'');
            $('#liqOpS'+ FondoSerieGralId).val(compra?.fi_LiquidaOperaId??'');
            $('#liquiS'+ FondoSerieGralId).val(compra?.fi_LiquidezTId??'');
            $('#horarioS'+ FondoSerieGralId).val(compra?.fc_Horario??'');
            $('#limRecS'+ FondoSerieGralId).val(compra?.fc_LimiteCompra??'');
            $('#diferencialS'+ FondoSerieGralId).val(compra?.fc_Diferencial??'');
            $('#txtGaraS'+ FondoSerieGralId).val(compra?.fc_TextoGarantizados??'');
            $('#recepOrdVS'+ FondoSerieGralId).val(venta?.fi_RecpOrdenId?? '');
            $('#ejecOpVS'+ FondoSerieGralId).val(venta?.fi_EjecOperaId??'');
            $('#liqOpVS'+ FondoSerieGralId).val(venta?.fi_LiquidaOperaId??'');
            $('#liquiVS'+ FondoSerieGralId).val(venta?.fi_LiquidezTId??'');
            $('#horarioVS'+ FondoSerieGralId).val(venta?.fc_Horario??'');
            $('#limRecVS'+ FondoSerieGralId).val(venta?.fc_LimiteCompra??'');
            $('#diferencialVS'+ FondoSerieGralId).val(venta?.fc_Diferencial??'');
            $('#txtGaraVS'+ FondoSerieGralId).val(venta?.fc_TextoGarantizados??'');


            console.log(data);
            Swal.close()
        } catch (error) {
            console.error(error)
            // Manejo de errores
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
    }
}


async function loadFSComercial(element,FondoSerieGralId) {
    currentFdsr = FondoSerieGralId;
    if (!$(element).hasClass('collapsed')) {
        try {
            showLoadingAlert("Espere... cargando información.");
            await consultaCat("PosibleAdquiriente");
            await consultaCat("RedDistribucion");
            await consultaCat("BancaAcotado");
            await consultaCat("SolicitudCpaVta");
            await consultaCat("Liquidez");
            await consultaCat("DistTerceros");
            await consultaCat("NombreComercial");
            

            console.log(catalogos.DistTerceros);
            let options = catalogos.DistTerceros
                .map(i => `<option value="${i.fi_DistTercerosId}">${i.fc_DistTerceros}</option>`).join(" ");
            addOptions('distTerS', options, FondoSerieGralId);
            options = catalogos.SolicitudCpaVta
                .map(i => `<option value="${i.fi_SolCpaVtaId}">${i.fc_SolCpaVta}</option>`).join(" ");
            addOptions('solCpaVta', options, FondoSerieGralId);
            options = catalogos.Liquidez
                .map(i => `<option value="${i.fi_LiquidezId}">${i.fc_Liquidez}</option>`).join(" ");
            addOptions('liquS', options, FondoSerieGralId);
            options = catalogos.PosibleAdquiriente
                .map(i => `<option value="${i.fi_PosibleAdqId}">${i.fc_PosibAdqAcotado}</option>`).join(" ");
            addOptions('adqAcS', options, FondoSerieGralId);
            options = catalogos.NombreComercial
                .map(i => `<option value="${i.fi_NombreComercialId}">${i.fc_NombreComercial}</option>`).join(" ");
            addOptions('nomComS', options, FondoSerieGralId);

            $('#RDistCh'+FondoSerieGralId).empty();
            let checks = '';
            dividirEnBloques(catalogos.RedDistribucion, 4).forEach(i => {
                let div = `<div class="col-md-4">`;
                i.forEach(e => {
                    div+= `
                        <div class="form-check">
                            <input disabled class="form-check-input" type="checkbox" id="rDistri${FondoSerieGralId}_${e.fi_RedDistId}">
                            <label class="form-check-label" for="casaBolsaSantander">${e.fc_RedDistribucion}</label>
                        </div>
                    `;
                });
                div += '</div>';
                checks += div;
            });

            $('#RDistCh'+FondoSerieGralId).append(checks);

            $('#bancAcS'+FondoSerieGralId).empty();
            checks = '';
            dividirEnBloques(catalogos.BancaAcotado, 2).forEach(i => {
                let div = `<div class="col-md-4">`;
                i.forEach(e => {
                    div+= `
                        <div class="form-check">
                            <input disabled class="form-check-input" type="checkbox" id="bancaAc${FondoSerieGralId}_${e.fi_BancaAcotadoId}">
                            <label class="form-check-label" for="casaBolsaSantander">${e.fc_BancaAcotado}</label>
                        </div>
                    `;
                });
                div += '</div>';
                checks += div;
            });

            $('#bancAcS'+FondoSerieGralId).append(checks);
            let response = await fetch(urlProducto + '/FdsrComerciales', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    fondoId: FondoSerieGralId
                })
            });

            if (!response.ok) {
                // Si hay un error en el status HTTP
                Swal.close();
                showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
            }

            let data = await response.json();

            data.Table1.forEach(i => {
                console.log(`rDistri${FondoSerieGralId}_${i.fi_RedDistId}`);
                $(`#rDistri${FondoSerieGralId}_${i.fi_RedDistId}`).attr('checked', true);
            });
            data.Table2.forEach(i => {
                console.log(`bancaAc${FondoSerieGralId}_${i.fi_BancaAcotadoId}`);
                $(`#bancaAc${FondoSerieGralId}_${i.fi_BancaAcotadoId}`).attr('checked', true);
            });

            $('#adqAcS'+ FondoSerieGralId).val(data.Table[0].fi_PosibleAdqId??'');
            $('#distTerS'+ FondoSerieGralId).val(data.Table[0].fi_DistTercerosId??'');
            $('#nomComSeS'+ FondoSerieGralId).val(`${catalogos.NombreComercial.find(i => i.fi_NombreComercialId === data.Table[0].fi_NombreComercialId??0)?.fc_NombreComercial??''} ${data.Table[0].fc_ClaseSerie}`);
            $('#nomComS'+ FondoSerieGralId).val(data.Table[0].fi_NombreComercialId??'');
            $('#prdType'+ FondoSerieGralId).val(data.Table[0].fc_ProductType);
            $('#solCpaVta'+ FondoSerieGralId).val(data.Table[0].fi_SolCpaVtaId??'');
            $('#liquS'+ FondoSerieGralId).val(data.Table[0].fi_LiquidezId??'');
            $('#horCieS'+ FondoSerieGralId).val(data.Table[0].fd_HoraCierre);

            console.log(data);
            Swal.close()
        } catch (error) {
            console.error(error)
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar los Grupos Comerciales.', 'error');
        }
    }
}


async function saveGenF(fondoId) {
    let button = $('.editGenF' + fondoId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
            let data = {
                fi_FondoId: fondoId, 
                fc_ClavePizarra: $('#pizarra' + fondoId).val(),
                fc_DenominacionSocial: $('#demSocial' + fondoId).val(),
                fd_fechaAutorizacion: $('#fAutProy' + fondoId).val(),
                fc_Calificacion: $('#clasif' + fondoId).val(), 
                fc_ClaveReglamentacion: $('#clveReg' + fondoId).val(),
                fc_BenchMark: $('#bench' + fondoId).val(),
                fd_FechaAlta: new Date().toISOString().split('T')[0], 
                fb_Estatus: true
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FondoGeneralesEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();

            
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }

            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            }

            data = {
                fi_FondoId: fondoId,
                fi_TipoId: parseInt($('#tipo' + fondoId).val()) === 0 ? null : $('#tipo' + fondoId).val(),
                fi_ClasifProspectoId: parseInt($('#clasifPro' + fondoId).val()) === 0 ? null : $('#clasifPro' + fondoId).val(),
                fi_SubfijoIPINId: parseInt($('#sufijoIPIN' + fondoId).val()) === 0 ? null : $('#sufijoIPIN' + fondoId).val(),
                fi_PlantillaId: parseInt($('#plantDici' + fondoId).val()) === 0 ? null : $('#plantDici' + fondoId).val(),
                fi_CalifCrediticiaId: parseInt($('#clasifCred' + fondoId).val()) === 0 ? null : $('#clasifCred' + fondoId).val(),
                fi_SensibilidadMdoId: parseInt($('#sensMercado' + fondoId).val()) === 0 ? null : $('#sensMercado' + fondoId).val(),
                fi_HorizonteProspectoId: parseInt($('#horProsp' + fondoId).val()) === 0 ? null : $('#horProsp' + fondoId).val(),
                fi_VolatilidadId: parseInt($('#volatilidad' + fondoId).val()) === 0 ? null : $('#volatilidad' + fondoId).val(),
                fi_PerfilFondoId: parseInt($('#perfilFondo' + fondoId).val()) === 0 ? null : $('#perfilFondo' + fondoId).val(),
                fi_ColorEspanaId: parseInt($('#clasifColorEsp' + fondoId).val()) === 0 ? null : $('#clasifColorEsp' + fondoId).val(),
                fi_ClasifEspanaId: parseInt($('#clasifEsp' + fondoId).val()) === 0 ? null : $('#clasifEsp' + fondoId).val(),
                fi_CalifHomogeneaId: parseInt($('#califHom' + fondoId).val()) === 0 ? null : $('#califHom' + fondoId).val()
            };
            responseCliente = await fetch(urlProducto + '/FdAdicionGralesEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }

            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editGenF' + fondoId);
            let saveButton = $('.saveGenF' + fondoId);
            let editTextButton = $('.editGenFText' + fondoId);
            let saveTextButton = $('.saveGenFText' + fondoId);
            let saveIcon = $('.saveGenFIcon' + fondoId);
            let editIcon = $('.editGenFIcon' + fondoId);
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

            await loadFondo(saveButton, fondoId);

            changeStatusInputForm(saveButton, true);
        }
    }
    // }
}

function editGenF(fondoId) {
    let editButton = $('.' + fondoId);
    let saveButton = $('.saveGenF' + fondoId);
    let editTextButton = $('.editGenFText' + fondoId);
    let saveTextButton = $('.saveGenFText' + fondoId);
    let editIcon = $('.editGenFIcon' + fondoId);
    let saveIcon = $('.saveGenFIcon' + fondoId);
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

async function saveRegLF(fondoId) {
    let button = $('.saveRegLF' + fondoId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        
        
        try {
            
            let data = {
                fi_RegimenLimitesId: null, 
                fi_FondoId: fondoId, 
                fc_ObjetivoInversion: $('#objInver'+ fondoId).val(),
                fc_InfRelevante: $('#infRev'+ fondoId).val(), 
                fi_IndiceReferenciaId: parseInt($('#indRef'+ fondoId).val()), 
                fc_ProteccionCapital: $('#protCap'+ fondoId).val(),  
                fc_RegimenPolitInvA: $('#regPolInvA'+ fondoId).val(), 
                fc_RegimenPolitInvB: $('#regPolInvB'+ fondoId).val(),  
                fc_RegimenPolitInvC: $('#regPolInvC'+ fondoId).val(), 
                fc_RegimenPolitInvD: $('#regPolInvD'+ fondoId).val(),  
                fc_RegimenPolitInvE: $('#regPolInvE'+ fondoId).val(), 
                fc_RegimenPolitInvF: $('#regPolInvFG'+ fondoId).val(), 
                fc_RegimenPolitInvG: '',
                fi_PaisId: parseInt($('#pais'+ fondoId).val()),
                fi_VehicleTypeId: parseInt($('#vehiType'+ fondoId).val()), 
                fi_AssetTypeId: parseInt($('#assetType'+ fondoId).val()), 
                fi_SubtipoId: parseInt($('#subtipo'+ fondoId).val())
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdRegimenLimitesDICIEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editRegLF' + fondoId);
            let saveButton = $('.saveRegLF' + fondoId);
            let editTextButton = $('.editRegLFText' + fondoId);
            let saveTextButton = $('.saveRegLFText' + fondoId);
            let saveIcon = $('.saveRegLFIcon' + fondoId);
            let editIcon = $('.editRegLFIcon' + fondoId);
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

            await loadFondoReg(saveButton, fondoId);

            changeStatusInputForm(saveButton, true);
        }
    }
}
function editRegLF(fondoId) {
    let editButton = $('.editRegLF' + fondoId);
    let saveButton = $('.saveRegLF' + fondoId);
    let editTextButton = $('.editRegLFText' + fondoId);
    let saveTextButton = $('.saveRegLFText' + fondoId);
    let editIcon = $('.editRegLFIcon' + fondoId);
    let saveIcon = $('.saveRegLFIcon' + fondoId);
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

async function saveComF(fondoId) {
    let button = $('.saveComF' + fondoId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
            let data = {
                fi_FdComercialesId: null,  
                fi_FondoId: fondoId,
                fi_GestorId: parseInt($('#gesCome'+ fondoId).val()),  
                fi_NombreComercialId: parseInt($('#nomCom'+ fondoId).val()),  
                fi_ComFamiliaId: parseInt($('#familia'+ fondoId).val()), 
                fi_EstrategiaInvId: parseInt($('#estInversion'+ fondoId).val()),  
                fi_TipoId: parseInt($('#tipAcotado'+ fondoId).val()), 
                fc_RegimenInv: $('#regInve'+ fondoId).val(), 
                fi_DivisaId: parseInt($('#divisa'+ fondoId).val()),  
                fi_AreaInvId: parseInt($('#areaInv'+ fondoId).val()), 
                fi_HorizonteProspectoId: parseInt($('#horAnios'+ fondoId).val())
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdComercialesEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editComF' + fondoId);
            let saveButton = $('.saveComF' + fondoId);
            let editTextButton = $('.editComFText' + fondoId);
            let saveTextButton = $('.saveComFText' + fondoId);
            let saveIcon = $('.saveComFIcon' + fondoId);
            let editIcon = $('.editComFIcon' + fondoId);
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

            await loadFondoCom(saveButton, fondoId);

            changeStatusInputForm(saveButton, true);
        }
    }
        
}
function editComF(fondoId) {
    let editButton = $('.editComF' + fondoId);
    let saveButton = $('.saveComF' + fondoId);
    let editTextButton = $('.editComFText' + fondoId);
    let saveTextButton = $('.saveComFText' + fondoId);
    let editIcon = $('.editComFIcon' + fondoId);
    let saveIcon = $('.saveComFIcon' + fondoId);
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

async function saveGenFS(FondoSerieGralId,fondoId) {
    let button = $('.saveGenFS' + FondoSerieGralId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
            let data = {

                fi_FondoSerieGralId: FondoSerieGralId, 
                fi_FondoId: fondoId, 
                fc_ClaseSerie: $('#claseSerieS' + FondoSerieGralId).val(), 
                fc_FondoSerie: $('#fondoSerieS' + FondoSerieGralId).val(), 
                fi_TipoAccionId: parseInt($('#tipoAccionS' + FondoSerieGralId).val()),  
                fi_PosiblesAdqId: parseInt($('#posAdquiS' + FondoSerieGralId).val()), 
                fn_MontoMinInv: parseFloat($('#mMinimoS' + FondoSerieGralId).val()),  
                fn_PlazoMinPerman: parseFloat($('#pMinimoPerS' + FondoSerieGralId).val()),  
                fi_ComisionCteId: parseInt($('#comCliS' + FondoSerieGralId).val()), 
                fb_SerieConActivo: true, 
                fn_Fee: parseFloat($('#feeS' + FondoSerieGralId).val()), 
                fd_InicioOps: $('#inicioOpsS' + FondoSerieGralId).val(), 
                fd_InicioSerie: $('#iniSerieS' + FondoSerieGralId).val(),  
                fc_ISIN: $('#isinS' + FondoSerieGralId).val(),  
                fc_TickerBloomberg: $('#tickerBloomS' + FondoSerieGralId).val(), 
                fc_PlataformaOpera: $('#platOpS' + FondoSerieGralId).val(),  
                fd_FechaAlta: new Date().toISOString().split('T')[0], 
                fb_Estatus: true
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdsrGeneralesEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } 
            let ids = [];
            let checkedCheckboxes = $(`#DistCh${FondoSerieGralId} input[type="checkbox"]:checked`);
            $.each(checkedCheckboxes, (i, v) => {
                ids.push(v.id.replace(`distri${FondoSerieGralId}_`,''))
            });
            data = {
                fi_FondoSerieGralId: FondoSerieGralId,
                csvIds: ids.join(','),
            };
            responseCliente = await fetch(urlProducto + '/FdsrDistribuidoraSelectEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }

            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editGenFS' + FondoSerieGralId);
            let saveButton = $('.saveGenFS' + FondoSerieGralId);
            let editTextButton = $('.editGenFSText' + FondoSerieGralId);
            let saveTextButton = $('.saveGenFSText' + FondoSerieGralId);
            let saveIcon = $('.saveGenFSIcon' + FondoSerieGralId);
            let editIcon = $('.editGenFSIcon' + FondoSerieGralId);
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

            await loadFSGral(saveButton, fondoId);

            changeStatusInputForm(saveButton, true);
        }
    }
}
function editGenFS(fondoId) {
    let editButton = $('.editGenFS' + fondoId);
    let saveButton = $('.saveGenFS' + fondoId);
    let editTextButton = $('.editGenFSText' + fondoId);
    let saveTextButton = $('.saveGenFSText' + fondoId);
    let editIcon = $('.editGenFSIcon' + fondoId);
    let saveIcon = $('.saveGenFSIcon' + fondoId);
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

async function saveOpeFS(FondoSerieGralId, fondoId) {
    let button = $('.saveOpeFS' + FondoSerieGralId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
    
            let data = {
                fi_FdsrOperativaid: 0,  
                fi_FondoSerieGralId: FondoSerieGralId, 
                fi_RecpOrdenId: parseInt($('#recepOrdS'+ FondoSerieGralId).val()), 
                fi_EjecOperaId: parseInt($('#ejecOpS'+ FondoSerieGralId).val()),  
                fi_LiquidaOperaId: parseInt($('#liqOpS'+ FondoSerieGralId).val()), 
                fi_LiquidezTId: parseInt($('#liquiS'+ FondoSerieGralId).val()),  
                fc_Horario: $('#horarioS'+ FondoSerieGralId).val(),  
                fc_LimiteCompra: $('#limRecS'+ FondoSerieGralId).val(), 
                fc_Diferencial: $('#diferencialS'+ FondoSerieGralId).val(),  
                fc_TextoGarantizados: $('#txtGaraS'+ FondoSerieGralId).val(),  
                fi_OperaPoliticaId: 1
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdsrOperativaEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editOpeFS' + FondoSerieGralId);
            let saveButton = $('.saveOpeFS' + FondoSerieGralId);
            let editTextButton = $('.editOpeFSText' + FondoSerieGralId);
            let saveTextButton = $('.saveOpeFSText' + FondoSerieGralId);
            let saveIcon = $('.saveOpeFSIcon' + FondoSerieGralId);
            let editIcon = $('.editOpeFSIcon' + FondoSerieGralId);
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

            await loadFSOperativa(saveButton, FondoSerieGralId);

            changeStatusInputForm(saveButton, true);
        }
    }

}
function editOpeFS(fondoId) {
    let editButton = $('.editOpeFS' + fondoId);
    let saveButton = $('.saveOpeFS' + fondoId);
    let editTextButton = $('.editOpeFSText' + fondoId);
    let saveTextButton = $('.saveOpeFSText' + fondoId);
    let editIcon = $('.editOpeFSIcon' + fondoId);
    let saveIcon = $('.saveOpeFSIcon' + fondoId);
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

async function saveOpeVFS(FondoSerieGralId, fondoId) {
    let button = $('.saveOpeVFS' + FondoSerieGralId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
    
            let data = {
                fi_FdsrOperativaid: null,  
                fi_FondoSerieGralId: FondoSerieGralId, 
                fi_RecpOrdenId: parseInt($('#recepOrdVS'+ FondoSerieGralId).val()), 
                fi_EjecOperaId: parseInt($('#ejecOpVS'+ FondoSerieGralId).val()),  
                fi_LiquidaOperaId: parseInt($('#liqOpVS'+ FondoSerieGralId).val()), 
                fi_LiquidezTId: parseInt($('#liquiVS'+ FondoSerieGralId).val()),  
                fc_Horario: $('#horarioVS'+ FondoSerieGralId).val(),  
                fc_LimiteCompra: $('#limRecVS'+ FondoSerieGralId).val(), 
                fc_Diferencial: $('#diferencialVS'+ FondoSerieGralId).val(),  
                fc_TextoGarantizados: $('#txtGaraVS'+ FondoSerieGralId).val(),  
                fi_OperaPoliticaId: 2
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdsrOperativaEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editOpeVFS' + FondoSerieGralId);
            let saveButton = $('.saveOpeVFS' + FondoSerieGralId);
            let editTextButton = $('.editOpeVFSText' + FondoSerieGralId);
            let saveTextButton = $('.saveOpeVFSText' + FondoSerieGralId);
            let saveIcon = $('.saveOpeVFSIcon' + FondoSerieGralId);
            let editIcon = $('.editOpeVFSIcon' + FondoSerieGralId);
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

            await loadFSOperativa(saveButton, FondoSerieGralId);

            changeStatusInputForm(saveButton, true);
        }
    }
}
function editOpeVFS(fondoId) {
    let editButton = $('.editOpeVFS' + fondoId);
    let saveButton = $('.saveOpeVFS' + fondoId);
    let editTextButton = $('.editOpeVFSText' + fondoId);
    let saveTextButton = $('.saveOpeVFSText' + fondoId);
    let editIcon = $('.editOpeVFSIcon' + fondoId);
    let saveIcon = $('.saveOpeVFSIcon' + fondoId);
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

async function saveComFS(FondoSerieGralId) {
    let button = $('.saveComFS' + FondoSerieGralId);
    if (!validateForm(button)) {
        cleanInputValidation(button);
        showLoadingAlert("Espere... cargando información.");
        try {
            
            let data = {
                fi_FdsrComercialesId: 0, 
                fi_FondoSerieGralId: FondoSerieGralId,
                fi_DistTercerosId: parseInt($('#distTerS'+ FondoSerieGralId).val()),
                fi_NombreComercialId: parseInt($('#nomComS'+ FondoSerieGralId).val()), 
                fc_NombreComSerie: $('#nomComSeS'+ FondoSerieGralId).val(),  
                fi_PosibleAdqId: parseInt($('#adqAcS'+ FondoSerieGralId).val()),  
                fc_ProductType: $('#prdType'+ FondoSerieGralId).val(), 
                fi_SolCpaVtaId: parseInt($('#solCpaVta'+ FondoSerieGralId).val()),  
                fi_LiquidezId: parseInt($('#liquS'+ FondoSerieGralId).val()),  
                fd_HoraCierre: $('#horCieS'+ FondoSerieGralId).val()
            }
            // Enviar los datos del cliente
            let responseCliente = await fetch(urlProducto + '/FdsrComercialesEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            let dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            }
            let ids = [];
            
            let checkedCheckboxes = $(`#RDistCh${FondoSerieGralId} input[type="checkbox"]:checked`);
            $.each(checkedCheckboxes, (i, v) => {
                ids.push(v.id.replace(`rDistri${FondoSerieGralId}_`,''))
            });
            data = {
                fi_FondoSerieGralId: FondoSerieGralId,
                csvIds: ids.join(','),
            };
            responseCliente = await fetch(urlProducto + '/FdsrRedDistSelectEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }

            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } 
            ids = [];
            checkedCheckboxes = $(`#bancAcS${FondoSerieGralId} input[type="checkbox"]:checked`);
            $.each(checkedCheckboxes, (i, v) => {
                ids.push(v.id.replace(`bancaAc${FondoSerieGralId}_`,''))
            });
            data = {
                fi_FondoSerieGralId: FondoSerieGralId,
                csvIds: ids.join(','),
            };
            responseCliente = await fetch(urlProducto + '/FdsrBancaAcotSelectEdit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            dataCliente = await responseCliente.json();
            if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                window.location.href = dataCliente.URL;
            }
            console.log(dataCliente);
            if (!responseCliente.ok) {
                Swal.close();
                showAlert('Error', 'Error al editar el cliente', 'error');
            }
            if (dataCliente < 1) {
                Swal.close();
                showAlert('', '', 'error');
                return;
            } else {
                Swal.close();
                showAlert('', '', 'success');
            }
            
        } catch(error){
            Swal.close();
            showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
            console.error('Error al editar o crear: ', error);
        } finally {
            let editButton = $('.editComFS' + FondoSerieGralId);
            let saveButton = $('.saveComFS' + FondoSerieGralId);
            let editTextButton = $('.editComFSText' + FondoSerieGralId);
            let saveTextButton = $('.saveComFSText' + FondoSerieGralId);
            let saveIcon = $('.saveComFSIcon' + FondoSerieGralId);
            let editIcon = $('.editComFSIcon' + FondoSerieGralId);
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
            await loadFSComercial(saveButton,FondoSerieGralId);

            changeStatusInputForm(saveButton, true);
        }
    }
}
function editComFS(fondoId) {
    let editButton = $('.editComFS' + fondoId);
    let saveButton = $('.saveComFS' + fondoId);
    let editTextButton = $('.editComFSText' + fondoId);
    let saveTextButton = $('.saveComFSText' + fondoId);
    let editIcon = $('.editComFSIcon' + fondoId);
    let saveIcon = $('.saveComFSIcon' + fondoId);
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

async function bajaFondo(fondoId) {
    Swal.fire({
        title: "¿Está seguro de dar de baja el fondo y sus series correspondientes?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Dar de baja",
        denyButtonText: `Cancelar`
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            showLoadingAlert("Espere... cargando información.");
            try {
                
                let data = {
                    fi_FondoId: fondoId
                }
                // Enviar los datos del cliente
                let responseCliente = await fetch(urlProducto + '/BajaFondo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(data)
                });

                let dataCliente = await responseCliente.json();
                if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                    window.location.href = dataCliente.URL;
                }
                console.log(dataCliente);
                if (!responseCliente.ok) {
                    Swal.close();
                    showAlert('Error', 'Error al editar el cliente', 'error');
                }
                if (dataCliente < 1) {
                    Swal.close();
                    showAlert('', '', 'error');
                    return;
                } else {
                    $('#accordionGroup').empty();
                    pagina.fi_Pagina = 0;
                    fillAcFondo();
                    Swal.close();
                    showAlert('', '', 'success');
                }
            } catch(error){
                Swal.close();
                showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
                console.error('Error al editar o crear: ', error);
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    });
    
}

async function bajaSerie(fondoSerieId, fondoId) {
    Swal.fire({
        title: "¿Está seguro de dar de baja la serie?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Dar de baja",
        denyButtonText: `Cancelar`
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            showLoadingAlert("Espere... cargando información.");
            try {
                
                let data = {
                    fi_FondoSerieGralId: fondoSerieId
                }
                // Enviar los datos del cliente
                let responseCliente = await fetch(urlProducto + '/BajaSerie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(data)
                });

                let dataCliente = await responseCliente.json();
                if (Object.hasOwn(dataCliente, 'SessionActiva')) {
                    window.location.href = dataCliente.URL;
                }
                console.log(dataCliente);
                if (!responseCliente.ok) {
                    Swal.close();
                    showAlert('Error', 'Error al editar el cliente', 'error');
                }
                if (dataCliente < 1) {
                    Swal.close();
                    showAlert('', '', 'error');
                    return;
                } else {
                    cargarFS(fondoId);
                    Swal.close();
                    showAlert('', '', 'success');
                }
            } catch(error){
                Swal.close();
                showAlert('Error', 'Error al editar cliente y domicilios.', 'error');
                console.error('Error al editar o crear: ', error);
            }
        } else if (result.isDenied) {
            Swal.close();
        }
    });
    
}