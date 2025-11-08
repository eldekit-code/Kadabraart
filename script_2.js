// ====== ZOOM DE IMÁGENES CON SCROLL AL CURSOR ======
const imagenes = document.querySelectorAll('.zoomable');


imagenes.forEach(img => {
  img.addEventListener('click', () => {
    try {
      sonido.currentTime = 0;
      sonido.play();
    } catch (e) {
      console.log("Error al reproducir el sonido:", e);
    }
    // Crear overlay de fondo negro
    const fondo = document.createElement('div');
    fondo.classList.add('zoomed-bg');
    document.body.appendChild(fondo);

    // Crear contenedor de la imagen
    const overlay = document.createElement('div');
    overlay.classList.add('zoomed');

    const zoomImg = document.createElement('img');
    zoomImg.src = img.src;
    zoomImg.alt = img.alt;
    overlay.appendChild(zoomImg);
    document.body.appendChild(overlay);

    // Activar transiciones
    setTimeout(() => {
      fondo.classList.add('active');
      overlay.classList.add('active');
    }, 10);

    // Escala inicial
    let scale = 1;
    zoomImg.style.transform = `scale(${scale})`;
    zoomImg.style.transformOrigin = 'center center';

    // Manejar zoom con scroll
    const hacerZoom = (e) => {
      e.preventDefault();

      // Calcular posición relativa del cursor sobre la imagen
      const rect = zoomImg.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const originX = (offsetX / rect.width) * 100;
      const originY = (offsetY / rect.height) * 100;

      zoomImg.style.transformOrigin = `${originX}% ${originY}%`;

      // Ajustar escala
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      scale += delta;
      if (scale < 0.5) scale = 0.5;
      if (scale > 7.5) scale = 7.5;

      zoomImg.style.transform = `scale(${scale})`;
    };

    overlay.addEventListener('wheel', hacerZoom);

    // Cerrar al hacer click en el fondo o la imagen
    const cerrar = () => {
      overlay.classList.remove('active');
      fondo.classList.remove('active');
      overlay.removeEventListener('wheel', hacerZoom);

      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
      fondo.addEventListener('transitionend', () => fondo.remove(), { once: true });
    };

    fondo.addEventListener('click', cerrar);
    overlay.addEventListener('click', cerrar);
  });
});



