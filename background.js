'use strict';

var hostsToIcons = [
    {hosts: topRatedHosts, svgSrc: "assets/iconGreen.svg"},
    {hosts: highRatedHosts, svgSrc: "assets/iconYellow.svg"},
    {hosts: lowRatedHosts, svgSrc: "assets/iconRed.svg"},
];

// Create imageData versions of SVG icons
hostsToIcons.forEach(map => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    map.imgData = context.getImageData(0, 0, 19, 19);
    let img = new Image;
    img.onload = function(){
        context.drawImage(img, 0, 0);
        map.imgData = context.getImageData(0, 0, 128, 128);
    };
    img.src = map.svgSrc;
});

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules with new rules...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // Add 3 rules, 1 for each type of top-, high-, and low-rated hosts
        chrome.declarativeContent.onPageChanged.addRules(hostsToIcons.map(hostToIcon => {
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