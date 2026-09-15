function obtenerEmpl() {
    agregaAlPrincipal();
    const dtbEmpl = new DataTable('#dtbEmpl');
    let counter = 1;

    $.ajax({
        url: '/CatEmpl/lstdempl',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var empleado = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                dtbEmpl.row
                    .add([
                        response.data[i].idcons,
                        response.data[i].ctaloc,
                        response.data[i].nombre,
                        response.data[i].appat,
                        response.data[i].apmat,
                        response.data[i].emdepto,
                        response.data[i].direcc,
                        response.data[i].tel,
                        response.data[i].cel,
                        response.data[i].email,
                        response.data[i].ctausglo,
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Editar registro' data-toggle='modal' data-target='#emplModal' onclick='mostdatEmpl(this)'>"
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

function mostdatEmpl(button) {
    var idDep;
    var ctaloc;
    var Nombre;
    var ApellidoPaterno;
    var ApellidoMaterno;
    var Depto;
    var Dirección;
    var Telefono;
    var Celular;
    var Email;
    var Cuentaglobal;

    $("table tbody tr").click(function () {
        idDep = $(this).find("td:eq(0)").text();
        ctaloc = $(this).find("td:eq(1)").text();
        Nombre = $(this).find("td:eq(2)").text();
        ApellidoPaterno = $(this).find("td:eq(3)").text();
        ApellidoMaterno = $(this).find("td:eq(4)").text();
        Depto = $(this).find("td:eq(5)").text();
        Dirección = $(this).find("td:eq(6)").text();
        Telefono = $(this).find("td:eq(7)").text();
        Celular = $(this).find("td:eq(8)").text();
        Email = $(this).find("td:eq(9)").text();
        Cuentaglobal = $(this).find("td:eq(10)").text();

        $("#txtidDepto").val(idDep); 
        $("#txtcatloc").val(ctaloc);
        $("#txtNombre").val(Nombre);
        $("#txtApellpat").val(ApellidoPaterno);
        $("#txtapellmat").val(ApellidoMaterno);
        $("#txtempdepto").val(Depto);
        $("#txtdir").val(Dirección);
        $("#txttelf").val(Telefono);
        $("#txtcel").val(Celular);
        $("#txtema").val(Email);
        $("#txtempgl").val(Cuentaglobal);

    });
        
    
    
    

}

function AgregEmpl() {
    var opcion = confirm("Desea Guardar los cambios?");
    var i_d = 0;
    var CTA_USU_LOCAL = "";
    var NOMBRE = "";
    var APATERNO = "";
    var APMATERNO = "";
    var emdepto = "";
    var DIRECCION = "";
    var TELEFONO = "";
    var CELULAR = "";
    var EMAIL = "";
    var CTA_USU_GLOBAL = "";

    if (opcion == true) {
        i_d = $("#txtidDepto").val();
        CTA_USU_LOCAL = $("#txtcatloc").val();
        NOMBRE = $("#txtNombre").val();
        APATERNO = $("#txtApellpat").val();
        APMATERNO = $("#txtapellmat").val();
        emdepto = $("#txtempdepto").val();
        DIRECCION = $("#txtdir").val();
        TELEFONO = $("#txttelf").val();
        CELULAR = $("#txtcel").val();
        EMAIL = $("#txtema").val();
        CTA_USU_GLOBAL = $("#txtempgl").val();
        


        $.ajax({
            url: '/CatEmpl/updateEmpl', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "idcons":i_d,
                "ctaloc":CTA_USU_LOCAL,
                "nombre":NOMBRE,
                "appat": APATERNO,
                "apmat": APMATERNO,
                "emdepto":emdepto,
                "direcc":DIRECCION,
                "tel":   TELEFONO,
                "cel":   CELULAR,
                "email":  EMAIL,
                "ctausglo": CTA_USU_GLOBAL,


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
    var txttxtidDp = "";
    var txtCatloc = "";
    var txtNom = "";
    var txtAppa = "";
    var txtApma = "";
    var txtDi = "";
    var txtTlf = "";
    var txtCel = "";
    var txtEmi = "";
    var txtCtgl = "";


    $("#txtidDepto").val(txttxtidDp);
    $("#txtcatloc").val(txtCatloc);
    $("#txtNombre").val(txtNom);
    $("#txtApellpat").val(txtAppa);
    $("#txtapellmat").val(txtApma);
    $("#txtdir").val(txtDi);
    $("#txttelf").val(txtTlf);
    $("#txtcel").val(txtCel);
    $("#txtema").val(txtEmi);
    $("#txtempgl").val(txtCtgl);
    
};

function obtenerDepto(number) {
    //var cmblst = document.getElementById('cmbPerfil');
    var i = 1;
    $.ajax({
        url: "/CatEmpl/LstDepartamentos",
        data: {
            "id": 1
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbDeptos")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Depto  al que pertenecera Depto:"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbDeptos").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].ddescripcion));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }
    });

};