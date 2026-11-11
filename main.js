(function () {
  "use strict";

  const carril = document.querySelector(".carril");
  const secciones = Array.from(document.querySelectorAll(".seccion"));
  const enlaces = Array.from(document.querySelectorAll(".vinetas a"));

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURACION = reducirMovimiento ? 50 : 900;
  const PAUSA_GESTO = 180;
  const UMBRAL_TACTIL = 50;

  let actual = -1;
  let bloqueado = false;
  let temporizador = null;

  function indicePorHash(hash) {
    const id = (hash || "").replace("#", "");
    const i = secciones.findIndex(function (s) { return s.id === id; });
    return i === -1 ? 0 : i;
  }

  function irA(indice, opciones) {
    opciones = opciones || {};
    const destino = Math.max(0, Math.min(secciones.length - 1, indice));
    if (destino === actual) return;

    actual = destino;
    carril.style.setProperty("--i", destino);

    secciones.forEach(function (s, i) {
      const activa = i === destino;
      s.classList.toggle("activa", activa);
      if (activa) s.removeAttribute("inert");
      else s.setAttribute("inert", "");
    });

    enlaces.forEach(function (a, i) {
      a.setAttribute("aria-current", i === destino ? "true" : "false");
    });

    if (opciones.actualizarHash !== false) {
      history.replaceState(null, "", "#" + secciones[destino].id);
    }

    bloqueado = true;
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { bloqueado = false; }, DURACION);
  }

  function siguiente() { irA(actual + 1); }
  function anterior() { irA(actual - 1); }

  function puedeDesplazarDentro(objetivo, direccion) {
    let el = objetivo instanceof Element ? objetivo : null;
    while (el && !el.classList.contains("seccion")) {
      if (el.classList.contains("desplazable") && el.scrollHeight > el.clientHeight + 1) {
        if (direccion > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
        if (direccion < 0 && el.scrollTop > 0) return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  let ultimaRueda = 0;
  let ultimaFuerza = 0;

  window.addEventListener("wheel", function (e) {
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : 0;
    if (delta === 0) return;

    const direccion = Math.sign(delta);
    if (puedeDesplazarDentro(e.target, direccion)) return;

    e.preventDefault();

    const ahora = performance.now();
    const pausa = ahora - ultimaRueda;
    const fuerza = Math.abs(delta);
    const gestoNuevo = pausa > PAUSA_GESTO || fuerza > ultimaFuerza * 1.6 + 4;

    ultimaRueda = ahora;
    ultimaFuerza = fuerza;

    if (bloqueado || !gestoNuevo) return;

    if (direccion > 0) siguiente();
    else anterior();
  }, { passive: false });

  window.addEventListener("keydown", function (e) {
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    let accion = null;
    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        accion = siguiente; break;
      case "ArrowUp":
      case "PageUp":
        accion = anterior; break;
      case " ":
        accion = e.shiftKey ? anterior : siguiente; break;
      case "Home":
        accion = function () { irA(0); }; break;
      case "End":
        accion = function () { irA(secciones.length - 1); }; break;
    }

    if (!accion) return;
    const direccion = accion === anterior ? -1 : 1;
    if (puedeDesplazarDentro(t, direccion)) return;

    e.preventDefault();
    if (!bloqueado) accion();
  });

  let toqueInicioY = null;
  let toqueObjetivo = null;

  window.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { toqueInicioY = null; return; }
    toqueInicioY = e.touches[0].clientY;
    toqueObjetivo = e.target;
  }, { passive: true });

  window.addEventListener("touchmove", function (e) {
    if (toqueInicioY === null) return;
    const direccion = toqueInicioY - e.touches[0].clientY > 0 ? 1 : -1;
    if (!puedeDesplazarDentro(toqueObjetivo, direccion)) e.preventDefault();
  }, { passive: false });

  window.addEventListener("touchend", function (e) {
    if (toqueInicioY === null) return;
    const diferencia = toqueInicioY - e.changedTouches[0].clientY;
    const objetivo = toqueObjetivo;
    toqueInicioY = null;

    if (Math.abs(diferencia) < UMBRAL_TACTIL || bloqueado) return;
    const direccion = diferencia > 0 ? 1 : -1;
    if (puedeDesplazarDentro(objetivo, direccion)) return;

    if (direccion > 0) siguiente();
    else anterior();
  }, { passive: true });

  enlaces.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      irA(Number(a.dataset.index));
    });
  });

  window.addEventListener("hashchange", function () {
    irA(indicePorHash(location.hash), { actualizarHash: false });
  });

  carril.classList.add("sin-transicion");
  irA(indicePorHash(location.hash), { actualizarHash: false });
  bloqueado = false;
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { carril.classList.remove("sin-transicion"); });
  });
})();
