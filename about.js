// Analytics
ga('send', 'pageview', {
    title: "About With Pride",
    page: window.location.pathname + window.location.hash
});

document.querySelectorAll('a[target=_blank]').forEach((ele) => {
    ele.onclick = (event) => {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: event.target.href
        });
    }
});

// Example businesses
function getBusinessEle(host) {
    let node = document.createElement("a");
    node.onclick = () => {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: "http://" + host
        });
        chrome.tabs.create({url: "http://" + host});
    }
    node.title = host;
    let business = businesses[host];
    let bucket = "low";
    if (business.score >= TOP_THRESHOLD) {
        bucket = "top";
    } else if (business.score >= HIGH_THRESHOLD) {
        bucket = "high";
    }
    node.innerHTML = "<div class='score " + bucket + "'>" + businesses[host].score + "</div><div class='title'>" + businesses[host].name + "</div><div class='host'>" + host + "</div>";
    return node;
}

let hosts = Object.keys(businesses);
for (let i = 0; i < 12; i++) {
    document.querySelector('#examples').appendChild(getBusinessEle(hosts[Math.floor(Math.random()*hosts.length)]));
}