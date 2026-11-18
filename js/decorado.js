(function () {
  "use strict";

  const faroles = [
    { x: "12%", cuerda: 14, retraso: -0.4, tam: 1 },
    { x: "24%", cuerda: 44, retraso: -2.1, tam: 0.82 },
    { x: "76%", cuerda: 44, retraso: -3.3, tam: 0.82 },
    { x: "88%", cuerda: 14, retraso: -1.5, tam: 1 }
  ];

  const jades = [
    { x: "37%", cuerda: 22, retraso: -1.1 },
    { x: "63%", cuerda: 22, retraso: -2.7 }
  ];

  function farol(datos, i) {
    return (
      '<div class="farol-colgante farol-colgante--' + (i + 1) + '" style="--x:' + datos.x +
      ";--cuerda:" + datos.cuerda + "px;--retraso:" + datos.retraso + "s;--tam:" + datos.tam + '">' +
        '<span class="farol-colgante__cuerda"></span>' +
        '<span class="farol-colgante__cuerpo"><span class="farol-colgante__costillas"></span></span>' +
        '<span class="farol-colgante__borla"></span>' +
      "</div>"
    );
  }

  function jade(datos, i) {
    return (
      '<div class="jade-colgante jade-colgante--' + (i + 1) + '" style="--x:' + datos.x +
      ";--cuerda:" + datos.cuerda + "px;--retraso:" + datos.retraso + 's">' +
        '<span class="jade-colgante__cuerda"></span>' +
        '<span class="jade-colgante__nudo"></span>' +
        '<span class="jade-colgante__disco"></span>' +
        '<span class="jade-colgante__borla"></span>' +
      "</div>"
    );
  }

  const ALZA = 45;
  const FIN = 24;
  const TRAMO = 200 - FIN;

  function alza(x) {
    const t = (200 - x) / TRAMO;
    return ALZA * t * t;
  }

  function franja(y0, y1, color) {
    return (
      '<path fill="' + color + '" d="M200,' + y0 + " Q" + (200 + FIN) / 2 + "," + y0 + " " + FIN + "," + (y0 - ALZA) +
      " L" + FIN + "," + (y1 - ALZA) + " Q" + (200 + FIN) / 2 + "," + y1 + " 200," + y1 + ' Z"/>'
    );
  }

  function esquinaTejado(lado) {
    let svg = '<svg class="tejado__esquina tejado__esquina--' + lado + '" viewBox="0 0 200 100" preserveAspectRatio="none">';

    svg += franja(-60, 48, "#1f5f48");
    for (let x = 196; x > FIN + 4; x -= 15) {
      const y = 48 - alza(x);
      svg += '<line x1="' + x + '" y1="-60" x2="' + x + '" y2="' + y + '" stroke="#0e2f24" stroke-width="3"/>';
      svg += '<line x1="' + (x + 5) + '" y1="-60" x2="' + (x + 5) + '" y2="' + y + '" stroke="#3f9c78" stroke-width="1.4"/>';
    }

    svg += franja(48, 60, "#123a2d");
    for (let x = 188; x > FIN + 4; x -= 22) {
      svg += '<circle cx="' + x + '" cy="' + (54 - alza(x)) + '" r="4.4" fill="#2f8f6b" stroke="#c9a45c" stroke-width="1.6"/>';
    }

    svg += franja(60, 64, "#160505");
    svg += franja(64, 86, "#1f6b52");
    for (let x = 200; x > FIN + 4; x -= 30) {
      svg += '<line x1="' + x + '" y1="' + (64 - alza(x)) + '" x2="' + x + '" y2="' + (86 - alza(x)) + '" stroke="#c9a45c" stroke-width="2"/>';
      svg += '<line x1="' + (x - 14) + '" y1="' + (66 - alza(x - 14)) + '" x2="' + (x - 14) + '" y2="' + (84 - alza(x - 14)) + '" stroke="#24476b" stroke-width="8"/>';
    }
    svg += franja(86, 97, "#7a1115");
    svg += franja(97, 100, "#c9a45c");

    const yAlero = 64 - ALZA;
    svg += '<path d="M' + FIN + "," + (yAlero + 1) + " C" + (FIN - 10) + "," + (yAlero + 1) + " " + (FIN - 18) + "," + (yAlero - 8) + " " + (FIN - 21) + "," + (yAlero - 22) +
      " C" + (FIN - 14) + "," + (yAlero - 14) + " " + (FIN - 8) + "," + (yAlero - 14) + " " + FIN + "," + (yAlero - 16) +
      ' Z" fill="#1f5f48" stroke="#c9a45c" stroke-width="1.5"/>';
    svg += '<line x1="' + FIN + '" y1="' + (yAlero - 16) + '" x2="' + FIN + '" y2="' + (100 - ALZA) + '" stroke="#c9a45c" stroke-width="3"/>';

    const bx = FIN - 12;
    const by = yAlero - 6;
    svg += '<g class="tejado__campana">' +
      '<line x1="' + bx + '" y1="' + by + '" x2="' + bx + '" y2="' + (by + 12) + '" stroke="#c9a45c" stroke-width="1.2"/>' +
      '<path d="M' + (bx - 5) + "," + (by + 19) + " Q" + bx + "," + (by + 9) + " " + (bx + 5) + "," + (by + 19) + " L" + (bx + 6) + "," + (by + 25) + " L" + (bx - 6) + "," + (by + 25) + ' Z" fill="#c9a45c"/>' +
      '<circle cx="' + bx + '" cy="' + (by + 28) + '" r="2.6" fill="#4fb487"/>' +
      "</g>";

    svg += "</svg>";
    return svg;
  }

  const tejado =
    '<div class="tejado">' +
      esquinaTejado("izq") +
      '<div class="tejado__centro">' +
        '<span class="tejado__tejas"></span>' +
        '<span class="tejado__remates"></span>' +
        '<span class="tejado__alero"></span>' +
        '<span class="tejado__mensulas"></span>' +
        '<span class="tejado__viga"></span>' +
      "</div>" +
      esquinaTejado("der") +
    "</div>";

  const plantilla =
    '<div class="decorado" aria-hidden="true">' +
      '<div class="decorado__rayos"></div>' +
      '<div class="decorado__columna decorado__columna--izq"></div>' +
      '<div class="decorado__columna decorado__columna--der"></div>' +
      '<div class="decorado__lema decorado__lema--izq"><span class="decorado__lema-zh">为人民服务</span></div>' +
      '<div class="decorado__lema decorado__lema--der"><span class="decorado__lema-zh">毛主席万岁</span></div>' +
      '<div class="decorado__zocalo"></div>' +
      faroles.map(farol).join("") +
      jades.map(jade).join("") +
      tejado +
      '<div class="decorado__sombra"></div>' +
    "</div>";

  document.querySelectorAll(".seccion:not(.seccion--inicio)").forEach(function (seccion) {
    seccion.insertAdjacentHTML("afterbegin", plantilla);
  });
})();
