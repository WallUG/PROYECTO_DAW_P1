//Primera funcion que se ejecuta al cargar la pagina y se ejecuta una sola vez mensaje de bienvenida
function Mi_pagina() {
  console.log("Bienvenido a mi sitio web");
}

//Llamamos a la funcion que se ejecuta al cargar la pagina
document.addEventListener("DOMContentLoaded", Mi_pagina);

//Segunda funcion que se ejecuta al cargar la pagina configurar modo claro u oscuro
const btnTema = document.querySelector(".boton-modo");
//El evento click se activa cuando el usuario hace clic en el botón
//Añadimos un evento click al botón para cambiar el tema
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('light');

  const esModoClaro = document.body.classList.contains('light');
  //con el metodo textContent cambio el texto del boton dependiendo del modo
  btnTema.textContent = esModoClaro ? '🌙 Modo oscuro' : '☀️ Modo claro';

  // Guardar preferencia
  //El localStorage es un objeto que permite almacenar datos en el navegador de forma persistente, incluso después de cerrar la pestaña o el navegador. Es una forma sencilla de guardar información en el lado del cliente sin necesidad de un servidor.
  localStorage.setItem('tema', esModoClaro ? 'light' : 'dark');
});

function aplicarTemaGuardado() {
  const temaGuardado = localStorage.getItem('tema');
  //Si el tema guardado es 'light', se aplica el modo claro, de lo contrario se asegura de que el modo oscuro esté activo
    if (temaGuardado === 'light') {
        document.body.classList.add('light');
        btnTema.textContent = '🌙 Modo oscuro'
        } else {
            document.body.classList.remove('light')
            btnTema.textContent = '☀️ Modo claro'
            }
}

document.addEventListener('DOMContentLoaded', aplicarTemaGuardado);

//Como guardar los mensajes en el scripts_mensajes.js y mostrarlos en el index.html??
//De momento hasta que hablemos de conectar una db, lo are con el localStore.
//Funcion para recuperar los mensjes del LocalStore y mostrarlos en el index.html
let opiniones = JSON.parse(localStorage.getItem('opiniones')) || []; // Cargar opiniones guardadas o iniciar un arreglo vacío
let opinionesGuardadas = JSON.parse(localStorage.getItem('opiniones')) || [];
opiniones = opinionesGuardadas; // Asignar las opiniones guardadas al arreglo de opiniones
console.log(opiniones);

// Agrega esta función (o modifica la que ya tienes) en scripts_system.js
function mostrarMensajes() {
  const contenedor = document.querySelector("#lista-mensajes");
  if (!contenedor) return; 

  contenedor.innerHTML = ""; // Limpiar antes de pintar

  const mensajesGuardados = JSON.parse(localStorage.getItem('opiniones')) || [];

  if (mensajesGuardados.length === 0) {
    contenedor.innerHTML = "<div class='mensaje-item'>Aún no hay opiniones. ¡Sé el primero!</div>";
    return;
  }

  // Recorrer los mensajes y crear el formato "Nombre: mensaje"
  mensajesGuardados.forEach(opinion => {
    const div = document.createElement("div");
    div.classList.add("mensaje-item");
    
    // Suponiendo que el formato sea "Juan: Me encantó la película"
    div.innerHTML = `<span>${opinion.nombre}:</span> ${opinion.mensaje}`;
    
    contenedor.appendChild(div);
  });
}

// Asegurarnos de que se ejecute al cargar la página
document.addEventListener('DOMContentLoaded', mostrarMensajes);

const nombre = document.querySelector("#nombre");
const mensaje = document.querySelector("#comentario");

//Funcion para guardar los mensajes en el arreglo de objetos
function guardarOpinion() {
  const nuevaOpinion = {
    nombre: nombre.value,
    mensaje: mensaje.value
  };
  //Guardamos en el localStorage
    opiniones.push(nuevaOpinion);
    console.log(opiniones);
    localStorage.setItem('opiniones', JSON.stringify(opiniones));
}

//Funcion para validar el formulario y mostrar mensajes de error o exito
function validarFormulario(evento) {
  evento.preventDefault();
    if (nombre.value === "" || mensaje.value === "") {
    mostrarError("Todos los campos son obligatorios");
    return;
  }
    guardarOpinion();
    mostrarOK("Mensaje enviado correctamente");
}

//Evento submit para validar el formulario al enviarlo
const formulario = document.querySelector(".contenedor-formulario");
formulario.addEventListener("submit", validarFormulario);


function mostrarError(mensaje) {
  const error = document.createElement("P");
  error.textContent = mensaje;
  error.classList.add("error");
  formulario.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
}

function mostrarOK(mensaje) {
  const correcto = document.createElement("P");
  correcto.textContent = mensaje;
  correcto.classList.add("correcto");
  formulario.appendChild(correcto);

  setTimeout(() => {
    correcto.remove();
  }, 5000);
}
