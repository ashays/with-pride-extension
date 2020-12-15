// var el = document.createElement('div');
// var domStringOld = `
//     <div class="wp-modal">
//         <header>
//             <img src="` + chrome.runtime.getURL("assets/icon48.png") + `" alt="With Pride icon" class="logo" />
//             <h2>Twitter Inc.</h2>
//             <span class="border"></span>
//             <div class="score">100</div>
//         </header>
//         <div class="wp-message">Twitter Inc. earned a top score of 100% in the Human Rights Campaign\'s "Corporate Equality Index," demonstrating their committment to LGBTQ+ equality and inclusion. Learn more</div>
//         <div class="grade"></div>
//     </div>
// `;
// console.log(chrome.runtime.getURL("popup.html"));
// var domString = `<iframe class="wp-modal" src="` + chrome.runtime.getURL("popup.html") + `" title="With Pride">`
// el.innerHTML =  domString;
// document.body.appendChild(el.firstChild);

var test = document.createElement('iframe');
test.src = chrome.runtime.getURL("popup.html");
test.classList = ["wp-modal"];
document.body.appendChild(test);