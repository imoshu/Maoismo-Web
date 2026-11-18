document.addEventListener("DOMContentLoaded", function () {
  const contenedorJuego = document.querySelector(".zona-juego");
  if (!contenedorJuego) return;

  const OBRAS = [
    {
      left: 350,
      titulo: "La Reforma Agraria (1949)",
      texto: "texto...",
      nombre: "Reforma Agraria",
      zh: "土地改革",
      es: "La tierra para quien la trabaja"
    },
    {
      left: 950,
      titulo: "El Gran Salto Adelante (1958)",
      texto: "texto...",
      nombre: "Gran Salto Adelante",
      zh: "大跃进",
      es: "Más, más rápido, mejor y más barato"
    },
    {
      left: 1550,
      titulo: "La Revolución Cultural (1966)",
      texto: "texto...",
      nombre: "Revolución Cultural",
      zh: "文化大革命",
      es: "Gran Revolución Cultural Proletaria"
    },
    {
      left: 2150,
      titulo: "Las Guardias Rojas (1966–1967)",
      texto: "texto...",
      nombre: "Guardias Rojas",
      zh: "红卫兵",
      es: "Rebelarse está justificado"
    }
  ];

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  const faroles = Array.from({ length: 8 }, function (_, i) {
    return `<div class="farol" style="left:${20 + i * 240}px; animation-delay:${(i * 0.7).toFixed(1)}s"></div>`;
  }).join("");

  const ventanas = Array.from({ length: 6 }, function (_, i) {
    return `<div class="ventana" style="left:${140 + i * 330}px"></div>`;
  }).join("");

  const chimeneas = [
    [200, 150], [330, 210], [600, 120], [760, 190],
    [1100, 230], [1250, 140], [1500, 200], [1700, 160]
  ].map(function (c, i) {
    return `<div class="chimenea" style="left:${c[0]}px; height:${c[1]}px; --retraso:${i * 0.9}s"></div>`;
  }).join("");

  const columnasX = [40, 2338];
  [720, 1320, 1920].forEach(function (centro) {
    columnasX.push(centro - 150 - 22, centro + 150 - 22);
  });
  const columnas = columnasX.map(function (x) {
    return `<div class="columna" style="left:${x}px"></div>`;
  }).join("");

  const pergaminos = OBRAS.map(function (o) {
    return `
      <div class="pergamino" style="left:${o.left - 50}px">
        <span class="pergamino__zh">${o.zh}</span>
        <span class="pergamino__es">${o.es}</span>
      </div>`;
  }).join("");

  const cuadros = OBRAS.map(function (o) {
    return `
      <div class="obra-museo" style="left: ${o.left}px;" data-titulo="${esc(o.titulo)}" data-texto="${esc(o.texto)}">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">${o.nombre}</span>
      </div>`;
  }).join("");

  contenedorJuego.dataset.epoca = "0";

  contenedorJuego.innerHTML = `
    <div class="fondo-lejano" id="fondoLejano">
      <div class="tinte tinte--0"></div>
      <div class="tinte tinte--1"></div>
      <div class="tinte tinte--2"></div>
      <div class="tinte tinte--3"></div>

      <div class="motivo motivo--campo"></div>
      <div class="motivo motivo--industria">${chimeneas}</div>
      <div class="motivo motivo--sol">
        <div class="sol"></div>
        <div class="estrella-grande"></div>
      </div>

      <div class="fondo__paneles"></div>
      <div class="fondo__zocalo"></div>
      ${ventanas}
      <div class="fondo__viga"></div>
      ${faroles}
    </div>

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
      ${columnas}
      ${pergaminos}
      <div class="alfombra"></div>
      ${cuadros}

      <div class="personaje-mao" id="personaje">
        <img src="assets/img/mao_cuerpo.png" alt="Mao Zedong">
      </div>
    </div>

    <div class="vineta-museo"></div>

    <div class="modal-info" id="modalInfo">
      <h3 class="modal-info__titulo" id="modalTitulo">Título de la Obra</h3>
      <div class="modal-info__texto" id="modalTexto">texto...</div>
      <button class="modal-info__cerrar" id="btnCerrarModal">Cerrar</button>
    </div>
  `;

  const personaje = document.getElementById("personaje");
  const escenario = document.getElementById("escenario");
  const fondoLejano = document.getElementById("fondoLejano");
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

  const FACTOR_PARALLAX = 0.4;

  const obras = Array.from(document.querySelectorAll(".obra-museo"));

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
    fondoLejano.style.transform = `translateX(${camaraX * FACTOR_PARALLAX}px)`;

    const porcentajeAvance = ((posX - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;
    lineaJugador.style.left = porcentajeAvance + "%";
    lineaProgreso.style.width = porcentajeAvance + "%";

    const posicionesHitos = [15, 40, 65, 90];
    let epoca = 0;
    hitos.forEach((hito, index) => {
      if (porcentajeAvance >= posicionesHitos[index] - 5) {
        hito.classList.add("activo");
        epoca = index;
      } else {
        hito.classList.remove("activo");
      }
    });
    contenedorJuego.dataset.epoca = String(epoca);

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

  actualizarPosicion();
});