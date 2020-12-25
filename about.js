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