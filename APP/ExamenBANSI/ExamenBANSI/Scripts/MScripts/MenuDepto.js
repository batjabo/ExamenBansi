
function obtenerDepto() {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/Deptos/LstDeptos',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var deptos = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].idDepto,
                        response.data[i].ddescripcion,
                        //"<a data-toggle='modal' data-target='#deptosModal' onclick='mostdatDepto(this)' class='btn btn-success btn-circle btn-sm' id='btnSel'><i class='fas fa-check'></i></a>"
                        "<img src='/img/Editar_img.png' class='img-fluid' alt='Eniun' title='Editar registro' data-toggle='modal' data-target='#deptosModal' onclick='mostdatDepto(this)'>"
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
function mostdatDepto(button) {
    var txtiddepto;
    var txtNom;


    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        Descripcion = $(this).find("td:eq(1)").text();


        $("#txtiddepto").val(txtid);
        $("#txtdescripcion").val(Descripcion);


    });
};


function AgregDepto() {
    var opcion = confirm("Desea Guardar los cambios?");
    var iddepto = 0;
    var descripcion = "";


    if (opcion == true) {
        iddepto = $("#txtiddepto").val();
        descripcion = $("#txtdescripcion").val();

        $.ajax({
            url: '/Deptos/updateDeptos', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "idDepto": iddepto,
                "ddescripcion": descripcion,

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
    var txtiddepto = "";
    var txtNom="";
    $("#txtiddepto").val(txtiddepto);
    $("#txtdescripcion").val(txtNom);
};
