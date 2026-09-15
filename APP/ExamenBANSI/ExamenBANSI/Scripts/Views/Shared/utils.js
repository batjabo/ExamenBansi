
function rfcValido(rfc, aceptarGenerico = true) {
    const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var validado = rfc.match(re);

    if (!validado)  //Coincide con el formato general del regex?
        return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
        rfcSinDigito = validado.slice(1).join(''),
        len = rfcSinDigito.length,

        //Obtener el digito esperado
        diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        indice = len + 1;
    var suma,
        digitoEsperado;

    if (len == 12) suma = 0
    else suma = 481; //Ajuste para persona moral

    for (var i = 0; i < len; i++)
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - suma % 11;
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if ((digitoVerificador != digitoEsperado)
        && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
        return false;
    else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
        return false;
    return rfcSinDigito + digitoVerificador;
}

function curpValida(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
        return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma = 0.0,
            lngDigito = 0.0;
        for (var i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;

    }

    if (validado[2] != digitoVerificador(validado[1]))
        return false;

    return true; //Validado
}

//let regularExpressions = {
//    telNumber: /^[0-9]{10}$/,
//    name: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ']+(?:\s(?:[a-záéíóúñ']+|[A-ZÁÉÍÓÚÑ][a-záéíóúñ']+))*$/g,
//    rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/g,
//    curp: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g,
//    email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g,
//    city: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?:[\s-](?:[a-záéíóúüñ]{1,3}|[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+))*$/g,
//    street: /^(?!.* {2})[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ.-]+( [a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ.-]+)*$/,
//    numberOI: /^(S\/N|[A-Za-z0-9-]+)$/g,
//    webPage: /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#][^\s]*)?$/g,
//    postalCode: /^[0-9]{5}$/,
//    integer: /^-?\d+$/g,
//    percentage: /^-?\d{1,3}(\.\d{1,6})?$/g,
//    ammount: /^-?\d{1,14}(\.\d{1,9})?$/g,
//    generalText: /^(?!.*  )[^\s].*[^\s]$/g,
//    integer: /^\d+$/g,
//    generalText: /^(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.-]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ.-]+)*$/,
//    description: /^(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9.,]+( [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9.,]+)*[.]?$/g,
//    gDate: /^[0-9/]+$/
//};

//let regularExpressions = {
//    telNumber: /^[0-9]{10}$/,
//    name: /^[A-Z()]+(?:\s[A-Z()]+)*$/g,
//    rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/g,
//    curp: /^[A-Z]{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM][A-Z]{6}[A-Z\d]\d$/g,
//    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//    city: /^[A-Z()]+(?:\s[A-Z()]+)*$/g,
//    street: /^[A-Z0-9()]+(?:\s[A-Z0-9()]+)*$/g,
//    numberOI: /^(S\/N|[A-Z0-9-]+)$/g,
//    webPage: /^(https?:\/\/)?(www\.)?[A-Z0-9\-]+(\.[A-Z0-9\-]+)+([\/?#][^\s]*)?$/gi,
//    postalCode: /^[0-9]{5}$/,
//    integer: /^\d+$/g,
//    percentage: /^-?\d{1,3}(\.\d{1,6})?$/g,
//    ammount: /^-?\d{1,14}(\.\d{1,9})?$/g,
//    generalText: /^[A-Z0-9()]+(?:\s[A-Z0-9()]+)*$/g,
//    description: /^[A-Z0-9().,]+(?:\s[A-Z0-9().,]+)*[.]?$/g,
//    gDate: /^[0-9/]+$/
//};


const regularExpressions = {
    telNumber: /^[0-9]{10}$/,
    name: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    /* rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,*/
    rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{3})$/,
    curp: /^[A-Z]{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM][A-Z]{6}[A-Z\d]\d$/g,
    email: /^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    city: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    street: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    /*numberOI: /^(S\/N|[A-Z0-9-]+)$/g,*/
    numberOI: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    webPage: /^(https?:\/\/)?(www\.)?[A-Z0-9\-]+(\.[A-Z0-9\-]+)+([\/?#][^\s]*)?$/gi,
    postalCode: /^[0-9]{5,10}$/,
    integer: /^\d+$/g,
    percentage: /^(100(\.0{1,6})?|[0-9]{1,2}(\.\d{1,6})?)$/g,
    ammount: /^-?\d{1,14}(\.\d{1,9})?$/g,
    generalText: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    description: /^[A-Z0-9Ñ()]+(?:\s[A-Z0-9Ñ()]+)*$/g,
    gDate: /^[0-9/]+$/,
    feePercentage: /^(0(\.\d{1,6})?|1(\.0{1,6})?)$/,
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    prodGen: /^(?!\s)[\s\S]*\S$/m,
    prodGenOp: /^(?:$|(?![\s\n])[\s\S]*?(?<![\s\n]))$/m,
    prodNum: /^(?:\d+(?:\.\d+))$/i,
    prodNumOp: /^(?:\d+(?:\.\d+)?|n\/a)$/i,
    Catname: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,:()<>\/\s-%]*$/
};

const errorMessages = {
    telNumber: 'se debe ingresar un número de 10 dígitos',
    name: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales)',
    rfc: 'se debe ingresar un RFC con formato válido',
    curp: /^[A-Z]{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM][A-Z]{6}[A-Z\d]\d$/g,
    email: 'ingresar un correo valido (ej. ejemplo@correo.com)',
    city: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales)',
    street: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales)',
    numberOI: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales), en caso de no contar con el dato ingresar "S/N"',
    webPage: 'ingresar una página web válida (ej. ejemplo.com, ejemplo.com.mx, https://ejemplo.com)',
    postalCode: 'ingresar un número de mínimo 5 digitos, máximo 10',
    integer: 'ingresar únicamente números enteros',
    percentage: 'únicamente se aceptan valores entre 0 y 100, con máximo 6 decimales',
    ammount: 'ingresar números decimales.',
    generalText: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales)',
    description: 'únicamente se aceptan letras, números y paréntesis (Sin acentos ni caracteres especiales)',
    gDate: /^[0-9/]+$/,
    feePercentage: 'únicamente se aceptan valores entre 0 y 1, con máximo 6 decimales',
    prodGen: 'favor de ingresar texto sin iniciar ni terminar con espacios ni saltos de linea',
    prodGenOp: 'favor de ingresar texto sin iniciar ni terminar con espacios ni saltos de linea (en caso de no contar con el dato, dejar en blanco)',
    prodNum: 'favor de ingresar solo números decimales (ej 1.0, 1.5, 0.4, etc)',
    prodNumOp: 'favor de ingresar solo números decimales(ej 1.0, 1.5, 0.4, etc), en caso de no contar con el número, escribir el texto "n/a"',
}


function showAlert(title, text, icon) {
    Swal.close();
    if (icon === 'info') {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }
    else if (icon === 'errorArc') {
        Swal.fire({
            title: title,
            text: text,
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }
    else {
        $('#overlay').show();
        $('#modal' + icon).show();
    }

}

function dismissModal(type) {
    $('#overlay').hide();
    $('#modal' + type).hide();
}

function showLoadingAlert(title) {
    Swal.fire({
        imageUrl: santanImgLogo,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: '#525252'
    })

}

function addUpperCaseTr() {
    let inputs = $("input[data-validations]");
    inputs.each(function () {
        if ($(this).attr('data-validations') !== 'email' && $(this).attr('data-validations') !== 'webPage'
            && $(this).attr('data-validations') !== 'prodGen' && $(this).attr('data-validations') !== 'prodGenOp'
            && $(this).attr('data-validations') !== 'prodNum') {
            $(this).off("keyup").on("keyup", function () {
                $(this).val($(this).val().toUpperCase());
                $(this).css({ "text-transform":"uppercase"});
            });
            
        }
    });

}

function passToUpper(element) {
    element.val(element.val().toUpperCase());
}

function addAlert(button, msg, icon, type) {
    $('.alert-dismissible').remove();
    button.closest("form").prepend(`
        <div class="alert alert-${type === "success" ? 'success':'danger'} alert-dismissible fade show" role="alert">
            <span class="material-symbols-outlined">
                ${icon}
                </span>${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
}

function validateForm(actionButton) {
    let form = actionButton.parents('form:first');
    let inputs = form.find(':input[data-validations]');
    let allValid = [];
    inputs.each(function () {
        let label = $('label[for="' + $(this).attr('id') + '"]')[0];
        let campo = label.textContent;
        let nacionalidad = $(this).attr('data-nacionalidad');
        let nacMex = nacionalidad === 'MEXICO';
        //let valueTxt = $(this).val().trim()
        if ($(this).attr('data-validations') !== 'email' && $(this).attr('data-validations') !== 'webPage'
            && $(this).attr('data-validations') !== 'prodGen' && $(this).attr('data-validations') !== 'prodGenOp'
            && $(this).attr('data-validations') !== 'prodNum') {
            passToUpper($(this));
        }
            //if (valueTxt !== '' && valueTxt !== undefined && valueTxt !== null) {
        if ($(this).attr('data-validations') === 'ammount') {
            if ($(this).val().replace(',', '').match(regularExpressions[$(this).attr('data-validations')]) !== null) {
                $(this).removeClass("is-invalid");
                $(this).addClass("is-valid");
                $(this).parent().find(".invalid-feedback").remove();
                $(this).parent().find(".valid-feedback").remove();
                $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
            } else {
                $(this).removeClass("is-valid");
                $(this).addClass("is-invalid");
                $(this).parent().find(".valid-feedback").remove();
                $(this).parent().find(".invalid-feedback").remove();
                $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(this).attr('data-validations')]}.</div>`);
            }

        }
        
        else if ($(this).val().match(regularExpressions[$(this).attr('data-validations')]) !== null) {
            
                    //if ($(this).attr('data-validations') === 'rfc') {
                    //    if (rfcValido($(this).val())) {
                    //        allValid.push(true)
                    //        $(this).removeClass("is-invalid");
                    //        $(this).addClass("is-valid");
                    //        $(this).parent().find(".invalid-feedback").remove();
                    //        $(this).parent().find(".valid-feedback").remove();
                    //        $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                    //    } else {
                    //        allValid.push(false)
                    //        $(this).removeClass("is-valid");
                    //        $(this).addClass("is-invalid");
                    //        $(this).parent().find(".valid-feedback").remove();
                    //        $(this).parent().find(".invalid-feedback").remove();
                    //        $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
                    //    }
                    //}
                    if (campo.includes('fecha') && $(this).attr('data-validations') === 'rfc') {
                        if (!nacMex) {
                            allValid.push(false);
                            $(this).removeClass("is-valid");
                            $(this).addClass("is-invalid");
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, usar un formato de fecha válido dd/mm/aaaa (ej. 21/12/2000).</div>`);
                        }
                        else {
                            allValid.push(true)
                            $(this).removeClass("is-invalid");
                            $(this).addClass("is-valid");
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                        }
                    }
                    else {
                        allValid.push(true)
                        $(this).removeClass("is-invalid");
                        $(this).addClass("is-valid");
                        $(this).parent().find(".invalid-feedback").remove();
                        $(this).parent().find(".valid-feedback").remove();
                        $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                    }

             } else {
                    
                    if (campo.includes('fecha')) {
                        allValid.push(true)
                        if (nacMex) {
                            allValid.push(false);
                            $(this).removeClass("is-valid");
                            $(this).addClass("is-invalid");
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto,  ${errorMessages['rfc']}.</div>`);
                        }
                        else if ($(this).val().match(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/) !== null) {
                            $(this).removeClass("is-invalid");
                            $(this).addClass("is-valid");
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                        } else {
                            allValid.push(false)
                            $(this).removeClass("is-valid");
                            $(this).addClass("is-invalid");
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, usar un formato de fecha válido dd/mm/aaaa (ej. 21/12/2000).</div>`);
                        }

                    } else if (campo.includes('Tax Id')) {
                        if (nacMex) {
                            allValid.push(false);
                            $(this).removeClass("is-valid");
                            $(this).addClass("is-invalid");
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto,  ${errorMessages['rfc']}.</div>`);
                        }
                        else if ($(this).val().match(/^[A-Z0-9()]+(?:\s[A-Z0-9()]+)*$/g) !== null) {
                            $(this).removeClass("is-invalid");
                            $(this).addClass("is-valid");
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                        } else {
                            allValid.push(false)
                            $(this).removeClass("is-valid");
                            $(this).addClass("is-invalid");
                            $(this).parent().find(".valid-feedback").remove();
                            $(this).parent().find(".invalid-feedback").remove();
                            $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto,  ${errorMessages['generalText']}.</div>`);
                        }
                    } else if ($(this).attr("data-nullable") === "true" && $(this).val().length < 1) {
                        allValid.push(true);
                        $(this).removeClass("is-invalid");
                        $(this).addClass("is-valid");
                        $(this).parent().find(".invalid-feedback").remove();
                        $(this).parent().find(".valid-feedback").remove();
                        $(this).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
                    } else {
                        allValid.push(false)
                        $(this).removeClass("is-valid");
                        $(this).addClass("is-invalid");
                        $(this).parent().find(".valid-feedback").remove();
                        $(this).parent().find(".invalid-feedback").remove();
                        $(this).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto,  ${errorMessages[$(this).attr('data-validations')]}.</div>`);
                    }
                }        

    });
    return allValid.some(e => !e);
}

function cleanInputValidation(actionButton) {
    let form = actionButton.parents('form:first');
    let inputs = form.find(':input[data-validations]');
    inputs.each(function () {
        $(this).parent().find(".invalid-feedback").remove();
        $(this).parent().find(".valid-feedback").remove();
        $(this).removeClass("is-valid");
        $(this).removeClass("is-invalid");
    });
}

function validateInput(input) {
    console.log($(input).attr('id').replace(/[0-9]/g, ''));
    let label = $('label[for="' + $(input).attr('id') + '"]')[0];
    let campo = label.textContent;
    let nacionalidad = $(input).attr('data-nacionalidad');
    let nacMex = nacionalidad === 'MEXICO';
    if ($(input).attr('data-validations') !== 'email' && $(input).attr('data-validations') !== 'webPage'
            && $(input).attr('data-validations') !== 'prodGen' && $(input).attr('data-validations') !== 'prodGenOp'
            && $(input).attr('data-validations') !== 'prodNum') {
            passToUpper($(input));
    }
    if ($(input).attr('data-validations') === 'ammount') {
        if ($(input).val().replace(',','').match(regularExpressions[$(input).attr('data-validations')]) !== null) {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            $(input).parent().find(".invalid-feedback").remove();
            $(input).parent().find(".valid-feedback").remove();
            $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        } else {
            $(input).removeClass("is-valid");
            $(input).addClass("is-invalid");
            $(input).parent().find(".valid-feedback").remove();
            $(input).parent().find(".invalid-feedback").remove();
            $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(input).attr('data-validations')]}.</div>`);
        }

    } else if ($(input).val().match(regularExpressions[$(input).attr('data-validations')]) !== null) {
        //if ($(input).attr('data-validations') === 'rfc') {
        //    if (rfcValido($(input).val())) {
        //        $(input).removeClass("is-invalid");
        //        $(input).addClass("is-valid");
        //        $(input).parent().find(".invalid-feedback").remove();
        //        $(input).parent().find(".valid-feedback").remove();
        //        $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        //    } else {
        //        $(input).removeClass("is-valid");
        //        $(input).addClass("is-invalid");
        //        $(input).parent().find(".valid-feedback").remove();
        //        $(input).parent().find(".invalid-feedback").remove();
        //        $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto.</div>`);
        //    }
        //}
        if (campo.includes('fecha') && $(input).attr('data-validations') === 'rfc') {
            if (!nacMex) {
                $(input).removeClass("is-valid");
                $(input).addClass("is-invalid");
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, usar un formato de fecha válido dd/mm/aaaa (ej. 21/12/2000).</div>`);
            }
            else {
                $(input).removeClass("is-invalid");
                $(input).addClass("is-valid");
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
            }
        }
        else {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            $(input).parent().find(".invalid-feedback").remove();
            $(input).parent().find(".valid-feedback").remove();
            $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        }

    } else {
        
        if (campo.includes('fecha')) {
            if (nacMex) {
                $(input).removeClass("is-valid");
                $(input).addClass("is-invalid");
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages['rfc']}.</div>`);
            }
            else if ($(input).val().match(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/) !== null) {
                $(input).removeClass("is-invalid");
                $(input).addClass("is-valid");
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
            } else {
                $(input).removeClass("is-valid");
                $(input).addClass("is-invalid");
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, usar un formato de fecha válido dd/mm/aaaa (ej. 21/12/2000).</div>`);
            }

        } else if (campo.includes('Tax Id')) {
            if (nacMex) {
                $(input).removeClass("is-valid");
                $(input).addClass("is-invalid");
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages['rfc']}.</div>`);
            }
            else if ($(input).val().match(/^[A-Z0-9()]+(?:\s[A-Z0-9()]+)*$/g) !== null) {
                $(input).removeClass("is-invalid");
                $(input).addClass("is-valid");
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
            } else {
                $(input).removeClass("is-valid");
                $(input).addClass("is-invalid");
                $(input).parent().find(".valid-feedback").remove();
                $(input).parent().find(".invalid-feedback").remove();
                $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages['generalText']}.</div>`);
            }
        } else if ($(input).attr("data-nullable") === "true" && $(input).val().length < 1) {
            $(input).removeClass("is-invalid");
            $(input).addClass("is-valid");
            $(input).parent().find(".invalid-feedback").remove();
            $(input).parent().find(".valid-feedback").remove();
            $(input).parent().append(`<div class="valid-feedback">Campo: ${campo} correcto.</div>`);
        } else {
            $(input).removeClass("is-valid");
            $(input).addClass("is-invalid");
            $(input).parent().find(".valid-feedback").remove();
            $(input).parent().find(".invalid-feedback").remove();
            $(input).parent().append(`<div class="invalid-feedback">Campo: ${campo} incorrecto, ${errorMessages[$(input).attr('data-validations')]}.</div>`);
        }
        
    }
}

function changeStatusInputForm(actionButton, status) {
    let form = actionButton.parents('form:first');
    let inputs = form.find(':input');
    inputs.each(function () {
        if ($(this).attr('type') !== 'button') {
            if (!($(this).is('[readonly]'))) {
                $(this).prop('disabled', status);
            }
            
        }
        
    });
}

function hideMenu() {
    $('#divMenu').hide();
    $('.divMenuHorizontal').hide();
    $('#menuHor').css({ "margin": 0 });
    $('#accordionContainer').css({ "margin": 0 });
}

function validateAndProcessForm(actionButton, ajaxUrl = null) {
    let form = $(actionButton).closest('form'); // Obtener el formulario asociado al botón
    let isValid = !validateForm(actionButton); // Validar el formulario

    if (!isValid) {
        // Si hay errores, detener el proceso
        showAlert('Error', 'Por favor, corrija los errores en el formulario antes de continuar.', 'error');
        return false;
    }

    if (ajaxUrl) {
        // Envío por AJAX
        let formData = form.serialize(); // Serializar los datos del formulario
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    showAlert('Éxito', response.message, 'success');
                    $('#editModal').modal('hide'); // Cerrar el modal de edición
                    location.reload(); // Recargar la página para ver los cambios
                } else {
                    showAlert('Error', response.message, 'error');
                }
            },
            error: function () {
                showAlert('Error', 'Ocurrió un error al procesar la solicitud.', 'error');
            }
        });
        return false; // Evitar el envío estándar
    }

    // Envío estándar (POST)
    return true;
}


function addAmmountFormat() {
    let inputs = $(document).find(':input[data-validations = "ammount"]');
    
    inputs.each(function () {

        this.addEventListener('input', (e) => {
            const rawValue = e.target.value.replace(/,/g, ''); // Elimina comas existentes
            const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(rawValue); // Valida números con o sin punto decimal

            if (isValidNumber) {
                const [integerPart, decimalPart] = rawValue.split('.'); // Separa la parte entera y decimal
                const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Aplica formato de comas
                console.log([integerPart, decimalPart, formattedInteger]);
                let number = decimalPart !== undefined
                    ? `${formattedInteger}.${decimalPart}` // Si tiene parte decimal
                    : formattedInteger; // 
                e.target.value = number;
                console.log(number);
            } else {
                e.target.value = e.target.value.slice(0, -1); // Remueve último carácter si no es válido
            }
        });
    });
}

function setAmmountFormat(val) {
    let value = val.toString();
    const rawValue = value.replace(/,/g, ''); // Elimina comas existentes
    const isValidNumber = /^[0-9]*\.?[0-9]*$/.test(rawValue); // Valida números con o sin punto decimal

    if (isValidNumber) {
        const [integerPart, decimalPart] = rawValue.split('.'); // Separa la parte entera y decimal
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Aplica formato de comas
        console.log([integerPart, decimalPart, formattedInteger]);
        let number = decimalPart !== undefined
            ? `${formattedInteger}.${decimalPart}` // Si tiene parte decimal
            : formattedInteger; // 
        return number;
    }
}

function validateFormGC(actionButton) {
    let form = $(actionButton).closest('form'); // Obtener el formulario
    cleanInputValidation(actionButton);
    let inputs = form.find(':input[data-validations]'); // Campos con validaciones
    let isValid = true; // Suponemos que el formulario es válido

    inputs.each(function () {
        let input = $(this);
        let validationType = input.data('validations'); // Tipo de validación
        let value = input.val().trim(); // Valor del campo
        let label = $('label[for="' + input.attr('id') + '"]').text(); // Etiqueta del campo

        // Validar el campo con la expresión regular correspondiente
        if (!regularExpressions[validationType].test(value)) {
            // Campo inválido
            input.removeClass('is-valid').addClass('is-invalid');
            input.parent().find('.invalid-feedback').remove(); // Limpiar mensajes previos
            input.parent().append(`<div class="invalid-feedback">Campo: ${label} incorrecto.</div>`);
            isValid = false; // Marcar como no válido
        } else {
            // Campo válido
            input.removeClass('is-invalid').addClass('is-valid');
            input.parent().find('.invalid-feedback').remove();
            input.parent().append(`<div class="valid-feedback">Campo: ${label} correcto.</div>`);
        }
    });

    return isValid; // Si todo es válido, devolvemos true
}

async function getCatalogoInfo(catalogo) {
    const responseCat = await fetch(urlCatalogo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({claveCatalogo: catalogo})
    });
    const {Table} = await responseCat.json();
    return Table;
}