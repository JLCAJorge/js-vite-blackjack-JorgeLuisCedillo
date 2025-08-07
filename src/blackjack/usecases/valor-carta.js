/**
 * Funcion para saber el valor de la carta.
 * @param {String} cartaSolicitada Ejemplo: "2D".
 * @returns {Number}
 */
export const valorCarta = (cartaSolicitada) => {
    const valorCartaSolicitada = cartaSolicitada.substring(
        0,
        cartaSolicitada.length - 1
    );

    return isNaN(valorCartaSolicitada)
        ? valorCartaSolicitada === "A"
            ? 1
            : 10
        : parseInt(valorCartaSolicitada);
};
