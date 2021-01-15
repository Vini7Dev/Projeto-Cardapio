/**
 * Utils: Format Price
 */

const formatPrice = (value: number): string => {
    const valueFormated = Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return valueFormated;
};

export default formatPrice;