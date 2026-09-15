
function agregaCol() {
// Agregar encabezado de columna
    const tabla = document.getElementById("#tableVista");
    var encabezado = prompt("Ingrese un encabezado para la nueva columna:");
    var encabezado = "";
    var th = document.createElement("th");
    th.innerHTML = encabezado;
    tabla.rows[0].appendChild(th);
}


function agregarColumna() {
    var tabla = document.getElementById("tableVista");
    idReport = $("#txtReporte").val();
    let counter = 1;
    
    //var tabla = document.getElementById("tableVista");
    // Agregar encabezado de columna
    // var encabezado = prompt("Ingrese un encabezado para la nueva columna:");
    $.ajax({
        url: "/Vistas/LstCabecera",
        data: { "IReporte":idReport},
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            
            for (var i = 0; i < response.data.length; i++) {
                var th = document.createElement("th");
                if (response.data[i].nameCampo1 == "") { encabezado = "DATO" + counter; } else { encabezado = response.data[i].nameCampo1; }
                th.innerHTML = encabezado;
                    tabla.rows[0].appendChild(th);
                counter++;
            }
       
            
        }
    });
    
}


function listaVistas() {
    var i = 1;
    $.ajax({
        url: "/Vistas/listaVistas",
        data: {
        },
        type: 'GET',
        dataType: 'Json',
        success: function (response) {
            $("#cmbVistas")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Reporte:"));
            for (var i = 0; i < response.data.length; i++) {
                $("#cmbVistas").append($("<option></option>")
                    .val(i)
                    .html(response.data[i].Nomvista));
            };
        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos de perfiles');
        },
        complete: function (jqXHR, status) {
        }
    });

}

function DepsliegaInfo() {
    const tabla = new DataTable('#tableVista');
    let counter = 1;
    fechaini = $("#fechaini").val();
    fechafin = $("#fechafin").val();
    idReport = $("#txtReporte").val();
    $.ajax({
        url: '/Vistas/Viewreportes',
        data:{
                "Fechaini": fechaini,
                "fechafin": fechafin,
                "IReporte": idReport 
        },
        
        type: 'GET',
        datatype: 'Json',
        
        success: function (response) {
            
            for (var i = 0; i < response.data.length; i++) {
                tabla.row
                    .add([
                        response.data[i].Campo1,
                        response.data[i].Campo2,
                        response.data[i].Campo3,
                        response.data[i].Campo4,
                        response.data[i].Campo5,
                        response.data[i].Campo6,
                        response.data[i].Campo7,
                        response.data[i].Campo8,
                        response.data[i].Campo9,
                        response.data[i].Campo10,
                        response.data[i].Campo11,
                        response.data[i].Campo12,
                        response.data[i].Campo13,
                        response.data[i].Campo14,
                        response.data[i].Campo15,
                        response.data[i].Campo16,
                        response.data[i].Campo17,
                        response.data[i].Campo18,
                        response.data[i].Campo19,
                        response.data[i].Campo20,
                        response.data[i].Campo21,
                        response.data[i].Campo22,
                        response.data[i].Campo23,
                        response.data[i].Campo24,
                        response.data[i].Campo25,
                        response.data[i].Campo26,
                        response.data[i].Campo27,
                        response.data[i].Campo28,
                        response.data[i].Campo29,
                        response.data[i].Campo30
                    ])
                    .draw(false)
                counter++;
            }
           
        },
        error: function (jqXHR, status, error) {
        },
        complete: function (jqXHR, status) {
        }

    });
}
