function listBita()
{
    fechaini = $("#fechaini").val();
    fechafin = $("#fechafin").val();
    const tabla = new DataTable('#dtbBitacora');
    var counter = 0;
    if (fechaini == "" || fechafin == "")
    {
        alert('debe de ingresar fecha inicial o fecha final');
    }
    else{
        if (fechafin < fechaini)
        {
           alert('la fecha final no puede ser menor que la fecha inicial')
        }
        else
        {
            $.ajax({
                url: '/ConsultaBitacora/Details',
                type: 'GET',
                data: {
                    "fechaini": fechaini,
                    "fechafin": fechafin
                },

                dataType: 'json',
                success: function (response) {
                    var perfiles = JSON.stringify(response);
                    for (var i = 0; i < response.data.length; i++) {
                        tabla.row
                            .add([
             /*                   response.data[i].IdBitacora,*/
                                response.data[i].SModulo,
                                response.data[i].SdetalleMov,
                                response.data[i].FAlta,
                                response.data[i].SUsuario,
                                "<img src='/img/Editar_img.png' class='rounded' alt='...' title=' registro' data-toggle='modal' data-target='#' onclick=''>"
                                
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
        };
    };

}

function listaTiposFiles(param) {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTipoFil');
    let counter = 1;
    var sURl = "";
    var sReponsive = "";
    if (param == 'COVAF') { sURl = '/Lector/ListaTipoFiles'; sResponsive = 'regresadatos(this)';}
    if (param == 'PLD') { sURl = '/LectorArchivosPLD/ListaTipoFiles'; sResponsive = 'regresadatosPLD(this)'; }
    if (param == 'PIP') { sURl = '/LectorArchivosPIP/ListaTipoFiles'; sResponsive = 'regresadatosPIP(this)'; }
    var origen = "'" + param + "'";

        $.ajax({
            url: sURl,
            type: 'GET',
            data: {
                "tipoFiles": param
            },

            dataType: 'json',
            success: function (response) {
                var clientes = JSON.stringify(response);
                for (var i = 0; i < response.data.length; i++) {
                    tabla.row
                        .add([
                            response.data[i].intIdFile,
                            response.data[i].VchTipofile,
                            response.data[i].CharSepara,
                            response.data[i].intTitulos,
                            response.data[i].IntLineaLee,
                            response.data[i].NombreFile,
                            response.data[i].Nomtabla,
                            
                             "<img src='/img/Seleccionar_img.png' class='rounded' alt='...' title=' registro'  data-dismiss='modal' data-toggle='modal' data-target='#' onclick = '" + sResponsive + "'>"
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

function regresadatos(button) {
    var txtid;
    var txtTipoFile;
    var txtCharSepara;
    var txttitulos;
    var txtLineaLectura;
    var txtDescripcion;

    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        txtTipoFile = $(this).find("td:eq(1)").text();
        //txtCharSepara = $(this).find("td:eq(2").text();
        txttitulos = $(this).find("td:eq(3)").text();
        txtLineaLectura = $(this).find("td:eq(4)").text();
        txtDescripcion = $(this).find("td:eq(5)").text();
        txtTabla = $(this).find("td:eq(6)").text();
        $.ajax({
            url: '/Lector/VarGobalFiles',
            type: 'GET',
            data: {
                "id": txtid,
                "TipoFile": txtTipoFile,
                "CharSepara": txtCharSepara,
                "titulos": txttitulos,
                "LineaLectura": txtLineaLectura,
                "Descripcion": txtDescripcion,
                "Nomtabla": txtTabla
            },

            dataType: 'json',
            success: function (response) {
                var clientes = JSON.stringify(response);
                $("#valorMostrado").text("Archivo:" + txtDescripcion + ", tipo :" + txtTipoFile);
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });

    });
};

function regresadatosPLD(button) {
    var txtid;
    var txtTipoFile;
    var txtCharSepara;
    var txttitulos;
    var txtLineaLectura;
    var txtDescripcion;

    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        txtTipoFile = $(this).find("td:eq(1)").text();
       // txtCharSepara = $(this).find("td:eq(2").val();
        txttitulos = $(this).find("td:eq(3)").text();
        txtLineaLectura = $(this).find("td:eq(4)").text();
        txtDescripcion = $(this).find("td:eq(5)").text();
        txtTabla = $(this).find("td:eq(6)").text();
        $.ajax({
            url: '/LectorArchivosPLD/VarGobalFiles',
            type: 'GET',
            data: {
                "id": txtid,
                "TipoFile": txtTipoFile,
                "CharSepara": txtCharSepara,
                "titulos": txttitulos,
                "LineaLectura": txtLineaLectura,
                "Descripcion": txtDescripcion,
                "Nomtabla": txtTabla
            },

            dataType: 'json',
            success: function (response) {
                var clientes = JSON.stringify(response);
                $("#valorMostrado").text("Archivo:" + txtDescripcion + ", tipo :" + txtTipoFile);
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });

    });
};

function regresadatosPIP(button) {
    var txtid;
    var txtTipoFile;
    var txtCharSepara;
    var txttitulos;
    var txtLineaLectura;
    var txtDescripcion;

    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        txtTipoFile = $(this).find("td:eq(1)").text();
        // txtCharSepara = $(this).find("td:eq(2").val();
        txttitulos = $(this).find("td:eq(3)").text();
        txtLineaLectura = $(this).find("td:eq(4)").text();
        txtDescripcion = $(this).find("td:eq(5)").text();
        txtTabla = $(this).find("td:eq(6)").text();
        $.ajax({
            url: '/LectorArchivosPIP/VarGobalFiles',
            type: 'GET',
            data: {
                "id": txtid,
                "TipoFile": txtTipoFile,
                "CharSepara": txtCharSepara,
                "titulos": txttitulos,
                "LineaLectura": txtLineaLectura,
                "Descripcion": txtDescripcion,
                "Nomtabla": txtTabla
            },

            dataType: 'json',
            success: function (response) {
                var clientes = JSON.stringify(response);
                $("#valorMostrado").text("Archivo:" + txtDescripcion + ", tipo :" + txtTipoFile);
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });

    });
};
function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
};