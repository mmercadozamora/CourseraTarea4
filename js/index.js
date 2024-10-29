$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip(); // Inicializa los tooltips

    // Inicializa el carousel
    var myCarousel = document.querySelector('#mainCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000,
        pause: "hover" 
    });

    // Manejo de eventos del modal
    var registerModal = document.getElementById('registerModal');

    registerModal.addEventListener('show.bs.modal', function () {
        console.log('El modal está comenzando a abrirse.');
    });

    registerModal.addEventListener('shown.bs.modal', function () {
        console.log('El modal se ha abierto completamente.');
    });

    registerModal.addEventListener('hide.bs.modal', function () {
        console.log('El modal está comenzando a ocultarse.');
    });

    registerModal.addEventListener('hidden.bs.modal', function () {
        console.log('El modal se ha ocultado completamente.');
    });
});

// Selecciona el botón que activa el modal
const modalButton = document.getElementById('modalButton');
const exampleModal = document.getElementById('registerModal');

// Maneja el evento de apertura del modal
exampleModal.addEventListener('show.bs.modal', function () {
    modalButton.disabled = true; // Deshabilita el botón
    modalButton.style.backgroundColor = '#ccc'; // Cambia el color del botón (puedes personalizar este color)
});

// Maneja el evento de cierre del modal
exampleModal.addEventListener('hide.bs.modal', function () {
    modalButton.disabled = false; // Habilita el botón
    modalButton.style.backgroundColor = ''; // Restaura el color original del botón
});

exampleModal.addEventListener('show.bs.modal', function () {
    modalButton.disabled = true; // Deshabilita el botón
    modalButton.classList.add('btn-disabled'); // Agrega la clase de estilo
});

exampleModal.addEventListener('hide.bs.modal', function () {
    modalButton.disabled = false; // Habilita el botón
    modalButton.classList.remove('btn-disabled'); // Remueve la clase de estilo
});

document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement.parentElement;
        const collapse = accordionItem.querySelector('.accordion-collapse');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Alternar el estado
        button.setAttribute('aria-expanded', !isExpanded);
        collapse.classList.toggle('show', !isExpanded);
    });
});




