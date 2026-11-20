(function () {
  "use strict";

  const cortinas = Array.from(document.querySelectorAll(".cortina"));
  const sinHover = window.matchMedia("(hover: none)");

  cortinas.forEach(function (cortina) {
    const imagen = cortina.dataset.miniatura;
    if (imagen) {
      const rutaCompleta = new URL(imagen, document.baseURI).href;
      cortina.style.setProperty("--miniatura", 'url("' + rutaCompleta + '")');
    }

    cortina.addEventListener("click", function (e) {
      if (sinHover.matches && !cortina.classList.contains("abierta")) {
        e.preventDefault();
        cortinas.forEach(function (otra) {
          otra.classList.toggle("abierta", otra === cortina);
        });
      }
    });
  });
})();
