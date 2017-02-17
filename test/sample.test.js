/* eslint no-shadow: 0 */
'use strict';

var test = require('tap').test;
var Random = require('random-js');
var random = new Random(Random.engines.mt19937().seed(0));
var ss = require('../');

function rng1() { return random.real(0, 1); }
function rng2() { return random.real(0, 1); }

test('sample', function(t) {

    /*without replacement*/
    t.deepEqual(ss.sample([], 0, rng1), [], 'edge case - zero array');
    t.deepEqual(ss.sample([], 2, rng1), [], 'edge case - zero array');
    t.deepEqual(ss.sample([1, 2, 3], 0, rng1, 0), [], 'edge case - zero array');
    t.deepEqual(ss.sample([1, 2, 3], 1, rng1), [1], 'edge case - sample of 1');
    t.deepEqual(ss.sample([1, 2, 3], 1, rng1), [2]);
    t.deepEqual(ss.sample([1, 2, 3], 3, rng1), [2, 3, 1]);
    t.deepEqual(ss.sample([1, 2, 3, 4], 2, rng1), [3, 1]);
    t.deepEqual(ss.sample([1, 2, 3, 4, 6, 7, 8], 2, rng1), [8, 7]);
    t.deepEqual(ss.sample(['foo', 'bar'], 1, rng1), ['foo'], 'non-number contents');

    /*with replacement*/
    t.deepEqual(ss.sample([], 0, rng2, true), [], 'edge case - zero array');
    t.deepEqual(ss.sample([], 2, rng2, true), [], 'edge case - zero array');
    t.deepEqual(ss.sample([1, 2, 3], 1, rng2, true), [3], 'edge case - sample of 1');
    t.deepEqual(ss.sample([1, 2, 3], 1, rng2, true), [3]);
    t.deepEqual(ss.sample([1, 2, 3], 3, rng2, true), [1, 3, 2]);
    t.deepEqual(ss.sample([1, 2, 3, 4], 2, rng2, true), [1, 1]);
    t.deepEqual(ss.sample([1, 2, 3, 4, 6, 7, 8], 2, rng2, true), [4, 8]);
    t.deepEqual(ss.sample(['foo', 'bar'], 1, rng2, true), ['bar'], 'non-number contents');

    t.end();
});
