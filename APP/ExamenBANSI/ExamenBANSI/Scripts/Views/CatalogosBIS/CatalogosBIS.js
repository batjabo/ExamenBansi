$(document).ready(function () {

    // Mapea IDs con nombres
    // Para poner el titulo al catalogo de forma dinamica se tiene que registrar aqui
    // tambien hay7 que configurar el ancho de los campos de forma dinamica en la funcion "ValidarAncho"
    const catalogos = {
        1: "Calificación Crediticia",
        2: "Sensibilidad Mercado",
        3: "Posibles Adquirientes",
        4: "Distribuidora(s)",
        5: "Liquidez",
        6: "Clasificación Prospecto",
        7: "SubFijo IP-IN",
        8: "Color España",
        9: "Clasificación España",
        10: "Calificación Homogénea",
        11: "Nombre Comercial",
        12: "Familia",
        13: "Estrategia de Inversión",
        14: "Divisa",
        15: "Plantilla",
        16: "Volatilidad",
        17: "Perfil Fondo",
        18: "Tipo de Acciones",
        19: "Comisiones Cliente",
        20: "Red Distribución",
        21: "Distribución Terceros",
        22: "Banca Acotado",
        23: "Horizonte Prospecto",
        24: "Tipo",
        25: "COD Gestor",
        26: "VehicleType",
        27: "AssetType",
        28: "SubTipo",
        29: "Area de Inversión",
        30: "Recepción de órdenes",
        31: "Ejecución de Operaciones",
        32: "Liquidación de Operaciones",
        33: "Liquidez",
        34: "Solicitud Cpa-Vta",
        35: "Índice Referencia",
        36: "País",
        37: "Permanencia Sugerida",
        38: "Disponibilidad",
        39: "Descripción Fondo",
        40: "Excepción Horario Comercial",
        41: "Plazo mínimo Permancia"
    };

    // Obtener la última parte de la ruta
    const partes = window.location.pathname.split("/");
    const id = partes[partes.length - 1]; // "22"

    // Buscar el nombre correspondiente
    const titulo = catalogos[id] || "Catálogo desconocido";

    // Mostrar el resultado
    document.getElementById("tituloCatalogo").textContent = titulo;
    document.getElementById("tituloCatalogoCrea").textContent = `Creación del Catálogo: ${titulo}`; 
    document.getElementById("tituloCatalogoEdita").textContent = `Edición del Catálogo: ${titulo}`;
    
    document.getElementById("fi_tipoCatalogoid").textContent = id;
    
    // (opcional) Cambiar el título de la pestaña
    document.title = titulo;

    if (successMessage) {
        showAlert('Éxito', successMessage, 'success');
    }
    if (errorMessage) {
        showAlert('Error', errorMessage, 'error');
    }

    const rowsPerPage = 10; // Número de registros por página
    const tableBody = $("#groupTable tbody");
    const rows = tableBody.find("tr");
    const pagination = $("#pagination");

    let filteredRows = rows; // Filas que se manejarán (filtradas o todas las filas por defecto)

    // Renderiza la tabla según la página actual
    function renderTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        filteredRows.hide(); // Oculta todas las filas filtradas
        filteredRows.slice(start, end).show(); // Muestra solo las filas correspondientes a la página actual

        renderPagination(filteredRows.length, page);
    }

    // Renderiza el paginado
    function renderPagination(totalRows, currentPage) {
        pagination.empty(); // Limpia el contenido del paginado
        const totalPages = Math.ceil(totalRows / rowsPerPage);

        if (totalPages <= 1) return; // No mostrar paginado si solo hay una página

        // Botón "Anterior"
        pagination.append(`<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">Anterior</a>
        </li>`);

        // Números de página
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`<li class="page-item ${currentPage === i ? "active" : ""}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`);
        }

        // Botón "Siguiente"
        pagination.append(`<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a>
        </li>`);
    }

    // Controlador de eventos del paginado
    pagination.on("click", ".page-link", function (e) {
        e.preventDefault();
        const page = parseInt($(this).data("page"));
        renderTable(page);
    });

    function resetTable() {
        filteredRows = rows; // Resetea las filas visibles a todas las filas
        rows.show(); // Asegúrate de que todas las filas sean visibles inicialmente
        renderTable(1); // Renderiza la primera página con todos los registros
    }

    resetTable(); // Inicializa la tabla al cargar la página

    // Búsqueda dinámica
    $("#searchInput").on("input", function () {
        const searchTerm = $(this).val().trim().toLowerCase();

        // Si el campo de búsqueda está vacío, reinicia la tabla
        if (searchTerm === "") {
            resetTable();
            return;
        }

        // Filtra las filas
        filteredRows = rows.filter(function () {
            const name = $(this).children("td").eq(0).text().toLowerCase(); // Columna de Nombre
            const description = $(this).children("td").eq(1).text().toLowerCase();

            return name.includes(searchTerm) || description.includes(searchTerm);
        });

        // Resalta texto coincidente
        filteredRows.each(function () {
          
        });

        // Oculta las filas que no coinciden
        rows.not(filteredRows).hide();

        // Reinicia el paginado con los resultados filtrados
        renderTable(1);
    });

    // Resalta el texto coincidente en Nombre y Descripción
    function highlightText(row, searchTerm) {
        row.children("td").slice(0, 2).each(function () {
            const text = $(this).text();
            const regex = new RegExp(`(${searchTerm})`, "gi");
            const highlighted = text.replace(regex, `<mark>$1</mark>`);
            $(this).html(highlighted);
        });
    }

   
    // Evitar sobrescribir contenido de íconos
    rows.find("td").each(function () {
        $(this).html($(this).data("originalContent"));
        
    });

    // Restaurar contenido de los íconos cuando el buscador se vacía
    function resetIcons() {
        rows.find("td").each(function () {
            $(this).html($(this).data("originalContent"));

        });
        
    }

    // Resetea los íconos y los registros al vaciar el buscador
    $("#searchInput").on("keydown", function () {
        if ($(this).val().trim() === "") {
            resetIcons();
        }
    });


    // Manejar el envío del formulario de edición
    $("#editForm").on("submit", function (e) {
        e.preventDefault(); // Evitar el envío estándar del formulario
        const data = $(this).serialize(); // Serializar los datos del formulario
    });

    // Manejar el envío del formulario de eliminacion
    $("#deleteForm").on("submit", function (e) {
        e.preventDefault(); // Evitar el envío estándar del formulario

        const data = $(this).serialize(); // Serializar los datos del formulario

    });

       

    // Script para pasar datos al modal de edición
    $('#editModal').on('show.bs.modal', function () {
        const modal = $(this);

        // Limpia todos los inputs
        modal.find('input, select, textarea').each(function () {
            $(this).removeClass('is-valid is-invalid'); // quita estado visual
        });

        // Elimina mensajes de validación anteriores
        modal.find('.valid-feedback, .invalid-feedback').remove();

        // Rehabilita el botón "Guardar"
        modal.find('#btnAceptar-editDescripcion').prop('disabled', false);
    });

    //modal de alta 
    const createModal = document.getElementById("createModal");
    createModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const id =  partes[partes.length - 1];
        const ElementById = "createDescripcion";
        const ElementById_B = "createDescripcionB";
        const ElementById_C = "createDescripcionC";
        const ElementById_D = "createDescripcionD";


        ValidarAncho(id, ElementById, ElementById_B, ElementById_C)

    });

    const editModal = document.getElementById("editModal");
    editModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const Tipocatalogo = button.getAttribute("data-id");
        const CatalogoId = button.getAttribute("data-catalogoid");
        const descripcion = button.getAttribute("data-descripcion");
        const descripcionB = button.getAttribute("data-descripcionB");
        const descripcionC = button.getAttribute("data-descripcionC");
        const descripcionD = button.getAttribute("data-descripcionD");
 
        document.getElementById("tipoCatalogoId").value = Tipocatalogo;
        document.getElementById("CatalogoId").value = CatalogoId;
        document.getElementById("editDescripcion").value = descripcion;

        const ElementById = "editDescripcion";
        const ElementById_B = "editDescripcionB";
        const ElementById_C = "editDescripcionC";
        const ElementById_D = "editDescripcionD";


        if (document.getElementById("editDescripcionB")) {
            document.getElementById("editDescripcionB").value = descripcionB || "";
        }
        if (document.getElementById("editDescripcionC")) {
            document.getElementById("editDescripcionC").value = descripcionC || "";
        }

        if (document.getElementById("editDescripcionD")) {

            document.getElementById("editDescripcionD").value = convertirAISO(descripcionD);
        }

        const select = document.getElementById("select-EditDescripcionB")
            || document.getElementById("select-CreateDescripcionB");
        if (select) {
            select.options[0].text = descripcionB || "Seleccione una opción";
            
        }

                
        ValidarAncho(Tipocatalogo, ElementById, ElementById_B, ElementById_C)

    });

    // Script para abrir el modal de eliminación y cargar los datos
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const Tipocatalogo = button.getAttribute("data-id");
        const CatalogoId = button.getAttribute("data-catalogoid");
        const descripcion = button.getAttribute("data-descripcion");
        const descripcionB = button.getAttribute("data-descripcionB");
        const descripcionC = button.getAttribute("data-descripcionC");
        const descripcionD = button.getAttribute("data-descripcionD");

        // Asignar valores a los campos ocultos y texto del modal
        document.getElementById('deleteId').value = Tipocatalogo;
        document.getElementById('CatalogoId').value = CatalogoId;
        document.getElementById("deleteDescripcion").value = descripcion;
        document.getElementById("descripcion").textContent = descripcion;

        if (document.getElementById("deleteDescripcionB")) {
            document.getElementById("deleteDescripcionB").value = descripcionB || "";
        }
        if (document.getElementById("deleteDescripcionC")) {
            document.getElementById("deleteDescripcionC").value = descripcionC || "";
        }
        if (document.getElementById("deleteDescripcionD")) {
            document.getElementById("deleteDescripcionD").value = descripcionD || "";
        }

    });
    

    // Manejo del envío del formulario con AJAX
    $("#deleteForm").on("submit", function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        let idCatalogo = document.getElementById("fi_tipoCatalogoid").innerText;

        const formData = {
            fi_tipoCatalogoid: idCatalogo,
            fc_descripcion: document.getElementById("deleteDescripcion").value,
            fi_Catalogoid: document.getElementById("CatalogoId").value
        };
        if (document.getElementById("deleteDescripcionB")) {
            formData.fc_descripcionB = document.getElementById("deleteDescripcionB").value;
        }

        if (document.getElementById("deleteDescripcionC")) {
            formData.fc_descripcionC = document.getElementById("deleteDescripcionC").value;
        };
        if (document.getElementById("deleteDescripcionD")) {
            formData.fc_descripcionD = document.getElementById("deleteDescripcionD").value;
        };

        const url = controller + '/DeleteCatalogoBIS'; // URL para la acción Delete
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (response) {
                if (response.success) {
                    // Manejo del éxito
                    $("#deleteModal").modal("hide"); // Cerrar el modal
                    showAlert('Éxito', response.message, 'success');
                    location.reload(); // Recargar la página para actualizar la tabla
                } else {
                    // Manejo del error del servidor
                    showAlert('Error', 'No es posible elimnar el catalogo porque tiene una realción asociada.', 'error');
                    $("#deleteModal").modal("hide");
                }
            },
            error: function (xhr) {
                // Manejo de errores generales
                console.error(xhr.responseText);
                showAlert('Error', 'Ocurrió un error al intentar eliminar el catalogo.', 'error');
            },
        });
    });


});

function sendEditRequest(actionButton) {
    console.log(actionButton);
    if (!validateForm($(actionButton))) {
        cleanInputValidation($(actionButton));
        let form = $(actionButton).closest('form');
        let formData = form.serialize(); // Serializar los datos del formulario

        // 🔹 Si existe el select condicional (solo aparece en algunos catálogos)
        let select = document.getElementById("select-EditDescripcionB");
        if (select) {
            // Obtener value y texto del select
            let valorSeleccionado = select.value;
            let textoSeleccionado = select.options[select.selectedIndex].text;
            // Agregar ambos valores al formData 
            
            formData += "&fc_descripcionC=" + encodeURIComponent(valorSeleccionado);
            formData += "&fc_descripcionB=" + encodeURIComponent(textoSeleccionado);
        }

        $.ajax({
            url: controller + '/EditarCatalogoBIS',
            type: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    
                    showAlert('Éxito', response.message, 'success');
                    $('#editModal').modal('hide'); // Cerrar el modal de edición
                    location.reload(); // Recargar la página
                } else {
                    showAlert('Error', response.message, 'error');
                }
            },
            error: function () {
                showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
            }
        });

        return false; // Prevenir el comportamiento estándar
    } else {
        showAlert('Error', 'Favor de validar los campos', 'error');
    }
}

function saveGuardar(actionButton) {
    console.log(actionButton);
    if (!validateForm($(actionButton))) {
        cleanInputValidation($(actionButton));
        let form = $(actionButton).closest('form');
        let idCatalogo = document.getElementById("fi_tipoCatalogoid").innerText;
        const formData = {
                    fi_tipoCatalogoid: idCatalogo,
                    fc_descripcion: document.getElementById("createDescripcion").value
        };
        if (document.getElementById("createDescripcionB")) {
            formData.fc_descripcionB = document.getElementById("createDescripcionB").value;
        }

        if (document.getElementById("createDescripcionC")) {
            formData.fc_descripcionC = document.getElementById("createDescripcionC").value;
        };

        if (document.getElementById("createDescripcionD")) {
            formData.fc_descripcionD = document.getElementById("createDescripcionD").value;
        };

        let descripcionB = document.getElementById("select-CreateDescripcionB");

        if (descripcionB && descripcionB.tagName === "SELECT") {
            const selectedText = descripcionB.options[descripcionB.selectedIndex].text;
            const selectedValue = descripcionB.value;

            formData.fc_descripcionB = selectedText;
            formData.fc_descripcionC = selectedValue;

        }

        let urlAgregaCatalogo = controller + '/AgregaCatalogoBIS';
        $.ajax({
            url: urlAgregaCatalogo,
            type: 'POST',
            data: formData,
            success: function (response) {
                if (response.data.includes("Error")) {
                    showAlert('Error', response.data, 'error');
                }
                else {
                    showAlert('Éxito', response.message, 'success');
                    $('#createModal').modal('hide'); // Cerrar el modal de edición
                    location.reload(); // Recargar la página
                }
            },
            error: function () {
                showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
            }
        });

        return false; // Prevenir el comportamiento estándar
    } else {
        showAlert('Error', 'Favor de validar los campos', 'error');
    }
}

function validarTexto(elemento) {
    // Obtener el span de error
    const ultimoCaracter = elemento.id.slice(-1);
    const longitud = elemento.id.length;
    let boton = elemento.id;
    if (ultimoCaracter == 'B' || ultimoCaracter == 'C') {
        boton = elemento.id.slice(0, longitud - 1);
    } else {
        boton = elemento.id.slice(0, longitud);
    }
    const errorMsg = document.getElementById("error-" + elemento.id);
 
    const btnGuardar = document.getElementById("btnAceptar-" + boton);
    // Validar si hay error

    let label = $('label[for="' + $(elemento).attr('id') + '"]')[0];
    let campo = label.textContent;
    if ($(elemento).attr('data-validations') !== 'email' && $(elemento).attr('data-validations') !== 'webPage') {
        passToUpper($(elemento));
    }
    if ($(elemento).val().match(regularExpressions[$(elemento).attr('data-validations')]) !== null) {
       
        $(elemento).removeClass("is-invalid");
        $(elemento).addClass("is-valid");
        $(elemento).parent().find(".invalid-feedback").remove();
        $(elemento).parent().find(".valid-feedback").remove();
        $(elemento).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        btnGuardar.disabled = false;
    }
         
    else {
        $(elemento).removeClass("is-valid");
        $(elemento).addClass("is-invalid");
        $(elemento).parent().find(".valid-feedback").remove();
        $(elemento).parent().find(".invalid-feedback").remove();
        //$(elemento).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(elemento).attr('data-validations')]}.</div>`);
        $(elemento).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
        btnGuardar.disabled = true;
    }

    //Nuevo bloque: verificar todos los inputs del formulario antes de activar el botón
    const form = elemento.closest("form");
    let todosValidos = true;

    // Busca todos los inputs requeridos dentro del formulario
    form.querySelectorAll("input[required], select[required], textarea[required]").forEach((input) => {
        if (!input.classList.contains("is-valid")) {
            todosValidos = false;
        }
    });

    // Habilita o deshabilita el botón según el estado global
    btnGuardar.disabled = !todosValidos;
}

$('#deleteModal').on('hidden.bs.modal', function () {
    // Mueve el foco al botón que abrió el modal
    $('#btnAbrirModal').focus();
});

//mapeo de ancho de columnas para la descripción del titulo y limite de caracteres
function ValidarAncho(idCatalogo, ElementById, ElementById_B, ElementById_C) {
    
    const inputmxLgt = document.getElementById(ElementById);
    const inputmxLgt_2 = document.getElementById(ElementById_B);    
    const inputmxLgt_3 = document.getElementById(ElementById_C);    
    
    let match = ElementById.match(/(create|edit)/); //verifico si viene del modal crear o del modal edit
    const span = document.getElementById(match[0]+"-spanMax");
    const spanB = document.getElementById(match[0] + "-spanMaxB");
    const spanC = document.getElementById(match[0] + "-spanMaxC");
    const spanD = document.getElementById(match[0] + "-spanMaxD");


    switch (idCatalogo) {
        case '1':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;

        case '2':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;

        case '3':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_2.maxLength = 200;
            spanB.textContent = `Máximo ${inputmxLgt_2.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_3.maxLength = 60;
            spanC.textContent = `Máximo ${inputmxLgt_3.maxLength} caracteres`; // actualizamos el span
            break;
        case '4':
            inputmxLgt.maxLength = 150;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '5':
            inputmxLgt.maxLength = 150;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '6':
            inputmxLgt.maxLength = 50;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '7':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '8':
            inputmxLgt.maxLength = 50;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '9':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '10':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '11':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '12':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '13':
            inputmxLgt.maxLength = 100;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '14':
            inputmxLgt.maxLength = 100;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '15':
            inputmxLgt.maxLength = 15;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '16':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '17':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '18':
            inputmxLgt.maxLength = 60;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '19':
            inputmxLgt.maxLength = 50;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '20':
            inputmxLgt.maxLength = 60;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '21':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;

        case '22':
            inputmxLgt.maxLength = 100;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '23':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_2.maxLength = 50;
            spanB.textContent = `Máximo ${inputmxLgt_2.maxLength} caracteres`; // actualizamos el span
            break;
        case '24':
            inputmxLgt.maxLength = 60;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_2.maxLength = 10;
            spanB.textContent = `Máximo ${inputmxLgt_2.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_3.maxLength = 25;
            spanC.textContent = `Máximo ${inputmxLgt_3.maxLength} caracteres`; // actualizamos el span
            break;
        case '25':
            inputmxLgt.maxLength = 150;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_2.maxLength = 30;
            spanB.textContent = `Máximo ${inputmxLgt_2.maxLength} caracteres`; // actualizamos el span
            inputmxLgt_3.maxLength = 30;
            spanC.textContent = `Máximo ${inputmxLgt_3.maxLength} caracteres`; // actualizamos el span
            break;
        case '26':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '27':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '28':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '29':
            inputmxLgt.maxLength = 100;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '30':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '31':
            inputmxLgt.maxLength = 80;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '32':
            inputmxLgt.maxLength = 100;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '33':
            inputmxLgt.maxLength = 50;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '34':
            inputmxLgt.maxLength = 200;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break;
        case '35':
            inputmxLgt.maxLength = 30;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '36':
            inputmxLgt.maxLength = 50;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '37':
            inputmxLgt.maxLength = 20;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '38':
            inputmxLgt.maxLength = 120;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '39':
            inputmxLgt.maxLength = 800;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '40':
            inputmxLgt.maxLength = 10;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
        case '41':
            inputmxLgt.maxLength = 10;
            span.textContent = `Máximo ${inputmxLgt.maxLength} caracteres`; // actualizamos el span
            break
    }

}

//para colocar la fecha en el inoput date de gestor
function convertirAISO(fechaTexto) {
    if (!fechaTexto) return '';

    fechaTexto = fechaTexto.replace(' a. m.', ' AM').replace(' p. m.', ' PM');

    const [parteFecha, parteHora, ampm] = fechaTexto.split(' ');
    const [dia, mes, anio] = parteFecha.split('/').map(Number);
    let [hora, minuto, segundo] = parteHora.split(':').map(Number);

    if (ampm === 'PM' && hora < 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;

    const date = new Date(anio, mes - 1, dia, hora, minuto, segundo);
    if (isNaN(date)) return '';

    // Aquí retornamos formato ISO para input type="date"
    return date.toISOString().split('T')[0];
}

function validarFecha(input) {
    const valor = input.value.trim();
    const mensajeError = document.getElementById('error-' + input.id);
    const ultimoCaracter = input.id.slice(-1);
    const longitud = input.id.length;
    let boton = input.id;
    if (ultimoCaracter == 'B' || ultimoCaracter == 'C' || ultimoCaracter == 'D') {
        boton = input.id.slice(0, longitud - 1);
    } else {
        boton = input.id.slice(0, longitud);
    }

    let label = $('label[for="' + $(input).attr('id') + '"]')[0];
    let campo = label.textContent;
    const btnGuardar = document.getElementById("btnAceptar-" + boton);

    if (!valor) {
        // Si está vacío
        $(input).removeClass("is-valid");
        $(input).addClass("is-invalid");
        $(input).parent().find(".valid-feedback").remove();
        $(input).parent().find(".invalid-feedback").remove();
        //$(elemento).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(elemento).attr('data-validations')]}.</div>`);
        $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
        btnGuardar.disabled = true;
        return false;
    }

    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) {
        $(input).removeClass("is-valid");
        $(input).addClass("is-invalid");
        $(input).parent().find(".valid-feedback").remove();
        $(input).parent().find(".invalid-feedback").remove();
        //$(elemento).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(elemento).attr('data-validations')]}.</div>`);
        $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
        btnGuardar.disabled = true;
        return false;
    }

    else {
        // Si está vacío
        $(input).removeClass("is-invalid");
        $(input).addClass("is-valid");
        $(input).parent().find(".invalid-feedback").remove();
        $(input).parent().find(".valid-feedback").remove();
        $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        btnGuardar.disabled = false;
        return false;
    }

    //$(input).removeClass("is-valid");
    //$(input).addClass("is-invalid");
    //$(input).parent().find(".valid-feedback").remove();
    //$(input).parent().find(".invalid-feedback").remove();
    //$(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
    //btnGuardar.disabled = true;

    //Nuevo bloque: verificar todos los inputs del formulario antes de activar el botón
    const form = input.closest("form");
    let todosValidos = true;

    // Busca todos los inputs requeridos dentro del formulario
    form.querySelectorAll("input[required], select[required], textarea[required]").forEach((input) => {
        if (!input.classList.contains("is-valid")) {
            todosValidos = false;
        }
    });

    // Habilita o deshabilita el botón según el estado global
    btnGuardar.disabled = !todosValidos;

    //// Si pasa las validaciones
    //mensajeError.style.display = 'none';
    //input.classList.remove('is-invalid');
    return true;
}
