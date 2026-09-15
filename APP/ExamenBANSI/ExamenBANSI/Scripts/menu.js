const menuItems = document.querySelectorAll('.menu-item');

// Actualiza el ítem activo al hacer clic
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Elimina la clase active de todos los ítems
    menuItems.forEach((menuItem) => menuItem.classList.remove('active'));

    // Agrega la clase active al ítem clickeado
    item.classList.add('active');
  });
});
