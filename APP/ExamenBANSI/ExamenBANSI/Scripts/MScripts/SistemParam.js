function obtenerPSistem() {
    agregaAlPrincipal();

    let counter = 1;

    $.ajax({
        url: '/PmtroSistema/LstPmtSistema',
        type: 'GET',
        data: { 
        },
        dataType: 'json',
        success: function (response) {
            var Sistema = JSON.stringify(response);

                $("#txtid").val(response.data.id),
                $("#txtdias").val(response.data.intdias),
                $("#txtDiasAviso").val(response.data.intdiasaviso),
                $("#txtMinInact").val(response.data.intmininactivos),
                $("#txtlogpassw").val(response.data.intlongpass),
                $("#txtrutfiles").val(response.data.vchrutafile),
                $("#txtcorreos").val(response.data.vchcorreo),
                $("#txtema").val(response.data.vchservemail),
                $("#txtserpop").val(response.data.vchserpop),
                $("#txtptopop").val(response.data.intptopop),
                $("#txtssl").val(response.data.intssl),
                $("#txtusuario").val(response.data.vchusuario),
                $("#txtpssw").val(response.data.vchpasswords)

        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });
};





function AgregPSist() {
    var opcion = confirm("Desea Guardar los cambios?");
    var v_id = 0;
    var vintdias = 0;
    var vintdiasaviso = 0;
    var vintmininactivos = 0;
    var vintlongpass = 0;
    var vvchrutafile = "";
    var vvchcorreo = "";
    var vvchservemail = "";
    var vvchserpop = "";
    var vvchptopop = "";
    var vintssl = "";
    var vvchusuario = "";
    var vvchpass = "";

    if (opcion == true) {
        v_id = $("#txtid").val();
        vintdias = $("#txtdias").val();
        vintdiasaviso = $("#txtDiasAviso").val();
        vintmininactivos = $("#txtMinInact").val();
        vintlongpass = $("#txtlogpassw").val();
        vvchrutafile = $("#txtrutfiles").val();
        vvchcorreo = $("#txtcorreos").val();
        vvchservemail = $("#txtema").val();
        vvchserpop = $("#txtserpop").val();
        vvchptopop = $("#txtptopop").val();
        vintssl = $("#txtssl").val();
        vvchusuario = $("#txtusuario").val();
        vvchpass = $("#txtpssw").val();

        $.ajax({
            url: '/PmtroSistema/updatePmtroSistem', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "id": v_id,
                "intdias": vintdias,
                "intdiasaviso": vintdiasaviso,
                "intmininactivos": vintmininactivos,
                "intlongpass": vintlongpass,
                "vchrutafile": vvchrutafile,
                "vchcorreo": vvchcorreo,
                "vchservemail": vvchservemail,
                "vchserpop": vvchserpop,
                "intptopop": vvchptopop,
                "intssl": vintssl,
                "vchusuario": vvchusuario,
                "vchpasswords": vvchpass,
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                alert('Los datos se guardaron correctamente');
            },
            error: function (jqXHR, status, error) {
                alert('Disculpe, existió un problema en el guardado de datos');
            },
            complete: function (jqXHR, status) {
            }

        });

    };
};

function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
}



//function limpiadatos() {
//    var txttxtid = "";
//    var txtDs = "";
//    var txtdaviso = "";
//    var txtminact = "";
//    var txtrtlgpw = "";
//    var txtrtfil = "";
//    var txtcrro = "";
//    var txteml = "";
//    var txtsrpo = "";
//    var txtptop = "";
//    var txtpssl = "";
//    var txtpusr = "";
//    var txtppssws = "";

//    $("#txtid").val(txttxtid);
//    $("#txtdias").val(txtDs);
//    $("#txtDiasAviso").val(txtdaviso);
//    $("#txtMinInact").val(txtminact);
//    $("#txtlogpassw").val(txtrtlgpw);
//    $("#txtrutfiles").val(txtrtfil);
//    $("#txtcorreos").val(txtcrro);
//    $("#txtema").val(txteml);
//    $("#txtserpop").val(txtsrpo);
//    $("#txtptopop").val(txtptop);
//    $("#txtssl").val(txtpssl);
//    $("#txtusuario").val(txtpusr);
//    $("#txtpssw").val(txtppssws);

//};