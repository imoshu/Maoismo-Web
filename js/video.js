(function () {
  "use strict";

  const cortinas = Array.from(document.querySelectorAll(".cortina"));
  const sinHover = window.matchMedia("(hover: none)");

  function idDeYoutube(enlace) {
    try {
      const url = new URL(enlace);
      if (url.hostname.indexOf("youtu.be") !== -1) return url.pathname.slice(1) || null;
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const partes = url.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
      return partes ? partes[2] : null;
    } catch (e) {
      return null;
    }
  }

  cortinas.forEach(function (cortina) {
    const id = idDeYoutube(cortina.href);
    const imagen = cortina.dataset.miniatura || (id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : null);
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
