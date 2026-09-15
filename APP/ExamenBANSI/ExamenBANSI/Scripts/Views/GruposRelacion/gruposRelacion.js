function deleteElementgcTableDel(id) {
    if (selectedClients.length <= 1) {
        showAlert('Atención', 'Se necesita al menos un cliente seleccionado para realizar esta operación.', 'warning');
        return;
    }
    $(`#tdDel${id.split('-')[0]}`).remove();
    $(`[data-id='${id}']`).prop('checked', false);
    selectedClients = selectedClients.filter(i => i !== id);
    printBadgeContainer();
    
    if (selectedClients.length === 1) {
        $('.btneliminar').hide();
    }

}

function cancelRel() {
    $('#clientContainer').show();
    $('#gcContainer').hide();
    choices.removeActiveItems();
}


function deleteElementgcTableRel(id) {
    if (selectedClients.length <= 1) {
        showAlert('Atención', 'Se necesita al menos un cliente seleccionado para realizar esta operación.', 'warning');
        return;
    }
    $(`#tdRel${id.split('-')[0]}`).remove();
    $(`[data-id='${id}']`).prop('checked', false);
    selectedClients = selectedClients.filter(i => i !== id);
    printBadgeContainer();

    if (selectedClients.length === 1) {
        $('.btneliminar1').hide();
    }


}

// Función para obtener los IDs de los checkboxes seleccionados
// function selectedClients {
//     const selectedIds = Array.from(checkboxesG)
//         .filter((checkbox) => checkbox.checked)
//         .map((checkbox) => checkbox.dataset.id);
//     return selectedIds;
// }


async function deleteRel(ctesId) {
    try {
        showLoadingAlert("Espere... cargando información.");
        const responseCliente = await fetch(`${urlCliente}/ClientesGcDelRel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                ctesId: ctesId
            }),
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }
        console.log(dataCliente);
        if (dataCliente === ctesId.split(',').length) {
            Swal.close();
            showAlert('Operación exitosa', 'Relacion(es) eliminada(s) correctamente.', 'success');
            $('#searchGC').val('');
            $('#filterSelect').val('all');
            loadTable();
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
            
        } else {
            Swal.close();
            showAlert('Error', 'Una o más relaciones no se eliminaron con éxito, favor de validar.', 'error');
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
        }

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
        $('#clientContainer').show();
        $('#gcContainer').hide();
        clearSelection();
        choices.removeActiveItems();
    }
    

}

async function addRel(ctesId,grupoComercial) {
    try {
        showLoadingAlert("Espere... cargando información.");
        const responseCliente = await fetch(`${urlCliente}/ClientesGcAddRel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                ctesId: ctesId,
                pi_GrupoComercialId: grupoComercial
            }),
        });
        const dataCliente = await responseCliente.json();
        if (Object.hasOwn(dataCliente, 'SessionActiva')) {
            window.location.href = dataCliente.URL;
        }
        console.log(dataCliente);
        console.log(ctesId);
        if (dataCliente === ctesId.split(',').length) {
            Swal.close();
            showAlert('Operación exitosa', 'Relacion(es) agregada(s) correctamente.', 'success');
            $('#searchGC').val('');
            $('#filterSelect').val('all');
            loadTable();
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
        } else {
            Swal.close();
            showAlert('Error', 'Una o más relaciones no se agregaron con éxito, favor de validar.', 'error');
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
        }

        if (!responseCliente.ok) {
            Swal.close();
            showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
            $('#clientContainer').show();
            $('#gcContainer').hide();
            clearSelection();
            choices.removeActiveItems();
        }

    } catch (error) {
        Swal.close();
        showAlert('Error', 'Ocurrió un error al cargar la información.', 'error');
        console.error('Error en la solicitud:', error);
        $('#clientContainer').show();
        $('#gcContainer').hide();
        clearSelection();
        choices.removeActiveItems();
    }


}

const loadTable = async (page = 1, search = "", filter = "all") => {
    const length = 10; // Cantidad de registros por página
    const start = (page - 1) * length;


    try {
        const response = await fetch(`${urlCliente}/GetClienteRelacion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pi_Start: start,
                pi_Length: length,
                pc_Filter: filter,
                pc_Search: search,
                pc_SortColumn: "fc_NombreCliente",
                pc_SortDirection: "ASC",
            }),
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.statusText);
        }

        const data = await response.json();
        if (Object.hasOwn(data, 'SessionActiva')) {
            window.location.href = data.URL;
        }
        const { records, totalRecords } = JSON.parse(data);

        console.log(records);

        // Limpiar la tabla
        const tbody = document.querySelector("#gcTable tbody");
        tbody.innerHTML = "";

        // Renderizar los datos
        records.forEach((record) => {
            let dataId = `${record.fi_ClienteId}-${record.fc_NombreCliente}`;
            console.log(dataId);
            const row = `
                        <tr>
                            <td>
                                <input type="checkbox" class="form-check-input" 
                                    data-id="${dataId}" 
                                    data-group="${record.fc_GrupoComercial !== "Sin grupo"}"
                                    onchange="selectClient(this)" 
                                    ${Array.from(selectedClients).some(i => i === dataId) ? 'checked': ''} >
                            </td>
                            <td>${record.fc_NombreCliente}</td>
                            <td>${record.fc_GrupoComercial}</td>
                        </tr>`;
            tbody.insertAdjacentHTML("beforeend", row);
        });

        const checkboxes = document.querySelectorAll(".form-check-input");
        toggleCheckboxes(clientGroup, checkboxes);
        // Configurar paginación
        const totalPages = Math.ceil(totalRecords / length);
        totalPagesG = totalPages;
        // Inicializar la paginación
        renderPagination(page, totalPages);
    } catch (error) {
        console.error("Error al cargar la tabla:", error);
    }
};

function selectClient(element) {
    const checkboxes = document.querySelectorAll(".form-check-input");
    let elementId = element.getAttribute("data-id");
    if (element.checked) {
        if (clientGroup === null) {
            clientGroup = element.getAttribute("data-group") === "true";
            if (clientGroup) {
                $('#delRelBtn').show();
                $('#addRelBtn').hide();
            } else {
                $('#delRelBtn').hide();
                $('#addRelBtn').show();
            }
            toggleCheckboxes(clientGroup, checkboxes);
        }
        selectedClients.push(elementId);
        printBadgeContainer();
    } else {
        selectedClients = selectedClients.filter(i => i !== elementId);
        printBadgeContainer();
        if (!Array.from(checkboxes).some((c) => c.checked) && selectedClients.length < 1) {
            toggleCheckboxes(null, checkboxes);
            clientGroup = null;
            $('#delRelBtn').hide();
            $('#addRelBtn').hide();
        }
    }
}

function clearSelection(){
    const checkboxes = document.querySelectorAll(".form-check-input");
    selectedClients = [];
    printBadgeContainer();
    toggleCheckboxes(null, checkboxes);
    clientGroup = null;
    $('#delRelBtn').hide();
    $('#addRelBtn').hide();
}

function printBadgeContainer() {
    console.log(clientGroup);
    if (clientGroup) {
        $('#txtBadgeCont').text('(Relacionados)');
    } else if (clientGroup === false) {
        $('#txtBadgeCont').text('(Sin relación)');
    } 

    if (selectedClients.length < 1) {
        $('#txtBadgeCont').text('');
    }
    $('.badge-container').empty();
    $('.badge-container').append(`${selectedClients.map(i => `
            <span class="badge badge-item" style="background-color:#005471">
                ${i}
                <button type="button" class="btn-close btn-close-white btn-sm ms-2" aria-label="Close" onclick="removeCliente(this, '${i}')"></button>
            </span>
    `).join('')}`);
}

function removeCliente(item, id) {
    item.parentElement.remove();
    selectedClients = selectedClients.filter(i => i !== id);
    $(`[data-id='${id}']`).prop('checked', false);
    printBadgeContainer();
    console.log(selectedClients);
    const checkboxes = document.querySelectorAll(".form-check-input");
    if (!Array.from(checkboxes).some((c) => c.checked) && selectedClients.length < 1) {
        toggleCheckboxes(null, checkboxes);
        clientGroup = null;
        $('#delRelBtn').hide();
        $('#addRelBtn').hide();
    }
}

// Función para generar la paginación dinámica
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
    // const checkboxes = document.querySelectorAll(".form-check-input");

    // checkboxesG = checkboxes;
    // // Escucha el evento "change" para cualquier checkbox
    // checkboxes.forEach((checkbox) => {
    //     checkbox.addEventListener("change", (event) => {
    //         const { checked, dataset } = event.target;
    //         const groupType = dataset.group === "true";
    //         if (checked) {
    //             // Si es la primera selección, define el tipo de grupo seleccionado
    //             if (observedState.selectedGroupType === null) {
    //                 observedState.selectedGroupType = groupType;

    //                 // Deshabilita los checkboxes de otros tipos de grupo
    //                 toggleCheckboxes(groupType, checkboxes);
    //             } else if (groupType !== observedState.selectedGroupType) {
    //                 // Si selecciona un grupo opuesto, evita la selección
    //                 alert("No puedes seleccionar clientes con y sin grupo al mismo tiempo.");
    //                 event.target.checked = false;
    //             }
    //         } else {
                
    //             // Si deselecciona, verifica si queda alguna selección activa
    //             const anyChecked = Array.from(checkboxes).some((cb) => cb.checked);
    //             if (!anyChecked) {
    //                 // Permite seleccionar cualquier grupo de nuevo
    //                 observedState.selectedGroupType = null;
    //                 toggleCheckboxes(null, checkboxes);
    //             }
    //         }
    //     });
    // });
}


const pagination = document.getElementById('pagination');



// Función para agregar una página a la paginación
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
    loadTable(page, $("#searchGC").val(), $("#filterSelect").val());
    /*renderPagination(page, totalPagesG);*/
}

// Función para habilitar o deshabilitar checkboxes
function toggleCheckboxes(groupType, checkboxes = []) {
    checkboxes.forEach((checkbox) => {
        if (groupType === null) {
            checkbox.disabled = false; // Habilita todos
        } else {
            const checkboxGroupType = checkbox.dataset.group === "true";
            if (checkboxGroupType !== groupType) {
                checkbox.disabled = true; // Deshabilita grupos opuestos
            }
        }
    });
}


function loadTableRel() {
    $('#tableRel').empty();
    selectedClients.forEach(id => {
        $('#tableRel').append(`
                        <tr id="tdRel${id.split('-')[0]}">
                            <td>${id.split('-')[1]}</td>
                            <td>
                                <div class="label-warning">
                                    <span class="material-symbols-outlined ico-16">
                                        error
                                    </span>Sin grupo
                                </div>
                            </td>
                            <td>
                            ${selectedClients.length > 1 ?  `
                                <button class="btn-terciary btneliminar1" onclick="deleteElementgcTableRel('${id}')">
                                    <span class="material-symbols-outlined">
                                        <span class="material-symbols-outlined">
                                            delete
                                        </span>
                                    </span> Eliminar
                                </button>
                                ` : ''}
                                
                            </td>
                        </tr>
                    `);
    });
}

// Initialize Choices.js
const selectElement = document.getElementById('dynamic-select');
choices = new Choices(selectElement, {
    placeholderValue: 'Seleccione un Grupo Comercial...',
    searchPlaceholderValue: 'Seleccione un Grupo Comercial...',
    noResultsText: 'No se encontraron resultados',
    noChoicesText: 'Sin opciones para seleccionar',
    itemSelectText: 'Presione para seleccionar',
});

// Función para realizar la solicitud HTTP con fetch
const fetchOptions = async (searchTerm) => {
    try {
        const response = await fetch(`${urlCliente}/GetGruposComercialesAuto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: searchTerm
            }),
        });

        if (!response.ok) {
            showAlert('Error', 'Error al cargar la información.', 'error');
            return [];
        }

        const data = await response.json();
        if (Object.hasOwn(data, 'SessionActiva')) {
            window.location.href = data.URL;
        }
        console.log(data);

        Swal.close();
        return JSON.parse(data).map(item => ({
            value: item.fi_GrupoComercialId,
            label: item.fc_GrupoComercial,
        }));


    } catch (error) {
        showAlert('Error', 'Error al cargar la información.', 'error');
        return [];
    }
};


// // The observable target
// const state = {
//     selectedGroupType: null,
// };

// // Proxy to observe changes
// const observedState = new Proxy(state, {
//     set(target, property, value) {
//         if (target[property] !== value) {
//             target[property] = value;
//             notifyObservers(property, value); // Notify all observers on change
//         }
//         return true;
//     },
// });

// function notifyObservers(property, value) {
//     observers.forEach(observer => observer(property, value));
// }

// // Function to add observers
// function addObserver(callback) {
//     observers.push(callback);
// }
