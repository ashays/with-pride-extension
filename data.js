'use strict';

// Dictionary mapping host to name and score
var businesses = {
    'aa.com': {name: "American Airlines", score: 100},
    'southwest.com': {name: "Southwest Airlines Co.", score: 100},
    'united.com': {name: "United Airlines Holdings, Inc.", score: 100},
    'alaskaair.com': {name: "Alaska Airlines", score: 90},
    'jetblue.com': {namme: "JetBlue Airways Corp.", score: 90},
    'delta.com': {name: "Delta Air Lines Inc.", score: 85},
    'hawaiianairlines.com': {name: "Hawaiian Airlines Inc", score: 85},
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