function obtenerPerfil() {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/CatPerfil/LstPerfiles',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var perfiles = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].idPerfil,
                        response.data[i].pfdescripcion,
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Editar registro' data-toggle='modal' data-target='#perfilesModal' onclick='mostdatPerfil(this)'>"
                        //"<a id='btnSel' data-toggle='modal' data-target='#perfilesModal' onclick='mostdatPerfil(this)' class='btn btn-success btn-circle btn-sm'><i class='fas fa-check'></i></a>"
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

function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
}


//Carga datos al selcionar el grid
function mostdatPerfil(button) {
    var txtidperf;
   


    $("table tbody tr").click(function () {
        txtidperfil = $(this).find("td:eq(0)").text();
        DescPrfil = $(this).find("td:eq(1)").text();


        $("#txtidperf").val(txtidperfil);
        $("#txtdescrippf").val(DescPrfil);


    });
};


function AgregPerf() {
    var opcion = confirm("Desea Guardar los cambios?");
    var id_pfil = 0;
    var descripcionpf = "";


    if (opcion == true) {
        id_pfil = $("#txtidperf").val();
        descripcionpf = $("#txtdescrippf").val();

        $.ajax({
            url: '/CatPerfil/updatePerfil', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "idPerfil": id_pfil,
                "pfdescripcion": descripcionpf,

            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                alert('Los datos se guardaron correctamente');
                location.reload();
            },
            error: function (jqXHR, status, error) {
                alert('Disculpe, existió un problema en el guardado de datos');
            },
            complete: function (jqXHR, status) {
            }

        });

    };
};
function limpiadatos() {
    var txtidperf = "";
    var txtDescpf = "";

    $("#txtidperf").val(txtidperf);
    $("#txtdescrippf").val(txtDescpf);
};