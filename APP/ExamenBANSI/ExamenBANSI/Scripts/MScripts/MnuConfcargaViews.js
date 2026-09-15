function obtenerConfCarViews() {
    agregaAlPrincipal();
    const dTbConfcgvws = new DataTable('#dTbConfcgvws');
    let counter = 1;

    $.ajax({
        url: '/ConfCargaViews/LstConfgVws',
        type: 'GET',
        data: {
        },

        dataType: 'json',
        success: function (response) {
            var Confcgvws = JSON.stringify(response);
            for (var i = 0; i < response.data.length; i++) {
                dTbConfcgvws.row
                    .add([
                        response.data[i].idconf,
                        response.data[i].idtipofi,
                        response.data[i].cidusuar,
                        response.data[i].vistanombre,
                        response.data[i].Campo1,
                        response.data[i].nameCampo1,
                        response.data[i].Campo2,
                        response.data[i].nameCampo2,
                        response.data[i].Campo3,
                        response.data[i].nameCampo3,
                        response.data[i].Campo4,
                        response.data[i].nameCampo4,
                        response.data[i].Campo5,
                        response.data[i].nameCampo5,
                        response.data[i].Campo6,
                        response.data[i].nameCampo6,
                        response.data[i].Campo7,
                        response.data[i].nameCampo7,
                        response.data[i].Campo8,
                        response.data[i].nameCampo8,
                        response.data[i].Campo9,
                        response.data[i].nameCampo9,
                        response.data[i].Campo10,
                        response.data[i].nameCampo10,
                        response.data[i].Campo11,
                        response.data[i].nameCampo11,
                        response.data[i].Campo12,
                        response.data[i].nameCampo12,
                        response.data[i].Campo13,
                        response.data[i].nameCampo13,
                        response.data[i].Campo14,
                        response.data[i].nameCampo14,
                        response.data[i].Campo15,
                        response.data[i].nameCampo15,
                        response.data[i].Campo16,
                        response.data[i].nameCampo16,
                        response.data[i].Campo17,
                        response.data[i].nameCampo17,
                        response.data[i].Campo18,
                        response.data[i].nameCampo18,
                        response.data[i].Campo19,
                        response.data[i].nameCampo19,
                        response.data[i].Campo20,
                        response.data[i].nameCampo20,
                        response.data[i].Campo21,
                        response.data[i].nameCampo21,
                        response.data[i].Campo22,
                        response.data[i].nameCampo22,
                        response.data[i].Campo23,
                        response.data[i].nameCampo23,
                        response.data[i].Campo24,
                        response.data[i].nameCampo24,
                        response.data[i].Campo25,
                        response.data[i].nameCampo25,
                        response.data[i].Campo26,
                        response.data[i].nameCampo26,
                        response.data[i].Campo27,
                        response.data[i].nameCampo27,
                        response.data[i].Campo28,
                        response.data[i].nameCampo28,
                        response.data[i].Campo29,
                        response.data[i].nameCampo29,
                        response.data[i].Campo30,
                        response.data[i].nameCampo30,
                       /* "<button type='button' class='btn btn-success btn-circle btn-sm fas fa-check' data-toggle='modal' data-target='#concgViewsModal' onclick='mostdaconfcgViews(this)'></button>"*/
                        "<img src='/img/Editar_img.png' class='rounded' alt='...' title='Editar registro' data-toggle='modal' data-target='#concgViewsModal' onclick='mostdaconfcgViews(this)'>"

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
function mostdaconfcgViews(button) {
    var txtidconfvw = 0;
    var txtidtpfile = 0;
    /*var txtiduser = 0;*/
    var nbrvws;
    /*var sino = 0;*/
    var campo1 = 0;
    var nombcampo1;
    var campo2 = 0;
    var nombcampo2;
    var campo3 = 0;
    var nombcampo3;
    var campo4 = 0;
    var nombcampo4;
    var campo5 = 0;
    var nombcampo5;
    var campo6 = 0;
    var nombcampo6;
    var campo7 = 0;
    var nombcampo7;
    var campo8 = 0;
    var nombcampo8;
    var campo9 = 0;
    var nombcampo9;
    var campo10 = 0;
    var nombcampo10;
    var campo11 = 0;
    var nombcampo11;
    var campo12 = 0;
    var nombcampo12;
    var campo13 = 0;
    var nombcampo13;
    var campo14 = 0;
    var nombcampo14;
    var campo15 = 0;
    var nombcampo15;
    var campo16 = 0;
    var nombcampo16;
    var campo17 = 0;
    var nombcampo17;
    var campo18 = 0;
    var nombcampo18;
    var campo19 = 0;
    var nombcampo19;
    var campo20 = 0;
    var nombcampo20;
    var campo21 = 0;
    var nombcampo21;
    var campo22 = 0;
    var nombcampo22;
    var campo23 = 0;
    var nombcampo23;
    var campo24 = 0;
    var nombcampo24;
    var campo25 = 0;
    var nombcampo25;
    var campo26 = 0;
    var nombcampo26;
    var campo27 = 0;
    var nombcampo27;
    var campo28 = 0;
    var nombcampo28;
    var campo29 = 0;
    var nombcampo29;
    var campo30 = 0;
    var nombcampo30;

   


    $("table tbody tr").click(function () {
        idconf = $(this).find("td:eq(0)").text();
        idtipofi = $(this).find("td:eq(1)").text();
        nbrvws = $(this).find("td:eq(3)").text();
        campo1 = $(this).find("td:eq(4)").text();
        nombcampo1 = $(this).find("td:eq(5)").text();
        campo2 = $(this).find("td:eq(6)").text(); 
        nombcampo2 =$(this).find("td:eq(7)").text();
        campo3 = $(this).find("td:eq(8)").text();
        nombcampo3 = $(this).find("td:eq(9)").text();
         campo4 = $(this).find("td:eq(10)").text();
        nombcampo4 = $(this).find("td:eq(11)").text();
         campo5 = $(this).find("td:eq(12)").text();
        nombcampo5 = $(this).find("td:eq(13)").text();
        campo6 = $(this).find("td:eq(14)").text();
        nombcampo6 = $(this).find("td:eq(15)").text();
         campo7 = $(this).find("td:eq(16)").text();
        nombcampo7 = $(this).find("td:eq(17)").text();
         campo8 = $(this).find("td:eq(18)").text();
        nombcampo8 = $(this).find("td:eq(19)").text();
         campo9 = $(this).find("td:eq(20)").text();
        nombcampo9 = $(this).find("td:eq(21)").text();
         campo10 = $(this).find("td:eq(22)").text();
        nombcampo10 = $(this).find("td:eq(23)").text();
         campo11 = $(this).find("td:eq(24)").text();
        nombcampo11 = $(this).find("td:eq(25)").text();
         campo12 = $(this).find("td:eq(26)").text();
        nombcampo12 = $(this).find("td:eq(27)").text();
         campo13 = $(this).find("td:eq(28)").text();
        nombcampo13 = $(this).find("td:eq(29)").text();
         campo14 = $(this).find("td:eq(30)").text();
        nombcampo14 = $(this).find("td:eq(31)").text();
         campo15 = $(this).find("td:eq(32)").text();
        nombcampo15= $(this).find("td:eq(33)").text();
         campo16 = $(this).find("td:eq(34)").text();
        nombcampo16 = $(this).find("td:eq(35)").text();
         campo17 = $(this).find("td:eq(36)").text();
        nombcampo17 = $(this).find("td:eq(37)").text();
         campo18 = $(this).find("td:eq(38)").text();
        nombcampo18 = $(this).find("td:eq(39)").text();
         campo19 = $(this).find("td:eq(40)").text();
        nombcampo19 = $(this).find("td:eq(41)").text();
         campo20 = $(this).find("td:eq(42)").text();
        nombcampo20 = $(this).find("td:eq(43)").text();
         campo21 = $(this).find("td:eq(44)").text();
        nombcampo21 = $(this).find("td:eq(45)").text();
         campo22 = $(this).find("td:eq(46)").text();
        nombcampo22 = $(this).find("td:eq(47)").text();
         campo23 = $(this).find("td:eq(48)").text();
        nombcampo23 = $(this).find("td:eq(49)").text();
         campo24 = $(this).find("td:eq(50)").text();
        nombcampo24 = $(this).find("td:eq(51)").text();
         campo25 = $(this).find("td:eq(52)").text();
        nombcampo25 = $(this).find("td:eq(53)").text();
         campo26 = $(this).find("td:eq(54)").text();
        nombcampo26 = $(this).find("td:eq(55)").text();
         campo27 = $(this).find("td:eq(56)").text();
        nombcampo27 = $(this).find("td:eq(57)").text();
         campo28 = $(this).find("td:eq(58)").text();
        nombcampo28 = $(this).find("td:eq(59)").text();
         campo29 = $(this).find("td:eq(60)").text();
        nombcampo29 = $(this).find("td:eq(61)").text();
         campo30 = $(this).find("td:eq(62)").text();
        nombcampo30 = $(this).find("td:eq(63)").text();


        /* sino = $(this).find("td:eq(3)").text();*/
        
        /* sino = $(this).find("td:eq(3)").text();*/

        $("#txtidcofvws").val(idconf);
        $("#txtidtipfilvw").val(idtipofi);
        /*$("#txtidtipfilvwn").val(idtipofi);*/
        $("#txtidtipfilvwn").val(nbrvws);
        $("#check").val(campo1);
        $("#txtvwc1").val(nombcampo1);
        $("#check").val(campo2);
        $("#txtvwc2").val(nombcampo2);
        $("#check").val(campo3);
        $("#txtvwc3").val(nombcampo3);
        $("#check").val(campo4);
        $("#txtvwc4").val(nombcampo4);
        $("#check").val(campo5);
        $("#txtvwc5").val(nombcampo5);
        $("#check").val(campo6);
        $("#txtvwc6").val(nombcampo6);
        $("#check").val(campo7);
        $("#txtvwc7").val(nombcampo7);
        $("#check").val(campo8);
        $("#txtvwc8").val(nombcampo8);
        $("#check").val(campo9);
        $("#txtvwc9").val(nombcampo9);
        $("#check").val(campo10);
        $("#txtvwc10").val(nombcampo10);
        $("#check").val(campo11);
        $("#txtvwc11").val(nombcampo11);
        $("#check").val(campo12);
        $("#txtvwc12").val(nombcampo12);
        $("#check").val(campo13);
        $("#txtvwc13").val(nombcampo13);
        $("#check").val(campo14);
        $("#txtvwc14").val(nombcampo14);
        $("#check").val(campo15);
        $("#txtvwc15").val(nombcampo15);
        $("#check").val(campo16);
        $("#txtvwc16").val(nombcampo16);
        $("#check").val(campo17);
        $("#txtvwc17").val(nombcampo17);
        $("#check").val(campo18);
        $("#txtvwc18").val(nombcampo18);
        $("#check").val(campo19);
        $("#txtvwc19").val(nombcampo19);
        $("#check").val(campo20);
        $("#txtvwc20").val(nombcampo20);
        $("#check").val(campo21);
        $("#txtvwc21").val(nombcampo21);
        $("#check").val(campo22);
        $("#txtvwc22").val(nombcampo22);
        $("#check").val(campo23);
        $("#txtvwc23").val(nombcampo23);
        $("#check").val(campo24);
        $("#txtvwc24").val(nombcampo24);
        $("#check").val(campo25);
        $("#txtvwc25").val(nombcampo25);
        $("#check").val(campo26);
        $("#txtvwc26").val(nombcampo26);
        $("#check").val(campo27);
        $("#txtvwc27").val(nombcampo27);
        $("#check").val(campo28);
        $("#txtvwc28").val(nombcampo28);
        $("#check").val(campo29);
        $("#txtvwc29").val(nombcampo29);
        $("#check").val(campo30);
        $("#txtvwc30").val(nombcampo30);

        /* $("#check").val(sino);*/
        

        /*if (sino == 0) { document.getElementById("chkTitulo").checked = false; } else { document.getElementById("chkTitulo").checked = true; };*/
        if (campo1 == 0) { document.getElementById("chkCampo1").checked = false; } else { document.getElementById("chkCampo1").checked = true; };
        if (campo2 == 0) { document.getElementById("chkCampo2").checked = false; } else { document.getElementById("chkCampo2").checked = true; };
        if (campo3 == 0) { document.getElementById("chkCampo3").checked = false; } else { document.getElementById("chkCampo3").checked = true; };
        if (campo4 == 0) { document.getElementById("chkCampo4").checked = false; } else { document.getElementById("chkCampo4").checked = true; };
        if (campo5 == 0) { document.getElementById("chkCampo5").checked = false; } else { document.getElementById("chkCampo5").checked = true; };
        if (campo6 == 0) { document.getElementById("chkCampo6").checked = false; } else { document.getElementById("chkCampo6").checked = true; };
        if (campo7 == 0) { document.getElementById("chkCampo7").checked = false; } else { document.getElementById("chkCampo7").checked = true; };
        if (campo8 == 0) { document.getElementById("chkCampo8").checked = false; } else { document.getElementById("chkCampo8").checked = true; };
        if (campo9 == 0) { document.getElementById("chkCampo9").checked = false; } else { document.getElementById("chkCampo9").checked = true; };
        if (campo10 == 0) { document.getElementById("chkCampo10").checked = false; } else { document.getElementById("chkCampo10").checked = true; };
        if (campo11 == 0) { document.getElementById("chkCampo11").checked = false; } else { document.getElementById("chkCampo11").checked = true; };
        if (campo12 == 0) { document.getElementById("chkCampo12").checked = false; } else { document.getElementById("chkCampo12").checked = true; };
        if (campo13 == 0) { document.getElementById("chkCampo13").checked = false; } else { document.getElementById("chkCampo13").checked = true; };
        if (campo14 == 0) { document.getElementById("chkCampo14").checked = false; } else { document.getElementById("chkCampo14").checked = true; }
        if (campo15 == 0) { document.getElementById("chkCampo15").checked = false; } else { document.getElementById("chkCampo15").checked = true; };
        if (campo16 == 0) { document.getElementById("chkCampo16").checked = false; } else { document.getElementById("chkCampo16").checked = true; };
        if (campo17 == 0) { document.getElementById("chkCampo17").checked = false; } else { document.getElementById("chkCampo17").checked = true; };
        if (campo18 == 0) { document.getElementById("chkCampo18").checked = false; } else { document.getElementById("chkCampo18").checked = true; };
        if (campo19 == 0) { document.getElementById("chkCampo19").checked = false; } else { document.getElementById("chkCampo19").checked = true; };
        if (campo20 == 0) { document.getElementById("chkCampo20").checked = false; } else { document.getElementById("chkCampo20").checked = true; };
        if (campo21 == 0) { document.getElementById("chkCampo21").checked = false; } else { document.getElementById("chkCampo21").checked = true; };
        if (campo22 == 0) { document.getElementById("chkCampo22").checked = false; } else { document.getElementById("chkCampo22").checked = true; };
        if (campo23 == 0) { document.getElementById("chkCampo23").checked = false; } else { document.getElementById("chkCampo23").checked = true; };
        if (campo24 == 0) { document.getElementById("chkCampo24").checked = false; } else { document.getElementById("chkCampo24").checked = true; }
        if (campo25 == 0) { document.getElementById("chkCampo25").checked = false; } else { document.getElementById("chkCampo25").checked = true; };
        if (campo26 == 0) { document.getElementById("chkCampo26").checked = false; } else { document.getElementById("chkCampo26").checked = true; };
        if (campo27 == 0) { document.getElementById("chkCampo27").checked = false; } else { document.getElementById("chkCampo27").checked = true; };
        if (campo28 == 0) { document.getElementById("chkCampo28").checked = false; } else { document.getElementById("chkCampo28").checked = true; };
        if (campo29 == 0) { document.getElementById("chkCampo29").checked = false; } else { document.getElementById("chkCampo29").checked = true; };
        if (campo30 == 0) { document.getElementById("chkCampo30").checked = false; } else { document.getElementById("chkCampo30").checked = true; };

    });
};




function AgregcgViews() {
    var opcion = confirm("Desea Guardar los cambios?");

    var idConfig = 0;
    var idTipoFile = 0;
    var cidUsuario = 0;
    var NOMBREVISTA = "";
    //var b_Titulos = 0;
    //var I_LineaLectura = 0;
    //var NombreFile = "";
    //var iualta = 0;
   /* var sino = 0;*/

    var cmpo1 = 0;
    var CAMPO1NAME = "";
    var cmpo2 = 0;
    var CAMPO2NAME = "";
    var cmpo3 = 0;
    var CAMPO3NAME = "";
    var cmpo4 = 0;
    var CAMPO4NAME = "";
    var cmpo5 = 0;
    var CAMPO5NAME = "";
    var cmpo6 = 0;
    var CAMPO6NAME = "";
    var cmpo7 = 0;
    var CAMPO7NAME = "";
    var cmpo8 = 0;
    var CAMPO8NAME = "";
    var cmpo9 = 0;
    var CAMPO9NAME = "";
    var cmpo10 = 0;
    var CAMPO10NAME = "";
    var cmpo11 = 0;
    var CAMPO11NAME = "";
    var cmpo12 = 0;
    var CAMPO12NAME = "";
    var cmpo13 = 0;
    var CAMPO13NAME = "";
    var cmpo14 = 0;
    var CAMPO14NAME = "";
    var cmpo15 = 0;
    var CAMPO15NAME = "";
    var cmpo16 = 0;
    var CAMPO16NAME = "";
    var cmpo17 = 0;
    var CAMPO17NAME = "";
    var cmpo18 = 0;
    var CAMPO18NAME = "";
    var cmpo19 = 0;
    var CAMPO19NAME = "";
    var cmpo20 = 0;
    var CAMPO20NAME = "";
    var cmpo21 = 0;
    var CAMPO21NAME = "";
    var cmpo22 = 0;
    var CAMPO22NAME = "";
    var cmpo23 = 0;
    var CAMPO23NAME = "";
    var cmpo24 = 0;
    var CAMPO24NAME = "";
    var cmpo25 = 0;
    var CAMPO25NAME = "";
    var cmpo26 = 0;
    var CAMPO26NAME = "";
    var cmpo27 = 0;
    var CAMPO27NAME = "";
    var cmpo28 = 0;
    var CAMPO28NAME = "";
    var cmpo29 = 0;
    var CAMPO29NAME = "";
    var cmpo30 = 0;
    var CAMPO30NAME = "";
    
  


    if (opcion == true) {
        idConfig = $("#txtidcofvws").val();
        idTipoFile = $("#txtidtipfilvw").val();
        cidUsuario = $("#txtidtipfilvw").val();
        NOMBREVISTA = $("#txtidtipfilvwn").val();
        cmpo1 = $("#chkCampo1").val();
        CAMPO1NAME = $("#txtvwc1").val();
        cmpo2 = $("#chkCampo2").val();
        CAMPO2NAME = $("#txtvwc2").val();
        cmpo3 = $("#chkCampo3").val();
        CAMPO3NAME = $("#txtvwc3").val();
        cmpo4 = $("#chkCampo4").val();
        CAMPO4NAME = $("#txtvwc4").val();
        cmpo5 = $("#chkCampo5").val();
        CAMPO5NAME = $("#txtvwc5").val();
        cmpo6 = $("#chkCampo6").val();
        CAMPO6NAME = $("#txtvwc6").val();
        cmpo7 = $("#chkCampo7").val();
        CAMPO7NAME = $("#txtvwc7").val();
        cmpo8 = $("#chkCampo8").val();
        CAMPO8NAME = $("#txtvwc8").val();
        cmpo9 = $("#chkCampo9").val();
        CAMPO9NAME = $("#txtvwc9").val();
        cmpo10 = $("#chkCampo10").val();
        CAMPO10NAME = $("#txtvwc10").val();
        cmpo11 = $("#chkCampo11").val();
        CAMPO11NAME = $("#txtvwc11").val();
        cmpo12 = $("#chkCampo12").val();
        CAMPO12NAME = $("#txtvwc12").val();
        cmpo13 = $("#chkCampo13").val();
        CAMPO13NAME = $("#txtvwc13").val();
        cmpo14 = $("#chkCampo14").val();
        CAMPO14NAME = $("#txtvwc14").val();
        cmpo15 = $("#chkCampo15").val();
        CAMPO15NAME = $("#txtvwc15").val();
        cmpo16 = $("#chkCampo16").val();
        CAMPO16NAME = $("#txtvwc16").val();
        cmpo17 = $("#chkCampo17").val();
        CAMPO17NAME = $("#txtvwc17").val();
        cmpo18 = $("#chkCampo18").val();
        CAMPO18NAME = $("#txtvwc18").val();
        cmpo19 = $("#chkCampo19").val();
        CAMPO19NAME = $("#txtvwc19").val();
        cmpo20 = $("#chkCampo20").val();
        CAMPO20NAME = $("#txtvwc20").val();
        cmpo21 = $("#chkCampo21").val();
        CAMPO21NAME = $("#txtvwc21").val();
        cmpo22 = $("#chkCampo22").val();
        CAMPO22NAME = $("#txtvwc22").val();
        cmpo23 = $("#chkCampo23").val();
        CAMPO23NAME = $("#txtvwc23").val();
        cmpo24 = $("#chkCampo24").val();
        CAMPO24NAME = $("#txtvwc24").val();
        cmpo25 = $("#chkCampo25").val();
        CAMPO25NAME = $("#txtvwc25").val();
        cmpo26 = $("#chkCampo26").val();
        CAMPO26NAME = $("#txtvwc26").val();
        cmpo27 = $("#chkCampo27").val();
        CAMPO27NAME = $("#txtvwc27").val();
        cmpo28 = $("#chkCampo28").val();
        CAMPO28NAME = $("#txtvwc28").val();
        cmpo29 = $("#chkCampo29").val();
        CAMPO29NAME = $("#txtvwc29").val();
        cmpo30 = $("#chkCampo30").val();
        CAMPO30NAME = $("#txtvwc30").val();

       
       

        //I_LineaLectura = $("#txtIlinealectura").val();
        //NombreFile = $("#txtnombre").val();
        //vchorigen = $("#txtvchorigen").val();
        //iualta = $("#txtiualta").val();

        if (document.getElementById('chkCampo1').checked) { chkCampo1 = 1; };
        if (document.getElementById('chkCampo2').checked) { chkCampo2 = 1; };
        if (document.getElementById('chkCampo3').checked) { chkCampo3 = 1; };
        if (document.getElementById('chkCampo4').checked) { chkCampo4 = 1; };
        if (document.getElementById('chkCampo5').checked) { chkCampo5 = 1; };
        if (document.getElementById('chkCampo6').checked) { chkCampo6 = 1; };
        if (document.getElementById('chkCampo7').checked) { chkCampo7 = 1; };
        if (document.getElementById('chkCampo8').checked) { chkCampo8 = 1; };
        if (document.getElementById('chkCampo9').checked) { chkCampo9 = 1; };
        if (document.getElementById('chkCampo10').checked) { chkCampo10 = 1; };
        if (document.getElementById('chkCampo11').checked) { chkCampo11 = 1; };
        if (document.getElementById('chkCampo12').checked) { chkCampo12 = 1; };
        if (document.getElementById('chkCampo13').checked) { chkCampo13 = 1; };
        if (document.getElementById('chkCampo14').checked) { chkCampo14 = 1; };
        if (document.getElementById('chkCampo15').checked) { chkCampo15 = 1; };
        if (document.getElementById('chkCampo16').checked) { chkCampo16 = 1; };
        if (document.getElementById('chkCampo17').checked) { chkCampo17 = 1; };
        if (document.getElementById('chkCampo18').checked) { chkCampo18 = 1; };
        if (document.getElementById('chkCampo19').checked) { chkCampo19 = 1; };
        if (document.getElementById('chkCampo20').checked) { chkCampo20 = 1; };
        if (document.getElementById('chkCampo21').checked) { chkCampo21 = 1; };
        if (document.getElementById('chkCampo22').checked) { chkCampo22 = 1; };
        if (document.getElementById('chkCampo23').checked) { chkCampo23 = 1; };
        if (document.getElementById('chkCampo24').checked) { chkCampo24 = 1; };
        if (document.getElementById('chkCampo25').checked) { chkCampo25 = 1; };
        if (document.getElementById('chkCampo26').checked) { chkCampo26 = 1; };
        if (document.getElementById('chkCampo27').checked) { chkCampo27 = 1; };
        if (document.getElementById('chkCampo28').checked) { chkCampo28 = 1; };
        if (document.getElementById('chkCampo29').checked) { chkCampo29 = 1; };
        if (document.getElementById('chkCampo30').checked) { chkCampo30 = 1; };
        
       
    }

        $.ajax({
            url: '/ConfCargaViews/updateConfcgVws', //le envio el dato del evento en el controles que va a ejecutar
            data: {
                "idconf": idConfig,
                "idtipofi": idTipoFile,
                "cidusuar": cidUsuario,
                "vistanombre": NOMBREVISTA,
                "Campo1": Campo1,
                "nameCampo1": campo1name,
                "Campo2": Campo2,
                "nameCampo2": campo2name,
                "Campo3": campo3,
                "nameCampo3": campo3name,
                "Campo4": campo4,
                "nameCampo4": campo4name,
                "Campo5": campo5,
                "nameCampo5": campo5name,
                "Campo6": campo6,
                "nameCampo6": campo6name,
                "Campo7": campo7,
                "nameCampo7": campo7name,
                "Campo8": campo8,
                "nameCampo8": campo8name,
                "Campo9": campo9,
                "nameCampo9": campo9name,
                "Campo10": campo10,
                "nameCampo10": campo10name,
                "Campo11": campo11,
                "nameCampo11": campo11name,
                "Campo12": campo12,
                "nameCampo12": campo12name,
                "Campo13": campo13,
                "nameCampo13": campo13name,
                "Campo14": campo14,
                "nameCampo14": campo14name,
                "Campo15": campo15,
                "nameCampo15": campo15name,
                "Campo16": campo16,
                "nameCampo16": campo16name,
                "Campo17": campo17,
                "nameCampo17": campo17name,
                "Campo18": campo18,
                "nameCampo18": campo18name,
                "Campo19": campo19,
                "nameCampo19": campo19name,
                "Campo20": campo20,
                "nameCampo20": campo20name,
                "Campo21": campo21,
                "nameCampo21": campo21name,
                "Campo22": campo22,
                "nameCampo22": campo22name,
                "Campo23": campo23,
                "nameCampo23": campo23name,
                "Campo24": campo24,
                "nameCampo24": campo24name,
                "Campo25": campo25,
                "nameCampo25": campo25name,
                "Campo26": campo26,
                "nameCampo26": campo26name,
                "Campo27": campo27,
                "nameCampo27": campo27name,
                "Campo28": campo28,
                "nameCampo28": campo28name,
                "Campo29": campo29,
                "nameCampo29": campo29name,
                "Campo30": campo30,
                "nameCampo30": campo30name,
                //"Campo31": campo31,
                //"nameCampo31": campo31name,
                //"Campo32": campo32,
                //"nameCampo32": campo32name,
                //"Campo33": campo33,
                //"nameCampo33": campo33name,
                //"Campo34": campo34,
                //"nameCampo34": campo34name,
                //"Campo35": campo35,
                //"nameCampo35": campo35name,
                //"Campo36": campo36,
                //"nameCampo36": campo36name,
                //"Campo37": campo37,
                //"nameCampo37": campo37name,
                //"Campo38": campo38,
                //"nameCampo38": campo38name,
                //"Campo39": campo39,
                //"nameCampo39": campo39name,
                //"Campo40": campo40,
                //"nameCampo40": campo40name,
                //"Campo41": campo41,
                //"nameCampo41": campo41name,
                //"Campo42": campo42,
                //"nameCampo42": campo42name,
                //"Campo43": campo43,
                //"nameCampo43": campo43name,
                //"Campo44": campo44,
                //"nameCampo44": campo44name,
                //"Campo45": campo45,
                //"nameCampo45": campo45name,
                //"Campo46": campo46,
                //"nameCampo46": campo46name,
                //"Campo47": campo47,
                //"nameCampo47": campo47name,
                //"Campo48": campo48,
                //"nameCampo48": campo48name,
                //"Campo49": campo49,
                //"nameCampo49": campo49name,
                //"Campo50": campo50,
                //"nameCampo50": campo50name,
                //"Campo51": campo51,
                //"nameCampo51": campo51name,
                //"Campo52": campo52,
                //"nameCampo52": campo52name,
                //"Campo53": campo53,
                //"nameCampo53": campo53name,
                //"Campo54": campo54,
                //"nameCampo54": campo54name,
                //"Campo55": campo55,
                //"nameCampo55": campo55name,
                //"Campo56": campo56,
                //"nameCampo56": campo56name,
                //"Campo57": campo57,
                //"nameCampo57": campo57name,
                //"Campo58": campo58,
                //"nameCampo58": campo58name,
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



function limpiadatos() {
    var txtidcofvws = "";
    var txtidtipfilvw = "";
    var txtidtipfilvwn = "";
    var chkCampo1 = "";
    var txtvwc1 = "";
    var chkCampo2 = "";
    var txtvwc2 = "";
    var chkCampo3 = "";
    var txtvwc3 = "";
    var chkCampo4 = "";
    var txtvwc4 = "";
    var chkCampo5 = "";
    var txtvwc5 = "";
    var chkCampo6 = "";
    var txtvwc6 = "";
    var chkCampo7 = "";
    var txtvwc7 = "";
    var chkCampo8 = "";
    var txtvwc8 = "";
    var chkCampo9 = "";
    var txtvwc9 = "";
    var chkCampo10 = "";
    var txtvwc10 = "";
    var chkCampo11 = "";
    var txtvwc11 = "";
    var chkCampo12 = "";
    var txtvwc12 = "";
    var chkCampo13 = "";
    var txtvwc13 = "";
    var chkCampo14 = "";
    var txtvwc14 = "";
    var chkCampo15 = "";
    var txtvwc15 = "";
    var chkCampo16 = "";
    var txtvwc16 = "";
    var chkCampo17 = "";
    var txtvwc17 = "";
    var chkCampo18 = "";
    var txtvwc18 = "";
    var chkCampo19 = "";
    var txtvwc19 = "";
    var chkCampo20 = "";
    var txtvwc20 = "";
    var chkCampo21 = "";
    var txtvwc21 = "";
    var chkCampo22 = "";
    var txtvwc22 = "";
    var chkCampo23 = "";
    var txtvwc23 = "";
    var chkCampo24 = "";
    var txtvwc24 = "";
    var chkCampo25 = "";
    var txtvwc25 = "";
    var chkCampo26 = "";
    var txtvwc26 = "";
    var chkCampo27 = "";
    var txtvwc27 = "";
    var chkCampo28 = "";
    var txtvwc28 = "";
    var chkCampo29 = "";
    var txtvwc29 = "";
    var chkCampo30 = "";
    var txtvwc30 = "";
   


    $("#txtidcofvws").val(txtidcofvws);
    $("#txtidtipfilvw").val(txtidtipfilvw);
    $("#txtidtipfilvwn").val(txtidtipfilvwn);
    $("#chkCampo1").val(chkCampo1);
    $("#txtvwc1").val(txtvwc1);
    $("#chkCampo2").val(chkCampo2);
    $("#txtvwc2").val(txtvwc2);
    $("#chkCampo3").val(chkCampo3);
    $("#txtvwc3").val(txtvwc3);
    $("#chkCampo4").val(chkCampo4);
    $("#txtvwc4").val(txtvwc4);
    $("#chkCampo5").val(chkCampo5);
    $("#txtvwc5").val(txtvwc5);
    $("#chkCampo6").val(chkCampo6);
    $("#txtvwc6").val(txtvwc6);
    $("#chkCampo7").val(chkCampo7);
    $("#txtvwc7").val(txtvwc7);
    $("#chkCampo8").val(chkCampo8);
    $("#txtvwc8").val(txtvwc8);
    $("#chkCampo9").val(chkCampo9);
    $("#txtvwc9").val(txtvwc9);
    $("#chkCampo10").val(chkCampo10);
    $("#txtvwc10").val(txtvwc10);
    $("#chkCampo11").val(chkCampo11);
    $("#txtvwc11").val(txtvwc11);
    $("#chkCampo12").val(chkCampo12);
    $("#txtvwc12").val(txtvwc12);
    $("#chkCampo13").val(chkCampo13);
    $("#txtvwc13").val(txtvwc13);
    $("#chkCampo14").val(chkCampo14);
    $("#txtvwc14").val(txtvwc14);
    $("#chkCampo15").val(chkCampo15);
    $("#txtvwc15").val(txtvwc15);
    $("#chkCampo16").val(chkCampo16);
    $("#txtvwc16").val(txtvwc16);
    $("#chkCampo17").val(chkCampo17);
    $("#txtvwc17").val(txtvwc17);
    $("#chkCampo18").val(chkCampo18);
    $("#txtvwc18").val(txtvwc18);
    $("#chkCampo19").val(chkCampo19);
    $("#txtvwc19").val(txtvwc19);
    $("#chkCampo20").val(chkCampo20);
    $("#txtvwc20").val(txtvwc20);
    $("#chkCampo21").val(chkCampo21);
    $("#txtvwc21").val(txtvwc21);
    $("#chkCampo22").val(chkCampo22);
    $("#txtvwc22").val(txtvwc22);
    $("#chkCampo23").val(chkCampo23);
    $("#txtvwc23").val(txtvwc23);
    $("#chkCampo24").val(chkCampo24);
    $("#txtvwc24").val(txtvwc24);
    $("#chkCampo25").val(chkCampo25);
    $("#txtvwc25").val(txtvwc25);
    $("#chkCampo26").val(chkCampo26);
    $("#txtvwc26").val(txtvwc26);
    $("#chkCampo27").val(chkCampo27);
    $("#txtvwc27").val(txtvwc27);
    $("#chkCampo28").val(chkCampo28);
    $("#txtvwc28").val(txtvwc28);
    $("#chkCampo29").val(chkCampo29);
    $("#txtvwc29").val(txtvwc29);
    $("#chkCampo30").val(chkCampo30);
    $("#txtvwc30").val(txtvwc30);
   

};
