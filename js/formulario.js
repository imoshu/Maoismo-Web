(function () {
  "use strict";

  const zona = document.querySelector(".zona-formulario");
  if (!zona) return;

  const LETRAS = ["A", "B", "C", "D"];

  const preguntas = [
    {
      texto: "Según lo visto en el trabajo, ¿por qué la figura histórica de Mao Zedong despierta valoraciones profundamente divididas en la actualidad?",
      opciones: [
        "Porque sus reformas económicas convirtieron a China en una potencia comercial abierta inmediatamente después de 1949.",
        "Porque mientras para unos simboliza la reunificación nacional y la recuperación de la soberanía, para otros representa autoritarismo, represión y millones de víctimas derivadas de sus políticas.",
        "Porque logró mantener una estabilidad política sin conflictos internos hasta su muerte, aunque a costa de aislar culturalmente al país.",
        "Porque renunció al liderazgo del Partido Comunista tras las crisis sociales, dejando inconcluso su proyecto de transformación socialista."
      ],
      correcta: 1
    },
    {
      texto: "De acuerdo con lo visto en el trabajo, ¿qué implicación directa tuvo la Revolución Xinhai de 1911 más allá de la caída formal de la dinastía Qing?",
      opciones: [
        "La inmediata consolidación de una república democrática y estable en todo el territorio.",
        "El colapso de más de dos mil años de gobierno imperial sin que esto garantizara de inmediato la estabilidad institucional del país.",
        "El inicio de la invasión japonesa y la pérdida total de la soberanía frente a las potencias extranjeras.",
        "La fundación inmediata del Partido Comunista de China liderado por Mao Zedong."
      ],
      correcta: 1
    },
    {
      texto: "Desde la perspectiva teórica del maoísmo explicada en el trabajo, ¿en qué consistió la divergencia fundamental respecto al marxismo tradicional?",
      opciones: [
        "En el rechazo absoluto a los planteamientos filosóficos y económicos de Karl Marx y Vladimir Lenin.",
        "En la transferencia del papel protagónico revolucionario del proletariado industrial urbano al campesinado agrícola.",
        "En la búsqueda de una transición pacífica mediante elecciones democráticas en los centros industriales.",
        "En la alianza permanente con las potencias extranjeras para modernizar la economía agraria."
      ],
      correcta: 1
    },
    {
      texto: "En el contexto de la evolución del conflicto político analizado en el trabajo, ¿qué factor coyuntural alteró temporalmente la confrontación entre comunistas y nacionalistas?",
      opciones: [
        "La firma de un acuerdo de reparto territorial promovido por las potencias europeas.",
        "La muerte de los principales dirigentes del Partido Comunista durante la década de 1920.",
        "La necesidad de enfrentar conjuntamente la invasión japonesa durante la Segunda Guerra Mundial.",
        "El triunfo definitivo del Kuomintang en las zonas rurales del interior del país."
      ],
      correcta: 2
    },
    {
      texto: "Según lo visto en el trabajo, ¿qué significado histórico adquiere la fecha del 1 de octubre de 1949?",
      opciones: [
        "Marca el inicio de la alianza militar entre Mao Zedong y el Partido Nacionalista contra Japón.",
        "Señala la fundación oficial del Partido Comunista de China bajo las ideas de Marx y Lenin.",
        "Representa la proclamación de la República Popular China y el nacimiento de un nuevo Estado liderado por el Partido Comunista.",
        "Conmemora la caída de la dinastía Qing y el fin de dos mil años de gobierno imperial."
      ],
      correcta: 2
    },
    {
      texto: "De acuerdo con la parte final de lo visto en el trabajo, el alcance de la transformación impulsada por Mao Zedong a partir de 1949 se caracterizó por:",
      opciones: [
        "Limitarse exclusivamente al reemplazo de las élites gobernantes manteniendo intacta la estructura económica.",
        "Abarcar una reestructuración integral que incluyó la propiedad, la economía, las relaciones sociales y la mentalidad de la población.",
        "Priorizar la privatización de la tierra para consolidar una economía de libre mercado en el campo.",
        "Restaurar las tradiciones imperiales para garantizar la cohesión social tras la guerra civil."
      ],
      correcta: 1
    },
    {
      texto: "De acuerdo con lo visto en el trabajo, ¿qué contradicción caracterizó a las primeras reformas impulsadas tras la llegada de Mao al poder?",
      opciones: [
        "Se nacionalizaron la banca y la industria, pero se mantuvo intacto el sistema de concentración de tierras en manos de grandes propietarios.",
        "Se fomentó la libertad de prensa y la participación de organizaciones sociales independientes para equilibrar el poder del Estado.",
        "Se ampliaron derechos sociales como la educación rural, la salud pública y la protección legal de las mujeres, mientras simultáneamente se consolidaba un régimen autoritario con persecuciones políticas y control absoluto del Partido Comunista.",
        "Se eliminó la violencia en el campo mediante una indemnización pacífica a los antiguos terratenientes antes de redistribuir las parcelas."
      ],
      correcta: 2
    },
    {
      texto: "Tomando en cuenta lo visto en el trabajo, ¿de qué manera la gestión administrativa agravó la crisis alimentaria durante el Gran Salto Adelante (1958-1961)?",
      opciones: [
        "Los funcionarios locales falsificaban al alza los reportes de producción para aparentar cumplimiento, lo que llevó al Estado a exigir cuotas de alimentos inexistentes en un contexto donde además se había desviado mano de obra agrícola hacia la fabricación rural de acero.",
        "El gobierno central prohibió la creación de comunas populares, devolviendo las tierras a pequeños propietarios sin experiencia técnica.",
        "La importación masiva de maquinaria pesada extranjera agotó las reservas financieras destinadas a la compra de fertilizantes.",
        "Los campesinos se negaron a participar en los hornos rurales, paralizando por completo tanto la industria pesada como la recolección de cosechas."
      ],
      correcta: 0
    },
    {
      texto: "Según lo visto en el trabajo, ¿cuál fue el trasfondo político que motivó a Mao Zedong a lanzar la Gran Revolución Cultural Proletaria en 1966?",
      opciones: [
        "Consolidar los acuerdos comerciales con potencias occidentales mediante la modernización de las universidades chinas.",
        "Recuperar su influencia perdida tras el fracaso del Gran Salto Adelante y neutralizar a los dirigentes más moderados a quienes acusaba de desviar el país hacia el capitalismo, utilizando para ello la movilización juvenil de los Guardias Rojos contra los llamados \"Cuatro Viejos\".",
        "Proteger el patrimonio histórico, los templos y las tradiciones intelectuales frente a los ataques de sectores radicales del Partido Comunista.",
        "Formar una nueva generación de tecnócratas universitarios enviando a los profesores extranjeros a dirigir las comunas agrícolas."
      ],
      correcta: 1
    },
    {
      texto: "A partir de lo visto en el trabajo, ¿cómo se define la relación entre el modelo de Mao Zedong y las reformas iniciadas por Deng Xiaoping en 1978?",
      opciones: [
        "Deng Xiaoping sustituyó tanto el sistema económico socialista como el monopolio político del Partido Comunista para instaurar una democracia liberal.",
        "El crecimiento económico contemporáneo de China fue una consecuencia directa y exclusiva de la continuidad de las comunas populares creadas en la década de 1950.",
        "Se mantuvo el control político del Partido Comunista y el lugar central de Mao en la historia oficial, pero se transformó radicalmente el rumbo económico mediante mecanismos de mercado, inversión extranjera y zonas económicas especiales como Shenzhen.",
        "Deng Xiaoping cerró China al comercio internacional para evitar la dependencia tecnológica, profundizando la planificación estatal centralizada."
      ],
      correcta: 2
    }
  ];

  const total = preguntas.length;
  let respuestas = new Array(total).fill(null);
  let actual = 0;

  zona.innerHTML =
    '<div class="quiz" tabindex="-1">' +
      '<div class="quiz__cuerpo desplazable"></div>' +
      '<div class="quiz__pie"></div>' +
      '<p class="quiz__aviso" aria-live="polite"></p>' +
    "</div>";

  const panel = zona.querySelector(".quiz");
  const cuerpo = zona.querySelector(".quiz__cuerpo");
  const pie = zona.querySelector(".quiz__pie");
  const aviso = zona.querySelector(".quiz__aviso");

  function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }

  function boton(texto, accion, clase, desactivado) {
    return '<button type="button" class="quiz__boton' + (clase ? " " + clase : "") + '" data-accion="' + accion + '"' +
      (desactivado ? " disabled" : "") + ">" + texto + "</button>";
  }

  function puntaje() {
    return respuestas.reduce(function (suma, r, i) {
      return suma + (r === preguntas[i].correcta ? 1 : 0);
    }, 0);
  }

  function mostrar(htmlCuerpo, htmlPie, mensaje) {
    cuerpo.innerHTML = htmlCuerpo;
    pie.innerHTML = htmlPie;
    cuerpo.scrollTop = 0;
    aviso.textContent = mensaje || "";
  }

  function pantallaInicio() {
    panel.dataset.pantalla = "inicio";
    mostrar(
      '<div class="quiz__portada">' +
        '<span class="quiz__sello">问答</span>' +
        '<h3 class="quiz__titulo">Pon a prueba lo que aprendiste</h3>' +
        '<p class="quiz__intro">Responde ' + total + ' preguntas sobre el video. Al final verás tu puntaje y podrás revisar cada respuesta.</p>' +
      "</div>",
      boton("Comenzar", "comenzar", "quiz__boton--principal")
    );
  }

  function pantallaPregunta(i) {
    actual = i;
    panel.dataset.pantalla = "pregunta";
    const p = preguntas[i];
    const opciones = p.opciones.map(function (texto, j) {
      return (
        '<label class="quiz__opcion">' +
          '<input type="radio" name="quiz-respuesta" value="' + j + '"' + (respuestas[i] === j ? " checked" : "") + ">" +
          '<span class="quiz__letra">' + LETRAS[j] + "</span>" +
          '<span class="quiz__texto">' + escapar(texto) + "</span>" +
        "</label>"
      );
    }).join("");

    const progreso = Math.round(((i + 1) / total) * 100);
    const ultima = i === total - 1;

    mostrar(
      '<div class="quiz__progreso">' +
        '<span class="quiz__contador">Pregunta ' + (i + 1) + " de " + total + "</span>" +
        '<span class="quiz__barra"><span style="width:' + progreso + '%"></span></span>' +
      "</div>" +
      '<fieldset class="quiz__pregunta">' +
        '<legend class="quiz__enunciado">' + escapar(p.texto) + "</legend>" +
        '<div class="quiz__opciones">' + opciones + "</div>" +
      "</fieldset>",
      boton("Anterior", "anterior", "", i === 0) +
      boton(ultima ? "Ver resultado" : "Siguiente", ultima ? "resultado" : "siguiente", "quiz__boton--principal", respuestas[i] === null),
      "Pregunta " + (i + 1) + " de " + total
    );
  }

  function mensajeSegun(nota) {
    if (nota === total) return "¡Perfecto! Dominas la historia del maoísmo.";
    if (nota >= 8) return "¡Muy bien! Tienes claros los puntos clave.";
    if (nota >= 5) return "Vas bien, pero conviene repasar algunos temas.";
    return "Vuelve a ver el video y revisa tus respuestas.";
  }

  function pantallaResultado() {
    panel.dataset.pantalla = "resultado";
    const nota = puntaje();
    mostrar(
      '<div class="quiz__portada">' +
        '<span class="quiz__puntaje"><strong>' + nota + "</strong><small>de " + total + "</small></span>" +
        '<h3 class="quiz__titulo">' + mensajeSegun(nota) + "</h3>" +
        '<p class="quiz__intro">Acertaste ' + nota + " de " + total + " preguntas.</p>" +
      "</div>",
      boton("Revisar respuestas", "repaso", "quiz__boton--principal") +
      boton("Intentar de nuevo", "reiniciar"),
      "Resultado: " + nota + " de " + total
    );
  }

  function pantallaRepaso() {
    panel.dataset.pantalla = "repaso";
    const items = preguntas.map(function (p, i) {
      const elegida = respuestas[i];
      const acierto = elegida === p.correcta;
      let html =
        '<li class="quiz__item ' + (acierto ? "quiz__item--bien" : "quiz__item--mal") + '">' +
          '<p class="quiz__item-pregunta"><span class="quiz__marca">' + (acierto ? "✓" : "✗") + "</span>" +
            (i + 1) + ". " + escapar(p.texto) + "</p>" +
          '<p class="quiz__item-respuesta"><span>Tu respuesta:</span> ' +
            LETRAS[elegida] + ") " + escapar(p.opciones[elegida]) + "</p>";
      if (!acierto) {
        html += '<p class="quiz__item-correcta"><span>Respuesta correcta:</span> ' +
          LETRAS[p.correcta] + ") " + escapar(p.opciones[p.correcta]) + "</p>";
      }
      return html + "</li>";
    }).join("");

    mostrar(
      '<h3 class="quiz__titulo quiz__titulo--repaso">Tus respuestas · ' + puntaje() + " de " + total + "</h3>" +
      '<ol class="quiz__lista">' + items + "</ol>",
      boton("Volver al puntaje", "resultado") +
      boton("Intentar de nuevo", "reiniciar", "quiz__boton--principal"),
      "Revisión de respuestas"
    );
  }

  cuerpo.addEventListener("change", function (e) {
    if (e.target.name !== "quiz-respuesta") return;
    respuestas[actual] = Number(e.target.value);
    const siguiente = pie.querySelector('[data-accion="siguiente"], [data-accion="resultado"]');
    if (siguiente) siguiente.disabled = false;
  });

  panel.addEventListener("click", function (e) {
    const b = e.target.closest("[data-accion]");
    if (!b || b.disabled) return;
    switch (b.dataset.accion) {
      case "comenzar": pantallaPregunta(0); break;
      case "anterior": pantallaPregunta(actual - 1); break;
      case "siguiente": pantallaPregunta(actual + 1); break;
      case "resultado": pantallaResultado(); break;
      case "repaso": pantallaRepaso(); break;
      case "reiniciar":
        respuestas = new Array(total).fill(null);
        pantallaPregunta(0);
        break;
    }
    panel.focus({ preventScroll: true });
  });

  pantallaInicio();
})();
