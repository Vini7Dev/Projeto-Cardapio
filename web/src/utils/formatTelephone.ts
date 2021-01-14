/**
 * Util: Format Telephone
 */

const formatTelephone = (value: string): string => {
    const part1 = value.slice(0, 2);
    const part2 = value.slice(2, 7);
    const part3 = value.slice(7, 11);

    const telephoneFormated = `(${part1}) ${part2}-${part3}`;

    return telephoneFormated;
}

export default formatTelephone;