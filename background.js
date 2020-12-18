'use strict';

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
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules with new rules...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Add 3 rules, 1 for each type of top-, high-, and low-rated hosts
        chrome.declarativeContent.onPageChanged.addRules(hostsToIcon.map(hostToIcon => {
            return {
                // If the page URL includes the indicated hosts, show the extension's page action and update the icon
                conditions: hostToIcon.hosts.map(host => new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostContains: host},
                })),
                actions: [new chrome.declarativeContent.ShowPageAction(), new chrome.declarativeContent.SetIcon({imageData: hostToIcon.imgData})]
            };
        }));
    });
});