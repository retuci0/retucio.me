(function () {
    const divider = document.getElementById("divider");
    const sidebar  = document.getElementById("sidebar");
    const layout   = document.getElementById("layout");

    const SIDEBAR_MIN = 160;
    const SIDEBAR_MAX = 600;
    const STORAGE_KEY = "sidebar-width";

    // restore saved width
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) sidebar.style.width = saved + "px";

    let dragging = false;
    let startX   = 0;
    let startW   = 0;

    divider.addEventListener("mousedown", function (e) {
        dragging = true;
        startX   = e.clientX;
        startW   = sidebar.offsetWidth;
        divider.classList.add("dragging");
        document.body.style.cursor     = "col-resize";
        document.body.style.userSelect = "none";
        e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
        if (!dragging) return;
        const delta = startX - e.clientX;
        const newW  = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startW + delta));
        sidebar.style.width = newW + "px";
    });

    document.addEventListener("mouseup", function () {
        if (!dragging) return;
        dragging = false;
        divider.classList.remove("dragging");
        document.body.style.cursor     = "";
        document.body.style.userSelect = "";
        localStorage.setItem(STORAGE_KEY, sidebar.offsetWidth);
    });

    // touch support
    divider.addEventListener("touchstart", function (e) {
        dragging = true;
        startX   = e.touches[0].clientX;
        startW   = sidebar.offsetWidth;
        divider.classList.add("dragging");
        e.preventDefault();
    }, { passive: false });

    document.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        const delta = startX - e.touches[0].clientX;
        const newW  = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startW + delta));
        sidebar.style.width = newW + "px";
    }, { passive: true });

    document.addEventListener("touchend", function () {
        if (!dragging) return;
        dragging = false;
        divider.classList.remove("dragging");
        localStorage.setItem(STORAGE_KEY, sidebar.offsetWidth);
    });
})();