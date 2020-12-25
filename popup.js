'use strict';

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let activeTab = tabs[0];
    let urlHost = new URL(activeTab.url).host.split('.').slice(-2).join('.');
    var business = businesses[urlHost];
    // Update popup body class
    if (business) {
        if (business.score >= TOP_THRESHOLD) {
            document.querySelector("body").className = "top";
        } else if (business.score >= HIGH_THRESHOLD) {
            document.querySelector("body").className = "high";
        } else {
            document.querySelector("body").className = "low";
        }
        // Add name and score to popup
        document.querySelectorAll("[data-var='name']").forEach((ele) => { ele.textContent = business.name });
        document.querySelectorAll("[data-var='score']").forEach((ele) => { ele.textContent = business.score });
        document.querySelectorAll("[data-var='scorecard-link']").forEach((ele) => {
            ele.onclick = () => {
                let scorecardLink = business.url ? business.url : "https://www.hrc.org/resources/buyers-guide/" + business.name.replace(/'+/g, '').replace(/[^\w.]/g, '-').replace(/-+/g, '-');
                ga('send', 'event', {
                    eventCategory: 'Outbound Link',
                    eventAction: 'click',
                    eventLabel: scorecardLink
                });
                chrome.tabs.create({url: scorecardLink});
            }
        });
    } else {
        document.querySelector("body").className = "unknown";
        document.querySelectorAll("[data-var='about']").forEach((ele) => { ele.onclick = () => { chrome.tabs.create({url: "about.html"}); } });
        document.querySelectorAll("[data-var='faq']").forEach((ele) => { ele.onclick = () => { chrome.tabs.create({url: "about.html#who"}); } });
    }
    // Analytics
    ga('send', 'pageview', {
        title: business ? business.name + " " + business.score : "With Pride",
        location: activeTab.url,
        page: urlHost
    });
    document.getElementById("looking").addEventListener("click", () => {
        console.log("Looking for score");
        ga('send', 'pageview', {
            title: "Unknown business",
            location: activeTab.url,
            page: urlHost
        });    
    });
});