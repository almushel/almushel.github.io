let nav, origin;

window.onload = function () {
    nav = document.getElementById('float-nav')
    origin = nav.getBoundingClientRect().top;

    window.addEventListener("scroll", floatNav);
}

function floatNav() {
    let rect = nav.getBoundingClientRect();
    if (rect.top < 0) {
        origin = document.documentElement.scrollTop + rect.top;
        nav.style.top = '0px';
        nav.style.position = 'fixed';
        nav.style.width = '25%';
    } else if (document.documentElement.scrollTop < origin) {
        nav.removeAttribute('style');
    }
}