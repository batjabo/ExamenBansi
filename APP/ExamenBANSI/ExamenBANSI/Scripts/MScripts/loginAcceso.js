window.location.hash = "no-back-button";
window.location.hash = "Again-No-back-button" //chrome
window.onhashchange = function () { window.location.hash = "no-back-button"; }

window.addEventListener("load", function () {

    // icono para mostrar contraseña
    showPassword = document.querySelector('.show-password');
    showPassword.addEventListener('click', () => {

        // elementos input de tipo clave
        password1 = document.querySelector('.password1');

        if (password1.type === "text") {
            password1.type = "password"
            showPassword.classList.remove('fa-eye-slash');
        } else {
            password1.type = "text"
            showPassword.classList.toggle("fa-eye-slash");
        }

    })

});