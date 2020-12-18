'use strict';

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTab = tabs[0];
    let urlHost = new URL(activeTab.url).host.split('.').slice(-2).join('.');
    var business = businesses[urlHost];
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
    document.querySelectorAll("[data-var='scorecard-link']").forEach((ele) => { ele.onclick = () => { chrome.tabs.create({url: "https://www.hrc.org/resources/buyers-guide/" + business.name.replace(/[^\w.]/g, '-').replace(/-+/g, '-')}); } });
});