import _ from "underscore";

/**
 * Funcion para crear una nueva baraja o un nuevo juego.
 * @param {Array<String>} tiposCarta - Ejemplo: ["C", "D", "H", "S"]
 * @param {Array<String>} tiposEspeciales - Ejemplo: ["A", "J", "Q", "K"]
 * @returns {Array<String>}
 */

export const crearDeck = (tiposCarta, tiposEspeciales) => {
    if (!tiposCarta || tiposCarta.length < 0)
        throw new Error(
            `'tiposCarta' es obligatorio y debe ser un arreglo de string's valido`
        );

    if (!tiposEspeciales || tiposEspeciales.length < 0)
        throw new Error(
            `'tiposEspeciales' es obligatorio y debe ser un arreglo de string's valido`
        );

    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tiposCarta) {
            deck.push(`${i}${tipo}`);
        }
    }

    for (const tipo of tiposCarta) {
        for (const especial of tiposEspeciales) {
            deck.push(`${especial}${tipo}`);
        }
    }

    return _.shuffle(deck);
};
