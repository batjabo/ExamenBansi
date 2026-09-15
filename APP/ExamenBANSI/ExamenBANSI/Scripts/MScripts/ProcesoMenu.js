function obtenerMenu() {
    agregaAlPrincipal();
    const tabla = new DataTable('#dataTable');
    let counter = 1;

    $.ajax({
        url: '/CatMenus/LstUsuarios',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var menuslst = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].IdMenu,
                        response.data[i].Descripcion,
                        response.data[i].Menu,
                        response.data[i].SURL,
                        response.data[i].IActivo,
                       // "<a id='btnSel' data-toggle='modal' data-target='#MenuModal' onclick = 'regresaDato(this)' class= 'btn btn-success' ><span class='icon text-white-50'><i class='fas fa-check'></i></span><span class='text'></span></a >"
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Seleccionar Registro' data-toggle='modal' data-target='#MenuModal' onclick='regresaDato(this)'>"
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
function limpiadatos() {
    idMenu = "";
    Descripcion = "";
    URL = "";
    $("#txtMenuId").val(idMenu);
    $("#txtDescripcion").val(Descripcion);
    $("#txtURL").val(URL);
};
 
function regresaDato(button) {
    var id;
    var menu;
    var principal;
    var URL;
    var chek1;
    
    $("table tbody tr").click(function () {
        id = $(this).find("td:eq(0)").text();
        Principal = $(this).find("td:eq(1)").text();
        menu = $(this).find("td:eq(2)").text();
        URL = $(this).find("td:eq(3)").text();
        chek1 = $(this).find("td:eq(4)").text();
        
        $("#txtMenuId").val(id);
        $("#txtDescripcion").val(menu);
        $("#txtMenu").val(Principal);
        $("#txtURL").val(URL);
        if (chek1 == 1) { $("#CheckEstatus").prop('checked', true) }
        else { $("#CheckEstatus").prop('checked', false) };
       
    });
};
function validarDatos() {
    var opcion = confirm("Desea Guardar los cambios?");
    var idMenu = 0;
    var iEstatus = 0;
    var descripcion = "";
    var ipadre="";
    var surl = "";
    
    if (opcion == true) {
        id = $("#txtMenuId").val();
        descripcion = $("#txtDescripcion").val();
        ipadre = $("#txtMenu").val();
        surl = $("#txtURL").val();
        if (document.getElementById('CheckEstatus').checked) { iEstatus = 1; };
        $.ajax({
            url: '/CatMenus/AddMenu', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "IdMenu": id,
                "Descripcion": descripcion,
                "Menu": ipadre,
                "SURL": surl,
                "IActivo": iEstatus,
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
}