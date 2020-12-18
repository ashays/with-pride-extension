'use strict';

// Dictionary mapping host to name and score
var businesses = {
    // Airlines
    'aa.com': {name: "American Airlines", score: 100},
    'southwest.com': {name: "Southwest Airlines Co.", score: 100},
    'united.com': {name: "United Airlines Holdings, Inc.", score: 100},
    'alaskaair.com': {name: "Alaska Airlines", score: 90},
    'jetblue.com': {namme: "JetBlue Airways Corp.", score: 90},
    'delta.com': {name: "Delta Air Lines Inc.", score: 85},
    'hawaiianairlines.com': {name: "Hawaiian Airlines Inc", score: 85},
    'skywest.com': {name: "SkyWest Inc.", score: 70},
    // Internet services and retailing
    'airbnb.com': {name: "Airbnb Inc.", score: 100},
    'ebay.com': {name: "eBay Inc.", score: 100},
    'etsy.com': {name: "Etsy Inc", score: 100},
    'expediagroup.com': {name: "Expedia Group", score: 100}, 'expedia.com': {name: "Expedia Group", score: 100},
    'facebook.com': {name: "Facebook Inc.", score: 100},
    'abc.xyz': {name: "Google Inc. ", score: 100}, 'google.com': {name: "Google Inc. ", score: 100},
    'host': {name: "IAC/InterActiveCorp.", score: 100},
    'host': {name: "PayPal Holdings Inc", score: 100},
    'host': {name: "Pinterest Inc.", score: 100},
    'host': {name: "The Knot Worldwide", score: 100},
    'host': {name: "TripAdvisor Inc.", score: 100},
    'host': {name: "Yelp Inc", score: 100},
    'host': {name: "Snagajob.com Inc", score: 95},
    'host': {name: "Wayfair", score: 85},
    'host': {name: "priceline.com LLC", score: 55},
    'host': {name: "Liberty Interactive Corp", score: 0},
};

// Arrays of top-rated, high-rated, and low-rated hosts
const TOP_THRESHOLD = 100;
const HIGH_THRESHOLD = 70;
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