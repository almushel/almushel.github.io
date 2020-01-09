let static, float, origin;

window.onload = function () {
    static = document.getElementById("static-nav");
    float = document.getElementById('float-nav');
    origin = float.getBoundingClientRect().top;

    window.addEventListener("scroll", floatNav);
}

function floatNav() {
    let rect = static.getBoundingClientRect();
    if (rect.top < 0) {
        origin = document.documentElement.scrollTop + rect.top;
        float.style.display = 'initial';
        float.style.zIndex = '2';
        static.style.visibility = "hidden"
    } else if (document.documentElement.scrollTop < origin) {
        float.style.display = 'none';
        static.removeAttribute('style');
    }
}