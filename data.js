'use strict';

// Dictionary mapping host to name and score
var businesses = {
    'aa.com': {name: "American Airlines", score: 100},
    'southwest.com': {score: 100},
    'united.com': {score: 100},
    'alaskaair.com': {score: 90},
    'jetblue.com': {score: 90},
    'hawaiianairlines.com': {score: 85},
    'delta.com': {name: "Delta Air Lines Inc.", score: 85},
    'skywest.com': {name: "SkyWest Inc.", score: 70}
};

// Arrays of top-rated, high-rated, and low-rated hosts
const TOP_THRESHOLD = 100;
const HIGH_THRESHOLD = 80;
var topRatedHosts = [], highRatedHosts = [], lowRatedHosts = [];

for (const [host, details] of Object.entries(businesses)) {
    if (details.score >= TOP_THRESHOLD) {
        topRatedHosts.push(host);
    } else if (details.score >= HIGH_THRESHOLD) {
        highRatedHosts.push(host);
    } else {
        lowRatedHosts.push(host);
    }
}

// export default businesses;