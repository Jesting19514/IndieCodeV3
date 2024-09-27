let selectedButton = null; // Variable para almacenar el botón seleccionado
let existingDates = {}; // Objeto para almacenar fechas existentes para todos los documentos

// Abrir el selector de fechas cuando se hace clic en el botón de edición
function openDatePicker(button) {
    selectedButton = button.previousElementSibling; // Almacenar el botón del documento asociado
    document.getElementById('date-modal').style.display = 'block'; // Mostrar el modal
}

function closeModal() {
    document.getElementById('date-modal').style.display = 'none'; // Ocultar el modal
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Solo dos dígitos del año
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
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // Asegurarse de que el botón solo contenga el nombre, sin fechas previas
        const buttonContent = selectedButton.textContent.split('Fecha de inicio')[0].trim();

        // Guardar las fechas en el botón
        selectedButton.innerHTML = `${buttonContent}<br><span class="date-text" style="display:none;">Fecha de inicio: ${formattedStartDate}<br>Fecha de término: ${formattedEndDate}</span>`;
        
        closeModal(); // Ocultar el modal después de guardar las fechas
    } else {
        alert('Por favor, selecciona ambas fechas.');
    }
}

// Alternar la visibilidad de las fechas al hacer clic en el botón del documento
function toggleDates(button) {
    const dateText = button.querySelector('.date-text');
    if (dateText) {
        if (dateText.style.display === 'none' || dateText.style.display === '') {
            dateText.style.display = 'block'; // Mostrar fechas
        } else {
            dateText.style.display = 'none'; // Ocultar fechas
        }
    }
}

// Función que no hace nada cuando se hace clic en el botón del documento
function doNothing() {
    // No hace nada
}

function convertToDate(dateString) {
    // Asumimos que el formato es "dd/mm/yy"
    const [day, month, year] = dateString.split('/').map(Number);
    // Convertir al formato "yyyy-mm-dd" (año completo)
    return new Date(`20${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
}

function checkDatesAndUpdate() {
    const today = new Date().setHours(0, 0, 0, 0); // La fecha de hoy sin horas

    // Recorremos todos los botones para verificar las fechas
    document.querySelectorAll('.daycare-item').forEach(button => {
        const dateText = button.querySelector('.date-text');

        if (dateText) {
            // Extraer las fechas del HTML (asegúrate de que el formato sea correcto)
            const startDateText = dateText.innerHTML.split('Fecha de inicio: ')[1].split('<br>')[0];
            const endDateText = dateText.innerHTML.split('Fecha de término: ')[1];
            
            // Verificar que las fechas se están obteniendo correctamente
            console.log("Start Date:", startDateText);
            console.log("End Date:", endDateText);

            // Convertir las fechas al formato Date utilizando la nueva función
            const startDate = convertToDate(startDateText);
            const endDate = convertToDate(endDateText);

            // Calcular los días totales entre la fecha de inicio y la fecha de término
            const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // Convertir ms a días, redondeado

            // Calcular los días restantes desde hoy hasta la fecha de término
            const daysRemaining = Math.max(0, Math.round((endDate - today) / (1000 * 60 * 60 * 24))); // Evitar negativos y redondear

            // Depuración: verificar los días calculados
            console.log("Total Days:", totalDays);
            console.log("Days Remaining:", daysRemaining);

            // Condiciones de los colores según el número de días restantes
            if (daysRemaining <= 14) {
                console.log("Applying red shadow");
                button.style.boxShadow = '0 5px 5px rgba(241, 2, 2, 0.692)'; // Rojo
            }  else if (daysRemaining > totalDays / 2) {
                console.log("Applying green shadow");
                button.style.boxShadow = '0 5px 5px rgba(0, 255, 0, 0.692)'; // Verde
            }
            else if (daysRemaining < totalDays / 2) {
                console.log("Applying orange shadow");
                button.style.boxShadow = '0 5px 5px rgba(255, 145, 0, 0.692)'; // Naranja
            }
        }
    });
}





function saveDates() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // Asegurarse de que el botón solo contenga el nombre, sin fechas previas
        const buttonContent = selectedButton.textContent.split('Fecha de inicio')[0].trim();

        // Actualizar el contenido del botón con el nombre del documento y las nuevas fechas
        selectedButton.innerHTML = `${buttonContent}<br><span class="date-text">Fecha de inicio: ${formattedStartDate}<br>Fecha de término: ${formattedEndDate}</span>`;
        
        closeModal(); // Ocultar el modal después de guardar las fechas

        // Verificar fechas y actualizar los colores
        checkDatesAndUpdate();
    } else {
        alert('Por favor, selecciona ambas fechas.');
    }
}
