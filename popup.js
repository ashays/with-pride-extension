'use strict';

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTab = tabs[0];
    let urlHost = new URL(activeTab.url).host;
    var business = businesses[urlHost] || businesses[urlHost.substring(4)];
    // Update popup body class
    if (business.score >= TOP_THRESHOLD) {
        document.querySelector("body").className = "top";
    } else if (business.score >= HIGH_THRESHOLD) {
        document.querySelector("body").className = "high"
    } else {
        document.querySelector("body").className = "low"
    }
    // Add name and score to popup
    document.querySelectorAll("[data-var='name']").forEach((ele) => { ele.textContent = business.name });
    document.querySelectorAll("[data-var='score']").forEach((ele) => { ele.textContent = business.score });
});