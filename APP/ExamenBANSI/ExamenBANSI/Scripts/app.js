const baseUrl = window.location.origin;
sessionStorage.setItem("url", baseUrl);
    // Selección del input y el ícono
    const passwordInput = document.querySelector(".password-input");
    const togglePassword = document.querySelector(".toggle-password");

    // Alternar entre password y text
    togglePassword.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        togglePassword.querySelector("img").src = isPassword
            ? "https://cdn-icons-png.flaticon.com/512/709/709612.png" // Ícono de "mostrar"
            : "https://cdn-icons-png.flaticon.com/512/565/565655.png"; // Ícono de "ocultar"
    }); 


    //document.getElementById('fichaEspecificaciones').addEventListener('change', function () {
    //    const fileName = this.files[0] ? this.files[0].name : 'Seleccionar archivo...';
    //    this.previousElementSibling.textContent = fileName;
    //});