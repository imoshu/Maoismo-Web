document.addEventListener("DOMContentLoaded", function () {

  const contenedorJuego = document.querySelector(".zona-juego");

  if (!contenedorJuego) {
    return;
  }


  // ============================================================
  // DATOS DE LAS OBRAS (cuadros)
  // Aqui se cambian los textos, las imagenes y los videos.
  // imagen = la foto que sale dentro del cuadro (carpeta assets/img)
  // video = el link de youtube normal
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
      imagen: "assets/img/perso_1.jpg",
      video: "https://youtu.be/428uKL1zbLE"
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
      imagen: "assets/img/perso_2.jpg",
      video: "https://youtu.be/NY6fARBSres"
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
      imagen: "assets/img/perso_3.jpg",
      video: VIDEO_POR_DEFECTO
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
      imagen: "assets/img/perso_4.jpg",
      video: "https://www.youtube.com/watch?v=6sMCs4CELus"
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
      imagen: "assets/img/perso_5.jpg",
      video: VIDEO_POR_DEFECTO
    }
  ];


  // ============================================================
  // MEDIDAS DEL ESCENARIO
  // ============================================================

  const ANCHO_ESCENARIO = 3000;


  // ============================================================
  // DECORADO (se crea con codigo)
  // ============================================================

  // Faroles colgando
  let faroles = "";
  for (let i = 0; i < 8; i++) {
    const izquierda = 20 + i * 240;
    const retraso = (i * 0.7).toFixed(1);
    faroles += '<div class="farol" style="left:' + izquierda + 'px; animation-delay:' + retraso + 's"></div>';
  }

  // Ventanas redondas
  let ventanas = "";
  for (let i = 0; i < 6; i++) {
    const izquierda = 140 + i * 330;
    ventanas += '<div class="ventana" style="left:' + izquierda + 'px"></div>';
  }

  // Chimeneas (x = posicion, alto = que tan altas son)
  const listaChimeneas = [
    { x: 200, alto: 150 },
    { x: 330, alto: 210 },
    { x: 600, alto: 120 },
    { x: 760, alto: 190 },
    { x: 1100, alto: 230 },
    { x: 1250, alto: 140 },
    { x: 1500, alto: 200 },
    { x: 1700, alto: 160 }
  ];

  let chimeneas = "";
  for (let i = 0; i < listaChimeneas.length; i++) {
    const c = listaChimeneas[i];
    const retraso = i * 0.9;
    chimeneas += '<div class="chimenea" style="left:' + c.x + 'px; height:' + c.alto + 'px; --retraso:' + retraso + 's"></div>';
  }

  // Columnas: una en cada punta y dos entre cada par de cuadros
  const columnasX = [];
  columnasX.push(40);
  columnasX.push(ANCHO_ESCENARIO - 62);

  for (let i = 0; i < OBRAS.length - 1; i++) {
    const centro = (OBRAS[i].left + OBRAS[i + 1].left) / 2 + 70;
    columnasX.push(centro - 150 - 22);
    columnasX.push(centro + 150 - 22);
  }

  let columnas = "";
  for (let i = 0; i < columnasX.length; i++) {
    columnas += '<div class="columna" style="left:' + columnasX[i] + 'px"></div>';
  }

  // Pergaminos que van arriba de cada cuadro
  let pergaminos = "";
  for (let i = 0; i < OBRAS.length; i++) {
    const o = OBRAS[i];
    pergaminos +=
      '<div class="pergamino" style="left:' + (o.left - 50) + 'px">' +
        '<span class="pergamino__zh">' + o.zh + '</span>' +
        '<span class="pergamino__es">' + o.es + '</span>' +
      '</div>';
  }

  // Los cuadros (ahora con su imagen)
  // Si la imagen todavia no existe, se esconde y se ve el recuadro de antes
  let cuadros = "";
  for (let i = 0; i < OBRAS.length; i++) {
    const o = OBRAS[i];
    cuadros +=
      '<div class="obra-museo" style="left: ' + o.left + 'px;" data-indice="' + i + '">' +
        '<span class="obra-museo__indicador">Haz clic</span>' +
        '<div class="obra-museo__imagen">' +
          '<img src="' + o.imagen + '" alt="' + o.nombre + '" onerror="this.style.display=\'none\'">' +
        '</div>' +
        '<span class="obra-museo__titulo">' + o.nombre + '</span>' +
      '</div>';
  }

  // Los puntos de la linea de tiempo
  let hitosHTML = "";
  for (let i = 0; i < OBRAS.length; i++) {
    const o = OBRAS[i];
    hitosHTML +=
      '<div class="linea-tiempo__hito">' +
        '<div class="linea-tiempo__punto"></div>' +
        '<span class="linea-tiempo__fecha">' + o.fecha + '</span>' +
      '</div>';
  }

  contenedorJuego.dataset.epoca = "0";


  // ============================================================
  // AQUI SE ARMA TODO EL HTML DEL JUEGO
  // ============================================================

  contenedorJuego.innerHTML = `

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


  // ============================================================
  // BUSCAMOS LOS ELEMENTOS QUE VAMOS A USAR
  // ============================================================

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

  const hitos = document.querySelectorAll(".linea-tiempo__hito");
  const obras = document.querySelectorAll(".obra-museo");

  escenario.style.width = ANCHO_ESCENARIO + "px";


  // ============================================================
  // VARIABLES DEL JUEGO
  // ============================================================

  let posX = 100;
  let modalAbierto = false;
  let temporizadorMovimiento = null;

  const velocidad = 15;
  const limiteIzquierdo = 50;
  const limiteDerecho = 2750;

  // Que tan lento se mueve el fondo de atras (efecto de profundidad)
  const FACTOR_PARALLAX = 0.4;

  // Que tan cerca debe estar Mao del cuadro para poder abrirlo
  const DISTANCIA_INTERACCION = 160;

  // Un punto de la linea se prende un poco antes de llegar al cuadro
  const MARGEN_HITO = 8;


  // ============================================================
  // FUNCION PARA SABER SI MAO ESTA CERCA DE UN CUADRO
  // ============================================================

  function estaCerca(obra) {
    const obraX = parseInt(obra.style.left, 10);
    const centroPersonaje = posX + personaje.offsetWidth / 2;
    const centroObra = obraX + obra.offsetWidth / 2;
    const distancia = Math.abs(centroPersonaje - centroObra);

    if (distancia < DISTANCIA_INTERACCION) {
      return true;
    } else {
      return false;
    }
  }


  // ============================================================
  // POSICION DE LOS PUNTOS EN LA LINEA DE TIEMPO
  // (justo donde Mao queda al frente de su cuadro)
  // ============================================================

  const posicionesHitos = [];

  for (let i = 0; i < OBRAS.length; i++) {
    const xMao = OBRAS[i].left + obras[i].offsetWidth / 2 - personaje.offsetWidth / 2;
    let porcentaje = ((xMao - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;

    if (porcentaje < 0) {
      porcentaje = 0;
    }
    if (porcentaje > 100) {
      porcentaje = 100;
    }

    posicionesHitos.push(porcentaje);
    hitos[i].style.left = porcentaje + "%";
  }


  // ============================================================
  // VIDEO DE YOUTUBE
  // ============================================================

  // Saca el codigo del video a partir del link
  function obtenerIdYoutube(url) {
    try {
      const u = new URL(url);
      const host = u.hostname.replace("www.", "").replace("m.", "");
      let id = null;

      if (host === "youtu.be") {
        id = u.pathname.slice(1).split("/")[0];
      } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
        if (u.pathname === "/watch") {
          id = u.searchParams.get("v");
        } else {
          const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{11})/);
          if (m) {
            id = m[2];
          }
        }
      }

      if (id && /^[\w-]{11}$/.test(id)) {
        return id;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  // Pone el video dentro del modal
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
  // TECLADO (mover a Mao)
  // ============================================================

  window.addEventListener("keydown", function (e) {

    const target = e.target;

    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
      return;
    }

    // Si el modal esta abierto solo se puede cerrar
    if (modalAbierto) {
      if (e.key === "Escape" || e.key === "Enter") {
        e.preventDefault();
        cerrarModal();
      }
      return;
    }

    // Derecha
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      e.preventDefault();
      posX = posX + velocidad;
      if (posX > limiteDerecho) {
        posX = limiteDerecho;
      }
      activarMovimiento();
      actualizarPosicion();
    }

    // Izquierda
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      e.preventDefault();
      posX = posX - velocidad;
      if (posX < limiteIzquierdo) {
        posX = limiteIzquierdo;
      }
      activarMovimiento();
      actualizarPosicion();
    }
  });


  // ============================================================
  // CLIC EN LOS CUADROS (solo si Mao esta cerca)
  // ============================================================

  for (let i = 0; i < obras.length; i++) {
    const obra = obras[i];

    obra.addEventListener("click", function () {
      if (estaCerca(obra)) {
        abrirModal(Number(obra.dataset.indice));
      }
    });
  }


  // ============================================================
  // ANIMACION DE CAMINAR
  // ============================================================

  function activarMovimiento() {
    personaje.classList.add("andando");

    clearTimeout(temporizadorMovimiento);

    temporizadorMovimiento = setTimeout(function () {
      personaje.classList.remove("andando");
    }, 150);
  }


  // ============================================================
  // ACTUALIZAR TODO CUANDO MAO SE MUEVE
  // ============================================================

  function actualizarPosicion() {

    // Mover a Mao
    personaje.style.left = posX + "px";

    // Camara: sigue a Mao pero sin salirse del escenario
    const centroVisor = contenedorJuego.clientWidth / 2;
    let camaraX = centroVisor - posX - personaje.offsetWidth / 2;
    const camaraMinima = contenedorJuego.clientWidth - ANCHO_ESCENARIO;

    if (camaraX > 0) {
      camaraX = 0;
    }
    if (camaraX < camaraMinima) {
      camaraX = camaraMinima;
    }

    escenario.style.transform = "translateX(" + camaraX + "px)";
    fondoLejano.style.transform = "translateX(" + (camaraX * FACTOR_PARALLAX) + "px)";

    // Barra de la linea de tiempo
    const porcentajeAvance = ((posX - limiteIzquierdo) / (limiteDerecho - limiteIzquierdo)) * 100;
    lineaJugador.style.left = porcentajeAvance + "%";
    lineaProgreso.style.width = porcentajeAvance + "%";

    // Puntos de la linea y epoca del fondo
    let epoca = 0;

    for (let i = 0; i < hitos.length; i++) {
      if (porcentajeAvance >= posicionesHitos[i] - MARGEN_HITO) {
        hitos[i].classList.add("activo");
        epoca = i;
      } else {
        hitos[i].classList.remove("activo");
      }
    }

    contenedorJuego.dataset.epoca = String(epoca);

    verificarCercaniaObras();
  }


  // ============================================================
  // MARCAR LOS CUADROS QUE ESTAN CERCA
  // ============================================================

  function verificarCercaniaObras() {
    for (let i = 0; i < obras.length; i++) {
      const obra = obras[i];

      if (estaCerca(obra)) {
        obra.classList.add("cerca");
        obra.style.cursor = "pointer";
      } else {
        obra.classList.remove("cerca");
        obra.style.cursor = "default";
      }
    }
  }


  // ============================================================
  // ABRIR Y CERRAR EL MODAL
  // ============================================================

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

    // Borramos el video para que deje de sonar
    modalVideo.innerHTML = "";
  }

  btnCerrarModal.addEventListener("click", cerrarModal);


  // ============================================================
  // AL EMPEZAR
  // ============================================================

  actualizarPosicion();

});
