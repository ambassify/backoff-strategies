# backoff-strategies

![CircleCI](https://img.shields.io/circleci/project/github/ambassify/backoff-strategies.svg)
[![npm version](https://img.shields.io/npm/v/@ambassify/backoff-strategies.svg)](https://www.npmjs.com/package/@ambassify/backoff-strategies)
[![npm downloads](https://img.shields.io/npm/dt/@ambassify/backoff-strategies.svg)](https://www.npmjs.com/package/@ambassify/backoff-strategies)
[![maintainer](https://img.shields.io/badge/maintainer-Gertt-brightgreen.svg)](https://github.com/Gertt)


Backoff strategies for retrying things like HTTP requests.

## Installation

```shell
npm install --save @ambassify/backoff-strategies
```


### Usage

Strategies are attached to the default import of this package and can be accessed using.

Every strategy will return a new function that accepts the amount of attempts that were previously executed as its only parameter and returns the matching delay.

```javascript
const { exponential, linear } = require('@ambassify/backoff-strategies');

// Usage:
const linearDelayGenerator = linear(50);
linearDelayGenerator(0); // 0
linearDelayGenerator(1); // 50
linearDelayGenerator(2); // 100
```

### Strategies

**constant**

`function constant(delay) {}`

`f(x) = delay`

Always returns the same delay, no matter how many attempts are passed in.

**linear**

`function linear(delay) {}`

`f(x) = x * delay`

The delay shows linear growth for every attempt.


**exponential**

`function exponential(delay, factor = 2) {}`

`f(x) = (factor ^ (x - 1)) * delay` (exception: `f(0) = 0`)

The delay shows exponential growth by a specific factor

**binary exponential**

`function binaryExponential(delay) {}`

`f(x) = random(0, ((2 ^ x) − 1)) * delay`

The delay shows binary exponential growth as explained [here](https://en.wikipedia.org/wiki/Exponential_backoff)

## Contribute

We really appreciate any contribution you would like to make, so don't
hesitate to report issues or submit pull requests.

## License

This project is released under a MIT license.

## About us

If you would like to know more about us, be sure to have a look at [our website](https://www.ambassify.com), or our Twitter accounts [Ambassify](https://twitter.com/Ambassify), [Sitebase](https://twitter.com/Sitebase), [JorgenEvens](https://twitter.com/JorgenEvens)
