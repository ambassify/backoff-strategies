function constant(delay) {
    return () => delay;
}

function linear(delay) {
    return (attempts) => attempts * delay;
}

function exponential(delay, factor = 2) {
    return (attempts) => {
        if (attempts == 0) return 0;
        return Math.pow(factor, attempts - 1) * delay;
    };
}

function binaryExponential(delay) {
    return (attempts) => {
        const maxMultiplier = Math.pow(2, attempts) - 1;

        // get a random multiplier between 0 and maxMultiplier (inclusive)
        const multiplier = Math.floor(Math.random() * (maxMultiplier + 1));

        return multiplier * delay;
    };
}

module.exports = { constant, linear, exponential, binaryExponential };
