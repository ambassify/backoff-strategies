module.exports = function linear(delay) {
    return (attempts) => attempts * delay;
};
