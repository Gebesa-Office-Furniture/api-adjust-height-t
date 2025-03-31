/**
 * Devuelve el primer elemento de un array que cumple con el predicado proporcionado.
 * Si no se pasa un predicado, devuelve el primer elemento.
 *
 * @template T
 * @param {function(T): boolean} [predicate] - Función que evalúa cada elemento.
 * @returns {T | undefined} El primer elemento que cumple con el predicado o `undefined` si no se encuentra.
 */
Array.prototype.firstOrDefault = function (predicate) {
  if (typeof predicate !== "function") {
    return this.length > 0 ? this[0] : undefined;
  }

  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i])) {
      return this[i];
    }
  }

  return undefined;
};

Promise.prototype.firstOrDefault = async function (predicate) {
  const array = await this; // Resolver la promesa para obtener el array

  if (!Array.isArray(array)) {
    throw new TypeError("El resultado de la promesa no es un array.");
  }

  if (!predicate) {
    return array.length > 0 ? array[0] : undefined;
  }

  for (const item of array) {
    const result = await predicate(item); // Manejar predicados síncronos o asíncronos
    if (result) {
      return item;
    }
  }

  return undefined; // Ningún elemento cumple el predicado
};
