
$(document).ready(function () {


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

    const editModal = document.getElementById("editModal");
    editModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const idexamen = button.getAttribute("data-id");
        const nombre = button.getAttribute("data-catalogoid");
        const descripcion = button.getAttribute("data-descripcion");
        
        document.getElementById("idExamen").value = idexamen;
        document.getElementById("editNombre").value = nombre;
        document.getElementById("editDescripcion").value = descripcion;

        const ElementById = "editDescripcion";
    });

    const createModal = document.getElementById("createModal");
    createModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const idExamen = button.getAttribute("data-id");
        const nombre = button.getAttribute("data-nombre");
        const descripcion = button.getAttribute("data-descripcion");
               
    });

});


function saveGuardarEdit() {
    var retValTipo = 0;
    const formData = {
        fi_idExamen: idExamen,
        fb_Estatus: 0
    };
    const seleccionado = document.querySelector('input[name="radioTipo"]:checked');
    if (seleccionado) {
        if (seleccionado.id == "rdADO") { retValTipo = 1 };
        if (seleccionado.id == "rdWS") { retValTipo = 0 }
    } else { alert("debe elegir un metodo de extraccion de datos"); return; };

    if (document.getElementById("editNombre")) {
        formData.fc_Nombre = document.getElementById("editNombre").value;
    } else { alert('debe de ingresar el nombre'); return; }
    if (document.getElementById("editDescripcion")) {
        formData.fc_Descripcion = document.getElementById("editDescripcion").value;
    } else { alert('debe de ingresar descripción'); return; }

    let urlAgrega = 'Examen/guardaExamenEdit';
    $.ajax({
        url: urlAgrega,
        type: 'POST',
        data: {
            model: formData,
            metodo: retValTipo
        },
        success: function (response) {
            if (response.data("Error")) {
                showAlert('Error', response.data, 'error');
            }
            else {
                showAlert('Éxito', response.message, 'success');
                $('#createModal').modal('hide'); // Cerrar el modal de edición

            }
        },
        error: function () {
            showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
        }
    });


}
    
function cargaExamenes() {
    var retValTipo = 0;
    const seleccionado = document.querySelector('input[name="radioTipo"]:checked');
    if (seleccionado) {
        if (seleccionado.id == "rdADO") { retValTipo = 1 };
        if (seleccionado.id == "rdWS") { retValTipo = 0 }
    } else { alert("debe elegir un metodo de extraccion de datos"); return; };
    let url = 'Examen/functionLista';
    $.ajax({
        url: url,
        type: 'Get',
        data: {
            fi_idExamen : 0,
            metodo : retValTipo
        },
        success: function (response) {
            const dataRes = response.data;
            const table = document.getElementById("dataExamen");
            if (!dataRes || dataRes.length == 0) {
                table.innerHTML = `<tr><td colspan="3">No se encontraron registros</td></tr>`;
            }
                table.innerHTML = "";
                    dataRes.forEach(function(item) {
                        table.innerHTML += `
                            <tr>
                                <td>${item.fc_Nombre}</td>
                                <td>${item.fc_Descripcion}</td>
                                <td>
                                    <a href="#" class="info-blue" data-bs-toggle="modal" data-bs-target="#editModal"
                                        data-id="${item.fi_idExamen}"
                                        data-nombre="${item.fc_Nombre}"
                                        data-descripcion="${item.fc_Descripcion}"
                                        <span class="material-symbols-outlined">edit</span>
                                    </a>
                                </td>
                                <td>
                                    <a href="#" class="info-blue" onclick="window.idSeleccionado = this.dataset.id; Eliminar(window.idSeleccionado);"
                                    
                                        data-id="${item.fi_idExamen}"
                                        data-nombre="${item.fc_Nombre}"
                                        data-descripcion="${item.fc_Descripcion}"
                                        
                                        <span class="material-symbols-outlined">Delete</span>
                                    </a>
                                </td>
                            </tr>
                          `
                    });
                showAlert('Éxito', response.message, 'success');
        },
        error: function () {
            showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
        }
    });
}

function saveGuardar() {
    var retValTipo = 0;
    const formData = {
        fi_idExamen: 0,
        fb_Estatus: 1
    };
    const seleccionado = document.querySelector('input[name="radioTipo"]:checked');
    if (seleccionado) {
        if (seleccionado.id == "rdADO") { retValTipo = 1 };
        if (seleccionado.id == "rdWS") { retValTipo = 0 }
    } else { alert("debe elegir un metodo de extraccion de datos"); return; };

    if (document.getElementById("createNombre")) {
        formData.fc_Nombre = document.getElementById("createNombre").value;
    } else { alert('debe de ingresar el nombre'); return; }
    if (document.getElementById("createDescripcion")) {
        formData.fc_Descripcion = document.getElementById("createDescripcion").value;
    } else { alert('debe de ingresar descripción'); return; }

    let url = 'Examen/guardaExamen';

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            model: formData,
            metodo: retValTipo
        },
        success: function (response) {
            
            showAlert('Éxito', response.message, 'success');
        },
        error: function () {
            showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
        }
    });

}   

function Eliminar(param) {
    var retValTipo = 0;
    const seleccionado = document.querySelector('input[name="radioTipo"]:checked');
    if (seleccionado) {
        if (seleccionado.id == "rdADO") { retValTipo = 1 };
        if (seleccionado.id == "rdWS") { retValTipo = 0 }
    } else { alert("debe elegir un metodo de extraccion de datos"); return; };
        
        
    let url = 'Examen/EliminaRegistro';
    $.ajax({
        url: url,   
        type: 'POST',
        data: {
            fi_idExamen: param ,
            metodo: retValTipo
        },
        success: function (response) {
            if (response.data("Error")) {
                showAlert('Error', response.data, 'error');
            }
            else {
                showAlert('Éxito', response.message, 'success');
                $('#createModal').modal('hide'); // Cerrar el modal de edición

            }
        },
        error: function () {
            showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
        }
    });
}
