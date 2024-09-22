// Solicitar permiso para notificaciones
if (Notification && Notification.permission !== "granted") {
    Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
            console.log("Permiso concedido para mostrar notificaciones.");
        }
    });
}
function addDaycare() {
    var daycareName = prompt("Ingrese el nombre de la nueva guardería:");

    if (daycareName && daycareName.length <= 25) {
        var daycareList = document.getElementById('daycare-list');
        var newDaycare = document.createElement('div');
        newDaycare.className = 'daycare-item-container';
        newDaycare.innerHTML = `
            <button class="daycare-item" onclick="location.href='prueba.html'">${daycareName}</button>
            <button class="edit-button" onclick="editName(this)"><img src="../../assets/images/editIcon_1.png" class="icon"></button>
            <button class="delete-button" onclick="deleteDaycare(this)"><img src="../../assets/images/deleteIcon2.png" class="icon"></button>
        `;
        daycareList.appendChild(newDaycare);

        // Mostrar notificación
        if (Notification.permission === "granted") {
            new Notification("Nueva guardería agregada", {
                body: `Has agregado la guardería '${daycareName}'.`,
                icon: "../../assets/images/imss_logo.png"
            });
        }
    } else if (daycareName) {
        alert("El nombre de la guardería no puede tener más de 25 caracteres.");
    } else {
        alert("Debe ingresar un nombre para la guardería.");
    }
}
function deleteDaycare(button) {
    if (confirm("Estás a punto de eliminar una guardería, ¿Deseas continuar?")) {
        var userInput = prompt("Para confirmar la eliminación, escribe 'DELETE'");
        
        if (userInput === "DELETE") {
            var daycareItem = button.parentElement;
            daycareItem.remove();

            // Mostrar notificación
            if (Notification.permission === "granted") {
                new Notification("Guardería eliminada", {
                    body: "Has eliminado una guardería del sistema.",
                    icon: "../../assets/images/deleteIcon2.png"  // Opcional: puedes usar un ícono
                });
            }
        } else {
            alert("El texto ingresado no es correcto. La eliminación ha sido cancelada.");
        }
    }
}
function deleteDaycare(button) {
    if (confirm("Estás a punto de eliminar una guardería, ¿Deseas continuar?")) {
        var userInput = prompt("Para confirmar la eliminación, escribe 'DELETE'");
        
        if (userInput === "DELETE") {
            var daycareItem = button.parentElement;
            daycareItem.remove();

            // Mostrar notificación
            if (Notification.permission === "granted") {
                new Notification("Guardería eliminada", {
                    body: "Has eliminado una guardería del sistema.",
                    icon: "../../assets/images/deleteIcon2.png"  // Opcional: puedes usar un ícono
                });
            }
        } else {
            alert("El texto ingresado no es correcto. La eliminación ha sido cancelada.");
        }
    }
}
function editName(button) {
    var daycareButton = button.previousElementSibling;
    var oldName = daycareButton.textContent;
    var newName = prompt("Ingrese el nuevo nombre para la guardería:", daycareButton.textContent);
    if (newName && newName.length <= 25) {
        daycareButton.textContent = newName;

        // Mostrar notificación
        if (Notification.permission === "granted") {
            new Notification("Guardería editada", {
                body: `Has cambiado el nombre de '${oldName}' a '${newName}'.`,
                icon: "../../assets/images/editIcon_1.png"
            });
        }
    } else if (newName) {
        alert("El nombre de la guardería no puede tener más de 25 caracteres.");
    }
}





//fuck/////////////////////////////////////////////////////////////////////////////////////////////////

function deleteDaycare(button) {
    if (confirm("Estás a punto de eliminar una guardería, ¿Deseas continuar?")) {
        var userInput = prompt("Para confirmar la eliminación, escribe 'DELETE'");
        
        if (userInput === "DELETE") {
            var daycareItem = button.parentElement;
            daycareItem.remove();
        } else {
            alert("El texto ingresado no es correcto. La eliminación ha sido cancelada.");
        }
    }
}
function editName(button) {
    var daycareButton = button.previousElementSibling;
    var newName = prompt("Ingrese el nuevo nombre para la guardería:", daycareButton.textContent);
    if (newName && newName.length <= 25) {
        daycareButton.textContent = newName;
    } else if (newName) {
        alert("El nombre de la guardería no puede tener más de 25 caracteres.");
    }
}

function addDaycare() {
    var daycareName = prompt("Ingrese el nombre de la nueva guardería:");

    // Validar que el nombre no exceda los 25 caracteres
    if (daycareName && daycareName.length <= 25) {
        var daycareList = document.getElementById('daycare-list');
        var newDaycare = document.createElement('div');
        newDaycare.className = 'daycare-item-container';
        newDaycare.innerHTML = `
            <button class="daycare-item" onclick="location.href='prueba.html'">${daycareName}</button>
            <button class="edit-button" onclick="editName(this)"><img src="../../assets/images/editIcon_1.png" class="icon"></button>
            <button class="delete-button" onclick="deleteDaycare(this)"><img src="../../assets/images/deleteIcon2.png" class="icon"></button>
        `;
        daycareList.appendChild(newDaycare);
    } else if (daycareName) {
        alert("El nombre de la guardería no puede tener más de 25 caracteres.");
    } else {
        alert("Debe ingresar un nombre para la guardería.");
    }
}




// Seleccionar el botón y el contenedor del menú -----------Ruben_Prueba-----------------
const toggleButton = document.getElementById('toggle-doc');
const daycareItemContainer = toggleButton.closest('.daycare-item-container');

// Añadir un evento de click para activar/desactivar la clase "active"
toggleButton.addEventListener('click', function() {
    daycareItemContainer.classList.toggle('active');
});
