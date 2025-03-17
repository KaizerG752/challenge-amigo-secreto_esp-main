// Array donde se almacenarán los nombres
let nombres = [];

// Función para agregar un nombre a la lista
function agregarNombre() {
    let nombreInput = document.getElementById("amigo"); // Captura el input
    let nombre = nombreInput.value.trim(); // Elimina espacios extra

    if (nombre) {
        nombres.push(nombre); // Agrega el nombre al array
        actualizarLista(); // Muestra la lista en pantalla
        nombreInput.value = ""; // Limpia el input después de agregar
    }
}

// Función para actualizar la lista en la pantalla
function actualizarLista() {
    let lista = document.getElementById("listaAmigos"); 
    lista.innerHTML = ""; // Limpia la lista antes de actualizar

    nombres.forEach((nombre, index) => {
        let li = document.createElement("li");
        li.textContent = `${index + 1}. ${nombre}`; // Asigna número al nombre
        lista.appendChild(li);
        // permite Ocultar el nombre después de 0 segundos
        setTimeout(() => {
            li.textContent = `${index + 1}. ********`; // Reemplazar con asteriscos
        }, 300);
    });
}
// Detectar clic en el botón "Añadir"
document.querySelector(".button-add").addEventListener("click", agregarNombre);
// Permitir agregar nombres con la tecla "Enter"
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarNombre();
    }
});

function sortearAmigo() {
    if (nombres.length === 0) {
        document.getElementById("resultado").textContent = "⚠️ No hay nombres en la lista.";
        return;
    }

    let resultado = document.getElementById("resultado");
    let tiempoTotal = 3000; // Duración total del efecto en milisegundos (3 segundos)
    let intervalo = 100; // Tiempo entre cambios de nombres (100ms)
    let tiempoTranscurrido = 0;

    let animacion = setInterval(() => {
        let nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
        resultado.textContent = "🎡 " + nombreAleatorio; // Muestra el nombre en pantalla
        tiempoTranscurrido += intervalo;

        if (tiempoTranscurrido >= tiempoTotal) {
            clearInterval(animacion); // Detiene la animación
            let indice = Math.floor(Math.random() * nombres.length);
            let nombreSorteado = nombres[indice]; // Selecciona el nombre definitivo
            resultado.textContent = "🎉 Tu Amigo Secreto es: " + nombreSorteado;
        }
    }, intervalo);
}

// Escuchar clic en el botón "Sortea Tu Amigo Secreto"
document.querySelector(".button-draw").addEventListener("click", sortearAmigo);

function borrarResultado() {
    let resultado = document.getElementById("resultado");
    
    if (resultado.textContent !== "") {
        let nombreSorteado = resultado.textContent.replace("🎉 Tu Amigo Secreto es: ", "").trim();
        let index = nombres.indexOf(nombreSorteado);

        if (index !== -1) {
            nombres.splice(index, 1); // Elimina el nombre sorteado de la lista
            actualizarLista(true); // Oculta los nombres restantes con ***
        }

        resultado.textContent = ""; // Borra el resultado en pantalla
    }
}

function reiniciarSorteo() {
    if (nombres.length > 0) {
        let confirmacion = confirm("¿Estás seguro de reiniciar el sorteo? Se borrarán todos los nombres.");
        if (confirmacion) {
            nombres = []; // Vacía la lista
            actualizarLista();
            document.getElementById("resultado").textContent = ""; // Borra el resultado
        }
    }
}
