function logAccount() {
    var usr;
    var pwd;
    usr = $("#Email").val();
    pwd = $("#Password").val();
    
    $.ajax({
        url: '/Login/Index', //le envio el dato del evento en el controles que va a ejecutar
        data: {
            "Email": usr,
            "Password": pwd,
        },
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            //alert('Usuario Firmado Correctamente');
            
        },
        error: function (jqXHR, status, error) {
            //alert('Usuario NO logeado');
            
        },
        complete: function (jqXHR, status) {
        }

    });
}
