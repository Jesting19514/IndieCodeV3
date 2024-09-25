let selectedButton = null; // Variable para almacenar el botón seleccionado
let existingDates = {}; // Objeto para almacenar fechas existentes para todos los documentos

function openDatePicker(button) {
    selectedButton = button; // Almacenar el botón en el que se ha hecho clic
    document.getElementById('date-modal').style.display = 'block'; // Mostrar el modal
}

function closeModal() {
    document.getElementById('date-modal').style.display = 'none'; // Ocultar el modal
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año
    return `${day}/${month}/${year}`;
}

function validateDates(startDate, endDate) {
    const today = new Date().setHours(0, 0, 0, 0); // Obtener la fecha actual, ignorando la hora
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(0, 0, 0, 0);

    if (start < today) {
        alert('La fecha de inicio no puede ser en el pasado.');
        return false;
    }
    if (start >= end) {
        alert('La fecha de inicio debe ser anterior a la fecha de término.');
        return false;
    }
    return true;
}

function saveDates() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        // Validar las fechas antes de guardar
        if (!validateDates(startDate, endDate)) {
            return; // Salir si la validación falla
        }

        // Permitir reutilizar fechas en diferentes documentos
        const buttonKey = selectedButton.textContent.trim().split('\n')[0]; // Usar solo el nombre del documento

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // Almacenar fechas para el botón actual
        existingDates[buttonKey] = { start: formattedStartDate, end: formattedEndDate };

        // Actualizar el botón con las nuevas fechas
        selectedButton.innerHTML = `<span class="document-name">${buttonKey}</span><br><span class="date-text">Fecha de inicio: ${formattedStartDate}<br>Fecha de término: ${formattedEndDate}</span>`;
        closeModal(); // Ocultar el modal después de guardar
    } else {
        alert('Por favor, selecciona ambas fechas.');
    }
}
// Actualiza el botón con las nuevas fechas


function editName(button) {
    const nameElement = button.previousElementSibling.querySelector('.document-name'); // Selecciona solo el nombre
    const currentName = nameElement.textContent.trim(); // Obtén solo el nombre
    const newName = prompt('Ingrese el nuevo nombre:', currentName);
    
    if (newName !== null && newName !== "") {
        // Mantener la fecha existente
        const existingDateInfo = existingDates[currentName] ? `<br><span class="date-text">Fecha de inicio: ${existingDates[currentName].start}<br>Fecha de término: ${existingDates[currentName].end}</span>` : '';
        
        // Cambia solo el nombre
        nameElement.innerHTML = newName;

        // Actualizar las fechas en el objeto existingDates
        existingDates[newName] = existingDates[currentName]; // Copiar las fechas a la nueva clave
        delete existingDates[currentName]; // Eliminar las fechas de la clave anterior
    }
}
document.getElementById('daycare-button').addEventListener('click', function() {
    const inputField = document.getElementById('button-name-input');
    const confirmButton = document.getElementById('confirm-name-button');

    // Mostrar el campo de entrada y el botón de confirmación
    inputField.style.display = 'inline';
    confirmButton.style.display = 'inline';
});

document.getElementById('confirm-name-button').addEventListener('click', function() {
    const newName = document.getElementById('button-name-input').value;
    const daycareButton = document.getElementById('daycare-button');

    // Cambiar el nombre del botón
    daycareButton.textContent = newName;

    // Ocultar el campo de entrada y el botón de confirmación
    document.getElementById('button-name-input').style.display = 'none';
    document.getElementById('confirm-name-button').style.display = 'none';
});



