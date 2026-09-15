

function obtenerCat() {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/CatSistema/LstAgrupCat',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].IdAgrupa,
                        response.data[i].descripcion,
                       "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Seleccionar Registro' data-toggle='modal' data-target='#subCatModal' onclick='mostdatCat(this)'>"
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

function mostdatCat(button) {
    var txtidCat;
    var txtNom;


    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        Descripcion = $(this).find("td:eq(1)").text();


        $("#txtidAgrupa").val(txtid);
        $("#txtdescripcion").val(Descripcion);

        $.ajax({
            url: '/CatSistema/lstSubCat',
            type: 'GET',
            data: {
                iAgrupaCat:txtid
            },

            dataType: 'json',
            success: function (response) {
                $("#cmbMenus")
                    .empty()
                    .append($("<option></option>")
                        .val("0")
                        .html("Lista de Catalogos:"));
                for (var i = 0; i < response.data.length; i++) {
                    $("#cmbMenus").append($("<option></option>")
                        .val(i)
                        .html(response.data[i].Descripcion));
                };
            },
             error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });
    });
}

function SaveCat() {
    var idAgrupa = $('#txtidAgrupa').val();
    var Descripcion = $('#txtDescripcionalta').val();
    $.ajax({
        url: '/CatSistema/SaveCat',
        type: 'GET',
        data: {

            "idAgrupa": idAgrupa,
            "Descripcion": Descripcion
        },
        success: function (response) {
            alert('Datos guardados correctamente');
            location.reload();
        },
        failure: function (response) {
            alert('error al guardar datos');
        }
    });
}

function SaveAgrup() {
    
    var idAgrupa = $('#txtAgrup').val();
    var Descripcionagrup = $('#txtDescripcionAgrup').val();
    $.ajax({

        url: '/CatSistema/saveAgrup',
        type: 'GET',
        data: {

            "IdAgrupa": idAgrupa,
            "descripcion": Descripcionagrup
        },

        success: function (response) {

            alert('Datos guardados correctamente');
            location.reload();
        },
        failure: function (response) {
            alert('error al guardar datos');
        }
    });
}