function obtenerPersona() {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/Usuarios/LstUsuarios',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var clientes = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].iUserID,
                        response.data[i].VCHUSUARIO,
                        response.data[i].sUserName,
                        response.data[i].vchidUserCorp,
                        response.data[i].iPerfilId,
                        response.data[i].sPasword,
                        response.data[i].Email,
                        response.data[i].bActivo,
                        response.data[i].iCaducidad,
                        response.data[i].iEsEmp,
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Editar registro' data-toggle='modal' data-target='#usuariosModal' onclick='regresadatos(this)'>"
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

function ObtenerEmpleados() {
    const tabla = new DataTable('#tableEmpleado');
    let counter = 1;

    $.ajax({
        url: '/Usuarios/listarEmpleados',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var clientes = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].idEmpleado,
                        response.data[i].nombreEmp,
                        //"<a data-toggle='modal' data-target='#EmpleadosModalModal' onclick = 'obtenEmp(this)' class='btn btn-success btn-circle btn-sm'><i class='fas fa-check'></i></a>"
                        "<img src='/img/Seleccionar_img.png' class='rounded' alt='...' title='Seleccionar Registro' data-toggle='modal' data-target='#EmpleadosModalModal' onclick='obtenEmp(this)'>"
                        //"<button type='button' id='miboton' class='btn btn-success btn-circle btn-sm'  data-target='#usuariosModal' onclick='obtenEmp(this)'></button>"
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

function obtenEmp() {
    var idempleado;
    $("table tbody tr").click(function () {
        idempleado = $(this).find("td:eq(0)").text();
        $("#txtUserCorp").val(idempleado);
    });
    //alert(txtid)
}
//Carga datos al selcionar el grid de usuarios
function regresadatos() {
    var id;
    var Nom;
    var Chck
    var Password;
    var PerfilId;
    var Password;
    var email;
    var iCaducidad;
    var Inactivo;
    var UserCorp;
    var iEsEmpleado;
    var check1;
    var check2;
    var nombreUsuario;
    var btn=0;

   
   
        $("table tbody tr").click(function () {
            id = $(this).find("td:eq(0)").text();
            nombreUsuario = $(this).find("td:eq(1)").text();
            Nom = $(this).find("td:eq(2)").text();
            UserCorp = $(this).find("td:eq(3)").text();
            PerfilId = $(this).find("td:eq(4)").text();
            Password = $(this).find("td:eq(5)").text();
            email = $(this).find("td:eq(6)").text();
            Inactivo = $(this).find("td:eq(7)").text();
            iCaducidad = $(this).find("td:eq(8)").text();
            iEsEmpleado = $(this).find("td:eq(9)").text();

            var datPerfil = document.getElementById("cmbPerfiles");
            var buscar = PerfilId;

            $("#txtId").val(id);
            $("#txtNom").val(nombreUsuario);
            $("#txtUserName").val(Nom);
            $("#txtUserCorp").val(UserCorp);
            $("#txtPassword").val(Password);
            $("#txtEmail").val(email);
            $("#txtInactivo").val(Inactivo);
            if (iEsEmpleado == 1) { $("#idCheck").prop('checked', true) }
            else { $("#idCheck").prop('checked', false) };

            if (iCaducidad == 1) { $("#CheckCadu").prop('checked', true) }
            else { $("#CheckCadu").prop('checked', false) };
            if (Inactivo == 1) { $("#CheckEstatus").prop('checked', true) }
            else { $("#CheckEstatus").prop('checked', false) };
            $("#txtPerfilId").val(PerfilId);

            $("#idCheck").prop('disabled', true)
        });
   
 
}
//valido datos para guardar informacion
function validarDatos() {
    var opcion = confirm("Desea Guardar los cambios?");
    var check_Emp = 0;
    var i_Caducidad = 0;
    var i_inactivo = 0;

    var datos = document.getElementById("cmbPerfiles");
    var selected = datos.options[datos.selectedIndex].text;

    //var datosDepto = document.getElementById("cmbDeptos");
    //var selDepto = datosDepto.options[datosDepto.selectedIndex].text;

    if (opcion == true) {
        id = $("#txtId").val();
        nuser = $("#txtUserName").val();
        NomUser = $("#txtNom").val();
        userCorp =  $("#txtUserCorp").val();
        PerfilID = $("#txtPerfilId").val(); //selected;
      /*  idDepto = selDepto;*/
        password = $("#txtPassword").val();
        vctCorreo = $("#txtEmail").val();
        if (document.getElementById('idCheck').checked) {check_Emp = 1;};
        if (document.getElementById('CheckCadu').checked) {i_Caducidad = 1;};
        if (document.getElementById('CheckEstatus').checked) {i_inactivo = 1;};
        $.ajax({
            url: '/Usuarios/UpdateAddUser', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "iUserID" :id,
                "VCHUSUARIO": NomUser,
                "vchidUserCorp": userCorp,
                "sUserName" : nuser,
                "sPasword": password,
                "iPerfilId": PerfilID,
   /*             "idDepto":idDepto,*/
                "Email": vctCorreo,
                "bActivo": i_inactivo,
                "iCaducidad": i_Caducidad,
                "iEsEmp": check_Emp

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
}

function limpiadatos(button) {
    txtid = "";
    nombreUsuario = "";
    txtNom = "";
    txtUserCorp = "";
    txtPerfilId = "";
  /*  txtidDepto = "";*/
    txtPassword = "";
    //txtisPreguntaSecreta = "";
    //txtisRespuestaSecreta = "";
    txtInactivo = "";
    iCaducidad = "";
    flexCheck = "";

    $("#txtId").val(txtid);
    $("#txtNom").val(nombreUsuario);
    $("#txtUserName").val(txtNom);
    $("#txtUserCorp").val(txtUserCorp);
    $("#txtPerfilId").val(txtPerfilId);
 /*   $("#txtidDepto").val(txtidDepto);*/
    $("#txtPassword").val(txtPassword);
    //$("#txtisPreguntaSecreta").val(txtisPreguntaSecreta);
    //$("#txtisRespuestaSecreta").val(txtisRespuestaSecreta);
    $("#txtInactivo").val(txtInactivo);
    if (flexCheck == 1) { $("#idCheck").prop('checked', true) }
    else { $("#idCheck").prop('checked', false) };

    if (iCaducidad == 1) { $("#CheckCadu").prop('checked', true) }
    else { $("#CheckCadu").prop('checked', false) };
    if (txtInactivo == 1) { $("#CheckEstatus").prop('checked', true) }
    else { $("#CheckEstatus").prop('checked', false) };
    $("#idCheck").prop('disabled', false)
}

function catPerfil(number) {
    //var cmblst = document.getElementById('cmbPerfil');
    var i = 1;
    $.ajax({
        url: "/Usuarios/listarCatalogo",
        data: {
            "id": 1
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbPerfiles")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Perfil:"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbPerfiles").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].descripcion));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos de perfiles');
        },
        complete: function (jqXHR, status) {
        }
    });

};

function desbloqueo() {
    var opcion = confirm("Desea desbloquear a este usuario?");
    if (opcion == true) {
        $("table tbody tr").click(function () {
            id = $(this).find("td:eq(0)").text();
            nombreUsuario = $(this).find("td:eq(1)").text();
            Nom = $(this).find("td:eq(2)").text();
            UserCorp = $(this).find("td:eq(3)").text();
            PerfilId = $(this).find("td:eq(4)").text();
            Password = $(this).find("td:eq(5)").text();
            email = $(this).find("td:eq(6)").text();
            Inactivo = $(this).find("td:eq(7)").text();
            iCaducidad = $(this).find("td:eq(8)").text();
            iEsEmpleado = $(this).find("td:eq(9)").text();

            $.ajax({
                url: '/DesbloqueoUsr/desbloquear', //le envio el dato del evento en el controles que va a ejecutar
                data: {
                    "_usr": email,
                    "login": Password,
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {

                    alert('Usuario desbloqueado correctamente');
                },
                error: function (jqXHR, status, error) {
                    alert('Disculpe, existió un problema en el guardado de datos');
                },
                complete: function (jqXHR, status) {
                }

            });
        });
    }

}

function listUsrDesbloqueo(){
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/Usuarios/LstUsuarios',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var clientes = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].iUserID,
                        response.data[i].VCHUSUARIO,
                        response.data[i].sUserName,
                        response.data[i].vchidUserCorp,
                        response.data[i].iPerfilId,
                        response.data[i].sPasword,
                        response.data[i].Email,
                        response.data[i].bActivo,
                        response.data[i].iCaducidad,
                        response.data[i].iEsEmp,
                        //"<a data-toggle='modal' data-target='#usuariosModal' onclick = 'desbloqueo(this)' class='btn btn-success btn-circle btn-sm'><i class='fas fa-check'></i></a>"
                        "<img src='/img/desbloqueo_img.png' class='rounded' alt='...' title='Desbloquear usuario' data-toggle='modal' data-target='#usuariosModal' onclick = 'desbloqueo(this)'>"
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
