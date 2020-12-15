'use strict';

var ratedHosts = ['amazon.com', 'aa.com', 'southwest.com'];

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
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

// chrome.webNavigation.onCompleted.addListener(function() {
//     chrome.tabs.executeScript({
//         file: "contentScript.js"
//     });
//     alert("This is my favorite website!");
// }, {url: [{urlMatches : 'https://www.google.com/'}]});