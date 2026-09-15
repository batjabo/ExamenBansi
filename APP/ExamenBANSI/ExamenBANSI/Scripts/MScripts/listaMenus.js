function obTenerListado() {
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/Usuarios/LstUsuarios',
        type: 'GET',
        data: {
<<<<<<< HEAD
        },   //prueba
=======
        },

>>>>>>> parent of e06e725 (Cambio de pruebaSe realizaron cambios en front para vista mas pequeñaen los grids)
        dataType: 'json',
        success: function (response) {
            var listaMnu = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                "<a class='nav-link collapsed' href='#' data-toggle='collapse' data-target='#collapseUtilities' aria-expanded='true' aria-controls='collapseUtilities'>" < i class='fas fa-fw fa-wrench' ></i >",
                if (response.data[i].iPadreId == 0) {
                    "    <span>" || response.data[i].iPadreId||"</span>"
                }
                "</a>",
                    "<div id='collapseUtilities' class='collapse' aria-labelledby='headingUtilities' data-parent='#accordionSidebar'>",
                        "<div class='bg-white py-2 collapse-inner rounded'>"
                            for (var sb = 0; sb < response.data.length; sb++)
                            {
                                if (response.data[sb].iPadreId == response.data[i].iMenuid) {
                                    " < a class='collapse-item' href ='" || response.data[sb].sUrl || '>||response.data[sb].Descripcion||"</a>"
                                }
                            }
                        "</div>",
                    "</div>"
                    ])
                    .draw(false);

                counter++;

            }
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });

}