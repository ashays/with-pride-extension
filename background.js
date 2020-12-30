'use strict';

// Arrays of top-rated, high-rated, and low-rated hosts
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

var hostsToIcon = [
    {hosts: topRatedHosts, svgSrc: "assets/badge/greenBadge.svg"},
    {hosts: highRatedHosts, svgSrc: "assets/badge/yellowBadge.svg"},
    {hosts: lowRatedHosts, svgSrc: "assets/badge/redBadge.svg"},
];

// Create imageData versions of the SVG icons
hostsToIcon.forEach(map => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    map.imgData = context.getImageData(0, 0, 19, 19);
    let img = new Image;
    img.onload = function(){
        context.drawImage(img, 0, 0);
        map.imgData = context.getImageData(0, 0, 64, 64);
    };
    img.src = map.svgSrc;
});

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function(object) {
    // If the extension is being installed (rather than updated), open the About page
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.tabs.create({url: "about.html#pin-popup"});
    }
    // Replace all rules with new rules...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Add 3 rules, 1 for each type of top-, high-, and low-rated hosts
        chrome.declarativeContent.onPageChanged.addRules(hostsToIcon.map(hostToIcon => {
            return {
                // If the page URL includes the indicated hosts, show the extension's page action and update the icon
                conditions: hostToIcon.hosts.map(host => new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostContains: '.' + host},
                })),
                actions: [new chrome.declarativeContent.SetIcon({imageData: hostToIcon.imgData})]
            };
        }));
    });
});