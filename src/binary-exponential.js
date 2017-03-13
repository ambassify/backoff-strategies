module.exports = function binaryExponential(delay) {
    return (attempts) => {
        const maxMultiplier = Math.pow(2, attempts) - 1;

        // get a random multiplier between 0 and maxMultiplier (inclusive)
        const multiplier = Math.floor(Math.random() * (maxMultiplier + 1));

        return multiplier * delay;
    };
};
