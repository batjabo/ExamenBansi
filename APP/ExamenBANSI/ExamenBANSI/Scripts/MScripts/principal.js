function rutaventana(url) {

    

    window.location.replace(url);

    $(document).ready(function () {
        var elemento = document.getElementById('content');
        $("#content-wrapper").append(elemento);
    });

    


}