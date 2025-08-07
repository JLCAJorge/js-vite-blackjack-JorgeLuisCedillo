import _ from "underscore";
import { crearDeck, pedirCarta, valorCarta } from "./usecases";

const miModulo = (() => {
    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

    let puntosJugadores = [];

    // Referencias a elementos HTML.
    const botonPedirCarta = document.querySelector("#btnPedirCarta"),
        botonDetenerJuego = document.querySelector("#btnDetenerJuego"),
        botonNuevoJuego = document.querySelector("#btnIniciarNuevoJuego"),
        textoPuntos = document.querySelectorAll("small"),
        divCartas = document.querySelectorAll(".divCartas");

    // Funcion para inicializar el juego.
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck(tipos, especiales);
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        textoPuntos.forEach((elem) => (elem.innerText = 0));
        divCartas.forEach((elem) => (elem.innerHTML = ""));
        botonDetenerJuego.disabled = false;
        botonPedirCarta.disabled = false;
    };

    // Sumar puntos a los jugadores dependiendo del turno.
    const sumarPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        textoPuntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    // Funcion para mostrar las cartas obtenidas por los jugadores.
    const agregarCarta = (carta, turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        imgCarta.alt = "cartas";
        divCartas[turno].append(imgCarta);
    };

    // Funcion mensaje de alerta para notificar si el jugador gano o perdio contra la computadora.
    const mensaje = () => {
        const [puntosObtenidosJugador, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosObtenidosJugador) {
                alert("Nadie gana.");
            } else if (puntosObtenidosJugador > 21) {
                alert("Perdiste, la computadora gana, suerte para la proxima.");
            } else if (puntosComputadora > 21) {
                alert("Felicidades, ganaste!!!");
            } else {
                alert("Computadora gana siempre jajaja.");
            }
        }, 50);
    };

    // Logica de la computadora.
    const turnoComputadora = (puntosObtenidosJugador) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta(deck);
            puntosComputadora = sumarPuntos(carta, puntosJugadores.length - 1);
            agregarCarta(carta, puntosJugadores.length - 1);
        } while (
            puntosComputadora < puntosObtenidosJugador &&
            puntosObtenidosJugador <= 21
        );

        mensaje();
    };

    // Eventos.

    botonPedirCarta.addEventListener("click", () => {
        const carta = pedirCarta(deck);
        const puntosJugador = sumarPuntos(carta, 0);
        agregarCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn("tienes mas de 21 puntos, perdiste");
            botonDetenerJuego.disabled = true;
            botonPedirCarta.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21, genial!!!");
            botonDetenerJuego.disabled = true;
            botonPedirCarta.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    botonDetenerJuego.addEventListener("click", () => {
        botonDetenerJuego.disabled = true;
        botonPedirCarta.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    botonNuevoJuego.addEventListener("click", () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego,
    };
})();
