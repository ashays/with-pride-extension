'use strict';

var ratedHosts = ['amazon.com', 'aa.com', 'southwest.com', 'ashaysheth.com'];

var canvas = document.createElement("canvas");
var context = canvas.getContext('2d');
// ...draw to the canvas...
var imageData = context.getImageData(0, 0, 19, 19);


// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: ratedHosts.map(host => new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostContains: host},
                })),
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction(), new chrome.declarativeContent.SetIcon({imageData: imageData})]
            }
        ]);
    });
});

// chrome.pageAction.setIcon({path: 'assets/iconGreen128.png'});

// chrome.webNavigation.onCompleted.addListener(function() {
//     chrome.tabs.executeScript({
//         file: "contentScript.js"
//     });
//     alert("This is my favorite website!");
// }, {url: [{urlMatches : 'https://www.google.com/'}]});