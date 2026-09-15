var exitoTemp = true;
var exitoValida = true;
var exito = true;


function generales() {
    var url = '/Generales/_DetailsPartialGenerales';
    $.get(url, { id: 1 }, function (data) { $('#vistaPartial').html(data) });
}

function documentos() {
    $.post('/CargaDocs/_CargaDocs', { id: 1 }, function (data) { $('#vistaPartial').html(data) });
}

function ConsejoAdmin() {
    $.post('/DetailsAccionistas/Consejo', { id: 1 }, function (data) { $('#vistaPartial').html(data) });
}

//function DatosGralesFideicomiso() {
//    $.post('/Clientes/FideocmisoGral', { id: 1 }, function (data) { $('#vistaPartial').html(data) });
//}
//function contratosGenerales() {
//    $.post('/Contratos/_Contratos', { id: 1 }, function (data) { $('#vistaPartial').html(data) });
//}

function Intervinientes() {
    $.post('/Intervinientes/Intervinientes', {  }, function (data) { $('#vistaPartial').html(data) });
}

function Contratos() {
    $.post('/Contratos/_Contratos', {}, function (data) { $('#vistaPartial').html(data) });
}


function comitetecnico() {

    $.post('/ComiteTecnico/_ComiteTecnico', { id: 1 }, function (data) { $('#vistaPartial').html(data) });
}


function obtenerCliente(parametro) {
    const tabla = new DataTable('#dataTable');
    let counter = 1;
    var estatusCliente; //estatus =1 clientes 2 y 3 prospectos
    
    $.ajax({
        url: '/Clientes/ListaClientes',
        type: 'GET',
        data: {
            cveTipoPersona: parametro

        },

        dataType: 'json',
        success: function (response) {
            var perfiles = JSON.stringify(response);
       //     if (response.data.length > 0) {
                for (var i = 0; i < response.data.length; i++) {
                    tabla.row
                        .add([
                            response.data[i].iPersonaID,
                            response.data[i].VCHNOMBRECOMPLETO,
                            response.data[i].RFC,
                            response.data[i].vchEstatus,
                            "<img src='/img/Seleccionar_img.png' class='rounded' alt='...' onClick='detalles(this)'>"
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

function detalles() {
    
    let dato1 = 0;
    $("table tbody tr").click(function () {
        var id = $(this).find("td:eq(0)").text()
        $.ajax({
            url: '/Details/Details',
            type: 'GET',
            data: { "iPersonaid": id },
            contentType: "application/text; charset=utf-8",
           dataType: "json",
            success: window.location.href ="/Details/Details?iPersonaid="+id,
            failure: function (response) {
                alert(response.d);
            }

        });


    
   });
}

function obtenerGeneralesCliente() {
    id = $('#txtPersonaid').val();
    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;
    $.ajax({
            url: '/Generales/DatConsejoPersona',
            type: 'GET',
            data: { "iPersonaid": id, },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var perfiles = JSON.stringify(response);
                
                iEstatusid = response.data[0].intEstatus;
                iAutorizaReg = response.data[0].btnAutorizar;
                iAutorizaDoc = response.data[0].btnAutorizaDoc;
                iGuarda = response.data[0].btnGuardar;

                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuarda.hidden = false; } else { btnGuarda.hidden = true }
                    if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; } else { btnAutorizaReg.hidden = true; }
                    
                }
                else {
                    btnGuarda.hidden = true; 
                    btnAutorizaReg.hidden = true;
                }

            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }

        });
}

function obtenConsejoPersona(param) {
    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;
    var id = 0;
    $('#txtPersonaid').hide();
    $('#rfcError').hide();
    $('#primerapellidoError').hide();
    $('#primerNombreError').hide();
    $('#NacionalidadError').hide();
    $('#cargoError').hide();
    $('#correoError').hide();
    $('#telefono1Error').hide();
    $('#telefono2Error').hide();
    $('#telefono3Error').hide();
   
    if (param == 1) {
        $("table tbody tr").click(function () {
            id = $(this).find("td:eq(0)").text()
            $.ajax({
                url: '/DetailsAccionistas/DatConsejoPersona',
                type: 'GET',
                data: { "iPersonaid": id, },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var perfiles = JSON.stringify(response);

                    document.getElementById("txtPersonaid").value = id;
                    document.getElementById('txtiPersonaid').value = id;
                    document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById('txtprimerapellido').value = response.data[0].VCHprimerapellido;
                    document.getElementById('txtsegundoapellido').value = response.data[0].VCHsegundoapellido;
                    document.getElementById('txtprimernombre').value = response.data[0].VCHprimernombre;
                    document.getElementById('txtsegundonombre').value = response.data[0].VCHsegundonombre;
                    document.getElementById('txtNacionalidadAcc').value = response.data[0].vchNacionalidad;
                    document.getElementById('txtCargo').value = response.data[0].vchCargo;
                    document.getElementById('txtCorreo').value = response.data[0].VCHCORREO;
                    document.getElementById('txtTel1').value = response.data[0].VCHTELEFONO1;
                    document.getElementById('txtTel2').value = response.data[0].VCHTELEFONO2;
                    document.getElementById('txtTel3').value = response.data[0].VCHTELEFONO3;
                    document.getElementById("txtvchRFC").value = response.data[0].vchRFC;

                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnGuardaCon.hidden = false; } else { btnGuardaCon.hidden = true }
                        if (iAutorizaReg == 1) { btnAutorizaRegCon.hidden = false; } else { btnAutorizaRegCon.hidden = true; }
                    }
                    else {
                        btnGuardaCon.hidden = true;
                        btnAutorizaRegCon.hidden = true;
                    }

                },
                error: function (jqXHR, status, error) {
                    alert('Hay un error al cargar los datos');
                },
                complete: function (jqXHR, status) {
                }

            });
        });
    }
    if (param == 2) {
        $("table tbody tr").click(function () {
            id = $(this).find("td:eq(0)").text()
            $.ajax({
                url: '/DetailsAccionistas/DatConsejoPersona',
                type: 'GET',
                data: { "iPersonaid": id, },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var perfiles = JSON.stringify(response);

                    document.getElementById("txtPersonaid").value = id;
                    document.getElementById('txtiPersonaid').value = id;
                    document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById('txtprimerapellido').value = response.data[0].VCHprimerapellido;
                    document.getElementById('txtsegundoapellido').value = response.data[0].VCHsegundoapellido;
                    document.getElementById('txtprimernombre').value = response.data[0].VCHprimernombre;
                    document.getElementById('txtsegundonombre').value = response.data[0].VCHsegundonombre;
                    document.getElementById('txtNacionalidadAcc').value = response.data[0].vchNacionalidad;
                    document.getElementById('txtCargo').value = response.data[0].vchCargo;
                    document.getElementById('txtCorreo').value = response.data[0].VCHCORREO;
                    document.getElementById('txtTel1').value = response.data[0].VCHTELEFONO1;
                    document.getElementById('txtTel2').value = response.data[0].VCHTELEFONO2;
                    document.getElementById('txtTel3').value = response.data[0].VCHTELEFONO3;
                    document.getElementById("txtvchRFC").value = response.data[0].vchRFC;

                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnGuarda.hidden = false; } else { btnGuarda.hidden = false }
                        if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; } else { btnAutorizaReg.hidden = true; }
                    }
                    else {
                        btnGuarda.hidden = true;
                        btnAutorizaReg.hidden = true;
                    }

                },
                error: function (jqXHR, status, error) {
                    alert('Hay un error al cargar los datos');
                },
                complete: function (jqXHR, status) {
                }

            });
        });
    }
    if (param == 0) {
        $.ajax({
            url: '/DetailsAccionistas/DatConsejoPersona',
            type: 'GET',
            data: { "iPersonaid": id, },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var perfiles = JSON.stringify(response);

                document.getElementById("txtPersonaid").value = id;
                document.getElementById('txtiPersonaid').value = id;
                document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                document.getElementById('txtprimerapellido').value = response.data[0].VCHprimerapellido;
                document.getElementById('txtsegundoapellido').value = response.data[0].VCHsegundoapellido;
                document.getElementById('txtprimernombre').value = response.data[0].VCHprimernombre;
                document.getElementById('txtsegundonombre').value = response.data[0].VCHsegundonombre;
                document.getElementById('txtNacionalidadAcc').value = response.data[0].vchNacionalidad;
                document.getElementById('txtCargo').value = response.data[0].vchCargo;
                document.getElementById('txtCorreo').value = response.data[0].VCHCORREO;
                document.getElementById('txtTel1').value = response.data[0].VCHTELEFONO1;
                document.getElementById('txtTel2').value = response.data[0].VCHTELEFONO2;
                document.getElementById('txtTel3').value = response.data[0].VCHTELEFONO3;
                document.getElementById("txtvchRFC").value = response.data[0].vchRFC;

                iEstatusid = response.data[0].intEstatus;
                iAutorizaReg = response.data[0].btnAutorizar;
                iAutorizaDoc = response.data[0].btnAutorizaDoc;
                iGuarda = response.data[0].btnGuardar;
                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuardaCon.hidden = false; } else { btnGuardaCon.hidden = true }
                    if (iAutorizaReg == 1) { btnAutorizaRegCon.hidden = false; } else { btnAutorizaRegCon.hidden = true; }
                }
                else {
                    btnGuardaCon.hidden = true;
                    btnAutorizaRegCon.hidden = true;
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

function obtenClienteDireccion(param) {
    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;
    var id = 0;
    var iDomicilioid = 0;
    $("#TipoDomicilioError").hide();
    $("#CalleError").hide();
    $("#NumeroExteriorError").hide();
    $("#NumeroInteriorError").hide();
    $("#CodigopostalError").hide();
    $("#DelegMunicipioError").hide();
    $("#CiudadPobError").hide();
    $("#EntidadFedError").hide();
    $("#ColoniaError").hide();
    
    if (param == 1) {
        $("table tbody tr").click(function () {
             id = $(this).find("td:eq(0)").text()
             iDomicilioid = $(this).find("td:eq(1)").text()

            $.ajax({
                url: '/Generales/DatClienteDireccion',
                type: 'GET',
                data: { "iPersonaid": id, "idDomicilio": iDomicilioid },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.data.length > 0) {
                        document.getElementById("PersonaDir").value = id;
                        document.getElementById('txtiPersonaidom').value = id;
                        document.getElementById('txtiDomiclioID').value = iDomicilioid;
                        document.getElementById('iPersonaDomicilio').value = iDomicilioid;
                        document.getElementById('txtiTipoDomicilio').value = response.data[0].iTipoDomicilio;
                        document.getElementById('calle').value = response.data[0].Calle;
                        document.getElementById('NumeroExterior').value = response.data[0].NumeroExterior;
                        document.getElementById('NumeroInterior').value = response.data[0].NumeroInterior;

                        //$('#txtCmbColonia').val(response.data[0].Colonia);
                        //$('#txtCmbColonia').change();
                        document.getElementById('txtColonia').value = response.data[0].Colonia;
                        document.getElementById('txtCodigopostal').value = response.data[0].Codigopostal;
                        document.getElementById('DelegMunicipio').value = response.data[0].DelegMunicipio;
                        document.getElementById('CiudadPoblacion').value = response.data[0].CiudadPoblacion;
                        document.getElementById('EntidadFed').value = response.data[0].EntidadFed;
                        document.getElementById('iAnosAntigdomicilio').value = response.data[0].iAnosAntigdomicilio;
                        iEstatusid = response.data[0].iEstatus;
                        iAutorizaReg = response.data[0].btnAutorizaReg;
                        iAutorizaDoc = response.data[0].btnAutorizaDoc;
                        iGuarda = response.data[0].btnGuardar;

                    }
                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnDir.hidden = false } else { btnDir.hidden = true }
                        if (iAutorizaReg == 1) { btnAutorizaRegDir.hidden = false } else { btnAutorizaRegDir.hidden = true }
                    }
                    else {
                        btnDir.hidden = true;
                        btnAutorizaRegDir.hidden = true;
                    }

                },
                error: function (jqXHR, status, error) {
                    alert(response.d);
                },
                complete: function (jqXHR, status) {
                }

            });
        });
    }
    if (param == 0) {
        $.ajax({
            url: '/Clientes/DatClienteDireccion',
            type: 'GET',
            data: { "iPersonaid": id, "idDomicilio": iDomicilioid },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.data.length > 0) {
                    document.getElementById("PersonaDir").value = id;
                    document.getElementById('txtiPersonaidom').value = id;
                    document.getElementById('txtiDomiclioID').value = iDomicilioid;
                    document.getElementById('iPersonaDomicilio').value = iDomicilioid;
                    document.getElementById('txtiTipoDomicilio').value = response.data[0].iTipoDomicilio;
                    document.getElementById('calle').value = response.data[0].Calle;
                    document.getElementById('NumeroExterior').value = response.data[0].NumeroExterior;
                    document.getElementById('NumeroInterior').value = response.data[0].NumeroInterior;

                    //$('#txtCmbColonia').val(response.data[0].Colonia);
                    //$('#txtCmbColonia').change();
                    document.getElementById('txtColonia').value = response.data[0].Colonia;
                    document.getElementById('txtCodigopostal').value = response.data[0].Codigopostal;
                    document.getElementById('DelegMunicipio').value = response.data[0].DelegMunicipio;
                    document.getElementById('CiudadPoblacion').value = response.data[0].CiudadPoblacion;
                    document.getElementById('EntidadFed').value = response.data[0].EntidadFed;
                    document.getElementById('iAnosAntigdomicilio').value = response.data[0].iAnosAntigdomicilio;
                    iEstatusid = response.data[0].iEstatus;
                    iAutorizaReg = response.data[0].btnAutorizaReg;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;

                }
                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnDir.hidden = false } else { btnDir.hidden = true }
                    if (iAutorizaReg == 1) { btnAutorizaRegDir.hidden = false } else { btnAutorizaRegDir.hidden = true }
                }
                else {
                    btnDir.hidden = true;
                    btnAutorizaRegDir.hidden = true;
                }

            },
            error: function (jqXHR, status, error) {
                alert(response.d);
            },
            complete: function (jqXHR, status) {
            }

        });
               
   
    }

}

function obtenAccionista(param) {

    $('#NombreCompletoError').hide();
    $('#porcentajeError').hide();
    $('#NacionalidadError').hide();
    var id = 0;
    if (param == 1) {
        $("table tbody tr").click(function () {
             id = $(this).find("td:eq(0)").text()
            $.ajax({
                url: '/Clientes/GetAccionista',
                type: 'GET',
                data: { "ipersonaid": id },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    document.getElementById("miPersonaid").value = response.data[0].iPersonaid;
                    document.getElementById("txtiPersonaCon").value = response.data[0].iPersonaPrincipal;
                    document.getElementById("txtNombreCompleto").value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById("txtPorcentaje").value = response.data[0].porcentajeAccion;
                    document.getElementById("txtNacionalidadAc").value = response.data[0].nacionalidad;

                    intEstatus = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;

                    if (intEstatus == 3) {
                        if (iGuarda == 1) { btnCon.hidden = false; } else { btnCon.hidden = true }
                        if (iAutorizaReg == 1) { btnAutorizaRegAcc = false; } else { btnAutorizaRegAcc.hidden = true }
                    }
                    else {
                        btnCon.hidden = true; btnAutorizaRegAcc.hidden = true
                    }

                },
                error: function (jqXHR, status, error) {
                    alert(response.d);
                },
                complete: function (jqXHR, status) {
                }

            });

        });
    }
    if (param == 0) {
        $.ajax({
            url: '/Clientes/GetAccionista',
            type: 'GET',
            data: { "ipersonaid": id },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                document.getElementById("miPersonaid").value = response.data[0].iPersonaid;
                document.getElementById("txtiPersonaCon").value = response.data[0].iPersonaPrincipal;
                document.getElementById("txtNombreCompleto").value = response.data[0].VCHNOMBRECOMPLETO;
                document.getElementById("txtPorcentaje").value = response.data[0].porcentajeAccion;
                document.getElementById("txtNacionalidadAc").value = response.data[0].nacionalidad;
               // document.getElementById("txtnacionalidadA").value = response.data[0].nacionalidad;

                intEstatus = response.data[0].intEstatus;
                iAutorizaReg = response.data[0].btnAutorizar;
                iAutorizaDoc = response.data[0].btnAutorizaDoc;
                iGuarda = response.data[0].btnGuardar;

                if (intEstatus == 3) {
                    if (iGuarda == 1) { btnCon.hidden = false; } else { btnCon.hidden = true }
                    if (iAutorizaReg == 1) { btnAutorizaRegAcc.hidden = false; } else { btnAutorizaRegAcc.hidden = true }
                }
                else {
                    btnCon.hidden = true; btnAutorizaReg.hidden = true
                }

            },
            error: function (jqXHR, status, error) {
                alert(response.d);
            },
            complete: function (jqXHR, status) {
            }

        });

    }
}

function GUardaDostosFideicomiso() {
    var id = $('#txtPersonaid').val();
    var fecha1;
    var fecha2;
    var fecha3;
    var iEstatusid;
    var modal = "ModalgeneralFideicomiso";

    let parametros = {
        iPersonaid: $("#txtPersonaid").val(),
        vchFinalidadFideicomiso : $("#txtFinFideicomiso").val(),
        dCelebracionFideicom: $("#txtdCelebracionFideicom").val(),
        PatrimonioFideicomitido: $("#txtPatrimonioFideicomitido").val(),
        AportacionFideicomitente: $("#txtAportacionFideicomitente").val(),
    }
    if (ValidaDatosFideicomiso()) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            $.ajax({
                url: '/Clientes/ActualizaFideicomiso',
                type: 'GET',
                data: parametros,
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    muestraMensaje("Los Datos se guardaron correctamente.", 1, modal);
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(response.d, 1, modal);
                },
                complete: function (jqXHR, status) {
                }

            });
        }

        }
}
function Agregar(modal) {
    
    if (validaDatosGenerales()) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            var datos = document.getElementById("cmbTipos");
            var selected = datos.options[datos.selectedIndex].text;

            id = $("#txtPersonaid").val();
            rfc = $("#txtrfc").val();
            Nombre = $("#txtNombre").val();
            NombreCom = $("#txtNomCom").val();

            var datoTipo = $('#txtTipoPersona').val(); //document.getElementById("cmbTipos");
            
            var datoNacional = $('#txtNacionalidad').val(); //document.getElementById("cmbNacionalidad");
           
            var txtGiro = $('#txtGiro').val();
            if (datoTipo == "Moral") {
                int_Estatus = 3;
                iCve_TipoPersona = 1;
            }
            if (datoTipo == "Fideicomiso") {
                int_Estatus = 3;
                iCve_TipoPersona = 2;
            }

            txtSerieCert = $("#txtSerieCert").val();

            
            $.ajax({
                url: '/Clientes/AgregaClientes',
                type: 'GET',
                data: {
                    "iPersonaID": id,
                    "intEstatus": int_Estatus,
                    "iCveTipoPersona": iCve_TipoPersona,
                    "RFC": rfc,
                    "VCHNOMBRECOMPLETO": Nombre,
                    "VCHNOMBRECOMERCIAL": NombreCom,
                    "iPersona": datoTipo,
                    "VCHnacionalidad": datoNacional,
                    "intGiro": txtGiro,
                    "VCHserieEfirma": txtSerieCert
                },
                dataType: 'json',
                success: function (response) {
                    muestraMensaje("Los Datos se guardaron correctamente.", 1, modal);
      
                },
                error: function (jqXHR, status, error) {
                    alert('Ocurrio un error al guaradr los datos');
                },
                complete: function (jqXHR, status) {
                }
            });
        }
    }

}

function obtenNuevoAccionista() {
   
    var id = 0;
    var NomAcc = "";
    var porAcc = 0;
    var nacionalidad = "";
    document.getElementById("miPersonaid").value = id;
    document.getElementById("txtiPersonaCon").value = id;
    document.getElementById("NombreCompleto").value = NomAcc;
    document.getElementById("iPorcentaje").value = porAcc;
    document.getElementById("txtNacionalidadAcc").value = nacionalidad;
    document.getElementById("txtnacionalidadA").value = nacionalidad;


}

function GuardaDatosDir() {
    var opcion = confirm("Desea Guardar los cambios?");

    if (opcion == true) {
        var ipersonaid = $('#txtId').val();
        var iTipoDomicilio = $('#txtTipoDireccion').val();

        var datos = document.getElementById("cmbTipoPersona");
        var selected = datos.options[datos.selectedIndex].text;

        var Calle = $('#txtCalle').val();
        var NumeroExterior = $('#txtNoExt').val();
        var NumeroInterior = $('#txtNomInt').val();
        var Colonia = $('#txtColonia').val();
        var DelegMunicipio = $('#txtDelMun').val();
        var CiudadPoblacion = $('#txtEstado').val();
        var EntidadFed = $('#txtLocalidad');
        var Codigopostal = $('#txtCodigoPostal').val();
        var iAnosAntigdomicilio = $('txtAnios').val();
       
        $.ajax({
            url: '/Clientes/GuardarDir',
            data: {
                "Calle": Calle,
                "NumeroExterior": NumeroExterior,
                "NumeroInterior": NumeroInterior,
                "Colonia": Colonia,
                "DelegMunicipio": DelegMunicipio,
                "CiudadPoblacion": CiudadPoblacion,
                "EntidadFed": EntidadFed,
                "Codigopostal": Codigopostal,
                "iAnosAntigdomicilio": iAnosAntigdomicilio },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                alert('Datos Guadados correctamente');
                locate.reload();
            },
            failure: function (response) {
                alert(response.d);
            }
        });

    }
    
}
//#REGION ABRIR ARCHIVOS
function abrirFileDoc() {
    var Nomfile = "";
    var pdfUrl = "";
    $("table tbody tr").click(function () {
        Nomfile = $(this).find("td:eq(3)").text();
         pdfUrl = "/Clientes/abrirFile?namefile=" + Nomfile;
        window.open(pdfUrl, '_blank');
        locate.reload;
    });
    
 }

function abrirFileOtros() {
    var Nomfile = "";
    var pdfUrl = "";
    Nomfile = $("#nomFile").val();
    pdfUrl = "/Clientes/abrirFile?namefile=" + Nomfile;
    window.open(pdfUrl, '_blank');
    locate.reload;
}

//#END REGION ABRIR ARCHIVO

function ListaDocumento() {
    var id = 0;
    var intEstatus = 0;
    $("table tbody tr").click(function () {
        
         id = $(this).find("td:eq(0)").text()
        $.ajax({
            url: '/Clientes/ListaDocs',
            type: 'GET',
            data: { "idPersona": id, },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.data.length > 0) {
                    var perfiles = JSON.stringify(response);

                    document.getElementById("datoPersona").value = id;
                    document.getElementById("txtID").value = id;
                    document.getElementById('txtTipoDoc').value = response.data[0].iTipodeDocumento;
                    document.getElementById('Numidentificacion').value = response.data[0].Numidentificacion;
                    document.getElementById('Fechavence').value = response.data[0].Fechavence;
                    document.getElementById('nomFile').value = response.data[0].nomFile;
                    iEstatusid = response.data[0].iEstatus;
                    intEstatus = response.data[0].intEstatusDoc;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                }
                
                if (intEstatus == 3 || intEstatus == 4)
                {
                    if (intEstatus == 3) {
                        if (iGuarda == 1) { btnCargar.hidden = false; } else { btnCargar.hidden = true; }
                        if (iAutorizaDoc == 1) { AutoRegOtros.hidden = false; RechazaDoc.hidden = false; } else { AutoRegOtros.hidden = true; RechazaDoc.hidden = true; }
                    }
                    if (intEstatus == 4) {
                        if (iGuarda == 1) { btnCargar.hidden = false; } else { btnCargar.hidden = true; }
                        if (iAutorizaDoc == 1) { AutoRegOtros.hidden = true; RechazaDoc.hidden = false; } else { AutoRegOtros.hidden = false; RechazaDoc.hidden = true; }
                    }
                   
                }
                
                else {
                    btnCargar.hidden = true;
                    AutoRegOtros.hidden = true;
                    RechazaDoc.hidden = true;
                    
                }

            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }
        });
    });
}

//rEGION AUTORIZACIONES
function AutorizaRegCliente(param) {

    if (param == 1) { idPersona = $("#txtPersonaid").val(); }; //CLIENTES
    if (param == 3) { idPersona = $("#MICAMPO").val(); }; //intervinientes
    if (param == 4) { idPersona = $("#iPersonaid").val(); }; //aCCIONISTA
    if (param == 5) { idPersona = $("#campoFidoc").val(); }; //aCCIONISTA
    if (param == 6) { idPersona = $("#miPersonaid").val(); }; //CONSEJO DE ADMINISTRACION
    if (param == 9) { idPersona = $("#txtiPersonaid").val(); }; //CONTACTO
  
        var opcion = confirm("Desea Autorizar el registro?");
        if (opcion == true) {
            $.ajax({
                url: '/Clientes/AutorizaReg',
                data: {
                    "iPersonaid": idPersona,
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    alert('Registro Autorizado');
                    //location.reload();
                },
                failure: function (response) {
                    alert(response.d);
                }
            });
        }
}

function AutorizaFileCliente(param) {
    $("table tbody tr").click(function () {
        idPersona = $(this).find("td:eq(0)").text();
        vchDescripcion = $(this).find("td:eq(1)").text();
        vchNameFile = $(this).find("td:eq(3)").text();
        var intEstatus = param;
        if (vchNameFile != 'Not Found') {
            var opcion = confirm("Desea Autorizar el registro?");
            if (opcion == true) {

                $.ajax({
                    url: '/Clientes/AutorizaDoc',
                    data: {
                        "iPersonaid": idPersona,
                        "vchDescripcion": vchDescripcion,
                        "intEstatus": intEstatus
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        alert('Datos Actualizados correctamente');
                        //location.reload();
                    },
                    failure: function (response) {
                        alert(response.d);
                    }
                });
            }
        }
        else {
            alert('El registro no contiene ningun Archivo cargado')
        }
    });
}

function AutorizaFileOtros(param) {
    
    var idPersona = $('#txtID').val();
    var vchDescripcion = $('#txtTipoDoc').val();
    var vchNameFile = $('#nomFile').val();
        if (vchNameFile != 'Not Found') {
            var opcion = confirm("Desea Autorizar el documento?");
            if (opcion == true) {
                $.ajax({
                    url: '/Clientes/AutorizaDoc',
                    data: {
                        "iPersonaid": idPersona,
                        "vchDescripcion": vchDescripcion
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        alert('Datos Actualizados correctamente');
                        //location.reload();
                    },
                    failure: function (response) {
                        alert(response.d);
                    }
                });
            }

        }
        else {
            alert('El registro no contiene ningun Archivo cargado')
        }
}

function AutorizaDir(param) {
    var parametro = 0;
    var iConsulta = 0;
    var opcion = confirm("Desea Autorizar el registro?");
    if (opcion == true) {
        if (param == 'Prospecto') { parametro = $("#txtiDomiclioID").val(); iConsulta = 2; } else { parametro = $("#txtiPersonaidom").val(); iConsulta = 1; }
        $.ajax({
            url: '/Clientes/AutorizaDir',
            data: {
                "parametro": parametro,
                "iConsulta": iConsulta
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                alert('Datos Actualizados correctamente');
                //location.reload();
            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

}

function AutorizaEscritura(param) {

    
    var opcion = confirm("Desea Autorizar el registro?");
    if (opcion == true) {
        if (param == 'Prospecto') {
            idPersona = $('#txtIPersona').val();
            $.ajax({
                url: '/Clientes/AutorizaEscritura',
                data: {
                    "iPersonaid": idPersona,
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    alert('Datos Actualizados correctamente');
                    //location.reload();
                },
                failure: function (response) {
                    alert(response.d);
                }
            });
        }

    }
       
}

function HabilitaBoton() {
    var iEstatusid = 3
    var iAutorizaReg = response.data[0].btnAutorizar;
    iAutorizaDoc = response.data[0].btnAutorizaDoc;
    iGuarda = response.data[0].btnGuardar;

    $.ajax({
        url: '/Clientes/DatConsejoPersona',
        type: 'GET',
        data: { "iPersonaid": id, },
        contentType: "application/text; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var perfiles = JSON.stringify(response);
            document.getElementById("txtPersonaid").value = id;
            document.getElementById('iPersonaid').value = id;
            document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
            document.getElementById('VCHprimerapellido').value = response.data[0].VCHprimerapellido;
            document.getElementById('VCHsegundoapellido').value = response.data[0].VCHsegundoapellido;
            document.getElementById('VCHprimernombre').value = response.data[0].VCHprimernombre;
            document.getElementById('VCHsegundonombre').value = response.data[0].VCHsegundonombre;
            document.getElementById('vchNacionalidad').value = response.data[0].vchNacionalidad;
            document.getElementById('vchCargo').value = response.data[0].vchCargo;
            document.getElementById('VCHCORREO').value = response.data[0].VCHCORREO;
            document.getElementById('VCHTELEFONO1').value = response.data[0].VCHTELEFONO1;
            document.getElementById('VCHTELEFONO2').value = response.data[0].VCHTELEFONO2;
            document.getElementById('VCHTELEFONO3').value = response.data[0].VCHTELEFONO3;
            document.getElementById("vchRFC").value = response.data[0].vchRFC;

            iEstatusid = response.data[0].intEstatus;
            iAutorizaReg = response.data[0].btnAutorizar;
            iAutorizaDoc = response.data[0].btnAutorizaDoc;
            iGuarda = response.data[0].btnGuardar;

            if (iEstatusid == 3) {
                if (iGuarda == 1) { btnGuarda.hidden = false; btnGuarda2.hidden = false; } else { btnGuarda.hidden = true; btnGuarda2.hidden = false; }
                if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; btnAutorizaReg2.hidden = false; } else { btnAutorizaReg.hidden = true; btnAutorizaReg2.hidden = false; }
            }
            else {
                btnGuarda.hidden = true; btnGuarda2.hidden = true;
                btnAutorizaReg.hidden = true; btnAutorizaReg2.hidden = true;
            }

        },
        error: function (jqXHR, status, error) {
            alert('Hay un error al cargar los datos');
        },
        complete: function (jqXHR, status) {
        }

    });

    if (iEstatusid == 3) {
        if (iGuarda == 1) { btnGuarda.hidden = false; btnGuarda2.hidden = false; } else { btnGuarda.hidden = true; btnGuarda2.hidden = false; }
        if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; btnAutorizaReg2.hidden = false; } else { btnAutorizaReg.hidden = true; btnAutorizaReg2.hidden = false; }
    }
    else {
        btnGuarda.hidden = true; btnGuarda2.hidden = true;
        btnAutorizaReg.hidden = true; btnAutorizaReg2.hidden = true;
    }
}
// END REGION

function Listarechazos(param, controler, param2, modal) {
    var intEstatus = param;
    var intEstatus;
    if (vchNameFile != 'Not Found') {
        $.ajax({
            url: controler,
            data: param,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#cmbMotivo")
                    .empty()
                    .append($("<option></option>")
                        .val("0")
                        .html("Seleccione Motivo"));
                for (var i = 0; i < response.data.ModeloOpcionrechazo.length; i++) {
                    $("#cmbMotivo").append($("<option></option>")
                        .val(response.data.ModeloOpcionrechazo[i].Descripcion)
                        .html(response.data.ModeloOpcionrechazo[i].Descripcion))
                };

                document.getElementById("iPersonaid").value = response.data.ModelorechazaDatos.ipersonaid;
                document.getElementById("TipoDocumento").value = response.data.ModelorechazaDatos.TipoDocumento;
                document.getElementById("txtMotivoRechazo").value = response.data.ModelorechazaDatos.txtMotivoRechazo;
                document.getElementById("txtMotivo").value = response.data.ModelorechazaDatos.txtMotivo;
                iEstatus = response.data.ModelorechazaDatos.iEstatus;
                if (iEstatus == 4) { btnRechazo.hidden = true; } else { btnRechazo.hidden = false; }

            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }
    else {
        alert('El registro no contiene ningun Archivo cargado')
    }

}

function RechazarDocumento() {
    try {
        if (ValidaModelo()) {
            let ipersonaid = parseInt($("#iPersonaid").val());
            let txtMotivoRechazo = $("#txtMotivoRechazo").val();
            let txtMotivo = $("#txtMotivo").val();
            let TipoDocumento = $("#TipoDocumento").val();

            var ModelRegistro = {};
            ModelRegistro.ipersonaid = ipersonaid;
            ModelRegistro.txtMotivoRechazo = txtMotivoRechazo;
            ModelRegistro.txtMotivo = txtMotivo;
            ModelRegistro.TipoDocumento = TipoDocumento;
            ModelRegistro.iEstatus = 4;

            var Parametros = { model: ModelRegistro };
            let Controller = "../Clientes/jsRechazaRegistro";

            CallAjaxWithError(Controller, Parametros, ExitoRegistr, errorGeneral, true);
        }
    } catch (e) {
        errorGeneral(e);
    }

}

function errorGeneral() {
    muestraMensaje("Ocurrió un error.", 1)
}

function CallAjaxWithError(controlador, parametros, funcionExito, funcionError, esPost) {
    try
    {
        $.ajax({
            type: esPost ? "POST" : "GET",
            url: controlador,
            data: parametros,
        }).done(function (result, status, ob) {
            funcionExito(result, status, ob);
        }).fail(function (result, status, ob) {

            alert('Ocurrio un error');
            if (result.status == 403) {
                MuestraAlertaErrorPermiso();
            }
            else {
                funcionError(result, status, ob);
            }
        });
    } catch (e) {
        errorGeneral()
    }
}

function ExitoRegistr(data) {
    try {
        if (data.data.Success) {
            $("#ModalMotivorechazo").modal("toggle");
            muestraMensaje(data.data.Message, 1);
        }
        else {
            muestraMensaje("Ocurrió un error con los datos", 1);
        }
    } catch (e) {
        errorGeneral();
    }

}
//JB
function Modalinter(param) {

    var IdPersona;
    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;
    
    //$("#resultado").hide();
    $("#rfcError").hide();
    $("#NombreCompletoError").hide();
    $("#primerapellidoError").hide();
    $("#primerNombreError").hide();
    $("#NacionalidadError").hide();
    $("#cargoError").hide();
    $("#correoError").hide();
    $("#telefono1Error").hide();

    if (param == 1) {
        $("table tbody tr").click(function () {
            IdPersona = $(this).find("td:eq(0)").text();

            $.ajax({

                url: '/Intervinientes/EditInterviniente',
                data: {
                    "idPersona": IdPersona
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {

                    document.getElementById('txtiPersonaid').value = IdPersona;
                    document.getElementById('MICAMPO').value = IdPersona;
                    document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById('txtprimerapellido').value = response.data[0].VCHprimerapellido;
                    document.getElementById('txtsegundoapellido').value = response.data[0].VCHsegundoapellido;
                    document.getElementById('txtprimernombre').value = response.data[0].VCHprimernombre;
                    document.getElementById('txtsegundonombre').value = response.data[0].VCHsegundonombre;
                    document.getElementById('txtNacionalidadAcc').value = response.data[0].vchNacionalidad;
                    document.getElementById('txtvchRFC').value = response.data[0].vchRFC;
                    document.getElementById('txtCargo').value = response.data[0].vchCargo;
                    document.getElementById('txtCorreo').value = response.data[0].VCHCORREO;
                    document.getElementById('txtTel1').value = response.data[0].VCHTELEFONO1;
                    document.getElementById('txtTel2').value = response.data[0].VCHTELEFONO2;
                    document.getElementById('txtTel3').value = response.data[0].VCHTELEFONO3;
                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;


                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnGuarda.hidden = false; }
                        else { btnGuarda.hidden = true; }
                        if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; }
                        else { btnAutorizaReg.hidden = true; }

                    }
                    else {
                        btnGuarda.hidden = true;
                        btnAutorizaReg.hidden = true;

                    }

                },
                failure: function (response) {
                    alert(response.d);
                }

            });
        });
    }
    if (param == 0) {
        var IdPersona = 0;
        $.ajax({

            url: '/Intervinientes/EditInterviniente',
            data: {
                "idPersona": IdPersona
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                document.getElementById('txtiPersonaid').value = IdPersona;
                document.getElementById('MICAMPO').value = IdPersona;
                document.getElementById('VCHNOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                document.getElementById('txtprimerapellido').value = response.data[0].VCHprimerapellido;
                document.getElementById('txtsegundoapellido').value = response.data[0].VCHsegundoapellido;
                document.getElementById('txtprimernombre').value = response.data[0].VCHprimernombre;
                document.getElementById('txtsegundonombre').value = response.data[0].VCHsegundonombre;
                document.getElementById('txtNacionalidadAcc').value = response.data[0].vchNacionalidad;
                document.getElementById('txtvchRFC').value = response.data[0].vchRFC;
                document.getElementById('txtCargo').value = response.data[0].vchCargo;
                document.getElementById('txtCorreo').value = response.data[0].VCHCORREO;
                document.getElementById('txtTel1').value = response.data[0].VCHTELEFONO1;
                document.getElementById('txtTel2').value = response.data[0].VCHTELEFONO2;
                document.getElementById('txtTel3').value = response.data[0].VCHTELEFONO3;
                iEstatusid = response.data[0].intEstatus;
                iAutorizaReg = response.data[0].btnAutorizar;
                iAutorizaDoc = response.data[0].btnAutorizaDoc;
                iGuarda = response.data[0].btnGuardar;


                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuarda.hidden = false; }
                    else { btnGuarda.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; }
                    else { btnAutorizaReg.hidden = true; }

                }
                else {
                    btnGuarda.hidden = true;
                    btnAutorizaReg.hidden = true;

                }

            },
            failure: function (response) {
                alert(response.d);
            }

        });

    }

}

function DirecInterv(param) {
 
    var IdPersona;
    var iEstatus = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;

    $("#TipoDomicilioError").hide();
    $("#CalleError").hide();
    $("#NumeroExteriorError").hide();
    $("#NumeroInteriorError").hide();
    $("#CodigopostalError").hide();
    $("#DelegMunicipioError").hide();
    $("#CiudadPobError").hide();
    $("#EntidadFedError").hide();
    $("#ColoniaError").hide();


    $("table tbody tr").click(function () {
        IdPersona = $(this).find("td:eq(0)").text();

        $.ajax({

            url: '/Intervinientes/DirecInterv',
            data: {
                "idPersona": IdPersona
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.data.length > 0) {

                    document.getElementById('PersonaDir').value = IdPersona;
                    document.getElementById('iPersonaDomicilio').value = IdPersona;
                    document.getElementById('txtiTipoDomicilio').value = response.data[0].iTipoDomicilio;
                    document.getElementById('calle').value = response.data[0].Calle;
                    document.getElementById('NumeroExterior').value = response.data[0].NumeroExterior;
                    document.getElementById('NumeroInterior').value = response.data[0].NumeroInterior;
                    document.getElementById('txtCodigopostal').value = response.data[0].Codigopostal;
                    document.getElementById('txtColonia').value = response.data[0].Colonia;
                    document.getElementById('DelegMunicipio').value = response.data[0].DelegMunicipio;
                    document.getElementById('CiudadPoblacion').value = response.data[0].CiudadPoblacion;
                    document.getElementById('EntidadFed').value = response.data[0].EntidadFed;
                    document.getElementById('iAnosAntigdomicilio').value = response.data[0].iAnosAntigdomicilio;
                    iEstatus = response.data[0].iEstatus;
                    iAutorizaReg = response.data[0].btnAutorizaReg;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                }

                else {

                    document.getElementById('PersonaDir').value = IdPersona;
                    document.getElementById('iPersonaDomicilio').value = IdPersona;
                    document.getElementById('txtiTipoDomicilio').value = "";
                    document.getElementById('calle').value = "";
                    document.getElementById('NumeroExterior').value = "";
                    document.getElementById('NumeroInterior').value = "";
                    document.getElementById('txtCodigopostal').value = "";
                    document.getElementById('txtColonia').value = "";
                    document.getElementById('DelegMunicipio').value = "";
                    document.getElementById('CiudadPoblacion').value = "";
                    document.getElementById('EntidadFed').value = "";
                    document.getElementById('iAnosAntigdomicilio').value = "";
                    iEstatus = 3;
                    iAutorizaReg = response.data[0].btnAutorizaReg;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                }
                if (iEstatus == 3) {
                    if (iGuarda == 1) { GuardaDirInt.hidden = false; }
                    else { GuardaDirInt.hidden = true;}
                    if (iAutorizaReg == 1) { btnAutDirInt.hidden = false }
                    else { btnAutDirInt.hidden = true;}

                }
                else {
                    GuardaDirInt.hidden = true;
                    btnAutorizaRegDir.hidden = true;
                }

            },
            failure: function (response) {
                alert(response.d);
            }

        });
    });
}



function lstPoder(param) {
    var IdPersona;
    var fecha1;
    var fecha2;
    var fecha3;
    var iEstatusid;
    $("#NumEscrituraError").hide();
    $("#FechaEscrituraError").hide();
    $("#NomNotarioError").hide();
    $("#NumNotariaError").hide();
    $("#FechaResError").hide();
    $("#PlazaResError").hide();
    $("#NumResPublicError").hide();
    $("#TipoPoderError").hide();
    
    if (param == 1) {

        IdPersona=-1
        $.ajax({

            url: '/Clientes/lstPoderes',
            data: {
                "idPersona": IdPersona
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.data.length > 0) {

                    fecha1 = convertirJsonDateAFecha(response.data[0].FechaEscritura);
                    if (param == 1) { fecha2 = convertirJsonDateAFecha(response.data[0].FechaCons); }
                    if (param == 2) { fecha2 = convertirJsonDateAFecha(response.data[0].FechaRes); }
                    var dato1 = formatDate(fecha1);
                    var dato = formatDate(fecha2);
                    var datoanio = dato1.substring(6, 10); var datoMes = dato1.substring(4, 6);
                    document.getElementById('iPersonaid').value = response.data[0].iPersonaid;
                    document.getElementById('txtIPersona').value = response.data[0].iPersonaid;
                    document.getElementById('NumEscritura').value = response.data[0].NumEscritura;
                    document.getElementById('FechaEscritura').value = dato1;
                    document.getElementById('NomNotario').value = response.data[0].NomNotario;
                    document.getElementById('NumNotaria').value = response.data[0].NumNotaria;

                    if (param == 1) { document.getElementById('FechaCons').value = dato; }
                    if (param == 2) { document.getElementById('FechaRes').value = dato; }

                    document.getElementById('PlazaRes').value = response.data[0].PlazaRes;
                    document.getElementById('NumResPublic').value = response.data[0].NumResPublic;

                    if (param == 2) { document.getElementById('txtTipoPoder').value = response.data[0].tipoPoder; };
                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iGuarda = response.data[0].btnGuardar;

                }

                else {

                    document.getElementById('iPersonaid').value = IdPersona;
                    document.getElementById('txtIPersona').value = IdPersona;
                    document.getElementById('NumEscritura').value = "";
                    document.getElementById('FechaEscritura').value = "";
                    document.getElementById('NomNotario').value = "";
                    document.getElementById('NumNotaria').value = "";

                    if (param == 1) { document.getElementById('FechaCons').value = ""; }
                    if (param == 2) { document.getElementById('FechaRes').value = ""; }

                    document.getElementById('PlazaRes').value = "";
                    document.getElementById('NumResPublic').value = "";
                    if (param == 2) { document.getElementById('txtTipoPoder').value = ""; };
                    iEstatusid = 3;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iGuarda = response.data[0].btnGuardar;

                }
                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuardaConst.hidden = false; } else { btnGuardaConst.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutorizaRegConst.hidden = false; } else { btnAutorizaRegConst.hidden = true; }
                }
                else {
                    btnGuardaConst.hidden = true;
                    btnAutorizaRegConst.hidden = true;
                }

            },
            failure: function (response) {
                alert(response.d);
            }

        });
    }
    if (param == 2) {
        $("table tbody tr").click(function () {
            IdPersona = $(this).find("td:eq(0)").text();

            $.ajax({

                url: '/Clientes/lstPoderes',
                data: {
                    "idPersona": IdPersona
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.data.length > 0) {

                        fecha1 = convertirJsonDateAFecha(response.data[0].FechaEscritura);
                        if (param == 1) { fecha2 = convertirJsonDateAFecha(response.data[0].FechaCons); }
                        if (param == 2) { fecha2 = convertirJsonDateAFecha(response.data[0].FechaRes); }
                        var dato1 =formatDate(fecha1);
                        document.getElementById('iPersonaid').value = IdPersona;
                        document.getElementById('txtIPersona').value = IdPersona;
                        document.getElementById('NumEscritura').value = response.data[0].NumEscritura;
                        document.getElementById('FechaEscritura').value = dato1;
                        document.getElementById('NomNotario').value = response.data[0].NomNotario;
                        document.getElementById('NumNotaria').value = response.data[0].NumNotaria;
                        //var dato = fecha2.replace('-', '/').replace('-', '/');
                        var dato = formatDate(fecha2, 'yyyy-mm-dd'); // moment(fecha2, 'DD/MM/YYYY').format('DD/MM/YYYY');
                        if (param == 1) { document.getElementById('FechaCons').value = dato; }
                        if (param == 2) { document.getElementById('FechaRes').value = dato; }
                        
                        document.getElementById('PlazaRes').value = response.data[0].PlazaRes;
                        document.getElementById('NumResPublic').value = response.data[0].NumResPublic;

                        if (param == 2) { document.getElementById('txtTipoPoder').value = response.data[0].tipoPoder; };

                        iEstatusid = response.data[0].intEstatus;
                        iAutorizaReg = response.data[0].btnAutorizar;
                        iGuarda = response.data[0].btnGuardar;
                    }

                    else {

                        document.getElementById('iPersonaid').value = IdPersona;
                        document.getElementById('txtIPersona').value = IdPersona;
                        document.getElementById('NumEscritura').value = "";
                        document.getElementById('FechaEscritura').value = "";
                        document.getElementById('NomNotario').value = "";
                        document.getElementById('NumNotaria').value = "";

                        if (param == 1) { document.getElementById('FechaCons').value = ""; }
                        if (param == 2) { document.getElementById('FechaRes').value = ""; }

                        document.getElementById('PlazaRes').value = "";
                        document.getElementById('NumResPublic').value = "";
                        if (param == 2) { document.getElementById('txtTipoPoder').value = ""; };

                        iEstatusid = 3;
                        iAutorizaReg = response.data[0].btnAutorizar;
                        iGuarda = response.data[0].btnGuardar;
                    }
                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnCargar.hidden = false; } else { btnCargar.hidden = true;  }
                            if (iAutorizaReg == 1) { btnAutorizaReg2.hidden = false; } else { btnAutorizaReg2.hidden = true; }
                        }
                    else {
                        btnCargar.hidden = true;
                        btnAutorizaReg2.hidden = true;
                    }

                },
                failure: function (response) {
                    alert(response.d);
                }

            });
        });
    }
    
}

function convertirJsonDateAFecha(jsonDate) {
    // Extraer los milisegundos del formato JSON
    var milisegundos = parseInt(jsonDate.substr(6));
    // Crear un objeto Date desde los milisegundos
    var fecha = new Date(milisegundos);
    // Formatear la fecha a 'YYYY-MM-DD'
    var año = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}


//#region Irving

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Fideicomisario() {
    $.post('/Fideicomisario/_PaltialFideicomitentes', { id: 19 }, function (data) { $('#vistaPartial').html(data) });
}

//#endregion Irving


//#region js JAVR



function fiduciario() {
    var url = '/DelegadosFidu/_DelegadosPartial';
    $.post(url, { id: 1 }, function (data) { $('#vistaPartial').html(data) });

}

function FiducDir() {

    var IdPersona;
    var iEstatus = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;

    $("table tbody tr").click(function () {
        var id = $(this).find("td:eq(0)").text()
        $.ajax({
            url: '/DelegadosFidu/DtooDirFid',
            type: 'GET',
            data: { "iPersonaid": id, "fiducDir": id },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.data.length > 0) {
                    var perfiles = JSON.stringify(response);
                    document.getElementById("fiducDir").value = id;
                    document.getElementById('txtIdfid').value = id;
                    document.getElementById('txtiTipoDomicilio').value = response.data[0].iTipoDomicilio;
                    document.getElementById('Calle').value = response.data[0].Calle;
                    document.getElementById('NumeroExterior').value = response.data[0].NumeroExterior;
                    document.getElementById('NumeroInterior').value = response.data[0].NumeroInterior;
                    document.getElementById('txtCodigopostal').value = response.data[0].Codigopostal;
                    document.getElementById('txtColonia').value = response.data[0].Colonia;
                    document.getElementById('DelegMunicipio').value = response.data[0].DelegMunicipio;
                    document.getElementById('CiudadPoblacion').value = response.data[0].CiudadPoblacion;
                    document.getElementById('EntidadFed').value = response.data[0].EntidadFed;
                    document.getElementById('iAnosAntigdomicilio').value = response.data[0].iAnosAntigdomicilio;
                    Estatus = response.data[0].iEstatus;
                    iAutorizaReg = response.data[0].btnAutorizaReg;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                }
                else {
                    var perfiles = JSON.stringify(response);
                    document.getElementById("fiducDir").value = id;
                    document.getElementById('txtIdfid').value = id;
                    document.getElementById('iTipoDomicilio').value = "";
                    document.getElementById('Calle').value = "";
                    document.getElementById('NumeroExterior').value = "";
                    document.getElementById('NumeroInterior').value = "";
                    document.getElementById('Colonia').value = "";
                    document.getElementById('Codigopostal').value = "";
                    document.getElementById('DelegMunicipio').value = "";
                    document.getElementById('CiudadPoblacion').value = "";
                    document.getElementById('EntidadFed').value = "";
                    document.getElementById('iAnosAntigdomicilio').value = "";
                    iEstatus = 3;
                    iAutorizaReg = response.data[0].btnAutorizaReg;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;
                }

                if (Estatus == 3) {
                    if (iGuarda == 1) { btnGuardaDirFidu.hidden = false; } else {btnGuardaDirFidu.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutRegFidu.hidden = false; } else { btnAutRegFidu.hidden = true; }
                }
                else {
                    btnGuardaDirFidu.hidden = true;
                    btnAutRegFidu.hidden = true;
                }

            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }

        });
    });


}

function FiducPoder() {

    $("table tbody tr").click(function () {
        var IdPersona;
        var iEstatusid = 0;
        var iAutorizaReg = 0;
        var iAutorizaDoc = 0;
        var iGuarda = 0;

        var id = $(this).find("td:eq(0)").text()
        var fecha1;
        var fecha2;
        var fecha3;
        $.ajax({
            url: '/DelegadosFidu/DtoPodFid',
            type: 'GET',
            data: { "iPersonaid": id, },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                
                    var perfiles = JSON.stringify(response);

                    fecha1 = convertirJsonDateAFecha(response.data[0].DFECHAESCRITURA);
                    fecha2 = convertirJsonDateAFecha(response.data[0].DFECHAREGPUBCOMERCIO);
					var dato1 = formatDate(fecha1);
                    var dato2 = formatDate(fecha2);

                    document.getElementById("fiduPoder").value = id;
                    document.getElementById('txtIdpofid').value = id;
                    document.getElementById('txtPoder').value = response.data[0].ICVEPODERES;
                    document.getElementById('VCHNUMEROESCRITURA').value = response.data[0].VCHNUMEROESCRITURA;
                    document.getElementById('DFECHAESCRITURA').value = dato1;
                    document.getElementById('DFECHAREGPUBCOMERCIO').value = dato2;
                    document.getElementById('VCHNOMBRENOTARIO').value = response.data[0].VCHNOMBRENOTARIO;
                    document.getElementById('VCHNUMERONOTARIA').value = response.data[0].VCHNUMERONOTARIA;
                    document.getElementById('VCHNUMEROREGPUBCOMERCIO').value = response.data[0].VCHNUMEROREGPUBCOMERCIO;
                    
                    document.getElementById('VCHPLAZAREGPUBCOMERCIO').value = response.data[0].VCHPLAZAREGPUBCOMERCIO;

                    iEstatusid = response.data[0].iEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iGuarda = response.data[0].btnGuardar;
                

                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuardaPoderFidu.hidden = false; } else { btnGuardaPoderFidu.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutorizaPodFifu.hidden = false; } else { btnAutorizaPodFifu.hidden = true; }
                }
                else {
                    btnGuardaPoderFidu.hidden = true;
                    btnAutorizaPodFifu.hidden = true;
                }


                
            },
            error: function (jqXHR, status, error) {
                alert('Hay un error al cargar los datos');
            },
            complete: function (jqXHR, status) {
            }

        });
    });

}

function Fiduciarios(param) {

    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;
    if (param == 1) {
        $("table tbody tr").click(function () {
            var id = $(this).find("td:eq(0)").text()
            $.ajax({
                url: '/DelegadosFidu/LstpDelgFiduc',
                type: 'GET',
                data: { "iPersonaid": id, },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var perfiles = JSON.stringify(response);
                    document.getElementById("campoFidoc").value = id;
                    document.getElementById('iPersonaid').value = id;
                    document.getElementById('txtnamecompl').value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById('txtapppater').value = response.data[0].VCHprimerapellido;
                    document.getElementById('txtapmater').value = response.data[0].VCHsegundoapellido;
                    document.getElementById('txtprmname').value = response.data[0].VCHprimernombre;
                    document.getElementById('txtseguname').value = response.data[0].VCHsegundonombre;
                    document.getElementById('txtnacionalidad').value = response.data[0].vchNacionalidad;
                    document.getElementById('txtrfcFiduc').value = response.data[0].vchRFC;
                    document.getElementById('txtcargo').value = response.data[0].vchCargo;
                    document.getElementById('txtcorreofiduc').value = response.data[0].VCHCORREO;
                    document.getElementById('txtteloficfiduc').value = response.data[0].VCHTELEFONO1;
                    document.getElementById('txttelcafiduc').value = response.data[0].VCHTELEFONO2;
                    document.getElementById('txttcelufiduc').value = response.data[0].VCHTELEFONO3;
                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iGuarda = response.data[0].btnGuardar;

                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnguardafidu.hidden = false; } else { btnguardafidu.hidden = true; }
                        if (iAutorizaReg == 1) { btnAutorizaRegFidu.hidden = false; } else { btnAutorizaRegFidu.hidden = true; }
                    }
                    else {
                        btnguardafidu.hidden = true;
                        btnAutorizaRegFidu.hidden = true;
                    }


                },
                error: function (jqXHR, status, error) {
                    alert('Hay un error al cargar los datos');
                },
                complete: function (jqXHR, status) {
                }

            });
        });
    }
    if (param == 0) {
        var id = 0;
        $.ajax({
            url: '/DelegadosFidu/LstpDelgFiduc',
            type: 'GET',
            data: { "iPersonaid": id, },
            contentType: "application/text; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var perfiles = JSON.stringify(response);
                document.getElementById("campoFidoc").value = id;
                document.getElementById('iPersonaid').value = id;
                document.getElementById('txtnamecompl').value = response.data[0].VCHNOMBRECOMPLETO;
                document.getElementById('txtapppater').value = response.data[0].VCHprimerapellido;
                document.getElementById('txtapmater').value = response.data[0].VCHsegundoapellido;
                document.getElementById('txtprmname').value = response.data[0].VCHprimernombre;
                document.getElementById('txtseguname').value = response.data[0].VCHsegundonombre;
                document.getElementById('txtnacionalidad').value = response.data[0].vchNacionalidad;
                document.getElementById('txtrfcFiduc').value = response.data[0].vchRFC;
                document.getElementById('txtcargo').value = response.data[0].vchCargo;
                document.getElementById('txtcorreofiduc').value = response.data[0].VCHCORREO;
                document.getElementById('txtteloficfiduc').value = response.data[0].VCHTELEFONO1;
                document.getElementById('txttelcafiduc').value = response.data[0].VCHTELEFONO2;
                document.getElementById('txttcelufiduc').value = response.data[0].VCHTELEFONO3;
                iEstatusid = response.data[0].intEstatus;
                iAutorizaReg = response.data[0].btnAutorizar;
                iGuarda = response.data[0].btnGuardar;

                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnguardafidu.hidden = false; } else { btnguardafidu.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutorizaRegFidu.hidden = false; } else { btnAutorizaRegFidu.hidden = true; }
                }
                else {
                    btnguardafidu.hidden = true;
                    btnAutorizaRegFidu.hidden = true;
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

function convertirJsonDateAFecha(jsonDate) {
    // Extraer los milisegundos del formato JSON
    var milisegundos = parseInt(jsonDate.substr(6));
    // Crear un objeto Date desde los milisegundos
    var fecha = new Date(milisegundos);
    // Formatear la fecha a 'YYYY-MM-DD'
    var año = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    return `${dia}-${mes}-${año}`;
}

function formatDate(date) {
    //var dd = new Date(date).toISOString().slice(0, 10);
    // const d = moment(date,'YYYY-MM-DD').format('YYYY-MM-DD');
    var day = date.substring(0, 2);
    var month = date.substring(5, 3);
    var year = date.substring(10, 6);

    //var d = new Date(date),
    //    month = '' + (d.getMonth() + 1),
    //    day = '' + d.getDate(),
    //    year = d.getFullYear();

    //if (month.length < 2)
    //    month = '0' + month;
    //if (day.length < 2)
    //    day = '0' + day;
    //isNaN(day)
    return [year, month, day].join('-');
}
//#enregion  JAVR

//#regin validaciones

function muestraMensaje(mensaje, IsError) {
    try {
        $("#textoMensaje").html(mensaje);
        //$("#ModalMensaje").modal({ backdrop: 'static', keyboard: false });
        $('#ModalMensaje').modal('show');

        if (IsError == 1) {
            $("#CerrarFide").hide();
            $("#Cerrar").show();
        }
        else {
            $("#CerrarFide").show();
            $("#Cerrar").hide();

        }
    } catch (e) {
        alert("Ocurrió un error.")
    }
}

function validaInfot(id, lblerror, requerido) {
    var valida = true;

    try {
        if ($("#" + lblerror).is(":visible")) {
            $("#" + lblerror).hide();
        }

        if ($("#" + id).val().trim() != "" || requerido == 1) {
            $("#" + lblerror).text("");

            $("#" + id).val($("#" + id).val().trim());

            if ($("#" + id).val().trim() == "") {
                $("#" + lblerror).text("Campo Requerido*");
                valida = false;
                if (!$("#" + id).hasClass("errorClass")) {
                    $("#" + id).addClass("errorClass");
                }
                if (!$("#" + lblerror).is(":visible")) {
                    $("#" + lblerror).show();
                }
            }
        }

    } catch (e) {
        valida = false;
    }

    return valida;
}

function validatext(id, lblerror, requerido) {
    var valida = true;

    try {
        if ($("#" + lblerror).is(":visible")) {
            $("#" + lblerror).hide();
        }
        else {
            $("#" + lblerror).visible;
        }
        if ($("#" + id).val().trim() != "" || requerido == 1) {
            $("#" + lblerror).text("");

            $("#" + id).val($("#" + id).val().trim());

            if ($("#" + id).val().trim() == "") {
                $("#" + lblerror).text("Campo Requerido*");
                valida = false;
                if (!$("#" + id).hasClass("errorClass")) {
                    $("#" + id).addClass("errorClass");
                }
                if (!$("#" + lblerror).is(":visible")) {
                    $("#" + lblerror).show();
                }
            }
            else {

                var str = $("#" + id).val();
                var patt = new RegExp(/^[ a-zA-ZÀ-ÖØ-öø-ÿ0@()-9_.,/#&+-]+$/);
                var res = patt.test(str);

                if (!res) {
                    $("#" + lblerror).text("Formato inválido");
                    valida = false;

                    if (!$("#" + id).hasClass("errorClass")) {
                        $("#" + id).addClass("errorClass");
                    }
                    if (!$("#" + lblerror).is(":visible")) {
                        $("#" + lblerror).show();
                    }
                }
                else {
                    if ($("#" + id).hasClass("errorClass")) {
                        $("#" + id).removeClass("errorClass");
                    }
                }
            }
        }

    } catch (e) {
        valida = false;
    }

    return valida;
}

function validaCorreo(id, lblerror) {
    var valida = true;

    try {
        if ($("#" + lblerror).is(":visible")) {
            $("#" + lblerror).hide();
        }

        $("#" + lblerror).text("");

        var email = $("#" + id).val();

        var resultado = re.test(String(email).toLowerCase());

        if (!resultado) {

            $("#" + lblerror).text("Dato Inválido");
            valida = resultado;

            if (!$("#" + id).hasClass("errorClass")) {
                $("#" + id).addClass("errorClass");
            }
            if (!$("#" + lblerror).is(":visible")) {
                $("#" + lblerror).show();
            }
        }
        else {
            if ($("#" + id).hasClass("errorClass")) {
                $("#" + id).removeClass("errorClass");
            }
        }
    } catch (e) {
        valida = false;
    }

    return valida;
}
//#endRegion Validaciones


function ModalcomiteTecnico(param) {

    var IdPersona;
    var iEstatusid = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;

    $('#NOMBRECOMPLETOError').hide();
    $('#TRfcError').hide();
    $('#VCHnacionalidadError').hide();
    $('#VCHCORREOError').hide();
    $('#TelefonoOficinaError').hide();

    if (param == 1) {
        $("table tbody tr").click(function () {
            IdPersona = $(this).find("td:eq(0)").text();

            $.ajax({

                url: '/ComiteTecnico/EditcomiteTecnico',
                data: {
                    "idPersona": IdPersona
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.data.length > 0) {
                        document.getElementById('PersonaidTXT').value = IdPersona;
                        document.getElementById('CAMPO').value = IdPersona;
                        document.getElementById('NOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                        document.getElementById('VCHnacionalidad').value = response.data[0].VCHnacionalidad;
                        document.getElementById('TRfc').value = response.data[0].RFC;
                        document.getElementById('VCHCORREO').value = response.data[0].VCHCORREO;
                        document.getElementById('TelefonoOficina').value = response.data[0].TelefonoOficina;
                        iEstatusid = response.data[0].intEstatus;
                        iAutorizaReg = response.data[0].btnAutorizar;
                        iAutorizaDoc = response.data[0].btnAutorizaDoc;
                        iGuarda = response.data[0].btnGuardar;

                    }
                    
                    if (iEstatusid == 3) {
                        if (iGuarda == 1) { btnGuarda.hidden = false; }
                        else { btnGuarda.hidden = true; }
                        if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; }
                        else { btnAutorizaReg.hidden = true; }

                    }
                    else {
                        btnGuarda.hidden = true;
                        btnAutorizaReg.hidden = true;

                    }
                },
                failure: function (response) {
                    alert(response.d);
                }

            });
        });
    }
   
    if (param == 0) {
        $.ajax({

            url: '/Clientes/EditcomiteTecnico',
            data: {
                "idPersona": IdPersona
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.data.length > 0) {
                    document.getElementById('PersonaidTXT').value = IdPersona;
                    document.getElementById('CAMPO').value = IdPersona;
                    document.getElementById('NOMBRECOMPLETO').value = response.data[0].VCHNOMBRECOMPLETO;
                    document.getElementById('VCHnacionalidad').value = response.data[0].VCHnacionalidad;
                    document.getElementById('TRfc').value = response.data[0].RFC;
                    document.getElementById('VCHCORREO').value = response.data[0].VCHCORREO;
                    document.getElementById('TelefonoOficina').value = response.data[0].TelefonoOficina;
                    iEstatusid = response.data[0].intEstatus;
                    iAutorizaReg = response.data[0].btnAutorizar;
                    iAutorizaDoc = response.data[0].btnAutorizaDoc;
                    iGuarda = response.data[0].btnGuardar;

                }
                
                if (iEstatusid == 3) {
                    if (iGuarda == 1) { btnGuarda.hidden = false; }
                    else { btnGuarda.hidden = true; }
                    if (iAutorizaReg == 1) { btnAutorizaReg.hidden = false; }
                    else { btnAutorizaReg.hidden = true; }

                }
                else {
                    btnGuarda.hidden = true;
                    btnAutorizaReg.hidden = true;

                }
            },
            failure: function (response) {
                alert(response.d);
            }

        });
    }

}

function DirecComite(param) {

    var IdPersona;
    var iEstatus = 0;
    var iAutorizaReg = 0;
    var iAutorizaDoc = 0;
    var iGuarda = 0;

    
        $("table tbody tr").click(function () {
            IdPersona = $(this).find("td:eq(0)").text();

            $.ajax({

                url: '/ComiteTecnico/DirecComite',
                data: {
                    "idPersona": IdPersona
                },
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.data.length > 0) {

                        document.getElementById('PersonaDir').value = IdPersona;
                        document.getElementById('txtIpersonaDir').value = IdPersona;
                        document.getElementById('TxtPais').value = response.data[0].Pais;
                        document.getElementById('CodigoPostal').value = response.data[0].Codigopostal;
                        document.getElementById('EntidadFed').value = response.data[0].EntidadFed;

                        iEstatus = response.data[0].iEstatus;
                        iAutorizaReg = response.data[0].btnAutorizaReg;
                        iAutorizaDoc = response.data[0].btnAutorizaDoc;
                        iGuarda = response.data[0].btnGuardar;
                    }


                    if (iEstatus == 3) {
                        if (iGuarda == 1) { btnGuardaDirInt.hidden = false;  }
                        else { btnGuardaDirInt.hidden = true; }
                        if (iAutorizaReg == 1) { btnAutorizaDirInt.hidden = false;  }
                        else { btnAutorizaDirInt.hidden = true; }

                    }
                    else {
                        btnGuardaDirInt.hidden = true;
                        btnAutorizaDirInt.hidden = true;
                    }

                },
                failure: function (response) {
                    alert(response.d);
                }

            });
        });

}

function GuardarDireccionComite(controler, parametros, modal) {

    if (ValidaDireccionComite()) {
        var opcion = confirm("Desea Guardar la Informacion?");
        if (opcion == true) {
            $.ajax({
                url: controler,
                type: 'GET',
                data: parametros,
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    muestraMensaje('Datos Guardados correctamente', modal);
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(jqXHR + '-' + error, 1, modal);

                },
                complete: function (jqXHR, status) {
                }
            });
        }
    }
    
          
}

function GeneralDireccionJBO(controler, modal, x) {
    var _iPersonaid = 0;
    if (ValidaDireccion()) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            if (x == 'ClienteDir') {
                _iPersonaid = -1;
            }
            else { _iPersonaid = $("#txtiPersonaidom").val();}
            $.ajax({
                url: controler,
                type: 'GET',
                data: {
                   
                    "ipersonaid": _iPersonaid,
                    "iDomiclioID": $("#txtiDomiclioID").val(),
                    "iTipoDomicilio": $("#txtiTipoDomicilio").val(),
                    "Calle": $('#calle').val(),
                    "NumeroExterior": $('#NumeroExterior').val(),
                    "NumeroInterior": $('#NumeroInterior').val(),
                    "Codigopostal": $('#txtCodigopostal').val(),
                    "Colonia": $('#txtColonia').val(),
                    "DelegMunicipio": $('#DelegMunicipio').val(),
                    "CiudadPoblacion": $('#CiudadPoblacion').val(),
                    "EntidadFed": $('#EntidadFed').val(),
                    "iAnosAntigdomicilio": $('#iAnosAntigdomicilio').val(),

                },
                contentType: "application/text; charset=utf-8",
                dataType:"json",
                success: function (response) {
                    alert('Datos Guadados Correctamente');
                    //muestraMensaje("Datos Guadados Correctamente.", 1, modal);
                    //location.reload;
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(jqXHR + '-' + error, 1, modal);

                },
                complete: function (jqXHR, status) {
                }
            });
        }

    }

}

function GeneralPoderes(controler, modal, tipo, param) {
    var _iPersona = 0;
    if (ValidaPoderes(tipo)) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            var FechaConst="";
            if (tipo == 'General') {
                FechaConst = $("#FechaCons").val();
                _iPersona = -1;
            }
            else { _iPersona = $("#txtIPersona").val(); }
            $.ajax({
                url: controler,
                type: 'GET',
                data: {
                    "FechaCons": FechaConst,
                    "iPersonaid": _iPersona,
                    "NumEscritura": $("#NumEscritura").val(),
                    "FechaEscritura": $('#FechaEscritura').val(),
                    "NomNotario": $('#NomNotario').val(),
                    "NumNotaria": $('#NumNotaria').val(),
                    "NumResPublic": $('#NumResPublic').val(),
                    "FechaRes": $('#FechaRes').val(),
                    "PlazaRes": $('#PlazaRes').val(),
                    "tipoPoder": $('#tipoPoder').val()
                },
                contentType: "application/text; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //alert('Datos Guadados Correctamente');
                    muestraMensaje("Datos Guadados Correctamente.", 1, modal);
                    //location.reload;
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(jqXHR + '-' + error, 1, modal);

                },
                complete: function (jqXHR, status) {
                }
            });
        }
    }
}

function AgregaAccionista(controler, cveTipoPersona, modal) {
    var txtRFC = "";
    var param = "";
    if (cveTipoPersona == 4) { param = 'Accionista' }
    if (ValidaOtraPersona(param, modal)) {
        $.ajax({
            url: controler,
            type: 'GET',
            data: {
                "iPersonaid": $("#txtiPersonaCon").val(),
                "iCveTipoPersona": cveTipoPersona,
                "VCHNOMBRECOMPLETO": $("#txtNombreCompleto").val(),
                "porcentajeAccion": $("#txtPorcentaje").val(),
                "nacionalidad": $("#txtNacionalidadAc").val()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                //alert('Datos Guardados Correctamente.')
                muestraMensaje("Datos Guadados Correctamente.", 1, modal);
                //location.reload;
            },
            error: function (jqXHR, status, error) {
                muestraMensaje(jqXHR + '-' + error, 1, modal);

            },
            complete: function (jqXHR, status) {
            }
        });

    }
}

function AgregaOtraPersona(controler, cveTipoPersona, modal) {
    var txtRFC = "";
    var param = "";
   
    if (cveTipoPersona == 6 || cveTipoPersona == 3) { param = 'rfc' }
    if (cveTipoPersona == 4) { param = 'Accionista' }

    if (ValidaOtraPersona(param, modal)) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            if (cveTipoPersona == 9 || cveTipoPersona == 4) { txtRFC = ""; }
            if (cveTipoPersona == 6 || cveTipoPersona == 3) { txtRFC = $("#txtvchRFC").val(); }
            $.ajax({
                url: controler,
                type: 'GET',
                data: {
                    "iPersonaid": $("#txtiPersonaid").val(),
                    "iCveTipoPersona": cveTipoPersona,
                    "VCHNOMBRECOMPLETO": $("#txtNombreCompleto").val(),
                    "VCHprimerapellido": $("#txtprimerapellido").val(),
                    "VCHsegundoapellido": $("#txtsegundoapellido").val(),
                    "VCHprimernombre": $("#txtprimernombre").val(),
                    "VCHsegundonombre": $("#txtsegundonombre").val(),
                    "vchNacionalidad": $("#txtNacionalidadAcc").val(),
                    "vchRFC": txtRFC,
                    "vchCargo": $("#txtCargo").val(),
                    "VCHCORREO": $("#txtCorreo").val(),
                    "VCHTELEFONO1": $("#txtTel1").val(),
                    "VCHTELEFONO2": $("#txtTel2").val(),
                    "VCHTELEFONO3": $("#txtTel3").val()
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //alert('Datos Guardados Correctamente.')
                    muestraMensaje("Datos Guadados Correctamente.", 1, modal);
                    //location.reload;
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(jqXHR + '-' + error, 1, modal);

                },
                complete: function (jqXHR, status) {
                }
            });
        }
    }
   

}

function GuardaComite(controler, cveTipoPersona, modal) {
    if (ValidaComitePersona()) {
        var opcion = confirm("Desea Guardar los cambios?");
        if (opcion == true) {
            $.ajax({
                url: controler,
                type: 'GET',
                data: {
                    "PersonaID":            $("#PersonaidTXT").val(),
                    "iCveTipoPersona":      cveTipoPersona,
                    "VCHNOMBRECOMPLETO":    $("#NOMBRECOMPLETO").val(),
                    "RFC":                  $("#TRfc").val(),
                    "VCHnacionalidad":      $("#VCHnacionalidad").val(),
                    "VCHCORREO":            $("#VCHCORREO").val(),
                    "TelefonoOficina":      $("#TelefonoOficina").val()
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //alert('Datos Guardados Correctamente.')
                    muestraMensaje("Datos Guadados Correctamente.", 1, modal);
                    //location.reload;
                },
                error: function (jqXHR, status, error) {
                    muestraMensaje(jqXHR + '-' + error, 1, modal);

                },
                complete: function (jqXHR, status) {
                }
            });
        }
    }
}

function buscarSepomex() {
      var codigoPostal = $("#txtCodigopostal").val().trim();
    $.ajax({
        url: '/Clientes/DatSepomex',
        type: 'GET',
        data: { "vchCP": codigoPostal},
        contentType: "application/text; charset=utf-8",
        dataType: "json",
        success: function (response) {
           
            $("#txtCmbColonia")     
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("Seleccione Colonia"));
            for (var i = 0; i < response.data.length; i++) {
                $("#txtCmbColonia").append($("<option></option>")
                    .val(response.data[i].vchasenta)//.normalize("NFD").replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize())
                    .html(response.data[i].vchasenta))//.normalize("NFD").replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
            };

            document.getElementById("DelegMunicipio").value = response.data[0].vchmnpio.normalize("NFD").replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize();
            document.getElementById("CiudadPoblacion").value = response.data[0].vch_ciudad.normalize("NFD").replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize();
            document.getElementById("EntidadFed").value = response.data[0].vchestado.normalize("NFD").replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize();

        },
        error: function (jqXHR, status, error) {
        },
        complete: function (jqXHR, status) {

        }
    });
}

//Region Validaciones
function ValidaDireccion() {

    exito = validatext('txtiTipoDomicilio', 'TipoDomicilioError', 1); if (!exitoTemp) { exitoValida = false; }
    exito1 = validatext('calle', 'CalleError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('NumeroExterior', 'NumeroExteriorError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('NumeroInterior', 'NumeroInteriorError', 1); if (!exitoTemp) { exitoValida = false; }
    exito4 = validatext('txtCodigopostal', 'CodigopostalError', 1); if (!exitoTemp) { exitoValida = false; }
    exito5 = validatext('txtColonia', 'ColoniaError', 1); if (!exitoTemp) { exitoValida = false; }
    exito6 = validatext('DelegMunicipio', 'DelegMunicipioError', 1); if (!exitoTemp) { exitoValida = false; }
    exito7 = validatext('CiudadPoblacion', 'CiudadPobError', 1); if (!exitoTemp) { exitoValida = false; }
    exito8 = validatext('EntidadFed', 'EntidadFedError', 1); if (!exitoTemp) { exitoValida = false; }
    if (!exito || !exito1 || !exito2 || !exito3 || !exito4 || !exito5 || !exito6 || !exito7 || !exito8) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'ModalDirecciones'); } else { exito = true;}
    return exito;
}

function ValidaDireccionComite() {
    exito = validatext('TxtPais', 'PaisError', 1); if (!exitoTemp) { exitoValida = false; }
    exito1 = validatext('CodigoPostal', 'CodigoPostalError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('EntidadFed', 'EntidadError', 1); if (!exitoTemp) { exitoValida = false; }
    if (!exito || !exito1 || !exito2) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'ModalDirecciones'); } else { exito = true; }
    return exito;
}

function ValidaCliente() {
    exito = validatext('txtRFC', 'RFCError', 1); if (!exitoTemp) { exitoValida = false; }
    exito1 = validatext('txtNombreCompleto', 'NombreCompletoError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('txtNomComercial', 'NombreComercialError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('txtTipoPersona', 'TipoPersonaError', 1); if (!exitoTemp) { exitoValida = false; }
    exito4 = validatext('txtNacionalidad', 'NacionalidadError', 1); if (!exitoTemp) { exitoValida = false; }
    exito5 = validatext('txtVCHserieEfirma', 'VCHserieEfirmaError', 1); if (!exitoTemp) { exitoValida = false; }
    if (!exito || !exito1 || !exito2 || !exito3 || !exito4 || !exito5) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'ModalDirecciones');  } else { exito = true; }
    return exito;

}

function ValidaOtraPersona(param,modal) {
    if (param == 'rfc') { exito = validatext('txtvchRFC', 'rfcError', 1); if (!exitoTemp) { exitoValida = false; } } else { exito = true;}
    if (param == 'Accionista') {
        exito1 = validatext('txtNombreCompleto', 'NombreCompletoError', 1); if (!exitoTemp) { exitoValida = false; }
        exito2 = validatext('txtPorcentaje', 'porcentajeError', 1); if (!exitoTemp) { exitoValida = false; }
        exito4 = validatext('txtNacionalidadAc', 'NacionalidadError', 1); if (!exitoTemp) { exitoValida = false; }
        exito3 = true;
        exito5 = true;
        exito6 = true;

    }
    else {
        exito1 = true;
    }
    if (param == 'rfc' || param == '') {
        exito2 = validatext('txtprimerapellido', 'primerapellidoError', 1); if (!exitoTemp) { exitoValida = false; }
        exito3 = validatext('txtprimernombre', 'primerNombreError', 1); if (!exitoTemp) { exitoValida = false; }
        exito4 = validatext('txtNacionalidadAcc', 'NacionalidadError', 1); if (!exitoTemp) { exitoValida = false; }
        exito4 = validatext('txtCargo', 'cargoError', 1); if (!exitoTemp) { exitoValida = false; }
        exito5 = validaCorreo('txtCorreo', 'correoError'); if (!exitoTemp) { exitoValida = false; }
        exito6 = validatext('txtTel1', 'telefono1Error', 1); if (!exitoTemp) { exitoValida = false; }
       
    }
    if (!exito || !exito1 || !exito2 || !exito3 || !exito4 || !exito5 || !exito6) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, modal); } else { exito = true; }
    return exito;
}  

function ValidaPoderes(param, modal) {
    if (param == 'General') { exito = validatext('FechaCons', 'FechaConsError', 1); if (!exitoTemp) { exitoValida = false; } } else { exito = true; }
    exito1 = validatext('NumEscritura', 'NumEscrituraError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('FechaEscritura', 'FechaEscrituraError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('NomNotario', 'NomNotarioError', 1); if (!exitoTemp) { exitoValida = false; }
    exito4 = validatext('NumNotaria', 'NumNotariaError', 1); if (!exitoTemp) { exitoValida = false; }
    if (param == 'General') {
        exito5 = true;
        exito8 = true;
        }
    else {
        exito5 = validatext('FechaRes', 'FechaResError', 1); if (!exitoTemp) { exitoValida = false; }
        exito8 = validatext('txtTipoPoder', 'TipoPoderError', 1); if (!exitoTemp) { exitoValida = false; }

    }
    
    exito6 = validatext('PlazaRes', 'PlazaResError', 1); if (!exitoTemp) { exitoValida = false; }
    exito7 = validatext('NumResPublic', 'NumResPublicError', 1); if (!exitoTemp) { exitoValida = false; }
    
    if (!exito || !exito1 || !exito2 || !exito3 || !exito4 || !exito5 || !exito6 || !exito7 || !exito8) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, modal); } else { exito = true; }
    return exito;
}

function validaDatosGenerales() {
    exito1 = validatext('txtrfc', 'rfcError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('txtNombre', 'nombreError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('txtNomCom', 'nomComercialError', 1); if (!exitoTemp) { exitoValida = false; }
    exito4 = validatext('txtTipoPersona', 'tipoPersonaError', 1); if (!exitoTemp) { exitoValida = false; }
    exito5 = validatext('txtNacionalidad', 'NacionalidadError', 1); if (!exitoTemp) { exitoValida = false; }
    if (!exito1 || !exito2 || !exito3 || !exito4 || !exito5) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'modalGeneral'); }
    return exito;

}

function ValidaComitePersona() {
    exito1 = validatext('TRfc', 'TRfcError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('NOMBRECOMPLETO', 'NOMBRECOMPLETOError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('VCHnacionalidad', 'VCHnacionalidadError', 1); if (!exitoTemp) { exitoValida = false; }
    exito4 = validaCorreo('VCHCORREO', 'VCHCORREOError', 1); if (!exitoTemp) { exitoValida = false; }
    exito5 = validatext('TelefonoOficina', 'TelefonoOficinaError', 1); if (!exitoTemp) { exitoValida = false; }
    if (!exito1 || !exito2 || !exito3 || !exito4 || !exito5) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'ModalComite'); } else {exito=true}
    return exito;
}

function ValidaModelo() {
    //var exitoValida = true;

    try {
        //var exitoTemp = true;

        exitoTemp = validaInfot("txtMotivoRechazo", "lbltxtMotivoRechazo", 1);
        if (!exitoTemp) { exitoValida = false; }
        exitoTemp = validaInfot("txtMotivo", "lbltxtMotivo", 1);
        if (!exitoTemp) { exitoValida = false; }
        exitoTemp = validaInfot("TipoDocumento", "lblTipoDocumento", 1);
        if (!exitoTemp) { exitoValida = false; }

    } catch (e) {
        exitoValida = false;
    }

    return exitoValida;

}

function ValidaDatosFideicomiso() {
    exito = validatext('txtFinFideicomiso', 'FinalidadError', 1); if (!exitoTemp) { exitoValida = false; }
    exito1 = validatext('txtdCelebracionFideicom', 'datCelebradError', 1); if (!exitoTemp) { exitoValida = false; }
    exito2 = validatext('txtPatrimonioFideicomitido', 'PatrimonioError', 1); if (!exitoTemp) { exitoValida = false; }
    exito3 = validatext('txtAportacionFideicomitente', 'AportacionError', 1); if (!exitoTemp) { exitoValida = false; }


    if (!exito || !exito1 || !exito2 || !exito3) { exito = false; muestraMensaje("Faltan campos obligatorios.", 1, 'ModalgeneralFideicomiso'); } else { exito = true; }
    return exito;
}
// en region validaciones
function habilitarBoton() {
    var archivoInput = document.getElementById('archivo');
    var botonEnviar = document.getElementById('botonEnviar');

    if (archivoInput.files.length > 0) {
        botonEnviar.disabled = false;
    } else {
        botonEnviar.disabled = true;
    }
}

function MensajeArchvios() {
    alert('Archivo Cargado Correctamente');
}