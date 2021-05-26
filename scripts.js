const anchorData = [];
let contentLoaded = false;
let fontsLoaded = false;
const isReady = () => contentLoaded && fontsLoaded;

window.addEventListener("load",() =>{
    contentLoaded = true;
    init();
});

document.fonts.ready.then(() => {
    fontsLoaded = true;
    init();
});

window.addEventListener("hashchange", () => {
    updateLinkActiveClass();
});

window.addEventListener("scroll", () => {
    updateAnchorFromCurrentScrollPosition();
});

function init() {
    if (!isReady()) {
        return;
    }
    collectAnchors();
    updateAnchorFromCurrentScrollPosition();
    updateLinkActiveClass();
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 500);
}

function collectAnchors() {
    const anchors = document.querySelectorAll("h1 a, h2 a, h3 a, h4 a, h5 a, h6 a");
    anchorData.length = 0;
    for (const anchor of anchors) {
        anchorData.push({
            top: anchor.offsetTop,
            hash: anchor.getAttribute("href"),
            anchor: anchor,
        });
    }
}

function updateAnchorFromCurrentScrollPosition() {
    if (!isReady()) {
        return;
    }
    const html = document.documentElement;
    const scrollPosition = html.scrollTop;
    const offset = 50;
    let currentAnchor = anchorData[0];
    for (const anchor of anchorData) {
        if (anchor.top - scrollPosition <= offset) {
            currentAnchor = anchor;
        }
    }
    if (currentAnchor.hash !== document.location.hash) {
        history.replaceState(null, null, document.location.pathname + currentAnchor.hash);
        updateLinkActiveClass();
    }
}
  
function updateLinkActiveClass() {
    if (!isReady()) {
        return;
    }
    const hash = document.location.hash;
    const links = document.querySelectorAll("nav a, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a");
    for (const link of links) {
        const linkHash = link.getAttribute("href");
        link.classList.toggle("active", linkHash === hash);
    }
}
