// Example businesses
function getBusinessEle(host) {
    let node = document.createElement("a");
    node.title = host;
    node.href = "http://www." + host;
    node.target = "_blank";
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

document.getElementById('loadMoreBusinesses').onclick = (event) => {
    event.preventDefault();
    for (let i = 0; i < 6; i++) {
        document.querySelector('#examples').appendChild(getBusinessEle(hosts[Math.floor(Math.random()*hosts.length)]));
    }
    ga('send', 'event', {
        eventCategory: 'Load example businesses',
        eventAction: 'click'
    });
};

// Analytics
ga('send', 'pageview', {
    title: "About With Pride",
    page: window.location.pathname + window.location.hash
});

document.querySelectorAll("[data-var='ga-track']").forEach((ele) => {
    ele.onclick = (event) => {
        ga('send', 'pageview', {
            title: "About With Pride",
            page: event.target.pathname + event.target.hash
        });
    };
});

document.querySelectorAll('a[target=_blank]').forEach((ele) => {
    ele.onclick = (event) => {
        ga('send', 'event', {
            eventCategory: 'Outbound Link',
            eventAction: 'click',
            eventLabel: event.target.href
        });
    };
});