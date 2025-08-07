/**
 * Función para tomar una carta de la baraja.
 * @param {Array<String>} deck - Ejemplo: ["2D", "3D", "4D", ...].
 * @returns {Array<String>} deck - Ejemplo: ["2D"].
 */
export const pedirCarta = (deck) => {
    if (!deck || deck.length <= 0) {
        throw new Error("Ya no hay cartas en la baraja");
    }

    return deck.shift();
};
