module.exports = function exponential(delay, factor = 2) {
    return (attempts) => {
        if (attempts == 0) return 0;
        return Math.pow(factor, attempts - 1) * delay;
    };
};
