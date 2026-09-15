function obtenerConfArchivo() {
    agregaAlPrincipal();
    cargaTablas();
    const dTbConfigarch = new DataTable('#dTbConfigarch');

    let counter = 1;

    $.ajax({
        url: '/ConfArchivos/LstConfArchiv',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var deptos = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                dTbConfigarch.row
                    .add([
                        response.data[i].intIdFile,
                        response.data[i].VchTipofile,
                        response.data[i].CharSepara,
                        response.data[i].intTitulos,
                        response.data[i].IntLineaLee,
                        response.data[i].NombreFile,
                        response.data[i].Origen,
                        response.data[i].Nomtabla,
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Editar registro' data-toggle='modal' data-target='#confarchModal' onclick='mostdaconfigArch(this)'>"
                        //"<a data-toggle='modal' data-target='#confarchModal' onclick='mostdaconfigArch(this)' class='btn btn-success btn-circle btn-sm' id='btnSel'><i class='fas fa-check'></i></a>"
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

function cargaTablas() {
    
    var i = 1;
    $.ajax({
        url: "/ConfArchivos/ListaTablas",
        data: {
          
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbTablas")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Tabla  de carga:"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbTablas").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].Nomtabla));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });

}
//Carga datos al selcionar el grid
function mostdaconfigArch(button) {
 ;
    var txtidtipofile;
    var sino = 0;
    $("table tbody tr").click(function () {
        txtid = $(this).find("td:eq(0)").text();
        vchTipo = $(this).find("td:eq(1)").text();
        vchsepara = $(this).find("td:eq(2)").text();
        sino = $(this).find("td:eq(3)").text();
        /*btitulos = $(this).find("td:eq(3)").text();*/
        Ilinealectura = $(this).find("td:eq(4)").text();
        Nombre = $(this).find("td:eq(5)").text();
        vchorigen = $(this).find("td:eq(6)").text();
        vchtablaCarg = $(this).find("td:eq(7)").text(); 
        /* iualta =$(this).find("td:eq(7)").text();*/

        $("#txtidtipofile").val(txtid);
        $("#txtvchtipo").val(vchTipo);
        $("#txtvchsepara").val(vchsepara);
        $("#check").val(sino);
        $("#txtIlinealectura").val(Ilinealectura);
        $("#txtnombre").val(Nombre);
        $("#txtvchorigen").val(vchorigen);
        $("#txtTablas").val(vchtablaCarg);
        
        /*  $("#txtiualta").val(iualta);*/
        if (sino == 0) { document.getElementById("chkTitulo").checked = false; } else { document.getElementById("chkTitulo").checked = true; };
        
    });
};
function AgregArchivos() {
    var opcion = confirm("Desea Guardar los cambios?");

    var id_TipoFile = 0;
    var vch_Tipo = "";
    var vch_separa = "";
    var b_Titulos = 0;
    var I_LineaLectura = 0;
    var NombreFile = "";
    var vchorigen = "";
    var iualta = 0;
    var sino = 0;
    var vchTabla = "";
    var chkTitulo = 0;

    if (opcion == true) {
        id_TipoFile = $("#txtidtipofile").val();
        vch_Tipo = $("#txtvchtipo").val();
        vch_separa = $("#txtvchsepara").val();
        //b_Titulos = $("#chkTitulo").val();
        I_LineaLectura = $("#txtIlinealectura").val();
        NombreFile = $("#txtnombre").val();
        vchorigen = $("#txtvchorigen").val();
        iualta = $("#txtiualta").val();
        vchTabla = $("#txtTablas").val();
        if (document.getElementById('chkTitulo').checked) { chkTitulo = 1; };
        

        $.ajax({
            url: '/ConfArchivos/updateConfigArch', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "intIdFile": id_TipoFile,
                "VchTipofile": vch_Tipo,
                "CharSepara": vch_separa,
                "intTitulos": chkTitulo,
                "IntLineaLee": I_LineaLectura,
                "NombreFile": NombreFile,
                "Origen": vchorigen,
                "Nomtabla":vchTabla,
                "iusuario": iualta,
                
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
    var txtarchivo = "";
    var txtvchtip = "";
    var txtvchsepa = "";
    var txtbtitul = "";
    var txtIlinlect = "";
    var txtInombre = "";
    var chkTitulo = "";

    $("#txtidtipofile").val(txtarchivo);
    $("#txtvchtipo").val(txtvchtip);
    $("#txtvchsepara").val(txtvchsepa);
    $("#txtbtitulos").val(chkTitulo);
    $("#txtIlinealectura").val(txtIlinlect);
    $("#txtnombre").val(txtInombre);
};
