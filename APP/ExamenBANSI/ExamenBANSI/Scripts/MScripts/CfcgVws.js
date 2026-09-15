addEventListener('load', () => {
    agregaAlPrincipal();
})

function obtenerConfCarViews() {
    agregaAlPrincipal();
    const dTbConfcgvws = new DataTable('#dTbConfcgvws');
    let counter = 1;

    $.ajax({
        url: '/ConfiguraCargaViews/LstcfVWS',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var Confcgvws = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                dTbConfcgvws.row
                    .add([
                        response.data[i].idconf,
                        response.data[i].idtipofi,
                        response.data[i].vistanombre,
                        response.data[i].Nombtabla,
                        "<img src='/img/Seleccionar_img.png' class='rounded' alt='...' title='Seleccionar registro' data-toggle='modal' data-target='#concgViewsModal' onclick='mostdarConfVws(this)'>"
                       /* "<a data-toggle='modal' data-target='#concgViewsModal' onclick='mostdarConfVws(this)' class='btn btn-success btn-circle btn-sm' id='btnSel'><i class='fas fa-check'></i></a>"*/
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


function obtenerCamposElemnts() {
    agregaAlPrincipal();
    const dtgCamposvws = new DataTable('#dtgCamposvws');
    let counter = 1;
    var idconfigu = $("#txtidCfcgvws").val()
    if (idconfigu == "") {
       /* alert('Debe de seleccionar el idconfig');*/
    }
    else {
        var i = 1;

    $.ajax({
        url: '/ConfiguraCargaViews/LstElemtnos',
        type: 'GET',
        data: {
                "ConfigId": idconfigu
        },

        dataType: 'json',
        success: function (response) {
            var Confcgvws = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                dtgCamposvws.row
                    .add([
                        response.data[i].idElemnt,
                        response.data[i].idconfigura,
                        response.data[i].VCHcampos,
                        response.data[i].fechafiltro,
                       /* "<a data-toggle='modal' data-target='#concgViewsModal' onclick='mostdarConfVws(this)' class='btn btn-success btn-circle btn-sm' id='btnSel'><i class='fas fa-check'></i></a>"*/
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
}

function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
}


//Carga datos al selcionar el grid
function mostdarConfVws(button) {
    var txtidcfvws;
    var txttpfiles

    $("table tbody tr").click(function () {
        txtidcfvws = $(this).find("td:eq(0)").text();
        txttpfiles = $(this).find("td:eq(1)").text();
        NombreVista = $(this).find("td:eq(2)").text();
        tablename = $(this).find("td:eq(3)").text();


        $("#txtidCfcgvws").val(txtidcfvws);
        $("#txttpfile").val(txttpfiles);
        $("#txtNameViews").val(NombreVista);
        $.ajax({
            url: "/ConfiguraCargaViews/CgaLstCampos",
            data: {
                "Tablenam": tablename
            },
            type: 'GET',
            dataType: 'Json',
            success: function (response) {
                $("#cmbCampos")
                    .empty()
                    .append($("<option></option>")
                        .val("0")
                        .html("Seleccione los campos a ocupar"));
                for (var i = 0; i < response.data.length; i++) {
                    $("#cmbCampos").append($("<option></option>")
                        .val(i)
                        .html(response.data[i].Nomcampos));
                };
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });

    });
};

function AgregChVws() {
    var opcion = confirm("Desea Guardar los cambios?");

    var cve_cfvws = 0;
    var idtipofi = "";
    var nm_breviews = "";
   

    if (opcion == true) {
        cve_cfvws = $("#txtidconfiguravws").val();
        idtipofi = $("#txtTiposFiles").val();
        nm_breviews = $("#txtNombreVistas").val();
      
        $.ajax({
            url: '/ConfiguraCargaViews/updateConfigviews', //le envio el dato del evento en el controles que va a ejecutar
            data: {

                "idconf": cve_cfvws,
                "idtipofi": idtipofi,
                "vistanombre": nm_breviews,
                
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


function AgregCmposElemts() {
    var opcion = confirm("Desea Guardar los cambios?");
    var id_Elements = 0;
    var configura = 0;
    var VCHCAMPO = "";
    var ffiltros = 0;


    if (opcion == true) {
        
        configura = $("#txtidCfcgvws").val();
        VCHCAMPO = $("#txtiCampos").val();

       /* ffiltros = $("#chkFfiltro").val();*/

        if (document.getElementById('chkFfiltro').checked) { ffiltros = 1; };

        $.ajax({
            url: '/ConfiguraCargaViews/updateElementos', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "idElemnt": id_Elements,
                "idconfigura": configura,                
                "VCHcampos": VCHCAMPO,
                "fechafiltro": ffiltros,
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

function limpiadatosCFviews() {
    var txtidconfivws = "";
    var txtfiletype = "";
    var txtNomvwss = "";
  
    $("#txtidconfivws").val(txtidconfiguravws);
    $("#txtfiletype").val(txtTiposFiles);
    $("#txtNomvwss").val(txtNombreVistas);
 

};


function obtenerNameCampos(number) {
    var i = 1;
    $.ajax({
        url: "/ConfiguraCargaViews/CgaLstCampos",
        data: {
            "id": 1
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbCampos")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione los campos a ocupar"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbCampos").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].Nomcampos));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });

};


function obtTiposFiles(number) {
    var i = 1;
    $.ajax({
        url: "/ConfArchivos/LstConfArchiv",
        data: {
            "id": 1
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbTipoFiles")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione el tipo de archivo a ocupar"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbTipoFiles").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].NombreFile));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });

};

