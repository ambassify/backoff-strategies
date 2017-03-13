const assert = require('assert');
const strategies = require('..');

describe('# backoff-strategies', function() {

    describe('# constant', function() {
        const constant = strategies.constant;
        const delay = 60;
        const expected = {
            0: 60,
            1: 60,
            2: 60,
            3: 60,
            4: 60,
            5: 60
        };

        Object.keys(expected).forEach(attempts => {
            it(`should return the expected timeout for attempt ${attempts}`, () => {
                const timeout = constant(delay)(attempts);
                assert.equal(timeout, expected[attempts]);
            })
        })
    })

    describe('# linear', function() {
        const linear = strategies.linear;
        const delay = 60;
        const expected = {
            0: 0,
            1: 60,
            2: 120,
            3: 180,
            4: 240,
            5: 300
        };

        Object.keys(expected).forEach(attempts => {
            it(`should return the expected timeout for attempt ${attempts}`, () => {
                const timeout = linear(delay)(attempts);
                assert.equal(timeout, expected[attempts]);
            })
        })
    })

    describe('# exponential', function() {
        const exponential = strategies.exponential;
        const delay = 60;
        const expected = {
            0: 0,
            1: 60,
            2: 120,
            3: 240,
            4: 480,
            5: 960
        };
        const expectedFactor3 = {
            0: 0,
            1: 60,
            2: 180,
            3: 540,
            4: 1620,
            5: 4860
        };

        Object.keys(expected).forEach(attempts => {
            it(`should return the expected timeout for attempt ${attempts} with default factor`, () => {
                const timeout = exponential(delay)(attempts);
                assert.equal(timeout, expected[attempts]);
            })
        })

        Object.keys(expected).forEach(attempts => {
            it(`should return the expected timeout for attempt ${attempts} with factor 3`, () => {
                const timeout = exponential(delay, 3)(attempts);
                assert.equal(timeout, expectedFactor3[attempts]);
            })
        })
    })

    describe('# binary exponential', function() {
        const binaryExponential = strategies.binaryExponential;
        const delay = 20;
        const expected = {
            0: [ 0 ],
            1: [ 0, 20 ],
            2: [ 0, 20, 40, 60 ],
            3: [ 0, 20, 40, 60, 80, 100, 120, 140 ],
            4: [ 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300 ]
        };

        Object.keys(expected).forEach(attempts => {
            it(`should return the expected timeout for attempt ${attempts}`, () => {
                // run it 50 times for each possible result because of the randomness of this algorithm
                const runs = 50 * expected[attempts].length;

                for (var i = 0; i < runs; i++) {
                    const timeout = binaryExponential(delay)(attempts);
                    assert(expected[attempts].includes(timeout));
                }
            })
        })
    })
})
