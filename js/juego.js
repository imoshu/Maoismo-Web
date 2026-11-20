document.addEventListener("DOMContentLoaded", function () {
  const contenedorJuego = document.querySelector(".zona-juego");
  if (!contenedorJuego) return;

  // ============================================================
  // DATOS DE LAS OBRAS
  // Aquí se editan los textos y los videos de cada cuadro.
  // Para el video: reemplaza el link por el de YouTube
  // (watch?v=..., youtu.be/... o embed/...).
  // ============================================================
  const VIDEO_POR_DEFECTO = "https://www.youtube.com";

  const OBRAS = [
    {
      left: 350,
      fecha: "Introducción",
      titulo: "Mao Zedong: una figura que divide",
      nombre: "Una figura que divide",
      zh: "毛泽东",
      es: "Una figura, dos miradas",
      texto:
        "Mao Zedong lideró la revolución comunista y gobernó China desde 1949 hasta su muerte en 1976. " +
        "Su proyecto buscaba construir una sociedad socialista y convertir al país en una potencia independiente, " +
        "pero también dejó decisiones económicas desastrosas, persecuciones y millones de víctimas. " +
        "De ahí nace la pregunta: ¿cómo transformó el maoísmo a China?",
      video: "https://youtu.be/428uKL1zbLE" // Persona 1
    },
    {
      left: 950,
      fecha: "1911–1949",
      titulo: "Del Imperio a la República Popular",
      nombre: "Del Imperio a la República",
      zh: "新中国",
      es: "El nacimiento de la Nueva China",
      texto:
        "En 1911 cayó la dinastía Qing y China quedó sumida en la inestabilidad y la pobreza campesina. " +
        "En 1921 nació el Partido Comunista, y Mao propuso que los campesinos, y no solo los obreros, fueran el motor de la revolución. " +
        "Tras la guerra civil contra el Kuomintang, el 1 de octubre de 1949 proclamó la República Popular China.",
      video: "https://youtu.be/NY6fARBSres" // Persona 2
    },
    {
      left: 1550,
      fecha: "Desde 1949",
      titulo: "Reformar la tierra y la sociedad",
      nombre: "Tierra y sociedad",
      zh: "为人民服务",
      es: "Servir al pueblo",
      texto:
        "El nuevo gobierno redistribuyó la tierra entre los campesinos, nacionalizó la industria y la banca, " +
        "y amplió la educación, la salud y los derechos de las mujeres con la Ley de Matrimonio de 1950. " +
        "Pero el proceso vino con violencia contra los propietarios y con un Partido que concentró el poder y castigó la oposición.",
      video: VIDEO_POR_DEFECTO // Persona 3 (falta el link)
    },
    {
      left: 2150,
      fecha: "1958",
      titulo: "El Gran Salto Adelante",
      nombre: "Gran Salto Adelante",
      zh: "大跃进",
      es: "Más, más rápido, mejor y más barato",
      texto:
        "En 1958 Mao quiso convertir a China en una potencia industrial en muy poco tiempo. " +
        "Millones de campesinos fueron agrupados en comunas populares y se instalaron pequeños hornos para producir acero. " +
        "Las cifras exageradas y los errores agrícolas provocaron, entre 1959 y 1961, una de las peores hambrunas de la historia, con decenas de millones de muertes.",
      video: "https://www.youtube.com/watch?v=6sMCs4CELus" // Persona 4
    },
    {
      left: 2750,
      fecha: "1966",
      titulo: "La Revolución Cultural",
      nombre: "Revolución Cultural",
      zh: "文化大革命",
      es: "Gran Revolución Cultural Proletaria",
      texto:
        "Tras el fracaso del Gran Salto, Mao inició en 1966 una campaña para recuperar el control político y transformar la cultura y la manera de pensar. " +
        "Movilizó a los jóvenes Guardias Rojos, que seguían el Libro Rojo y denunciaron a profesores e intelectuales. " +
        "Hubo persecución, destrucción del patrimonio y una generación sin estudios, hasta 1976, año en que murió Mao.",
      video: VIDEO_POR_DEFECTO // Persona 5 (falta el link)
    }
  ];

  // ============================================================
  // MEDIDAS DEL ESCENARIO
  // ============================================================
  const ANCHO_ESCENARIO = 3000;

  // ============================================================
  // DECORADO (se genera con código)
  // ============================================================
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

  // Columnas: una en cada extremo y dos flanqueando el pasillo entre cada par de cuadros
  const columnasX = [40, ANCHO_ESCENARIO - 62];
  for (let i = 0; i < OBRAS.length - 1; i++) {
    const centro = (OBRAS[i].left + OBRAS[i + 1].left) / 2 + 70;
    columnasX.push(centro - 150 - 22, centro + 150 - 22);
  }
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

  const cuadros = OBRAS.map(function (o, i) {
    return `
      <div class="obra-museo" style="left: ${o.left}px;" data-indice="${i}">
        <span class="obra-museo__indicador">Haz clic</span>
        <div style="width: 100%; height: 80px; background: #3a0a0a; border: 1px dashed var(--crema-suave);"></div>
        <span class="obra-museo__titulo">${o.nombre}</span>
      </div>`;
  }).join("");

  const hitosHTML = OBRAS.map(function (o) {
    return `
      <div class="linea-tiempo__hito">
        <div class="linea-tiempo__punto"></div>
        <span class="linea-tiempo__fecha">${o.fecha}</span>
      </div>`;
  }).join("");

  contenedorJuego.dataset.epoca = "0";

  contenedorJuego.innerHTML = `
    <!-- Fondo lejano (parallax) -->
    <div class="fondo-lejano" id="fondoLejano">
      <div class="tinte tinte--0"></div>
      <div class="tinte tinte--1"></div>
      <div class="tinte tinte--2"></div>
      <div class="tinte tinte--3"></div>
      <div class="tinte tinte--4"></div>

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
      ${hitosHTML}
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

    <div class="modal-info" id="modalInfo" role="dialog" aria-modal="true" aria-labelledby="modalTitulo">
      <div class="modal-info__cabecera">
        <div>
          <span class="modal-info__fecha" id="modalFecha"></span>
          <h3 class="modal-info__titulo" id="modalTitulo"></h3>
        </div>
        <button class="modal-info__cerrar" id="btnCerrarModal">Cerrar</button>
      </div>
      <div class="modal-info__texto desplazable" id="modalTexto"></div>
      <div class="modal-info__video" id="modalVideo"></div>
    </div>
  `;

  const personaje = document.getElementById("personaje");
  const escenario = document.getElementById("escenario");
  const fondoLejano = document.getElementById("fondoLejano");
  const modalInfo = document.getElementById("modalInfo");
  const modalFecha = document.getElementById("modalFecha");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalTexto = document.getElementById("modalTexto");
  const modalVideo = document.getElementById("modalVideo");
  const btnCerrarModal = document.getElementById("btnCerrarModal");

  const lineaProgreso = document.getElementById("lineaProgreso");
  const lineaJugador = document.getElementById("lineaJugador");
  const hitos = Array.from(document.querySelectorAll(".linea-tiempo__hito"));

  escenario.style.width = ANCHO_ESCENARIO + "px";

  let posX = 100;
  const velocidad = 15;
  const limiteIzquierdo = 50;
  const limiteDerecho = 2750;
  let modalAbierto = false;
  let temporizadorMovimiento = null;

  // El fondo lejano se mueve a esta fracción de la velocidad de la cámara (efecto parallax)
  const FACTOR_PARALLAX = 0.4;

  const obras = Array.from(document.querySelectorAll(".obra-museo"));

  // Distancia (en px) entre el centro de Mao y el centro del cuadro para poder interactuar
  const DISTANCIA_INTERACCION = 160;

  // Un hito se activa un poco antes de llegar a su cuadro (en % de la línea)
  const MARGEN_HITO = 8;

  function estaCerca(obra) {
    const obraX = parseInt(obra.style.left, 10);
    const centroPersonaje = posX + personaje.offsetWidth / 2;
    const centroObra = obraX + obra.offsetWidth / 2;
    return Math.abs(centroPersonaje - centroObra) < DISTANCIA_INTERACCION;
  }

  // Posición (en %) de cada hito: justo donde Mao queda centrado frente a su cuadro
  const posicionesHitos = OBRAS.map(function (o, i) {
    const xMao = o.left + obras[i].offsetWidth / 2 - personaje.offsetWidth / 2;
    const pct = ((xMao - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;
    return Math.max(0, Math.min(100, pct));
  });
  hitos.forEach(function (hito, i) {
    hito.style.left = posicionesHitos[i] + "%";
  });

  // ============================================================
  // VIDEO DE YOUTUBE
  // ============================================================
  function obtenerIdYoutube(url) {
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^(www\.|m\.)/, "");
      let id = null;

      if (host === "youtu.be") {
        id = u.pathname.slice(1).split("/")[0];
      } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
        if (u.pathname === "/watch") {
          id = u.searchParams.get("v");
        } else {
          const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{11})/);
          if (m) id = m[2];
        }
      }
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    } catch (err) {
      return null;
    }
  }

  function mostrarVideo(url) {
    modalVideo.innerHTML = "";
    const marco = document.createElement("div");
    marco.className = "video-marco";

    const id = obtenerIdYoutube(url);
    if (id) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0";
      iframe.title = "Video de YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      marco.appendChild(iframe);
    } else {
      marco.classList.add("video-marco--pendiente");
      marco.textContent = "Video próximamente";
    }
    modalVideo.appendChild(marco);
  }

  // ============================================================
  // CONTROLES
  // ============================================================
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
        abrirModal(Number(obra.dataset.indice));
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
    camaraX = Math.min(0, Math.max(contenedorJuego.clientWidth - ANCHO_ESCENARIO, camaraX));
    escenario.style.transform = `translateX(${camaraX}px)`;
    fondoLejano.style.transform = `translateX(${camaraX * FACTOR_PARALLAX}px)`;

    const porcentajeAvance = ((posX - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;
    lineaJugador.style.left = porcentajeAvance + "%";
    lineaProgreso.style.width = porcentajeAvance + "%";

    // La época del fondo sigue a la línea de tiempo: la del último hito activado
    let epoca = 0;
    hitos.forEach(function (hito, index) {
      if (porcentajeAvance >= posicionesHitos[index] - MARGEN_HITO) {
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

  function abrirModal(indice) {
    const o = OBRAS[indice];
    modalAbierto = true;
    modalFecha.textContent = o.fecha;
    modalTitulo.textContent = o.titulo;
    modalTexto.textContent = o.texto;
    modalTexto.scrollTop = 0;
    mostrarVideo(o.video);
    modalInfo.classList.add("activo");
  }

  function cerrarModal() {
    modalAbierto = false;
    modalInfo.classList.remove("activo");
    modalVideo.innerHTML = ""; // quita el iframe: detiene el video
  }

  btnCerrarModal.addEventListener("click", cerrarModal);

  // Estado inicial: posiciona cámara, línea de tiempo, época y carteles
  actualizarPosicion();
});
