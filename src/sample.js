'use strict';
/* @flow */

var shuffle = require('./shuffle');

/**
 * Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample)
 * from a given array of `n` elements.
 *
 * The sampled values will be in any order, not necessarily the order
 * they appear in the input.
 *
 * @param {Array} array input array. can contain any type
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional source of entropy
 * instead of Math.random
 * @param {Boolean} if true, sampling with replacement will be used
 * @return {Array} subset of n elements in original array
 * @example
 * var values = [1, 2, 4, 5, 6, 7, 8, 9];
 * sample(values, 3); // returns 3 random values, like [2, 5, 8];
 */
function sample/*:: <T> */(
    array /*: Array<T> */,
    n /*: number */,
    randomSource /*: Function */,
    isWithReplacement /*: Boolean */) /*: Array<T> */ {

    var sampledValues = [];

    if (isWithReplacement) {
        randomSource = randomSource || Math.random; //should that be just part of this branch OR on top of the if structure?
        for (var i = 0; i < n; i++) { //do for as many samples element you need (n)
            //generate random number that can be an index for array
            var randomIndex = Math.floor(randomSource() * (array.length));
            //add a random value (selected by randomIndex) to the sampledValues-Array
            sampledValues.push(array[randomIndex]);
        }
    } else {
        // shuffle the original array using a fisher-yates shuffle
        var shuffled = shuffle(array, randomSource);
        // and then select a subset of it - the first `n` elements.
        sampledValues = shuffled.slice(0, n);
    }

    return sampledValues;
}

module.exports = sample;
