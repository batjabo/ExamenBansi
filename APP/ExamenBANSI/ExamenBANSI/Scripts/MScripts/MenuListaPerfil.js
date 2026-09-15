addEventListener('load', () => {
    agregaAlPrincipal();
})

function ObtenerListar() {
    const tabla = new DataTable('#dataTable');
    let counter = 1;
    $.ajax({
        url: '/MenuAccesoPerfil/Listar',
        type: 'GET',
        data: {
        },
        dataType: 'json',
        success: function (response) {
            var clientes = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].Iperfilid,
                        response.data[i].Descripcion,
                        "<img src='/img/seleccionar_img.png' class='rounded' alt='...' title='Seleccionar registro' data-toggle='modal' data-target='#usuariosModal' onclick='RegresaDatPerf(this)'>"
                    ])
                    .draw(false);
                counter++;
            }
        },
        error: function (jqXHR, status, error) {
        },
        complete: function (jqXHR, status) {
        }
    });

}

function RegresaDatPerf() {
    var id;
    var Desc;
    $("table tbody tr").click(function () {
        id = $(this).find("td:eq(0)").text();
        Desc = $(this).find("td:eq(1)").text();
        $("#txtiPerfilid").val(id);
        $("#txtDescripcion").val(Desc);
    });

}

//se guardan los menus der acceso seleccionado
function GuardarAccesos()
{
    var opcion = confirm("Desea Guardar los cambios?");

    //var datos = document.getElementById("cmbPerfiles");
    //var selected = datos.options[datos.selectedIndex].text;

    if (opcion == true) {

        var idperfil = 0;
        var iAccRd = 0;
        var iAccWr = 0;
        var iAccAutDoc = 0;
        var iAccAutReg = 0;

        var datosmnu = document.getElementById("cmbMenus");
        var selecmnu = datosmnu.options[datosmnu.selectedIndex].text;
        var datosSbm = document.getElementById("cmbsbMenus");
        var selesbmn = datosSbm.options[datosSbm.selectedIndex].text;
        
        idperfil = $("#txtiPerfilid").val();

        if (document.getElementById('chkLectura').checked) { iAccRd = 1; };
        if (document.getElementById('ChkEscritura').checked) { iAccWr = 1; };
        if (document.getElementById('ChkDocumentacion').checked) { iAccAutDoc = 1; };
        if (document.getElementById('ChkDatos').checked) { iAccAutReg = 1; };
       
        $.ajax({
            type: "POST",
            url: '/MenuAccesoPerfil/SaveCheckedNodes',
            data: {
                "IdPerfil": idperfil,
                "Menusel":  selecmnu,
                "Sbmenusel": selesbmn,
                "IAccesoRD": iAccRd,
                "IaccesoWR": iAccWr,
                "iAutDoc": iAccAutDoc,
                "iAutReg": iAccAutReg
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
    }

}
function agregaAlPrincipal() {
    var elemento = document.getElementById('content');
    $("#content-wrapper").append(elemento);
}

//muestra los valores que hay en la tabla de menus perfil para llenar los submenus
function muestraAccesoMenu(buttom) {
    RegresaDatPerf();
    const tabla = new DataTable('#dataMenus');
    let counter = 1;
    var id = $("#txtiPerfilid").val()
    var datos = document.getElementById("cmbMenus");
    var selected = datos.options[datos.selectedIndex].text;

    $.ajax({
        url: '/MenuAccesoPerfil/GETMenuPerfil',
        type: 'GET',
        data: {
            "perfil":id,
            "padre":selected
        },
        dataType: 'json',
        success: function (response) {
            $("#cmbsbMenus")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Submenu"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbsbMenus").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].SDESCRIPCION));
            };
        },
        error: function (jqXHR, status, error) {
        },
        complete: function (jqXHR, status) {
            
        }
    });

}

//muestra los valores que hay para accesos de RW en submenus
function muestraPermisosMenu(buttom) {
    RegresaDatPerf();
    //const tabla = new DataTable('#dataMenus');
    let counter = 1;
    var id = $("#txtiPerfilid").val()
    var datos = document.getElementById("cmbsbMenus");
    var selected = datos.options[datos.selectedIndex].text;

    $.ajax({
        url: '/MenuAccesoPerfil/GETMenuPerfil',
        type: 'GET',
        data: {
            "perfil": id,
            "padre": selected
        },
        dataType: 'json',
        success: function (response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].BPERMITEACCESO == 0) { document.getElementById("chkLectura").checked = false; } else { document.getElementById("chkLectura").checked = true };
                if (response.data[i].BPERMITEMOD == 0) { document.getElementById("ChkEscritura").checked = false; } else { document.getElementById("ChkEscritura").checked = true; };
                if (response.data[i].BPERMITEAUTDOC == 0) { document.getElementById("ChkDocumentacion").checked = false; } else { document.getElementById("ChkDocumentacion").checked = true };
                if (response.data[i].BPERMITEAUTREG == 0) { document.getElementById("ChkDatos").checked = false; } else { document.getElementById("ChkDatos").checked = true; };
            };

            

        },
        error: function (jqXHR, status, error) {
        },
        complete: function (jqXHR, status) {

        }
    });

}
//para llenar los select de menus principal
function catMenuPrincipal(number) {
    //var cmblst = document.getElementById('cmbPerfil');
    var i = 1;
    $.ajax({
        url: "/CatMenus/ListarPrincipal",
        data: {
            "id": 1
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbMenus")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Menu Principal al que pertenecera menu:"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbMenus").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].Principal));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos de perfiles');
        },
        complete: function (jqXHR, status) {
        }
    });

};
//select para el modal qye llena los datos de permisos del usuario
function borrarElemento() {
    //var row = document.getElementById("dataPermisos");
    //row.deleteRow();
    $('#dataPermisos').remove(rows);
}
function listarPermisos(number) {
    const tabla = new DataTable('#dataPermisos');
    let counter = 1;
    var id = $("#txtiPerfilid").val()
    if (id == "") {
        alert('Debe de seleccionar un perfil');
    }
    else {
        var i = 1;
        $.ajax({
            url: "/MenuAccesoPerfil/listPermisos",
            data: {
                "iperfil": id
            },
            type: 'GET',
            dataType: 'Json',
            success: function (response) {
                $("#dataPermisos > tbody").empty();
                for (var i = 0; i < response.data.length; i++) {
                    tabla.row
                        .add([
                            response.data[i].IMENUID,
                            response.data[i].Principal,
                            response.data[i].SDESCRIPCION,
                            response.data[i].BPERMITEACCESO,
                            response.data[i].BPERMITEMOD
                        ])
                        .draw(false);
                    counter++;
                }
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos de perfiles');
            },
            complete: function (jqXHR, status) {
            }
        });
    }


};