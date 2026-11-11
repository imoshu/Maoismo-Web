document.addEventListener("DOMContentLoaded", function () {
  const contenedorJuego = document.querySelector(".zona-juego");
  if (!contenedorJuego) return;

  contenedorJuego.innerHTML = `
    <div class="linea-tiempo">
      <div class="linea-tiempo__barra"></div>
      <div class="linea-tiempo__progreso" id="lineaProgreso"></div>
      <div class="linea-tiempo__jugador" id="lineaJugador"></div>
      
      <div class="linea-tiempo__hito" style="left: 15%; position: absolute;">
        <div class="linea-tiempo__punto"></div>
        <span class="linea-tiempo__fecha">1949</span>
      </div>
      <div class="linea-tiempo__hito" style="left: 40%; position: absolute;">
        <div class="linea-tiempo__punto"></div>
        <span class="linea-tiempo__fecha">1958</span>
      </div>
      <div class="linea-tiempo__hito" style="left: 65%; position: absolute;">
        <div class="linea-tiempo__punto"></div>
        <span class="linea-tiempo__fecha">1966</span>
      </div>
      <div class="linea-tiempo__hito" style="left: 90%; position: absolute;">
        <div class="linea-tiempo__punto"></div>
        <span class="linea-tiempo__fecha">1966-1967</span>
      </div>
    </div>

    <div class="escenario-museo" id="escenario">
      <div class="obra-museo" style="left: 350px;" data-titulo="La Reforma Agraria (1949)" data-texto="texto...">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">Reforma Agraria</span>
      </div>

      <div class="obra-museo" style="left: 950px;" data-titulo="El Gran Salto Adelante (1958)" data-texto="texto...">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">Gran Salto Adelante</span>
      </div>

      <div class="obra-museo" style="left: 1550px;" data-titulo="La Revolución Cultural (1966)" data-texto="texto...">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">Revolución Cultural</span>
      </div>

      <div class="obra-museo" style="left: 2150px;" data-titulo="Las Guardias Rojas (1966–1967)" data-texto="texto...">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">Guardias Rojas</span>
      </div>

      <div class="personaje-mao" id="personaje">
        <img src="assets/img/mao_cuerpo.png" alt="Mao Zedong">
      </div>
    </div>

    <div class="modal-info" id="modalInfo">
      <h3 class="modal-info__titulo" id="modalTitulo">Título de la Obra</h3>
      <div class="modal-info__texto" id="modalTexto">texto...</div>
      <button class="modal-info__cerrar" id="btnCerrarModal">Cerrar</button>
    </div>
  `;

  const personaje = document.getElementById("personaje");
  const escenario = document.getElementById("escenario");
  const modalInfo = document.getElementById("modalInfo");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalTexto = document.getElementById("modalTexto");
  const btnCerrarModal = document.getElementById("btnCerrarModal");

  const lineaProgreso = document.getElementById("lineaProgreso");
  const lineaJugador = document.getElementById("lineaJugador");
  const hitos = document.querySelectorAll(".linea-tiempo__hito");

  let posX = 100;
  const velocidad = 15;
  const limiteIzquierdo = 50;
  const limiteDerecho = 2200;
  let modalAbierto = false;
  let temporizadorMovimiento = null;

  const obras = Array.from(document.querySelectorAll(".obra-museo"));

  // Distancia (en px) entre el centro de Mao y el centro del cuadro para poder interactuar
  const DISTANCIA_INTERACCION = 160;

  function estaCerca(obra) {
    const obraX = parseInt(obra.style.left, 10);
    const centroPersonaje = posX + personaje.offsetWidth / 2;
    const centroObra = obraX + obra.offsetWidth / 2;
    return Math.abs(centroPersonaje - centroObra) < DISTANCIA_INTERACCION;
  }

  window.addEventListener("keydown", function (e) {
    const target = e.target;
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

    if (modalAbierto) {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        cerrarModal();
      }
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      e.preventDefault();
      posX = Math.min(limiteDerecho, posX + velocidad);
      activarMovimiento();
      actualizarPosicion();
    } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      e.preventDefault();
      posX = Math.max(limiteIzquierdo, posX - velocidad);
      activarMovimiento();
      actualizarPosicion();
    }
  });

  // Solo se puede hacer clic en un cuadro si Mao está cerca de él
  obras.forEach(function (obra) {
    obra.addEventListener("click", function () {
      if (estaCerca(obra)) {
        abrirModal(obra);
      }
    });
  });

  function activarMovimiento() {
    personaje.classList.add("andando");
    clearTimeout(temporizadorMovimiento);
    temporizadorMovimiento = setTimeout(function () {
      personaje.classList.remove("andando");
    }, 150);
  }

  function actualizarPosicion() {
    personaje.style.left = posX + "px";

    const centroVisor = contenedorJuego.clientWidth / 2;
    let camaraX = centroVisor - posX - personaje.offsetWidth / 2;
    camaraX = Math.min(0, Math.max(contenedorJuego.clientWidth - 2400, camaraX));
    escenario.style.transform = `translateX(${camaraX}px)`;

    const porcentajeAvance = ((posX - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;
    lineaJugador.style.left = porcentajeAvance + "%";
    lineaProgreso.style.width = porcentajeAvance + "%";

    const posicionesHitos = [15, 40, 65, 90];
    hitos.forEach((hito, index) => {
      if (porcentajeAvance >= posicionesHitos[index] - 5) {
        hito.classList.add("activo");
      } else {
        hito.classList.remove("activo");
      }
    });

    verificarCercaniaObras();
  }

  function verificarCercaniaObras() {
    obras.forEach(function (obra) {
      if (estaCerca(obra)) {
        obra.classList.add("cerca");
        obra.style.cursor = "pointer";
      } else {
        obra.classList.remove("cerca");
        obra.style.cursor = "default";
      }
    });
  }

  function abrirModal(obra) {
    modalAbierto = true;
    modalTitulo.textContent = obra.dataset.titulo;
    modalTexto.textContent = obra.dataset.texto;
    modalInfo.classList.add("activo");
  }

  function cerrarModal() {
    modalAbierto = false;
    modalInfo.classList.remove("activo");
  }

  btnCerrarModal.addEventListener("click", cerrarModal);

  // Estado inicial: posiciona cámara, línea de tiempo y carteles
  actualizarPosicion();
});