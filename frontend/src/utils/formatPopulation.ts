/**
 * Formats a raw population value from the UN CSV dataset.
 * The CSV stores values in THOUSANDS (e.g. 1380004.385 = 1,380,004,385 = ~1.38 Billion).
 * This function multiplies the raw value by 1000 before formatting.
 */
export const formatPopulation = (rawThousands: number): string => {
    const actual = rawThousands * 1000;
    if (actual >= 1_000_000_000) {
        return (actual / 1_000_000_000).toFixed(2) + "B";
    }
    if (actual >= 1_000_000) {
        return (actual / 1_000_000).toFixed(1) + "M";
    }
    if (actual >= 1_000) {
        return (actual / 1_000).toFixed(1) + "K";
    }
    return String(Math.round(actual));
};

/**
 * Returns the formatted exact population (e.g. "1,380,004,385") for tooltips.
 */
export const formatExactPopulation = (rawThousands: number): string => {
    return Math.round(rawThousands * 1000).toLocaleString();
};
