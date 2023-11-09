//crea elemento
const video = document.createElement("video");

//nuestro camvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

//div donde llegara nuestro canvas
const btnScanQR = document.getElementById("btn-scan-qr");

//lectura desactivada
let scanning = false;

//funcion para encender la camara
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

//funciones para levantar las funiones de encendido de la camara
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

//apagara la camara
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById('audioScaner');
  audio.play();
}


/*qrcode.callback = (respuesta) => {
  if (respuesta) {
    console.log(respuesta);

    const regexNumero = /\(\d{3}\)\d{3}-\d{4}/;
    const numeroEncontrado = respuesta.match(regexNumero);

    if (numeroEncontrado) {
      const numeroDeTelefono = numeroEncontrado[0].replace(/\D/g, '');
      console.log(numeroDeTelefono);

      activarSonido();
      cerrarCamara();

      const mensaje = encodeURIComponent("El alumno con los siguientes datos ingresó a la institución: " + respuesta);
      const urlWhatsApp = `https://wa.me/${numeroDeTelefono}?text=${mensaje}`;

      // Crea un enlace dinámico para abrir WhatsApp en una nueva pestaña
      const enlaceWhatsApp = document.createElement('a');
      enlaceWhatsApp.href = urlWhatsApp;
      enlaceWhatsApp.target = '_blank';
      enlaceWhatsApp.click();

      // Después de un tiempo (por ejemplo, 5 segundos), vuelve a la cámara
      setTimeout(() => {
        encenderCamara();
      }, 5000); // Tiempo en milisegundos (5000ms = 5 segundos)
    } else {
      console.log("Número de teléfono no encontrado en el código QR.");
    }
  }
};*/

//FUNCIONAL
/*qrcode.callback = (respuesta) => {
  if (respuesta) {
    console.log(respuesta); // Este es el contenido del código QR

    // Analizar la cadena de respuesta para obtener el número de teléfono
    const partes = respuesta.split(','); // Dividir la cadena en partes usando la coma como separador

    let numeroDeTelefono = ''; // Variable para almacenar el número de teléfono

    // Iterar a través de las partes para encontrar la información del teléfono
    partes.forEach(part => {
      if (part.includes('Telefono')) { // Si la parte incluye 'Telefono'
        // Extraer el número de teléfono
        const infoTelefono = part.split(':')[1].trim(); // Obtener el valor después de ':' y limpiar espacios
        numeroDeTelefono = infoTelefono;
      }
    });

    // Resto del código para enviar el mensaje de WhatsApp
    const mensaje = encodeURIComponent("El alumno con los siguientes datos ingresó a la institución " + respuesta);

    // Construye la URL de WhatsApp
    window.location.replace(`https://wa.me/${numeroDeTelefono}?text=${mensaje}`);

    // Cierra la cámara después de enviar el mensaje de WhatsApp
    cerrarCamara();
  }
};*/


qrcode.callback = (respuesta) => {
  if (respuesta) {
    console.log(respuesta); // Este es el contenido del código QR

    // Analizar la cadena de respuesta para obtener el número de teléfono
    const partes = respuesta.split(','); // Dividir la cadena en partes usando la coma como separador

    let numeroDeTelefono = ''; // Variable para almacenar el número de teléfono

    // Iterar a través de las partes para encontrar la información del teléfono
    partes.forEach(part => {
      if (part.includes('Telefono')) { // Si la parte incluye 'Telefono'
        // Extraer el número de teléfono
        const infoTelefono = part.split(':')[1].trim(); // Obtener el valor después de ':' y limpiar espacios
        numeroDeTelefono = infoTelefono;
      }
    });

    // Si se encontró un número de teléfono, construir el mensaje y redirigir a WhatsApp
    if (numeroDeTelefono) {
      const mensaje = encodeURIComponent("El alumno con los siguientes datos ingresó a la institución " + respuesta);
      const urlWhatsApp = `https://wa.me/${numeroDeTelefono}?text=${mensaje}`;
      
      // Construir la URL de WhatsApp, pero no redirigir automáticamente
      // en su lugar, puedes abrir la URL en una nueva pestaña o ventana
      window.open(urlWhatsApp, '_blank');
    }
    
    // Reanudar la lectura del código QR manteniendo la cámara encendida
    setTimeout(() => {
      encenderCamara();
    }, 3000); // Espera 3 segundos antes de reiniciar la cámara, puedes ajustar este tiempo según tus necesidades
  }
};

//evento para mostrar la camara sin el boton 
window.addEventListener('load', (e) => {
  encenderCamara();
})
