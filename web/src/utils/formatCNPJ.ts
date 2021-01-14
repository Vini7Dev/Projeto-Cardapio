/**
 * Util: Format CNPJ
 */

const formatCNPJ = (value: string): string => {
    const part1 = value.slice(0, 2);
    const part2 = value.slice(2, 5);
    const part3 = value.slice(5, 8);
    const part4 = value.slice(8, 12);
    const part5 = value.slice(12, 14);

    const cnpjFormated = `${part1}.${part2}.${part3}/${part4}-${part5}`;

    return cnpjFormated;
}

export default formatCNPJ;